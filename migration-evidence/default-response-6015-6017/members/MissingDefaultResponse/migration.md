# MissingDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` follows the documented [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) guideline. It is intentionally **not bug-for-bug equivalent** to the Swagger linter's response-key selector, which misses absent defaults. Native also checks non-service source declarations outside the saved Swagger population; their inclusion remains a rollout decision with recommended activation disabled.

## 2. Actual coverage

All 487 frozen projects were assessed with fresh native execution and verified saved production Swagger observations, without a project filter or limit. No compile/worker failures or unassessed projects occurred in this population. Counts are individual findings, not projects.

| Count                            | Swagger linter | TypeSpec linter |
| -------------------------------- | -------------- | --------------- |
| Full-corpus reported diagnostics | 0              | 486             |

**Assessed coverage:** all 487 projects are accounted for. Of the 486 native findings, 178 have individual matching `RequiredDefaultResponse` witnesses and saved Swagger responses without a default, corroborating the selector defect on emitted operations. The other 308 are verified non-service source declarations without saved counterparts, not demonstrated Spectral false negatives. A capture percentage or matched-diagnostic grouping against zero Spectral findings is not meaningful; no normalized count is invented.

See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) for the confirmed selector bug and source-population difference.

The [complete project inventory](../../validation/full/projects.md) includes individual data for all 487 projects, including zero-finding cases; the [full report](../../validation/full/README.md) retains native receipts and concrete correspondences. Swagger was not regenerated or rerun; version projection, default activation and fresh-emission equivalence remain unassessed.

## 3. Function-level coverage

| Behavior                               | Result                                      | Rationale                                                                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require an operation fallback          | Implemented intended policy                 | The [native checks and tests](../../migration.md#3-function-level-coverage) inspect resolved status `"*"` instead of response-key strings.                                                                                                                             |
| Accept a real default                  | Verified                                    | [Compliant tests](../../migration.md#3-function-level-coverage) accept standard and custom defaults; payload validation remains separate.                                                                                                                              |
| Reproduce response-key false negatives | Intentionally not reproduced                | The [pinned Swagger selector](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313) supplies nonempty status-key strings to `truthy`, unlike the native fallback check. |
| Full-population comparison             | Assessed: intentional and scope differences | The [operation audit](../../validation/full/evidence/full-audit-summary.json) accounts for 178 corroborated selector misses and 308 non-service source declarations.                                                                                                   |

## 4. Why diagnostic counts differ

The [pinned Spectral rule](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313) selects `$.paths.*.*.responses.*~`. In the isolated Spectral core `1.18.3` probe, a primitive key is passed directly to `truthy`; `field: "default"` does not inspect the containing response map. Nonempty response keys pass. Empty response maps have no keys to evaluate. The five synthetic cases each emitted zero findings, including the missing-default cases. The full real-project comparison corroborates 178 false negatives in historical executions; it does not rerun Spectral. The additional 308 native declarations are outside emitted service operations and cannot be attributed to this selector defect.

Recommended action: retain the intended fallback-presence policy and raw member counts rather than reproduce selector false negatives. Keep recommended activation disabled while reviewing the broader native source policy for non-service SDK declarations; no scope or independent-reporting implementation change was made during validation.

The 308 source-only findings across 17 projects have no saved route/verb counterparts: 304 in `client.tsp` and four in Key Vault's `back-compatible.tsp`. Their individual causes and dispositions are retained in the [full comparison](../../validation/full/README.md#3-missingdefaultresponse) and linked project reports. Equal-count projects: 463/487; Swagger-higher excess: zero; native-higher excess and total absolute difference: 486.

## NOTES

See the [group report](../../migration.md) for frozen membership, severity/activation, source identities, counting policy, publication and the distinction between the full-corpus candidate and later main refresh. The synthetic Spectral probe was run during analysis using `@stoplight/spectral-core@1.18.3` and `@stoplight/spectral-functions@1.7.2`; it was not a real-spec validation run.

Saved logs prove registration and successful production validator completion in 649 executions across all 487 projects. The absent Spectral shard means zero observed findings, not skipped evaluation.

Five synthetic Spectral controls explain the selector defect; these are not a project sample. Thirty-seven applicable portable harness controls passed against the full-run tooling.
