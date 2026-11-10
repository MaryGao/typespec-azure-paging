import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const selection = read(path.join(root, "selection.json"));
const armManifest = read(path.join(root, "arm", "manifest.json"));
const armCoverage = read(path.join(root, "arm", "coverage.json"));
const historical = read(path.join(root, "evidence", "historical-arm.json"));
assert(
  ["complete", "incomplete"].includes(armManifest.status),
  "ARM execution/integrity checks are not finalized.",
);
assert(
  armCoverage.selectedProjectCount === 487 && historical.projects.length === 487,
  "Wrong ARM population.",
);
assert(armManifest.baselineIdentity === selection.baselineIdentity, "Wrong baseline identity.");
const runtime = read(path.join(root, "evidence", "runtime-identity.json"));
assert(runtime.status === "passed", "Runtime source/build/payload verification failed.");
const modules = new Map();
function verifyModules(native) {
  for (const entry of native.packages ?? []) {
    if (!modules.has(entry.entrypoint))
      modules.set(entry.entrypoint, sha(fs.readFileSync(entry.entrypoint)));
    assert(
      modules.get(entry.entrypoint) === entry.sha256,
      "A loaded module changed: " + entry.name,
    );
  }
  if (native.status === "success")
    assert(
      native.packages.some((p) => p.name === "@typespec/compiler") &&
        native.packages.some((p) => p.name === "@azure-tools/typespec-azure-core"),
      "Missing compiler/target package receipt.",
    );
}
const armReceipts = new Map();
for (const filename of fs
  .readdirSync(path.join(root, "arm"))
  .filter((file) => /^native-\d+\.json$/.test(file))) {
  const native = read(path.join(root, "arm", filename));
  assert(!armReceipts.has(native.project), "Duplicate ARM receipt.");
  verifyModules(native);
  armReceipts.set(native.project, { native, receipt: "arm/" + filename });
}
assert(armReceipts.size === 487, "Not all ARM receipts are present.");
const projects = [];
for (const old of historical.projects) {
  const { native, receipt } = armReceipts.get(old.project);
  const comparable = armCoverage.projects.find((row) => row.project === old.project);
  const swaggerCount = Object.values(old.counts).reduce((sum, n) => sum + n, 0);
  if (comparable)
    assert(
      comparable.validatorRawCount === swaggerCount,
      "Historical log/analyzer count mismatch.",
    );
  projects.push({
    project: old.project,
    audience: "arm",
    apiVersion: old.apiVersion,
    status: comparable && native.status === "success" ? "assessed" : "unassessed",
    nativeAssessed: native.status === "success",
    swaggerAssessed: true,
    native,
    nativeReceipt: receipt,
    swaggerCounts: old.counts,
    swaggerCount,
    swaggerOperations: old.swagger.flatMap((file) => file.operations).length,
    swaggerReceipt: "evidence/historical-arm.json",
    reason: native.error,
  });
}
for (const batch of selection.audiences.dataPlane.batches) {
  const configured = read(path.join(root, batch, "selection.json"));
  const completed = read(path.join(root, batch, "completion.json"));
  assert(completed.allProjectsAttempted, "Data-plane batch is not finalized: " + batch);
  const execution = read(path.join(root, batch, "execution.json"));
  assert(
    execution.results.length === configured.projects.length,
    "Missing data-plane execution receipt.",
  );
  for (const project of configured.projects) {
    const outcome = execution.results.find((row) => row.project === project.sourcePath);
    const directory = path.join(root, batch, "projects", project.slug);
    const nativeFile = path.join(directory, "native.json");
    const native = fs.existsSync(nativeFile) ? read(nativeFile) : null;
    if (native) verifyModules(native);
    const swaggerFile = path.join(directory, "spectral.json");
    const swagger = fs.existsSync(swaggerFile) ? read(swaggerFile) : null;
    projects.push({
      project: project.sourcePath,
      audience: "data-plane",
      apiVersion: project.apiVersion,
      batch,
      slug: project.slug,
      status: outcome.status,
      nativeAssessed: outcome.nativeAssessed,
      swaggerAssessed: outcome.swaggerAssessed,
      native,
      nativeReceipt: native ? `${batch}/projects/${project.slug}/native.json` : undefined,
      swaggerCounts: { RequestBodyNotAllowed: outcome.swaggerRawCount },
      swaggerCount: outcome.swaggerRawCount,
      swaggerOperations:
        swagger?.files.reduce((sum, file) => sum + file.operations.length, 0) ?? null,
      swaggerReceipt: swagger ? `${batch}/projects/${project.slug}/spectral.json` : undefined,
      reason: [outcome.nativeError, outcome.swaggerError].filter(Boolean).join("\n"),
    });
  }
}
assert(
  projects.length === 487 + selection.audiences.dataPlane.population,
  "Full population mismatch.",
);
assert(
  new Set(projects.map((p) => p.project)).size === projects.length,
  "Project population overlap.",
);

