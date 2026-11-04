# PageableRequires200Response migration

## 1. Conclusion and scope

The proposed Azure Core linter `@azure-tools/typespec-azure-core/pageable-requires-200-response` migrates Swagger [`PageableRequires200Response`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/pageable-requires200-response.md).

**Full frozen ARM corpus execution completed: 487/487 projects assessed, zero unassessed, and zero target-rule findings on either side. Release readiness remains blocked by native test timeouts, three formatting failures, and outstanding acceptance/review evidence. The PR remains a draft.**

Matching zero counts do not prove functional equivalence. Swagger requires a truthy `responses[200]` on an operation with `x-ms-pageable`; the native rule requires a numeric HTTP 200 response on concrete `@list` operations. Native scope intentionally includes continuation-token lists without next links. The policy applies to ARM and data-plane operations, but the real-project corpus assessed here is ARM only.

## 2. Actual coverage

| Population / measurement           | Saved Swagger                                    | Fresh TypeSpec                        |
| ---------------------------------- | ------------------------------------------------ | ------------------------------------- |
| Full frozen ARM corpus             | 487 successfully compiled and validated projects | 487 assessed, 0 unassessed, 0 pending |
| Target-rule findings               | 0 recorded                                       | 0 raw; 0 HTTP-reachable               |
| Projects with target-rule findings | 0                                                | 0                                     |
| Earlier five-project pilot         | 0 recorded                                       | 0 raw; 0 HTTP-reachable               |

The five pilot projects were Advisor, Compute, KeyVault, Network, and Storage. Their individual reports remain in the requested local report directory. The full run freshly compiled every selected project with only the target native rule enabled; source suppressions remained in effect.

The Swagger side reused a complete, immutable historical baseline for the same specs commit and exact project/API-version selections. It was not regenerated. All **93,496 inventoried saved files** were SHA256-verified. The complete findings index had no shard for this registered production rule; canonical parsing of all selected successful validator logs confirmed zero target observations. An independent audit of the saved emitted documents found **4,047 operations with `x-ms-pageable`, all with HTTP 200**.

Fresh candidate controls used the installed artifacts, not source imports: next-link and continuation-token lists with HTTP 201 each produced exactly one expected warning; corresponding HTTP 200 cases produced none. All **four controls passed**. All **15 installed candidate packages** matched their archives across **2,867 packed files**, with consistent compiler identity.

Portable evidence: [validation summary](validation/summary.json), [all 487 project results](validation/corpus-projects.json), [candidate artifacts](validation/artifacts.json), and [native check receipts](validation/native-checks.json).

| Native validation                                             | Result                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| Canonical rule behavior suite                                 | 12 passed, 0 failed                                                 |
| Azure Core and Azure Rulesets package builds                  | Passed                                                              |
| Azure Core and Azure Rulesets package lint                    | Passed                                                              |
| Full Azure Core suite                                         | 498 passed, 6 failed at the unchanged 5-second timeout, 2 skipped   |
| Full Azure Rulesets suite                                     | 13 passed, 0 failed                                                 |
| One reduced-concurrency diagnosis of the six failed files     | 198 passed, 1 still timed out; original full-suite failure retained |
| Authoritative scoped Prettier check                           | Failed for rule Markdown, implementation, and test file             |
| Documentation generation                                      | Passed with warnings; generated README side effect was not retained |
| Published incorrect/correct documentation snippet compilation | Not separately completed                                            |
| Independent development and release-readiness reviews         | Not completed; no clean review or release acceptance claimed        |

The six original timeout failures were in LRO protocol, operations, LRO status, operation links, API-version override, and casing-style tests. The single-worker diagnosis retained one timeout in `casing-style.test.ts`, `model name must be PascalCase > is valid`. There were no reported assertion failures, but no environment or baseline attribution is established. Timeouts were not increased.

The authoritative formatting check preserves repository ignores. The earlier supplemental no-ignore check also flagged two Chronus files; those are intentionally ignored by repository CI and are not counted among the three remaining formatting failures.

No source changes, commits to the native branch, or fixes were made during this validation run. Corpus success does not waive the native validation failures.

## 3. Function-level coverage

The canonical behavior suite passed all 12 cases:

| Behavior                                                                          | Evidence / result                                                                                        |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| GET and POST next-link lists with only HTTP 201                                   | Two passing cases; expected warning                                                                      |
| Default response or a `2XX` range without numeric HTTP 200                        | Two passing cases; expected warning                                                                      |
| Implicit HTTP 200, explicit HTTP 200, and HTTP 200 alongside another success code | Three passing cases; accepted                                                                            |
| Operation without `@list`                                                         | One passing case; excluded                                                                               |
| Continuation-token list without next-link paging                                  | Two passing cases; HTTP 201 warns, HTTP 200 accepted                                                     |
| Concrete aliases derived from operation and interface paging templates            | Two passing cases; exact authored diagnostic target                                                      |
| Installed package execution                                                       | Four discriminating controls passed                                                                      |
| Registered native rule                                                            | Confirmed by the production worker and installed controls                                                |
| Standard presets remain opt-in for this rule                                      | Source configuration retained; package suite passed, but no new isolated preset-activation claim is made |
| Standard ARM and data-plane documentation snippets                                | Authored; standalone snippet acceptance evidence remains outstanding                                     |

