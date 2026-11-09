# MissingXmsErrorResponse migration

## 1. Conclusion and scope

The TypeSpec rule
`@azure-tools/typespec-azure-resource-manager/missing-error-decorator` migrates
Swagger linter rule
[`MissingXmsErrorResponse`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/missing-xms-error-response.md).
**Real-project equivalence remains undetermined.** The native policy checks
unmarked HTTP 4xx/5xx response groups, except exactly HEAD/404, without requiring
an error response or prescribing its body. Severity, range counting, and the
Swagger selector's restriction to `paths` are intentional comparison boundaries.

## 2. Actual coverage

No real projects have been assessed. Five representative projects and the full
specification population are deliberately deferred pending separate manual
approvals; they are not passing gates or zero-finding runs.

| Count                          | Swagger linter | TypeSpec linter |
| ------------------------------ | -------------- | --------------- |
| Reported real-spec diagnostics | Not evaluated  | Not evaluated   |

**Assessed coverage:** Native behavior is established by 28 focused rule tests,
including numeric error statuses, ranges, HEAD exceptions, response-envelope
marking, shared-status ordering, and ARM template customizations. Two additional
AutoRest emission controls verify the representative-type behavior in both union
orders. These are development controls, not project coverage or evidence of
corpus equivalence. Comparable real-project counts and coverage percentages are
unassessed.

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
| Real-project correspondence            | Deferred                                      | Requires the user's PR review and validation approval.                                                                                                                           |

## 4. Why diagnostic counts differ

There are no measured project differences yet. Do not infer equal counts or
normalize the following potential differences without project evidence.

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
- **Approval boundaries:** Implementation and focused PR preparation are approved. No real-spec compilation, comparison, shared-baseline run, full population validation, or automatic GitHub review/fix loop was run during preparation. The draft PR is intentionally not declared migration-complete or release-ready.
- After manual PR review and validation approval: validate Swagger and TypeSpec on five representative projects, then save one comparison report per project using the existing `comp-reports` structure under the rule-specific `coverage-reports\missing-xms-error-response` folder. Summarize coverage gaps and behavioral differences and stop again. Full-spec validation requires subsequent explicit approval.