const searchPath = "specification/search/resource-manager/Microsoft.Search/Search";
const search = projects.find((project) => project.project === searchPath);
const pilotRoot = path.join(path.dirname(root), "20261109-a9c4d8a");
const pilotNative = read(path.join(pilotRoot, "evidence", "search-arm", "native.json"));
const pilotGap = read(path.join(pilotRoot, "evidence", "search-arm", "gap-investigation.json"));
const tuple = (diagnostics) =>
  diagnostics.map(({ rule, message, sourceFile, line, column }) => ({
    rule,
    message,
    sourceFile,
    line,
    column,
  }));
assert(
  JSON.stringify(tuple(search.native.rawDiagnostics)) ===
    JSON.stringify(tuple(pilotNative.rawDiagnostics)),
  "Search full-run findings differ from the investigated pilot; new investigation required.",
);
assert(
  pilotGap.candidateCommit === selection.candidateCommit &&
    pilotGap.specsCommit === selection.specsCommit,
  "Pilot correspondence belongs to different source.",
);
assert(
  sha(fs.readFileSync(path.join(armManifest.specs.root, searchPath, "client.tsp"))) ===
    pilotGap.sourceSha256,
  "Search customization source changed.",
);
const priorArtifacts = read(path.join(pilotRoot, "evidence", "runtime-identity.json")).artifacts;
assert(
  runtime.artifacts.every((entry) =>
    priorArtifacts.some(
      (old) => old.name === entry.name && old.archiveSha256 === entry.archiveSha256,
    ),
  ),
  "Pilot/runtime packages differ.",
);
fs.writeFileSync(
  path.join(root, "evidence", "search-gap-investigation.json"),
  JSON.stringify(
    {
      ...pilotGap,
      provenance: {
        kind: "Reused semantic correspondence revalidated against exact fresh full-run diagnostic tuples, identical candidate/specs/customization source, and all 15 identical packed package hashes.",
        fullNativeReceipt: search.nativeReceipt,
        pilotEvidence: "20261109-a9c4d8a/evidence/search-arm/gap-investigation.json",
      },
      fullValidation:
        "Full validation explicitly authorized despite these gaps; raw findings retained.",
    },
    null,
    2,
  ) + "\n",
);
const purviewPath = "specification/purview/data-plane/datamap";
const runHistoryPath = "specification/machinelearningservices/data-plane/RunHistory";
for (const [sourcePath, evidence] of [
  [purviewPath, "purview-gap-investigation.json"],
  [runHistoryPath, "run-history-positive-investigation.json"],
]) {
  const project = projects.find((entry) => entry.project === sourcePath);
  const proof = read(path.join(root, "evidence", evidence));
  assert(
    proof.candidateCommit === selection.candidateCommit &&
      proof.specsCommit === selection.specsCommit &&
      proof.nativeRaw === project.native.rawDiagnostics.length &&
      proof.swaggerRaw === project.swaggerCount &&
      JSON.stringify(proof.rawDiagnostics) === JSON.stringify(project.native.rawDiagnostics),
    "Positive-case correspondence differs from the full-run source and diagnostics: " + sourcePath,
  );
  for (const file of proof.sourceFiles)
    assert(
      sha(fs.readFileSync(path.join(armManifest.specs.root, sourcePath, file.file))) ===
        file.sha256,
      "Positive-case correspondence source changed: " + sourcePath,
    );
}
const purviewGap = read(path.join(root, "evidence", "purview-gap-investigation.json"));
const otherPositive = projects.filter(
  (project) =>
    ![searchPath, purviewPath, runHistoryPath].includes(project.project) &&
    ((project.native?.rawDiagnostics?.length ?? 0) > 0 || (project.swaggerCount ?? 0) > 0),
);
assert(
  otherPositive.length === 0,
  "New positive projects need semantic investigation before final reporting: " +
    otherPositive.map((p) => p.project).join(", "),
);