Source: [canonical tests](https://github.com/Azure/typespec-azure/blob/62a4dea5a6f3765218e167f33ff0d1b3abfcc6c1/packages/typespec-azure-core/test/rules/pageable-requires-200-response.test.ts), [native implementation](https://github.com/Azure/typespec-azure/blob/62a4dea5a6f3765218e167f33ff0d1b3abfcc6c1/packages/typespec-azure-core/src/rules/pageable-requires-200-response.ts), and [authored documentation](https://github.com/Azure/typespec-azure/blob/62a4dea5a6f3765218e167f33ff0d1b3abfcc6c1/packages/typespec-azure-core/src/rules/pageable-requires-200-response.md).

These are validation results for the pinned candidate, not proof that all Swagger violations have a native equivalent. The corpus contains no observed violating Swagger operations.

## 4. Why diagnostic counts differ

No count differences were observed in the full selected population: both sides reported zero, and no projects were unassessed. There are consequently no observed differing operations to classify as native-only or Swagger-only.

The following semantic and runtime differences remain:

- Swagger applies to `x-ms-pageable`; native applies to all concrete `@list` operations, including continuation-token lists for which AutoRest emits no `x-ms-pageable`.
- Swagger severity is error; native severity is warning.
- The native rule is registered in Azure Core and available through library `all`, but both standard Azure presets explicitly disable it. The comparison explicitly enables it; it does not establish default-preset enforcement.
- Implicit HTTP 200 is represented numerically by TypeSpec HTTP metadata. A default response or numeric status range does not replace an explicit numeric 200 for the native predicate. Neither implementation independently validates the response-body schema.
- Saved Swagger and fresh TypeSpec used different compiler/library runtimes. Selected-version HTTP reachability filters source diagnostics; it does not prove that version-sensitive predicates were rerun on a projected program.
- Source suppressions remain in effect. The frozen ARM population is not data-plane corpus coverage or coverage of every API version.

The README follow-up searched **2,497 README Markdown files** in the frozen repository and found no references to `PageableRequires200Response`. Related paging suppressions appeared in 39 READMEs. Using `PageableOperation` suppressions in CodeTransparency, CostManagement, and CDN as pivots, a static audit inspected nine referenced Swagger files and 14 pageable operations, finding no missing-200 violations. These are suppressions of another rule, not hidden target-rule violations, and did not add native project executions.

## NOTES

- Issue: [Azure/typespec-azure#5957](https://github.com/Azure/typespec-azure/issues/5957). Draft implementation PR: [Azure/typespec-azure#5959](https://github.com/Azure/typespec-azure/pull/5959).
- Original Swagger [implementation](https://github.com/Azure/azure-openapi-validator/blob/main/packages/rulesets/src/spectral/az-common.ts#L295-L307), [documentation](https://github.com/Azure/azure-openapi-validator/blob/main/docs/pageable-requires200-response.md), and [tests](https://github.com/Azure/azure-openapi-validator/blob/main/packages/rulesets/src/spectral/test/pageable-requires200-response.test.ts).
- Native owner is Azure Core because the policy is shared across ARM and data-plane. The rule reuses compiler `isList` and HTTP `getHttpOperation`; it introduces no ARM dependency.
- The author explicitly requested removing the next-link guard. Do not restore it or narrow the implementation just to match emitted Swagger counts.
- ARM `use-standard-response-codes` already requires HTTP 200 on GET operations in services but accepts POST 201. ARM `list-response-envelope` checks existing HTTP 200 response envelopes rather than requiring 200. If both relevant rules are enabled, a missing-200 GET can have overlapping diagnostics.
- Candidate: `62a4dea5a6f3765218e167f33ff0d1b3abfcc6c1`; canonical base: `471dffac285f90e0bf892ac80a37a0a21cf8879b`; core gitlink: `a43d2ca6f2ddd4c1a1d05f2e63cd4c8a40a71b76`.
- Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; baseline identity: `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`.
- Candidate Node: `v26.12.1`; native pnpm: `11.10.0`; specs pnpm: `12.6.0`. Historical Swagger Node: `v26.5.0`; complete producer identities are retained in the summary.
- Worker: tooling commit `52eeec48b136f97addc10d90dcba4457a04f83a7`, SHA256 `8b912c6cee552c9c89946dbba04c5e03c286d89320175e9f332d595d05234609`; scope `http-reachable`, mode `target-only`, four workers, unchanged 240-second per-project deadline.
- Initial direct-registry installation failed with a TLS handshake error. Explicitly honoring the existing configured registry through process-local `PNPM_CONFIG_REGISTRY=https://packagefeedproxy.microsoft.io/npm/` succeeded, without disabling TLS verification or editing global settings.
- The pilot initially omitted shared source directories from sparse checkout. Materializing those existing files at the frozen commit resolved the two affected project failures without source changes. The full run used the complete frozen source tree and had zero worker failures.
- Local full results and preserved raw receipts are under the requested `coverage-reports\paging-require-200\full-regression`; the five individual pilot reports and suppression audit remain alongside it. Published validation receipts omit machine-specific absolute paths.
- Historical PR #5846 supplied the starting implementation design only; its validation was not reused as proof of this candidate. This report supersedes the earlier unvalidated-draft description with fresh results.
- Remaining work: resolve native timeout/formatting failures, retain required generated documentation updates, compile the authored examples, and complete independent development/readiness reviews. Any semantic repair requires validation of the repaired candidate; this run certifies only the pinned inputs above. No equivalence, Swagger-rule retirement, or release-ready claim is made.
- Task state: [task.json](task.json).
