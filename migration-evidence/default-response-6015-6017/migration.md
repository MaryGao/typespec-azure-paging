# MissingDefaultResponse and RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the shared ARM fallback-response policy of [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) and [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **Real-project equivalence remains unassessed pending the user's validation approval.** The TypeSpec linter intentionally avoids the Spectral rule's response-key selector bug, which misses ordinary absent defaults.

The check requires a fallback response, not a particular payload or error marker. It covers concrete operations across HTTP methods, including HEAD. `MissingXmsErrorResponse` is not part of this migration.

## 2. Actual coverage

No real projects have been evaluated. Representative and full-population execution are deliberately deferred, not passed or failed. Reported diagnostics below refer to individual findings, not project counts.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Real-project reported diagnostics | Unassessed     | Unassessed      |

**Assessed coverage:** source analysis establishes one shared fallback-presence responsibility; five synthetic Spectral controls establish the key-selector defect. The 27 new-rule cases, 72 existing-rule/package regressions, and 17 ruleset checks passed, as documented in [development evidence](development.md). These establish the tested predicate and activation behavior, not production coverage. Comparable real-project violation totals, correspondence, and coverage percentages remain unassessed. Zero executed real projects is not evidence of zero violations.

See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) for established semantic differences and unresolved production correspondence.

## 3. Function-level coverage

| Behavior                                                                          | Result                                                 | Rationale                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing fallback on GET, PUT, PATCH, POST, DELETE, HEAD, or an empty response set | Verified in focused controls; real projects unassessed | Native HTTP response metadata identifies the absent `"*"` response; the [canonical suite](https://github.com/MaryGao/typespec-azure-paging/blob/feat/default-response-6015-6017/packages/typespec-azure-resource-manager/test/rules/missing-default-response.test.ts) exercises violating controls. |
| Status-specific or ranged error is not a fallback                                 | Implemented; real projects unassessed                  | Marking a response `@error` does not replace its explicit or ranged status with a default.                                                                                                                                                                                                          |
| Standard ARM template or custom default response                                  | Implemented; real projects unassessed                  | A real fallback is accepted without imposing schema or error-marking checks.                                                                                                                                                                                                                        |
| Avoid duplicate findings from the two Swagger names                               | Implemented                                            | One TypeSpec rule, one public ID, and one warning per otherwise-unowned concrete operation.                                                                                                                                                                                                         |
| Existing ARM response-code or missing-error diagnostic                            | Verified in focused controls; real projects unassessed | Registered-linter interaction checks passed for PUT, synchronous/asynchronous POST, DELETE, and both registration orders of the missing-error rule. Independent payload errors remain separate.                                                                                                     |
| Full emitted-output or production-count equivalence                               | Unassessed                                             | User approval is required before representative execution and again before full-population execution.                                                                                                                                                                                               |

## 4. Why diagnostic counts differ

No production difference counts are available. The following are source-backed distinctions, not measured production gaps:

| Difference (with evidence)                                                | Swagger diagnostics                                                  | TypeSpec diagnostics for the same check | Recommended action and rationale                                                                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Spectral selector defect](members/MissingDefaultResponse/migration.md)   | Real projects unassessed; five synthetic controls each produced zero | Real projects unassessed                | Follow the documented fallback policy rather than reproduce a confirmed false-negative mechanism.                                   |
| [Legacy response-map check](members/RequiredDefaultResponse/migration.md) | One finding per matched response map whose `default` is falsy        | Real projects unassessed                | Compare by concrete operation after aligning service/API-version populations; preserve raw member results.                          |
| Native operations versus `$.paths` only                                   | Unassessed                                                           | Unassessed                              | Investigate emitted `x-ms-paths`, authorability, and version projection during approved comparison. Do not equate aggregate counts. |
| Existing TypeSpec diagnostic ownership                                    | Unassessed                                                           | Unassessed                              | Count attributed fallback checks across owners, not only the new diagnostic code; retain suppression and activation context.        |

## NOTES

- Issues: fixes [#6017](https://github.com/Azure/typespec-azure/issues/6017) and [#6015](https://github.com/Azure/typespec-azure/issues/6015).
- Membership is frozen to `MissingDefaultResponse` and `RequiredDefaultResponse`; no third Swagger rule is included.
- Flow: native-first with the user's explicit staging override. Prepare the development PR without real-spec execution, then stop for manual review and approval.
- Candidate base: canonical `Azure/typespec-azure:main`, `3f6b4c0518ee1ca9da38571e6a4e7febc7ac0920`; core gitlink `8574d5453f7bf9a07dc09bd41edac579af71d94b`.
- Reviewed implementation commit: [`edf6fac778e4d9e33088e02990374211c9796548`](https://github.com/MaryGao/typespec-azure-paging/commit/edf6fac778e4d9e33088e02990374211c9796548). The final formatted ARM source was rebuilt before this clean commit.
- Original Swagger implementation identity: `Azure/azure-openapi-validator`, `e1b8b207a196cf2fc288593efec22e6e38ab98d5`. Both source rules have error severity and ARM applicability, without independent options.
- TypeSpec severity is warning, consistent with the owning package. The library `all` set includes the new rule; the central resource-manager preset explicitly disables it. Enablement and suppression share the one new public ID; existing diagnostic owners retain their IDs and suppression behavior.
- Development publication: branch `feat/default-response-6015-6017`, personal fork `MaryGao/typespec-azure-paging`, targeting `Azure/typespec-azure:main`. PR title is the user's requested `Imple MissingDefaultResponse and RequiredDefaultResponse rules`.
- Evidence publication: branch `migration-evidence/default-response-6015-6017` in the same verified personal fork, without a second PR.
- Shared baseline discovery identifies `swagger-arm-20261026-2cd3c5dd` and frozen specs source `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. No baseline archive was verified or injected for this preparation stage; no specs runtime or comparison was executed.
- After manual PR approval, choose five representative projects and write one report per project using the user's `comp-reports` layout in a new `coverage-reports` folder. Summarize each Swagger member independently, then stop again. Full-population validation requires separate approval.
