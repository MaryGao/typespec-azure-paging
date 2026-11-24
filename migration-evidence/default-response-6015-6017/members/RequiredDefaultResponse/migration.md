# RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the fallback-presence policy of [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **The intended policy is covered for historical emitted operations, but raw diagnostics and source populations are not equivalent.** Native additionally checks non-service SDK customization/compatibility declarations; their inclusion remains a rollout decision with recommended activation disabled.

## 2. Actual coverage

All 487 frozen projects were assessed with fresh native execution and verified saved production Swagger observations, without a project filter or limit. No compile/worker failures or unassessed projects occurred in this population. Counts are individual findings, not projects.

| Count                                                                              | Swagger linter | TypeSpec linter |
| ---------------------------------------------------------------------------------- | -------------- | --------------- |
| Full-corpus reported diagnostics                                                   | 178            | 486             |
| Matched saved-wire HTTP operations (project, verb, route and authored declaration) | 178            | 178             |

**Assessed coverage:** all 178 historical findings map one-to-one to concrete authored native operations with the same HTTP verb/route and absent fallback. There are zero Swagger-only or ambiguous findings. The 308 additional native findings are verified non-service source declarations without saved counterparts. The matched-operation row counts the verified common subset, not adjusted raw diagnostics; it does not establish full source-population equivalence. Default activation, selected-version projection and fresh emission remain unassessed.

See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) for the source-only excess and unresolved rollout decision.

The [complete project inventory](../../validation/full/projects.md) includes individual data for all 487 projects, including zero-finding cases; the [full report](../../validation/full/README.md) retains every native receipt and concrete correspondence. The full-corpus comparison reuses saved legacy-engine results instead of rerunning Swagger.

## 3. Function-level coverage

| Behavior                                        | Result                          | Rationale                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require a default, including HEAD operations    | Implemented intended policy     | The [native checks and tests](../../migration.md#3-function-level-coverage) do not make a HEAD exception.                                                                                                                                                                                                     |
| Explicit or ranged errors without a default     | Verified                        | [Rule tests](../../migration.md#3-function-level-coverage) show that an error status does not establish a fallback response.                                                                                                                                                                                  |
| Accept a truthy default without schema checking | Implemented intended policy     | [Compliant tests](../../migration.md#3-function-level-coverage) accept a fallback without payload/error-marker validation. Invalid source values can instead be compiler-prevented.                                                                                                                           |
| Response maps under `x-ms-paths`                | Unassessed emission equivalence | The [legacy selector](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/RequiredDefaultResponse.ts) visits `$.paths` only; native checks concrete operations before emitter placement. Fresh emission was not assessed. |
| Full-population correspondence                  | Assessed: all 178 captured      | The [operation audit](../../validation/full/evidence/full-audit-summary.json) retains 178 one-to-one matches and 308 additional non-service declarations, with zero Swagger-only findings.                                                                                                                    |

## 4. Why diagnostic counts differ

The [pinned legacy implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/RequiredDefaultResponse.ts) reports once for each selected response map with a falsy `default`. TypeSpec reports once per concrete operation lacking a fallback, independently of other enabled ARM response checks. The measured full-run excess is entirely the 308 non-service source declarations, not missing capture of historical findings. Both the Swagger `DeleteResponseCodes` implementation and existing TypeSpec DELETE rule also require a default, so overlapping enabled rules can produce separate findings; target-only validation does not measure that overlap.

Recommended action: preserve the independent implementation and raw correspondence; leave recommended activation disabled while deciding whether non-service customization/compatibility declarations should belong to the rule's source policy. Default activation, selected-version projection and fresh emission remain unassessed. [Issue #6042](https://github.com/Azure/typespec-azure/issues/6042) separately tracks cross-rule duplicate reporting.

The 308 source-only findings across 17 projects are excluded from the compiler's HTTP service operation set, with no saved route/verb counterparts: 304 in `client.tsp` and four in Key Vault's `back-compatible.tsp`. Their individual causes and dispositions are retained in the [full comparison](../../validation/full/README.md#2-requireddefaultresponse) and linked project reports. Equal-count projects: 470/487; Swagger-higher excess: zero; native-higher excess and total absolute difference: 308.

## NOTES

See the [group report](../../migration.md) for shared membership, severity/activation, exact source identities, counting policy, publication and the distinction between the full-corpus candidate and later main refresh. `MissingXmsErrorResponse` and error-schema validity are separate responsibilities.

The source predicate `!node.default` has direct synthetic outcomes `1, 0, 1, 1, 1` for missing, valid, multiple-without-default, empty and null response-map cases. This predicate probe was not legacy-engine execution.
