# RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the fallback-presence policy of [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **All 178 historical findings have one-to-one native witnesses across the full 487-project frozen corpus, with zero Swagger-only findings. Native reports 486 findings because its source traversal additionally checks 308 non-service SDK customization/compatibility declarations. Raw counts are not equivalent.**

## 2. Actual coverage

The five-project pilot and full 487-project run were separately approved and assessed with fresh native execution and verified saved production Swagger observations. Counts are individual findings; the full run includes the pilot projects.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Five-project reported diagnostics | 161            | 161             |
| Full-corpus reported diagnostics  | 178            | 486             |

**Full assessed coverage:** Site Recovery contributes 137 matches, Component APIs 23, WebTestsApi seven, Favorites five, AnalyticsItems four, WebTestLocation one and IoT Hub one. All 178 map one-to-one to concrete authored native operations with the same HTTP verb/route and absent fallback. There are zero Swagger-only or ambiguous findings.

The 308 native-only findings across 17 other projects target operations outside the compiler's HTTP service operation set, without saved route/verb counterparts: 304 in `client.tsp` and four in Key Vault's `back-compatible.tsp`. Their source locations and missing responses are corroborated individually. Equal-count projects: 470/487; Swagger-higher excess: zero; native-higher excess and total absolute difference: 308. Capturing all historical findings does not establish raw count or emitted-population equivalence.

The [full report and project inventory](../../validation/full/README.md) retain every native receipt and concrete correspondence; the original [five-project reports](../../validation/five-project/README.md) remain unchanged. The source predicate `!node.default` also has direct synthetic outcomes `1, 0, 1, 1, 1` for missing, valid, multiple-without-default, empty and null response-map cases; that earlier probe was not legacy-engine execution. Both real-project stages reuse saved legacy-engine results instead of rerunning Swagger.

## 3. Function-level coverage

| Behavior                                        | Result                      | Rationale                                                                                                                                                        |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require a default, including HEAD operations    | Implemented intended policy | Neither the Swagger check nor the TypeSpec check makes a HEAD exception.                                                                                         |
| Explicit or ranged errors without a default     | Implemented intended policy | An error status does not establish a fallback response.                                                                                                          |
| Accept a truthy default without schema checking | Implemented intended policy | The TypeSpec check likewise does not validate the fallback's payload or error marker. Invalid source values may be compiler-prevented rather than lint findings. |
| Response maps under `x-ms-paths`                | Scope difference            | The Swagger selector visits `$.paths` only; the TypeSpec rule checks concrete operations before emitter placement.                                               |
| Selected real-project correspondence            | Assessed: 161/161 matched   | No unexplained or one-sided findings in five projects; correspondence is not inferred merely from counts.                                                        |
| Full-population correspondence                  | Assessed: all 178 captured  | 178 one-to-one matches, zero Swagger-only findings, 308 additional non-service source declarations retained.                                                     |

## 4. Why diagnostic counts differ

The [pinned legacy implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/RequiredDefaultResponse.ts) reports once for each selected response map with a falsy `default`. TypeSpec reports once per concrete operation lacking a fallback, independently of other enabled ARM response checks. The measured full-run excess is entirely the 308 non-service source declarations, not missing capture of historical findings. Both the Swagger `DeleteResponseCodes` implementation and existing TypeSpec DELETE rule also require a default, so overlapping enabled rules can produce separate findings; target-only validation does not measure that overlap.

Recommended action: preserve the independent implementation and raw correspondence; leave recommended activation disabled while deciding whether non-service customization/compatibility declarations should belong to the rule's source policy. Default activation, selected-version projection and fresh emission remain unassessed. [Issue #6042](https://github.com/Azure/typespec-azure/issues/6042) separately tracks cross-rule duplicate reporting.

## NOTES

See the [group report](../../migration.md) for shared membership, severity/activation, exact source identities, counting policy, publication and approval gates. `MissingXmsErrorResponse` and error-schema validity are separate responsibilities.
