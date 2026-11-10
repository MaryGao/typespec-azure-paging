# MissingXmsErrorResponse migration

## 1. Conclusion and scope

The TypeSpec rule
`@azure-tools/typespec-azure-resource-manager/missing-error-decorator` migrates
Swagger linter rule
[`MissingXmsErrorResponse`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/missing-xms-error-response.md).
**Full frozen ARM validation is complete: all 487 projects assessed, all 20
historical Swagger findings matched, zero Swagger-only and six explained
native-only findings.** General semantic equivalence remains undetermined. The native policy checks
unmarked HTTP 4xx/5xx response groups, except exactly HEAD/404, without requiring
an error response or prescribing its body. Severity, range counting, and the
Swagger selector's restriction to `paths` are intentional comparison boundaries.

## 2. Actual coverage

After the user's implementation review and separate five-project/full-validation
approvals, fresh native lint assessed all 487 frozen ARM projects against the
verified historical production Swagger baseline. No Swagger regeneration was
performed. Compilation, workers, time budget and final integrity checks passed.

| Count                          | Swagger linter | TypeSpec linter |
| ------------------------------ | -------------- | --------------- |
| Reported real-spec diagnostics | 20             | 26              |
| Projects with findings        | 9              | 9               |
| Assessed / unassessed projects | 487 / 0       | 487 / 0         |

All 20 Swagger observations match concrete native route/verb/status/operation
identities; zero Swagger-only and six native-only cases remain. Full details,
per-project counts and reproduction are in the
[full report](validation/full/README.md), with
[operation correspondence](validation/full/correspondence.json),
[all native receipts](validation/full/native-results) and
[five-project reports](validation/five-project/README.md).

**Assessed coverage:** Native behavior is established by 28 focused rule tests,
including numeric error statuses, ranges, HEAD exceptions, response-envelope
marking, shared-status ordering, and ARM template customizations. Two additional
AutoRest emission controls verify the representative-type behavior in both union
orders. These are development controls, not project coverage or evidence of
corpus equivalence. Comparable real-project counts and coverage percentages are
not claims of universal equivalence. Corpus execution uses source scope,
target-only activation and retained source suppressions; default activation and
selected-version/reachability alignment are not assessed.

## 3. Function-level coverage

