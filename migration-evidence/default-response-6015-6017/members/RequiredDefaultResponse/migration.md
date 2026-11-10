# RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the fallback-presence policy of [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **All 161 selected historical findings match 161 concrete native findings in the approved five-project pilot. Full-corpus equivalence remains unassessed.** Native operation traversal differs from response-map traversal.

## 2. Actual coverage

Five real projects were assessed with fresh native execution and verified saved production Swagger observations. Counts are individual findings.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Five-project reported diagnostics | 161            | 161             |

**Assessed coverage:** Site Recovery has 137 matched findings, Component APIs 23 and IoT Hub 1. Deployments and Storage each have zero findings. All 161 historical findings map one-to-one to a concrete native operation with the same HTTP verb/route and absent fallback; all five counts agree, and Swagger-only/native-only excess and total absolute difference are zero. This is 100% correspondence for selected historical findings, not a full-corpus coverage claim.

The [per-project reports](../../validation/five-project/README.md) retain actual response maps, source links, execution receipts and limitations. The source predicate `!node.default` also has direct synthetic outcomes `1, 0, 1, 1, 1` for missing, valid, multiple-without-default, empty and null response-map cases; that earlier probe was not legacy-engine execution. This pilot reuses saved legacy-engine results instead of rerunning Swagger.

## 3. Function-level coverage

| Behavior                                        | Result                      | Rationale                                                                                                                                                        |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require a default, including HEAD operations    | Implemented intended policy | Neither the Swagger check nor the TypeSpec check makes a HEAD exception.                                                                                         |
| Explicit or ranged errors without a default     | Implemented intended policy | An error status does not establish a fallback response.                                                                                                          |
| Accept a truthy default without schema checking | Implemented intended policy | The TypeSpec check likewise does not validate the fallback's payload or error marker. Invalid source values may be compiler-prevented rather than lint findings. |
| Response maps under `x-ms-paths`                | Scope difference            | The Swagger selector visits `$.paths` only; the TypeSpec rule checks concrete operations before emitter placement.                                               |
| Selected real-project correspondence            | Assessed: 161/161 matched   | No unexplained or one-sided findings in five projects; correspondence is not inferred merely from counts.                                                        |
| Full-population correspondence                  | Unassessed                  | Requires separate user approval.                                                                                                                                 |

## 4. Why diagnostic counts differ

The [pinned legacy implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/RequiredDefaultResponse.ts) reports once for each selected response map with a falsy `default`. TypeSpec reports once per concrete operation lacking a fallback, independently of other enabled ARM response checks. Both the Swagger `DeleteResponseCodes` implementation and existing TypeSpec DELETE rule also require a default, so overlapping enabled rules can produce separate findings. The target-only pilot has no count differences against this member. Source/emitted-operation populations differ in IoT Hub and Storage without producing extra target findings; selected-version projection and default activation remain unassessed.

Recommended action: retain the current rule and the per-operation correspondence, raw member findings, activation, suppressions and source/API-version boundary in the representative reports. Stop for user review before full-spec execution.

## NOTES

See the [group report](../../migration.md) for shared membership, severity/activation, exact source identities, counting policy, publication and approval gates. `MissingXmsErrorResponse` and error-schema validity are separate responsibilities.
