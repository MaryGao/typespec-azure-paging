# MissingDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` follows the documented [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) guideline. It is intentionally **not bug-for-bug equivalent** to the Swagger linter's key-selector implementation. The approved five-project pilot shows zero saved Spectral findings versus 161 fresh native findings; full-corpus coverage remains unassessed.

## 2. Actual coverage

Five selected real projects were assessed with fresh native execution and verified saved production Swagger observations. Counts are individual findings, not projects.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Five-project reported diagnostics | 0              | 161             |

**Assessed coverage:** the saved production logs prove this rule was selected and completed in all five projects, so its absent shard is zero observed findings, not skipped evaluation. The 161 native-only findings occur in Site Recovery (137), Component APIs (23) and IoT Hub (1); every one is corroborated by the missing saved Swagger fallback and matching legacy finding. Deployments and Storage are zero/zero controls. Equal-count projects: 2/5; Swagger-higher excess: 0; native-higher excess and total absolute difference: 161. A capture percentage with zero Swagger findings is not meaningful.

Five original synthetic Spectral controls explain the selector defect. Nine injected-candidate controls and the [per-project reports](../../validation/five-project/README.md) establish the native predicate and selected real-project behavior. Swagger was not regenerated or rerun; version projection, default activation and full-corpus equivalence remain unassessed.

## 3. Function-level coverage

| Behavior                               | Result                           | Rationale                                                                                                     |
| -------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Require an operation fallback          | Implemented intended policy      | The TypeSpec rule checks resolved HTTP status `"*"` instead of response-key strings.                          |
| Accept a real default                  | Implemented intended policy      | Standard ARM errors and custom defaults satisfy presence; payload validation is separate.                     |
| Reproduce response-key false negatives | Intentionally not reproduced     | The Swagger selector passes nonempty status-key strings to `truthy`.                                          |
| Selected real-project correspondence   | Assessed: intentional difference | Zero observed Swagger versus 161 native findings; every native finding corresponds to a real absent fallback. |
| Full-population correspondence         | Unassessed                       | Requires separate user approval.                                                                              |

## 4. Why diagnostic counts differ

The [pinned Spectral rule](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313) selects `$.paths.*.*.responses.*~`. In the isolated Spectral core `1.18.3` probe, a primitive key is passed directly to `truthy`; `field: "default"` does not inspect the containing response map. Nonempty response keys pass. Empty response maps have no keys to evaluate. The five synthetic cases each emitted zero findings, including the missing-default cases. The approved real-project pilot corroborates 161 false negatives in the selected historical executions; this is not a new Spectral run.

Recommended action: retain the intended fallback-presence policy, preserve raw Swagger counts in later comparisons, and explain confirmed false negatives rather than tune the TypeSpec rule to match them.

## NOTES

See the [group report](../../migration.md) for frozen membership, severity/activation, source identities, counting policy, publication and approval gates. The synthetic Spectral probe was run during analysis using `@stoplight/spectral-core@1.18.3` and `@stoplight/spectral-functions@1.7.2`; it was not a real-spec validation run.
