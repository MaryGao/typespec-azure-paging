# MissingDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` follows the documented [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) guideline. It is intentionally **not bug-for-bug equivalent** to the Swagger linter's key-selector implementation. Real-project coverage remains unassessed.

## 2. Actual coverage

No real projects were executed. Counts are individual findings.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Real-project reported diagnostics | Unassessed     | Unassessed      |

**Assessed coverage:** five isolated synthetic response-map controls produced zero Spectral findings: a missing default, a valid default, multiple responses without a default, an empty response map, and a null default. These establish the selector defect in that scope, not production coverage. TypeSpec controls and limitations are recorded in [development evidence](../../development.md). Comparable production totals and coverage percentages remain unassessed.

## 3. Function-level coverage

| Behavior                               | Result                       | Rationale                                                                                 |
| -------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| Require an operation fallback          | Implemented intended policy  | The TypeSpec rule checks resolved HTTP status `"*"` instead of response-key strings.      |
| Accept a real default                  | Implemented intended policy  | Standard ARM errors and custom defaults satisfy presence; payload validation is separate. |
| Reproduce response-key false negatives | Intentionally not reproduced | The Swagger selector passes nonempty status-key strings to `truthy`.                      |
| Production correspondence              | Unassessed                   | Deferred until the user approves real-spec execution.                                     |

## 4. Why diagnostic counts differ

The [pinned Spectral rule](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313) selects `$.paths.*.*.responses.*~`. In Spectral core `1.18.3`, a primitive key is passed directly to `truthy`; `field: "default"` does not inspect the containing response map. Nonempty response keys pass. Empty response maps have no keys to evaluate. The five synthetic cases each emitted zero findings, including the missing-default cases. Production impact is unassessed.

Recommended action: retain the intended fallback-presence policy, preserve raw Swagger counts in later comparisons, and explain confirmed false negatives rather than tune the TypeSpec rule to match them.

## NOTES

See the [group report](../../migration.md) for frozen membership, severity/activation, source identities, counting policy, publication and approval gates. The synthetic Spectral probe was run during analysis using `@stoplight/spectral-core@1.18.3` and `@stoplight/spectral-functions@1.7.2`; it was not a real-spec validation run.
