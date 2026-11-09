# no-request-body: five-project validation

**Gap found: ten additional TypeSpec warnings in Search ARM SDK customizations (six GET, four DELETE).** They map to bodyless wire operations; [the source-versus-service scope question](https://github.com/Azure/typespec-azure/issues/5993) remains unresolved. Full validation was **not started** because the user's no-gap condition is not met.

| Project                                                  | Swagger target observations | Native GET | Native DELETE | Status   |
| -------------------------------------------------------- | --------------------------- | ---------- | ------------- | -------- |
| [Advisor ARM](advisor-arm.md)                            | 0                           | 0          | 0             | assessed |
| [Compute ARM](compute-arm.md)                            | 0                           | 0          | 0             | assessed |
| [Search ARM](search-arm.md)                              | 0                           | 6          | 4             | assessed |
| [Key Vault Keys data plane](keyvault-keys-data-plane.md) | 0                           | 0          | 0             | assessed |
| [Search data plane](search-data-plane.md)                | 0                           | 0          | 0             | assessed |

## Scope and evidence

Candidate [PR #5986](https://github.com/Azure/typespec-azure/pull/5986), revision `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Exactly three ARM and two data-plane projects ran. All five compiled, with no ambient diagnostics. Raw/source findings remain intact: Swagger excess **0**, TypeSpec excess **10**, no count cancellation or normalization.

ARM results reuse immutable shared baseline `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`, metadata revision `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`. Selected saved source, Swagger, production registration/completion logs, and reference inputs were hash-verified. A fresh selected-rule Spectral evaluation corroborated both ARM policies' zero observations. The shared baseline was not refreshed or modified.

Data plane uses a separately documented selected-rule profile against checked-in OAS2 at the frozen revision, loading the installed production `RequestBodyNotAllowed` definition. It does not claim support from the ARM-only official analyzer, a saved data-plane baseline, or full production AutoRest execution. This five-project spot check is not filtered reuse by the full-population analyzer.

All **15** freshly packed packages matched source/build and installed payloads. Injected GET/DELETE positives, compliance, explicit activation despite configuration disablement, and source suppression controls passed. Separate production-selector controls passed for local references, path-item-level omissions, and `x-ms-paths` audience differences. Positive controls are synthetic; zero real-spec findings are not positive-case equivalence.

Source scope versus selected Swagger is not version/reachability aligned. Recommended preset activation was not reassessed by project workers; they explicitly enable the target. No production rule changes or suppressions were made.

## Development checks rerun

Focused run: **61 passed, one ARM integration test hit its existing 10-second timeout**. An isolated retry of that file passed all four cases without increasing the timeout. The original combined run is not described as entirely green. Build closure: **23 tasks succeeded**.

## Reproduction and durable inputs

- [Structured results](coverage.json), [selection](selection.json), [execution](evidence/execution.json).
- [Artifact source/build/install verification](evidence/runtime-identity.json), [runtime commands](evidence/runtime-commands.json), [packed-runtime asset descriptor](evidence/runtime-asset.json).
- [Native controls](evidence/controls.json), [Spectral profile](evidence/spectral-profile.json), [Spectral controls](evidence/spectral-controls.json).
- [Exact Search gap investigation](evidence/search-arm/gap-investigation.json).
- [Driver](evidence/tooling/pilot.mjs), [retained pinned native worker](evidence/tooling/native-coverage-worker.mjs), [selected-rule Spectral runner](evidence/tooling/spectral-profile.mjs), [semantic investigation](evidence/tooling/investigate-search.mjs), [report generator](evidence/tooling/reports.mjs).

The scripts retain this run's absolute checkout paths. For replay, restore the pinned source/tooling and package-manager versions, download and verify the runtime asset, extract its `artifacts` directory under `evidence`, and set checkout/output paths for the new environment. The archived worker must match its recorded SHA256. These receipts are a reproducible pilot, not a successful full-population CLI replay.

Tracked terminal-log views use LF line endings with trailing whitespace removed. Original byte-exact terminal output is preserved under `raw-terminal-logs` in the runtime asset; [log-storage metadata](evidence/log-storage.json) records both hashes. JSON diagnostic receipts and the pinned worker are not reformatted.
