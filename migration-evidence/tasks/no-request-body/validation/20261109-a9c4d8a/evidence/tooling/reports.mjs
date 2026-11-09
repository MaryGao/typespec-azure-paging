import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const selection = read(path.join(root, "selection.json"));
const evidence = (...parts) => path.join(root, "evidence", ...parts);
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const investigation = read(evidence("search-arm", "gap-investigation.json"));
assert(investigation.findings.length === 10, "Incomplete Search investigation.");
const rows = [];
for (const project of selection.projects) {
  const native = read(evidence(project.slug, "native.json"));
  const execution = read(evidence(project.slug, "execution.json"));
  const spectral = read(evidence(project.slug, "spectral.json"));
  const assessed =
    execution.status === "assessed" &&
    native.status === "success" &&
    spectral.status === "assessed";
  const nativeCounts = {
    get: native.rawDiagnostics.filter((item) => item.message.startsWith("GET ")).length,
    delete: native.rawDiagnostics.filter((item) => item.message.startsWith("DELETE ")).length,
  };
  const swaggerCounts = project.audience === "arm" ? project.historicalCounts : spectral.counts;
  if (project.audience === "arm")
    assert(
      project.validatorRules.every(
        (name) => project.historicalCounts[name] === spectral.counts[name],
      ),
      "Historical versus selected-rule check differs.",
    );
  const swaggerTotal = Object.values(swaggerCounts).reduce((sum, count) => sum + count, 0);
  const nativeTotal = native.rawDiagnostics.length;
  const signedGap = nativeTotal - swaggerTotal;
  const operations = spectral.files.flatMap((file) => file.operations);
  const row = {
    name: project.name,
    slug: project.slug,
    sourcePath: project.sourcePath,
    audience: project.audience,
    apiVersion: project.apiVersion,
    status: assessed ? "assessed" : "unassessed",
    nativeCounts,
    swaggerCounts,
    nativeRaw: nativeTotal,
    swaggerRaw: swaggerTotal,
    rawSignedGapNativeMinusSwagger: signedGap,
    rawAbsoluteGap: Math.abs(signedGap),
    rawRelativeGap: swaggerTotal === 0 ? null : signedGap / swaggerTotal,
    relativeGapLimit: swaggerTotal === 0 ? "Undefined: Swagger observation count is zero." : null,
    nativeExcess: Math.max(signedGap, 0),
    swaggerExcess: Math.max(-signedGap, 0),
    normalizedActionableCounts: "not-determined",
    swaggerOperations: {
      get: operations.filter((operation) => operation.verb === "get").length,
      delete: operations.filter((operation) => operation.verb === "delete").length,
    },
    ambientDiagnostics: native.ambientDiagnostics.length,
  };
  rows.push(row);
  const isSearch = project.slug === "search-arm";
  const differences = isSearch ? investigation.findings : [];
  const inventory = differences.length
    ? `| Native source | Verb | SDK customization | Original wire operation | Resolved Swagger body parameters |\n|---|---|---|---|---|\n${differences
        .map(
          (finding) =>
            `| \`${finding.sourceFile}:${finding.line}\` | ${finding.verb.toUpperCase()} | \`${finding.operation}\` | \`${finding.mappings[0].originalOperation}\` | 0 |`,
        )
        .join("\n")}`
    : "No differing observations in this selected population. Matching zero counts are not proof of positive-case equivalence.";
  const details = isSearch
    ? `All ten diagnostics target operations in the \`Customizations\` namespace in \`client.tsp\`, outside the declared HTTP service. Resolved HTTP metadata treats their unannotated SDK request-options wrappers (\`params\`, and sometimes a \`body\` placeholder) as implicit request bodies. The rule currently visits those source operations, so it reports them.

Each row was matched by exact diagnostic location to the semantic operation, then by actual SDK override object identity for Go, C#, and JavaScript to its original service operation. Original HTTP metadata has no non-void request body. Each original's exact verb/path uniquely matches the selected saved Swagger; all operation parameter references were resolved against hash-verified retained files, with zero body parameters.

These are **ten native-only source-scope observations, not ten demonstrated on-wire bodies**. The six GET cases preserve the previously known scope difference; the consolidated rule also exposes four DELETE cases. [#5993](https://github.com/Azure/typespec-azure/issues/5993) remains open. No source suppressions, production predicate edits, or finding normalization were applied. See the [complete semantic correspondence and source excerpts](evidence/${project.slug}/gap-investigation.json).

The no-gap condition for full validation is not met. Full validation was not started.`
    : `The fresh native source program compiled successfully with the target explicitly enabled and emitted no target or ambient diagnostics. The selected Swagger population contains ${row.swaggerOperations.get} GET and ${row.swaggerOperations.delete} DELETE operations. ${
        project.audience === "arm"
          ? "Hash-verified historical production logs register both ARM policies, validate the selected saved Swagger, and complete successfully. A fresh explicit-rule Spectral evaluation of the same saved Swagger also reports zero."
          : "A separate selected-rule Spectral profile loaded the installed production data-plane RequestBodyNotAllowed definition without changing its severity and evaluated the frozen checked-in OAS2 document. This is not an ARM-baseline coverage claim or a full AutoRest production run."
      }

Injected positive and compliant controls demonstrate runtime execution, but this project's zero-finding result does not establish real-spec positive-case equivalence.`;
  fs.writeFileSync(
    path.join(root, `${project.slug}.md`),
    `# ${project.name}: no-request-body comparison

## 1. Scope

Project: \`${project.sourcePath}\`; selected Swagger API: \`${project.apiVersion}\`.
Native revision: \`${selection.candidateCommit}\`; core revision: \`${selection.coreCommit}\`; frozen specs revision: \`${selection.specsCommit}\`.

**${row.status}.** Swagger target observations: **${swaggerTotal}**. Native raw/source warnings: **${nativeTotal}** (${nativeCounts.get} GET, ${nativeCounts.delete} DELETE). Differing source observations: **${row.rawAbsoluteGap}** (${row.swaggerExcess} Swagger-only, ${row.nativeExcess} native-only). Native ambient diagnostics: ${row.ambientDiagnostics}.

Audience: ${project.audience}; Swagger policies: ${project.validatorRules.map((name) => `\`${name}\``).join(", ")}. TypeSpec rule: \`${selection.typeSpecRule}\`.

Comparison profile: ${selection.audienceProfiles[project.audience]}

Source programs and selected Swagger are not version/reachability aligned; client-only and nonselected-version operations remain in source scope. Raw warning counts and Swagger parameter diagnostics use different units; normalized actionable completeness is **not determined**. No full-population equivalence is claimed.

Evidence: [native receipt](evidence/${project.slug}/native.json), [worker input](evidence/${project.slug}/input.json), [execution receipt](evidence/${project.slug}/execution.json), [selected Spectral receipt](evidence/${project.slug}/spectral.json)${project.audience === "arm" ? `, [historical production evidence](evidence/${project.slug}/historical.json)` : ""}, [selection/provenance](selection.json).

## 2. Difference inventory

${inventory}

## 3. Detailed differences

${details}
`,
  );
}
assert(
  rows.length === 5 && rows.every((row) => row.status === "assessed"),
  "Incomplete five-project evidence.",
);
const summary = {
  completedAt: new Date().toISOString(),
  candidateCommit: selection.candidateCommit,
  specsCommit: selection.specsCommit,
  baselineIdentity: selection.baselineIdentity,
  pilotOnly: true,
  officialAnalyzerRun: false,
  projectCount: 5,
  assessed: 5,
  unassessed: [],
  rows,
  nativeRaw: rows.reduce((sum, row) => sum + row.nativeRaw, 0),
  swaggerRaw: rows.reduce((sum, row) => sum + row.swaggerRaw, 0),
  nativeExcess: rows.reduce((sum, row) => sum + row.nativeExcess, 0),
  swaggerExcess: rows.reduce((sum, row) => sum + row.swaggerExcess, 0),
  normalizedActionableCompleteness: "not-determined",
  fullValidation: {
    authorizedCondition: "No comparison gaps",
    conditionMet: false,
    started: false,
    reason:
      "Ten native-only client-customization observations in Search ARM; scope policy #5993 remains unresolved.",
  },
  developmentRerun: {
    initial:
      "61 passed, one 10-second timeout in the ARM no-request-body integration file; see focused-tests.log.",
    isolatedRetry:
      "All four tests in the timed-out ARM integration file passed with the unchanged timeout; see arm-template-tests-rerun.log.",
    fullyGreenCombinedRunClaimed: false,
  },
};
write(path.join(root, "coverage.json"), summary);
fs.writeFileSync(
  path.join(root, "index.md"),
  `# no-request-body: five-project validation

**Gap found: ten additional TypeSpec warnings in Search ARM SDK customizations (six GET, four DELETE).** They map to bodyless wire operations; [the source-versus-service scope question](https://github.com/Azure/typespec-azure/issues/5993) remains unresolved. Full validation was **not started** because the user's no-gap condition is not met.

| Project | Swagger target observations | Native GET | Native DELETE | Status |
|---|---|---|---|---|
${rows.map((row) => `| [${row.name}](${row.slug}.md) | ${row.swaggerRaw} | ${row.nativeCounts.get} | ${row.nativeCounts.delete} | ${row.status} |`).join("\n")}

## Scope and evidence

Candidate [PR #5986](https://github.com/Azure/typespec-azure/pull/5986), revision \`${selection.candidateCommit}\`; frozen specs \`${selection.specsCommit}\`. Exactly three ARM and two data-plane projects ran. All five compiled, with no ambient diagnostics. Raw/source findings remain intact: Swagger excess **0**, TypeSpec excess **10**, no count cancellation or normalization.

ARM results reuse immutable shared baseline \`${selection.baselineIdentity}\`, metadata revision \`${selection.baselineMetadataCommit}\`. Selected saved source, Swagger, production registration/completion logs, and reference inputs were hash-verified. A fresh selected-rule Spectral evaluation corroborated both ARM policies' zero observations. The shared baseline was not refreshed or modified.

Data plane uses a separately documented selected-rule profile against checked-in OAS2 at the frozen revision, loading the installed production \`RequestBodyNotAllowed\` definition. It does not claim support from the ARM-only official analyzer, a saved data-plane baseline, or full production AutoRest execution. This five-project spot check is not filtered reuse by the full-population analyzer.

All **15** freshly packed packages matched source/build and installed payloads. Injected GET/DELETE positives, compliance, explicit activation despite configuration disablement, and source suppression controls passed. Separate production-selector controls passed for local references, path-item-level omissions, and \`x-ms-paths\` audience differences. Positive controls are synthetic; zero real-spec findings are not positive-case equivalence.

Source scope versus selected Swagger is not version/reachability aligned. Recommended preset activation was not reassessed by project workers; they explicitly enable the target. No production rule changes or suppressions were made.

## Development checks rerun

Focused run: **61 passed, one ARM integration test hit its existing 10-second timeout**. An isolated retry of that file passed all four cases without increasing the timeout. The original combined run is not described as entirely green. Build closure: **23 tasks succeeded**.

## Reproduction and durable inputs

- [Structured results](coverage.json), [selection](selection.json), [execution](evidence/execution.json).
- [Artifact source/build/install verification](evidence/runtime-identity.json), [runtime commands](evidence/runtime-commands.json), [packed-runtime asset descriptor](evidence/runtime-asset.json).
- [Native controls](evidence/controls.json), [Spectral profile](evidence/spectral-profile.json), [Spectral controls](evidence/spectral-controls.json).
- [Exact Search gap investigation](evidence/search-arm/gap-investigation.json).
- [Driver](evidence/tooling/pilot.mjs), [retained pinned native worker](evidence/tooling/native-coverage-worker.mjs), [selected-rule Spectral runner](evidence/tooling/spectral-profile.mjs), [semantic investigation](evidence/tooling/investigate-search.mjs), [report generator](evidence/tooling/reports.mjs).

The scripts retain this run's absolute checkout paths. For replay, restore the pinned source/tooling and package-manager versions, download and verify the runtime asset, extract its \`artifacts\` directory under \`evidence\`, and set checkout/output paths for the new environment. The archived worker must match its recorded SHA256. These receipts are a reproducible pilot, not a successful full-population CLI replay.

Tracked terminal-log views use LF line endings with trailing whitespace removed. Original byte-exact terminal output is preserved under \`raw-terminal-logs\` in the runtime asset; [log-storage metadata](evidence/log-storage.json) records both hashes. JSON diagnostic receipts and the pinned worker are not reformatted.
`,
);
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file !== evidence("file-inventory.json")) {
      const bytes = fs.readFileSync(file);
      files.push({
        file: path.relative(root, file).replaceAll("\\", "/"),
        sha256: createHash("sha256").update(bytes).digest("hex"),
        bytes: bytes.length,
      });
    }
  }
}
walk(root);
write(evidence("file-inventory.json"), { completedAt: new Date().toISOString(), files });
console.log(
  `Persisted five project reports, index, structured results and ${files.length} input/output hashes; full validation not started.`,
);
