# MissingDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` follows the documented [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) guideline. It is intentionally **not bug-for-bug equivalent** to the Swagger linter's key-selector implementation. The full 487-project run shows zero saved Spectral findings versus 486 fresh native findings: 178 corroborated saved-wire false negatives plus 308 non-service source declarations outside the saved Swagger population.

## 2. Actual coverage

The five-project pilot and full 487-project frozen-corpus run were each explicitly approved and assessed with fresh native execution and verified saved production Swagger observations. Counts are individual findings, not projects; the full run includes the pilot population.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Five-project reported diagnostics | 0              | 161             |
| Full-corpus reported diagnostics  | 0              | 486             |

**Full assessed coverage:** saved logs prove registration and successful production validator completion in 649 executions across all 487 projects. The absent shard means zero observed findings, not skipped evaluation. Of the 486 native findings, 178 have individual matching `RequiredDefaultResponse` witnesses and saved Swagger responses without a default. These corroborate the selector defect on emitted operations.

The other 308 native findings across 17 projects target non-service SDK customization/compatibility declarations, with no saved route/verb counterparts: 304 in `client.tsp` and four in Key Vault's `back-compatible.tsp`. They are source-scope excess, not proved Spectral false negatives. Equal-count projects: 463/487; Swagger-higher excess: zero; native-higher excess and total absolute difference: 486. A capture percentage with zero Swagger findings is not meaningful.

Five original synthetic Spectral controls explain the selector defect. Nine target-specific controls and 37 applicable portable harness controls establish native behavior against the unchanged candidate archives. The [full report](../../validation/full/README.md) retains all 487 native receipts and concrete correspondences; the original [pilot](../../validation/five-project/README.md) is unchanged. Swagger was not regenerated or rerun; version projection, default activation and fresh-emission equivalence remain unassessed.

## 3. Function-level coverage

| Behavior                               | Result                                      | Rationale                                                                                                         |
| -------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Require an operation fallback          | Implemented intended policy                 | The TypeSpec rule checks resolved HTTP status `"*"` instead of response-key strings.                              |
| Accept a real default                  | Implemented intended policy                 | Standard ARM errors and custom defaults satisfy presence; payload validation is separate.                         |
| Reproduce response-key false negatives | Intentionally not reproduced                | The Swagger selector passes nonempty status-key strings to `truthy`.                                              |
| Selected real-project correspondence   | Assessed: intentional difference            | Zero observed Swagger versus 161 native findings; every native finding corresponds to a real absent fallback.     |
| Full-population comparison             | Assessed: intentional and scope differences | Zero saved findings versus 486 native: 178 corroborated selector misses plus 308 non-service source declarations. |

## 4. Why diagnostic counts differ

The [pinned Spectral rule](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313) selects `$.paths.*.*.responses.*~`. In the isolated Spectral core `1.18.3` probe, a primitive key is passed directly to `truthy`; `field: "default"` does not inspect the containing response map. Nonempty response keys pass. Empty response maps have no keys to evaluate. The five synthetic cases each emitted zero findings, including the missing-default cases. The full real-project comparison corroborates 178 false negatives in historical executions; it does not rerun Spectral. The additional 308 native declarations are outside emitted service operations and cannot be attributed to this selector defect.

Recommended action: retain the intended fallback-presence policy and raw member counts rather than reproduce selector false negatives. Keep recommended activation disabled while reviewing the broader native source policy for non-service SDK declarations; no scope or independent-reporting implementation change was made during validation.

## NOTES

See the [group report](../../migration.md) for frozen membership, severity/activation, source identities, counting policy, publication and approval gates. The synthetic Spectral probe was run during analysis using `@stoplight/spectral-core@1.18.3` and `@stoplight/spectral-functions@1.7.2`; it was not a real-spec validation run.
