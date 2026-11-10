# RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the fallback-presence policy of [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **Real-project equivalence remains unassessed.** Native operation traversal differs from response-map traversal.

## 2. Actual coverage

No real projects were executed. Counts are individual findings.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Real-project reported diagnostics | Unassessed     | Unassessed      |

**Assessed coverage:** the source predicate `!node.default` rejects missing or null defaults and accepts a truthy response object. In five synthetic response maps its direct predicate outcomes were `1, 0, 1, 1, 1`; this was not execution of the legacy validator engine. Focused TypeSpec checks are recorded in [development evidence](../../development.md). Production correspondence, comparable totals, and coverage percentages remain unassessed.

## 3. Function-level coverage

| Behavior                                        | Result                      | Rationale                                                                                                                                                        |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require a default, including HEAD operations    | Implemented intended policy | Neither the Swagger check nor the TypeSpec check makes a HEAD exception.                                                                                         |
| Explicit or ranged errors without a default     | Implemented intended policy | An error status does not establish a fallback response.                                                                                                          |
| Accept a truthy default without schema checking | Implemented intended policy | The TypeSpec check likewise does not validate the fallback's payload or error marker. Invalid source values may be compiler-prevented rather than lint findings. |
| Response maps under `x-ms-paths`                | Scope difference            | The Swagger selector visits `$.paths` only; the TypeSpec rule checks concrete operations before emitter placement.                                               |
| Production correspondence                       | Unassessed                  | Real-spec execution is gated by user approval.                                                                                                                   |

## 4. Why diagnostic counts differ

The [pinned legacy implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/RequiredDefaultResponse.ts) reports once for each selected response map with a falsy `default`. TypeSpec reports once per concrete operation lacking a fallback, independently of other enabled ARM response checks. Both the Swagger `DeleteResponseCodes` implementation and existing TypeSpec DELETE rule also require a default, so overlapping enabled rules can produce separate findings. Population and aggregate-count differences remain unmeasured.

Recommended action: retain per-operation correspondence, raw member findings, active rules, suppressions, API-version selection, and compile failures in the approved representative comparison. Do not infer equivalence from matching totals.

## NOTES

See the [group report](../../migration.md) for shared membership, severity/activation, exact source identities, counting policy, publication and approval gates. `MissingXmsErrorResponse` and error-schema validity are separate responsibilities.
