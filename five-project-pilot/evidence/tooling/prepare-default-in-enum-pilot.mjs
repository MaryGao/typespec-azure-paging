import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const output = "C:\\Users\\marygao\\project\\coverage-reports\\default-in-enum";
const baseline = "C:\\dev\\worktrees\\xms-pageable-validation-5844\\shared-swagger-arm-20261026-2cd3c5dd";
const specs = "C:\\dev\\worktrees\\specs-default-in-enum-5972";
const candidate = "C:\\dev\\worktrees\\native-default-in-enum-5972";
const worker = "C:\\dev\\worktrees\\xms-pageable-validation-5844\\tooling-complete-52eeec48\\packages\\typespec-lintdiff\\test\\harness\\native-coverage-worker.mjs";
const sha = (data) => createHash("sha256").update(data).digest("hex");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
};
const manifest = read(path.join(baseline, "manifest.json"));
const saved = read(path.join(baseline, "baseline.json"));
if (
  manifest.status !== "complete" ||
  manifest.completionScope !== "swagger-only" ||
  sha(JSON.stringify(saved)) !== manifest.baselineIdentity
) {
  throw new Error("The shared baseline is not sealed or its identity does not match.");
}
const specsCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: specs, encoding: "utf8" }).trim();
if (saved.context.specsCommit !== specsCommit) throw new Error("Wrong frozen specs revision.");
const inventory = new Map(saved.files.map((file) => [file.file.replaceAll("\\", "/"), file.sha256]));
const verified = [];
function verify(relative) {
  const normalized = relative.replaceAll("\\", "/");
  const expected = inventory.get(normalized);
  if (!expected) throw new Error(`Not in sealed inventory: ${relative}`);
  const file = path.join(baseline, "dataset", relative);
  const actual = sha(fs.readFileSync(file));
  if (actual !== expected) throw new Error(`Baseline hash mismatch: ${relative}`);
  verified.push({ file: normalized, sha256: actual });
  return file;
}
verify("_meta.json");
const index = read(verify("validator-results.json"));
const shard = index.rules.DefaultInEnum;
const findings = shard ? read(verify(shard.resultsFile)) : undefined;
const selected = [
  ["Advisor", "advisor", "specification/advisor/resource-manager/Microsoft.Advisor/Advisor"],
  ["Compute", "compute", "specification/compute/resource-manager/Microsoft.Compute/Compute/Compute"],
  ["KeyVault", "keyvault", "specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault"],
  ["Network", "network", "specification/network/resource-manager/Microsoft.Network/Network/Network"],
  ["Storage", "storage", "specification/storage/resource-manager/Microsoft.Storage/Storage"],
];
const projects = selected.map(([name, slug, sourcePath]) => {
  const project = saved.projects.find((item) => item.sourcePath === sourcePath);
  if (!project || project.compileStatus !== "success" || project.validationStatus !== "success") {
    throw new Error(`Missing or unsuccessful saved project: ${sourcePath}`);
  }
  const sourceFiles = project.typespecFiles.map((relative) => {
    const savedFile = verify(relative);
    const prefix = project.typespecPath.replaceAll("\\", "/") + "/";
    const localRelative = relative.replaceAll("\\", "/").slice(prefix.length);
    const sourceFile = path.join(specs, sourcePath, localRelative);
    const actual = sha(fs.readFileSync(sourceFile));
    if (actual !== sha(fs.readFileSync(savedFile))) {
      throw new Error(`Frozen source mismatch: ${sourceFile}`);
    }
    return { file: path.relative(specs, sourceFile).replaceAll("\\", "/"), sha256: actual };
  });
  const swaggerFiles = project.swaggerFiles.map((relative) => {
    const file = verify(relative);
    const document = read(file);
    const enumDefaults = [];
    function visit(value, parts = []) {
      if (value === null || typeof value !== "object") return;
      if (Array.isArray(value.enum) && Object.hasOwn(value, "default")) {
        enumDefaults.push({
          path: parts,
          type: value.type,
          enum: value.enum,
          default: value.default,
          violatesMembership: !value.enum.includes(value.default),
        });
      }
      for (const [key, child] of Object.entries(value)) visit(child, [...parts, key]);
    }
    visit(document);
    return { file: relative, sha256: sha(fs.readFileSync(file)), enumDefaults };
  });
  for (const relative of project.validatorLogFiles ?? []) verify(relative);
  write(path.join(output, "evidence", slug, "saved-enum-defaults.json"), swaggerFiles);
  write(path.join(output, "evidence", slug, "source-files.json"), sourceFiles);
  const result = {
    name,
    slug,
    sourcePath,
    apiVersion: project.apiVersion,
    sourceFiles: sourceFiles.length,
    swaggerFiles: swaggerFiles.length,
    enumDefaults: swaggerFiles.reduce((sum, file) => sum + file.enumDefaults.length, 0),
    staticMembershipViolations: swaggerFiles.reduce(
      (sum, file) => sum + file.enumDefaults.filter((item) => item.violatesMembership).length, 0,
    ),
    savedRuleShardPresent: !!shard,
    savedFindings: findings,
  };
  write(path.join(output, "evidence", slug, "input.json"), {
    specsRepo: specs,
    project: { sourcePath, apiVersion: project.apiVersion },
    validatorRules: ["DefaultInEnum"],
    tspRules: ["@azure-tools/typespec-azure-core/default-in-enum"],
    scope: "source",
    nativeMode: "target-only",
  });
  return result;
});
const sourceFile = path.join(candidate, "packages", "typespec-azure-core", "src", "rules", "default-in-enum.ts");
const trackedSource = execFileSync("git", [
  "show", "HEAD:packages/typespec-azure-core/src/rules/default-in-enum.ts",
], { cwd: candidate });
const localSource = fs.readFileSync(sourceFile, "utf8").replaceAll("\r\n", "\n");
if (sha(trackedSource) !== sha(localSource)) throw new Error("Production rule differs from candidate HEAD.");
const selection = {
  schemaVersion: 1,
  taskId: "default-in-enum-5972-five-project-pilot",
  pullRequest: "https://github.com/Azure/typespec-azure/pull/5973",
  candidateCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: candidate, encoding: "utf8" }).trim(),
  candidateCoreCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: path.join(candidate, "core"), encoding: "utf8" }).trim(),
  specsCommit,
  specs,
  candidate,
  baselineDirectory: baseline,
  baselineIdentity: manifest.baselineIdentity,
  baselineMetadataCommit: "1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6",
  swaggerRule: "DefaultInEnum",
  typeSpecRule: "@azure-tools/typespec-azure-core/default-in-enum",
  scope: "source",
  nativeMode: "target-only",
  defaultActivation: "not-assessed",
  fullRegression: false,
  swaggerGeneration: false,
  selectionRationale: "Same five distinct ARM service families used by the local comp-reports and previous five-project pilot; exact paths and API versions verified in the frozen baseline. This is not a statistical sample.",
  baselineVerification: "Content identity and the selected project/index inputs are verified; this pilot does not ingest or revalidate the entire full-population baseline.",
  worker: { file: worker, sha256: sha(fs.readFileSync(worker)) },
  ruleSourceSha256: sha(localSource),
  projects,
};
write(path.join(output, "selection.json"), selection);
write(path.join(output, "evidence", "baseline-subset.json"), {
  baselineIdentity: manifest.baselineIdentity,
  manifestSha256: sha(fs.readFileSync(path.join(baseline, "manifest.json"))),
  baselineJsonSha256: sha(fs.readFileSync(path.join(baseline, "baseline.json"))),
  ruleShard: shard ?? null,
  verifiedFiles: verified,
  projects,
});
console.log(JSON.stringify({ output, candidate: selection.candidateCommit, projects }, null, 2));