The canonical suite is
[`missing-error-decorator.test.ts`](https://github.com/Azure/typespec-azure/blob/feat/missing-xms-error-response-6014/packages/typespec-azure-resource-manager/test/rules/missing-error-decorator.test.ts).

| Behavior                               | Result                                        | Rationale                                                                                                                                                                        |
| -------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unmarked numeric 4xx/5xx               | Covered by native tests                       | 400, 404, 499, 500, and 599 each warn. A marked default does not excuse a separate unmarked error status.                                                                        |
| Marked explicit errors                 | Covered by native tests                       | `@error` on the response model passes, including inherited markers and bodyless errors. No custom body shape is imposed.                                                         |
| Marked body under an unmarked envelope | Covered by native tests                       | The envelope still warns; a marked payload is not a response marker.                                                                                                             |
| HEAD/404                               | Covered by native tests                       | Numeric and singleton-range 404 are exempt. HEAD/400, HEAD/500, and a broader 4xx range are not exempt.                                                                          |
| Success and default                    | Covered by native tests                       | Success-only operations and default marked errors pass.                                                                                                                          |
| Status ranges                          | Covered by native tests                       | Ranges intersecting 400..599 warn once per native response group; marked and non-error ranges pass.                                                                              |
| Multiple bodies and statuses           | Covered by native tests                       | Same-status bodies are grouped; separate error statuses retain independent warnings on the operation.                                                                            |
| Shared marked/unmarked status          | Covered by native tests and emission controls | The first HTTP response type is representative. Both union orders are tested; the same-body AutoRest controls confirm the emitted marker matches that representative.            |
| Standard ARM templates                 | Covered by native tests                       | Custom unmarked errors on `ArmResourceRead` warn. Default read and existence-check templates pass. Concrete endpoints are checked, not shared template instances.                |
| Native activation                      | Covered by package tests                      | ARM library `all` enables the rule. The central resource-manager preset explicitly disables it; data-plane does not include it.                                                  |
| Published examples                     | Verified once                                 | Actual incorrect/correct snippets from both authored and generated docs compile with the registered rule explicitly enabled, producing one warning and no warnings respectively. |
| Real-project correspondence            | All 487 projects assessed                     | All 20 Swagger findings matched; six broader native findings explained, no unassessed projects or unexplained differences. |

## 4. Why diagnostic counts differ

Measured differences: four native-only Search warnings inspect non-service SDK
customizations; one Deployment Stacks warning inspects a CSharp-only operation
excluded by AutoRest's scope predicate; one Solutions warning covers an unmarked
GET/404 under `x-ms-paths`, outside the legacy selector. These six cases account
for 26 native versus 20 Swagger findings. No production logic changed to equalize
counts.

Deployment Stacks has four concrete inherited operations at one source location.
The three emitted scope operations match three Swagger findings; the fourth is
the SDK-only customization. The analyzer's distinct-source-target excess metric
must not be interpreted as Swagger-only cases. Semantic target replay and exact
route/verb/status matching, rather than count or line matching alone, establish
correspondence.

| Boundary              | Swagger behavior                                 | Native behavior                                                                   | Decision                                                                                                                 |
| --------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Severity              | Error                                            | Warning                                                                           | Approved native ARM lint convention.                                                                                     |
| Counting and location | One finding per emitted response entry           | One warning per HTTP status/range group on the operation                          | Preserve native metadata. A 400..599 range can correspond to both `4XX` and `5XX`; compare actual groups after approval. |
| Selector              | `$.paths.*.*.responses.*`; excludes `x-ms-paths` | Authored HTTP operations, independent of emitted path placement                   | Do not inspect emitted JSON or simulate emitter routing inside the rule. Assess real examples later.                     |
| Extension value       | Any truthy `x-ms-error-response` passes          | `isErrorModel` establishes native marking; AutoRest normally emits boolean `true` | Do not reproduce malformed Swagger extension values in native production logic.                                          |
| Non-emittable ranges  | May not have a valid Swagger counterpart         | Native HTTP metadata can describe additional ranges                               | Keep emitter failures unassessed; native range warnings are not proof that Swagger emission is supported.                |

## NOTES

- Issue: [Azure/typespec-azure#6014](https://github.com/Azure/typespec-azure/issues/6014).
- Original implementation: [MissingXmsErrorResponse.ts](https://github.com/Azure/azure-openapi-validator/blob/main/packages/rulesets/src/native/legacyRules/MissingXmsErrorResponse.ts), native production rule `R4032`, ARM-only, SDKViolation category, individual merge state. Its existing Swagger regression expects two findings for missing markers on 400 and 500.
- Analyzed implementation base: `c220d8e432d3183aeccfc254c3e217594b112aa2`; actual core gitlink: `8574d5453f7bf9a07dc09bd41edac579af71d94b`.
- Reviewed implementation commit: [`74e56a0f144190769180d5dbb27179db8b448c9c`](https://github.com/Azure/typespec-azure/commit/74e56a0f144190769180d5dbb27179db8b448c9c).
- Native owner: Azure Resource Manager. Existing `use-standard-error` checks for at least one marked error and the shapes of marked error payloads, and exempts all HEAD operations. Existing response-code rules discourage explicit error statuses regardless of marking. Neither is equivalent to this response-marker policy.
- Production uses only compiler/HTTP metadata and existing ARM helpers. No emitter, TCGC, Swagger parser, or JSON traversal dependency was introduced.
- Documentation examples use `ArmResourceRead<Widget, Error = BadRequest>` in both cases; only `@error` changes. Shared package test setup supplies imports/usings, without replacing the published examples.
- Development outcomes and reproducible commands are recorded in [development-checks.json](development-checks.json). One-time documentation and emission receipts are linked there.
- Dependency setup used the pinned Node 26.5.0 and pnpm 11.10.0, frozen filtered installation with lifecycle scripts disabled. The initial incomplete new submodule checkout was repaired for Windows long paths. Root type-aware lint required the previously uninstalled playground's declared Vite types; only that additional package was materialized.
- The Chronus CLI declined to create entries before an implementation commit because it considers committed package changes only. Two task-owned entries were added in the repository's existing format instead: a feature for ARM and internal disabled-registration metadata for the rulesets package.
- Independent local source review found no significant issues. This is not the user's manual PR review or release-readiness approval.
- **Approval boundaries:** No real-spec validation ran during initial PR preparation. The user subsequently reviewed the implementation, approved the five-project comparison, reviewed its differences, and explicitly approved full validation with reused historical Swagger and fresh native execution. No merge or automatic GitHub review/fix loop was performed.
- Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; shared baseline identity: `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`; pinned metadata: `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`; tooling: `52eeec48b136f97addc10d90dcba4457a04f83a7`.
- The official no-filter/no-limit analyzer finished successfully at `2026-11-10T05:20:39.843Z`, retaining the complete 93,496-file sealed dataset and all 487 native receipts. Runtime package artifacts and sanitized build/pack provenance are preserved in the [runtime release](https://github.com/MaryGao/typespec-azure-paging/releases/tag/missing-xms-error-response-full-20261110-74e56a0f1); [publication inventory](validation/publication-inventory.json) records source/publication hashes and immutable shared-baseline references.
- Five target controls and 37 applicable portable injected controls passed. Six unrelated unregistered migration fixtures were explicitly excluded, not counted as passes. Two zero-test tooling-bootstrap failures are retained and disclosed in the full report.
- CI's only original failure was a 10-second timeout in the existing TCGC `use-correct-verb` test on Ubuntu/Node 22; the other five build-matrix jobs passed. The failed job was rerun without implementation changes. CI status remains separate from this completed native coverage assessment.