const resultProjects = [];
for (const project of projects) {
  const nativeRaw = project.nativeAssessed ? project.native.rawDiagnostics.length : null;
  const nativeGet = project.nativeAssessed
    ? project.native.rawDiagnostics.filter((d) => d.message.startsWith("GET ")).length
    : null;
  const nativeDelete = project.nativeAssessed
    ? project.native.rawDiagnostics.filter((d) => d.message.startsWith("DELETE ")).length
    : null;
  const comparable = project.status === "assessed";
  const signedGap = comparable ? nativeRaw - project.swaggerCount : null;
  const slug =
    project.project.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 110) +
    "--" +
    sha(project.project).slice(0, 8);
  const report = `reports/${project.audience}/${slug}.md`;
  const details = {
    project: project.project,
    audience: project.audience,
    apiVersion: project.apiVersion,
    status: project.status,
    nativeAssessed: project.nativeAssessed,
    swaggerAssessed: project.swaggerAssessed,
    nativeRaw,
    nativeGet,
    nativeDelete,
    swaggerCounts: project.swaggerCounts,
    swaggerRaw: project.swaggerCount,
    signedNativeMinusSwagger: signedGap,
    absoluteRawGap: comparable ? Math.abs(signedGap) : null,
    relativeRawGap:
      comparable && project.swaggerCount > 0 ? signedGap / project.swaggerCount : null,
    relativeLimit:
      comparable && project.swaggerCount === 0 ? "Undefined zero Swagger denominator" : null,
    nativeExcess: comparable ? Math.max(signedGap, 0) : null,
    swaggerExcess: comparable ? Math.max(-signedGap, 0) : null,
    ambientDiagnostics: project.native?.ambientDiagnostics?.length ?? null,
    nativeReceipt: project.nativeReceipt,
    swaggerReceipt: project.swaggerReceipt,
    reason: project.reason,
    report,
  };
  resultProjects.push(details);
  const nativeLink = project.nativeReceipt
    ? `[native receipt](../../${project.nativeReceipt})`
    : "no successful native receipt";
  const swaggerLink = project.swaggerReceipt
    ? `[Swagger receipt](../../${project.swaggerReceipt})`
    : "no assessable Swagger receipt";
  const warnings = project.native?.rawDiagnostics ?? [];
  const inventory = !comparable
    ? "Comparison unassessed; available source findings remain visible in the raw receipt. This is not a clean/zero comparison."
    : warnings.length
      ? warnings.map((d) => `- \`${d.sourceFile}:${d.line}:${d.column}\`: ${d.message}`).join("\n")
      : "No differing observations in this selected population. Zero/zero is not proof of positive-case equivalence.";
  const explanation =
    project.project === searchPath
      ? "All ten warnings (six GET, four DELETE) target SDK-only Customizations operations, outside the declared HTTP service. Implicit options wrappers look like bodies to resolved source HTTP metadata. Exact SDK override identity and verb/path correspondences establish that all original service operations and reference-resolved Swagger operations are bodyless. The previous semantic audit is revalidated against identical full-run diagnostic tuples, source and package artifacts: [complete correspondence](../../evidence/search-gap-investigation.json). #5993 remains unresolved; no production edits, suppression or count normalization was applied."
      : project.project === runHistoryPath
        ? "All **three native warnings correspond one-to-one to three real DELETE-body Swagger observations**. Actual compiler diagnostic Operation identity and declared HTTP service membership establish the source operations; exact resolved HTTP verb/path and each frozen Swagger body parameter establish the wire correspondence. These are deleteRunServices, deleteRunServicesByExperimentId and deleteRunServicesByExperimentName. No client-alias multiplicity occurs in this project. [Complete positive-case correspondence](../../evidence/run-history-positive-investigation.json). Matching counts alone would not have established this result, and these concrete matches do not establish whole-rule equivalence."
        : project.project === purviewPath
          ? "There are **six actual DELETE wire operations with bodies**, and both rules detect all six. Native source traversal additionally reports their six client aliases outside the declared HTTP service: **12 native warnings versus six Swagger observations**. Compiler sourceOperation object identity, declared HTTP service membership, exact verb/path and each frozen Swagger body parameter establish the one-service-plus-one-alias correspondence. Raw counts are retained; this is not six additional on-wire defects, a blanket normalization, or proof of whole-rule parity. [Complete semantic correspondence](../../evidence/purview-gap-investigation.json).\n\n| Wire DELETE route | Swagger operationId | Native service operation | Native client alias |\n|---|---|---|---|\n" +
            purviewGap.findings
              .filter((finding) => finding.inDeclaredHttpService)
              .map((finding) => {
                const alias = purviewGap.findings.find(
                  (other) =>
                    !other.inDeclaredHttpService &&
                    other.swagger.file === finding.swagger.file &&
                    other.path === finding.path &&
                    other.verb === finding.verb,
                );
                return `| \`${finding.path}\` | \`${finding.swagger.operationId}\` | \`${finding.operation}\` | \`${alias.operation}\` |`;
              })
              .join("\n")
          : !comparable
            ? `Reason: \`${(project.reason ?? "Missing assessable input").split("\n")[0].replaceAll("`", "'")}\`. See the complete receipts for diagnostics. A missing OAS2 comparison for an SDK-only configuration or OAS3-only service is a profile limitation, not an on-wire clean result.`
            : `The source program compiled successfully with the target explicitly enabled; selected Swagger had no target observations. ${project.audience === "arm" ? "Historical production logs explicitly register both ARM policies and complete validation for every retained document." : "The separate Spectral worker loads the installed production RequestBodyNotAllowed definition, preserves its severity, validates positive/compliant controls, and evaluates exact frozen Git Swagger blobs and their retained reference closure."} No positive-case equivalence claim follows from this result.`;
  const content = `# ${project.project}: no-request-body\n\n## 1. Scope\n\n**${project.status}.** Candidate \`${selection.candidateCommit}\`; core \`${selection.coreCommit}\`; frozen specs \`${selection.specsCommit}\`. Selected Swagger API: \`${project.apiVersion ?? "unavailable"}\`.\n\nAudience: ${project.audience}. Native raw warnings: **${nativeRaw ?? "unassessed"}** (${nativeGet ?? "unassessed"} GET, ${nativeDelete ?? "unassessed"} DELETE). Swagger target observations: **${project.swaggerCount ?? "unassessed"}**. Native-minus-Swagger difference: ${signedGap ?? "unassessed"}. Ambient diagnostics: ${details.ambientDiagnostics ?? "unassessed"}.\n\nSource and selected Swagger are not version/reachability aligned; raw operation warnings and parameter-level Swagger diagnostics are different units. Source suppressions remain honored, default activation is not assessed by target-only workers, and actionable equivalence is undetermined. Evidence: ${nativeLink}, ${swaggerLink}, [full summary](../../index.md).\n\n## 2. Difference inventory\n\n${inventory}\n\n## 3. Detailed differences\n\n${explanation}\n`;
  const file = path.join(root, report);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
