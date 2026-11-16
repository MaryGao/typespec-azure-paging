import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const evidencePath = process.argv[2] ?? path.join(import.meta.dirname, "full-validation.json");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const projects = new Map(evidence.projects.map((project) => [project.project, project]));
assert.equal(projects.size, evidence.projects.length, "Duplicate projects");

const swaggerByProject = new Map();
const typeSpecByProject = new Map();
const fileHashes = new Map();
let fileAssociations = 0;
for (const project of evidence.projects) {
  assert.ok(["success", "failed"].includes(project.savedBaselineCompileStatus));
  for (const file of project.swaggerFiles) {
    assert.match(file.file, /^specification\//);
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
    assert.ok(!fileHashes.has(file.file) || fileHashes.get(file.file) === file.sha256);
    fileHashes.set(file.file, file.sha256);
    fileAssociations++;
  }
  if (project.swaggerStatus === "assessed") assert.ok(project.swaggerFiles.length > 0);
  if (project.swaggerStatus === "unassessed-no-baseline-output") {
    assert.equal(project.savedBaselineCompileStatus, "failed");
  }
}

function category(finding, side) {
  const message = finding.message;
  if (side === "swagger" && finding.rule === "LroPatch202") return "long-running response codes";
  if (message.startsWith("Synchronous PATCH")) return "synchronous response codes";
  if (message.startsWith("Long-running PATCH")) return "long-running response codes";
  if (message.startsWith("202 response") || message.startsWith("The 202 response"))
    return "202 body";
  if (message.startsWith("PATCH operation")) return "empty response set";
  if (side === "swagger" && message.startsWith("An async PATCH")) return "LRO flag consistency";
  throw new Error(`Unknown ${side} diagnostic: ${message}`);
}

function groupKey(finding, side) {
  return JSON.stringify([finding.project, finding.route, category(finding, side)]);
}

const swaggerGroups = new Map();
for (const finding of evidence.swaggerFindings) {
  const project = projects.get(finding.project);
  assert.equal(
    project?.swaggerStatus,
    "assessed",
    `Unassessed Swagger finding: ${finding.project}`,
  );
  assert.ok(project.swaggerFiles.some((file) => file.file === finding.sourceFile));
  swaggerByProject.set(finding.project, (swaggerByProject.get(finding.project) ?? 0) + 1);
  const key = groupKey(finding, "swagger");
  swaggerGroups.set(key, (swaggerGroups.get(key) ?? 0) + 1);
}

const typeSpecGroups = new Map();
let historicalFindings = 0;
for (const finding of evidence.typeSpecFindings) {
  const project = projects.get(finding.project);
  assert.equal(
    project?.typeSpecStatus,
    "assessed",
    `Unassessed TypeSpec finding: ${finding.project}`,
  );
  assert.match(finding.sourceFile, /^specification\//);
  typeSpecByProject.set(finding.project, (typeSpecByProject.get(finding.project) ?? 0) + 1);
  if (finding.historicalVersionExclusion) {
    historicalFindings++;
    continue;
  }
  if (project.swaggerStatus !== "assessed") continue;
  const key = groupKey(finding, "typespec");
  typeSpecGroups.set(key, (typeSpecGroups.get(key) ?? 0) + 1);
}

for (const project of evidence.projects) {
  assert.equal(
    typeSpecByProject.get(project.project) ?? 0,
    project.typeSpecDiagnostics,
    project.project,
  );
  assert.equal(
    swaggerByProject.get(project.project) ?? 0,
    project.swaggerDiagnostics,
    project.project,
  );
}

const swaggerOnlyGroups = [...swaggerGroups.keys()].filter((key) => !typeSpecGroups.has(key));
const typeSpecOnlyGroups = [...typeSpecGroups.keys()].filter((key) => !swaggerGroups.has(key));
const matchedSwagger = [...swaggerGroups].reduce(
  (count, [key, findings]) => count + (typeSpecGroups.has(key) ? findings : 0),
  0,
);
const matchedTypeSpec = [...typeSpecGroups].reduce(
  (count, [key, findings]) => count + (swaggerGroups.has(key) ? findings : 0),
  0,
);
const summary = {
  selectedProjects: projects.size,
  typeSpecProjects: evidence.projects.filter((project) => project.typeSpecStatus === "assessed")
    .length,
  swaggerProjects: evidence.projects.filter((project) => project.swaggerStatus === "assessed")
    .length,
  unassessedSwaggerProjects: evidence.projects.filter(
    (project) => project.swaggerStatus !== "assessed",
  ).length,
  swaggerFileAssociations: fileAssociations,
  uniqueSwaggerFiles: fileHashes.size,
  swaggerDiagnostics: evidence.swaggerFindings.length,
  typeSpecDiagnostics: evidence.typeSpecFindings.length,
  excludedHistoricalTypeSpecDiagnostics: historicalFindings,
  swaggerGroups: swaggerGroups.size,
  typeSpecGroups: typeSpecGroups.size,
  matchedSwaggerDiagnostics: matchedSwagger,
  matchedTypeSpecDiagnostics: matchedTypeSpec,
  swaggerOnlyGroups: swaggerOnlyGroups.length,
  typeSpecOnlyGroups: typeSpecOnlyGroups.length,
};

assert.equal(summary.selectedProjects, evidence.totals.selected);
assert.equal(summary.typeSpecProjects, evidence.totals.typeSpecAssessed);
assert.equal(summary.swaggerProjects, evidence.totals.currentSwaggerAssessed);
assert.equal(summary.unassessedSwaggerProjects, evidence.totals.noCurrentSwagger);
assert.equal(summary.swaggerDiagnostics, evidence.totals.currentSwaggerFindings);
assert.equal(summary.typeSpecDiagnostics, evidence.totals.typeSpecDiagnostics);
assert.equal(
  summary.excludedHistoricalTypeSpecDiagnostics,
  evidence.totals.historicalVersionTypeSpecFindings,
);
assert.equal(summary.matchedSwaggerDiagnostics, evidence.totals.matchedSwaggerFindings);
assert.equal(summary.matchedTypeSpecDiagnostics, evidence.totals.matchedTypeSpecDiagnostics);
assert.deepEqual(swaggerOnlyGroups, [], "Swagger-only groups");
assert.deepEqual(typeSpecOnlyGroups, [], "TypeSpec-only groups");
console.log(JSON.stringify(summary, null, 2));