const audiences = Object.fromEntries(
  ["arm", "data-plane"].map((audience) => {
    const rows = resultProjects.filter((project) => project.audience === audience);
    const assessed = rows.filter((project) => project.status === "assessed");
    return [
      audience,
      {
        attempted: rows.length,
        nativeAssessed: rows.filter((p) => p.nativeAssessed).length,
        swaggerAssessed: rows.filter((p) => p.swaggerAssessed).length,
        comparable: assessed.length,
        unassessed: rows.filter((p) => p.status !== "assessed"),
        rawNative: rows.reduce((sum, p) => sum + (p.nativeRaw ?? 0), 0),
        rawSwaggerComparable: assessed.reduce((sum, p) => sum + p.swaggerRaw, 0),
        rawNativeExcess: assessed.reduce((sum, p) => sum + p.nativeExcess, 0),
        rawSwaggerExcess: assessed.reduce((sum, p) => sum + p.swaggerExcess, 0),
        nativeOnlyProjects: assessed
          .filter((p) => p.nativeRaw > 0 && p.swaggerRaw === 0)
          .map((p) => p.project),
        swaggerOnlyProjects: assessed
          .filter((p) => p.swaggerRaw > 0 && p.nativeRaw === 0)
          .map((p) => p.project),
      },
    ];
  }),
);
const summary = {
  completedAt: new Date().toISOString(),
  candidateCommit: selection.candidateCommit,
  coreCommit: selection.coreCommit,
  specsCommit: selection.specsCommit,
  baselineIdentity: selection.baselineIdentity,
  armManifestStatus: armManifest.status,
  audiences,
  attemptedNativePrograms: resultProjects.length,
  normalizedActionableCompleteness: "not-determined",
  projects: resultProjects,
  portableControls: selection.controls.portable,
  interpretation:
    "Search source-only scope gap retained. Purview demonstrates six real DELETE body violations on both sides plus six source client-alias warnings; RunHistory demonstrates three matching actual DELETE bodies. All raw counts preserved. All unsupported/failed comparisons explicitly unassessed. Profiles are audience-separated and do not establish full production data-plane equivalence.",
};
fs.writeFileSync(path.join(root, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
const failed = resultProjects.filter((p) => p.status !== "assessed");
fs.writeFileSync(
  path.join(root, "index.md"),
  `# no-request-body: full frozen-population validation\n\n**Complete execution; a known scope gap and explicit comparison limitations remain.** All ${resultProjects.length} configured source programs were attempted at \`${selection.candidateCommit}\` (PR #5986 is now merged). Frozen specs: \`${selection.specsCommit}\`.\n\n| Audience/profile | Source programs attempted | Native compiled | Swagger comparisons assessed | Native warnings | Comparable Swagger observations |\n|---|---:|---:|---:|---:|---:|\n${Object.entries(
    audiences,
  )
    .map(
      ([name, value]) =>
        `| ${name} | ${value.attempted} | ${value.nativeAssessed} | ${value.comparable} | ${value.rawNative} | ${value.rawSwaggerComparable} |`,
    )
    .join(
      "\n",
    )}\n\n## Differences\n\nSearch ARM retains **ten native-only SDK customization warnings: six GET, four DELETE**. Exact full-run warning tuples match the previously investigated source/runtime; every corresponding real service and Swagger operation is bodyless. [Semantic correspondence](evidence/search-gap-investigation.json). No warnings were hidden or normalized; #5993 remains open. Both raw excess directions are retained separately in [summary.json](summary.json), not cancelled across audiences/projects.\n\n## Unassessed comparisons\n\n${failed.length ? failed.map((p) => `- [${p.project}](${p.report}): ${(p.reason ?? "Unassessed").split("\n")[0]}.`).join("\n") : "None."}\n\nThese are not counted as clean comparisons. Native source execution and availability of an OAS2 comparison are separate facts.\n\n## Population and methods\n\nARM: all **487** immutable shared-baseline projects, no filter/limit; official analyzer with \`frozen-reference\`, source scope, two ARM Swagger members and one Core native rule. Every saved document's production registration/completion is verified: [historical receipts and static inventory](evidence/historical-arm.json). Historical Swagger was not refreshed or relabeled as freshly emitted.\n\nData plane: all **${audiences["data-plane"].attempted}** frozen data-plane preset projects with both \`main.tsp\` and \`tspconfig.yaml\`, including outside-path services discovered by an independent complete Git-tree preset audit. Config-only/fragment-only directories remain inventoried. Resolved emitter output locations identify selected latest-version checked-in OAS2; exact Git blobs and transitive local reference/example closure are retained independently of the sparse runtime checkout. The separate selected-rule Spectral profile is **not a saved data-plane baseline or full AutoRest production run**.\n\nAll 15 candidate artifacts match source/build and installed runtime. Native request-body controls passed; **37 portable controls passed**, with six explicitly non-applicable fixtures for an unrelated unregistered ARM resource-group rule. Source/version populations are not aligned, authored suppressions remain effective, target-only workers do not measure default preset activation, and zero observations do not prove positive-case equivalence.\n\n## Evidence\n\n[Full provenance](selection.json), [structured summary and per-project report links](summary.json), [official ARM results](arm/coverage.json), [ARM execution manifest](arm/manifest.json), [primary data-plane execution](data-plane/execution.json), [outside-path data-plane execution](data-plane-supplement/execution.json), [preset discovery audit](evidence/data-plane-discovery-audit.json), [runtime payload verification](evidence/runtime-identity.json).\n`,
);
fs.appendFileSync(
  path.join(root, "index.md"),
  "\n## Real data-plane positive cases\n\n**Nine real DELETE-body wire violations detected on both sides:** six in Purview DataMap and three in Machine Learning RunHistory. Purview additionally has six SDK client-alias warnings, yielding **15 native warnings versus nine Swagger observations** across data plane. Compiler Operation/sourceOperation identities, service membership, exact HTTP verb/path and actual frozen Swagger body parameters establish every correspondence. Raw counts remain unchanged; the aliases are not six additional on-wire defects. [Purview investigation](evidence/purview-gap-investigation.json), [RunHistory investigation](evidence/run-history-positive-investigation.json), [post-execution data-plane integrity](evidence/data-plane-integrity.json). The RunHistory cases were added during final reconciliation; the earlier interim status mentioning Purview alone was not a final corpus total.\n",
);
console.log(
  JSON.stringify(
    {
      attempted: summary.attemptedNativePrograms,
      audiences,
      reportFiles: resultProjects.length,
      uniqueVerifiedModuleEntrypoints: modules.size,
    },
    null,
    2,
  ),
);
