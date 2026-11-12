# QueryParametersInCollectionGet migration

## 1. Conclusion and scope

The TypeSpec linter [`no-query-in-collection`](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/src/rules/no-query-in-collection.ts) migrates the Swagger linter [`QueryParametersInCollectionGet`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/query-parameters-in-collection-get.md). **It is not fully equivalent:** TypeSpec currently drops diagnostics targeting library-defined query parameters, as tracked in [Azure/typespec-azure#6066](https://github.com/Azure/typespec-azure/issues/6066). TypeSpec also checks `@list` operations beyond Swagger's collection-GET scope. Full finding-by-finding correspondence remains unassessed.

## 2. Actual coverage

The full ARM run discovered 489 projects: 488 compiled and emitted 650 Swagger files, all of which were validated. One project could not be assessed because its temporary TypeSpec configuration was invalid. The table counts individual diagnostic occurrences in the 488 compiled projects, not affected projects.

| Count                                                        | Swagger linter | TypeSpec linter |
| ------------------------------------------------------------ | -------------: | --------------: |
| Reported diagnostics, raw                                    |          2,155 |           2,215 |
| Finding-by-finding correspondence across the full population |     Unassessed |      Unassessed |

Swagger counts are from a focused evaluation of the staging-only rule; TypeSpec counts are raw program diagnostics. Their populations and counting semantics differ, so the totals are not directly comparable.

**Assessed coverage:** In the five-project sample, all 131 Swagger findings matched an HTTP-aligned TypeSpec diagnostic for the same operation and query parameter. There were also three TypeSpec-only diagnostics. The full run found one confirmed Swagger-only App Service case; its overall extent and other unmatched findings remain unassessed. Compute's sample Swagger count came from target-only evaluation because its full AutoRest validation failed.

See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) and the [supporting evidence](evidence-details.md).

## 3. Function-level coverage

| Behavior                                                  | Result             | Rationale                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extra project-defined query parameters on collection GETs | Covered            | [Focused tests](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/test/rules/no-query-in-collection.test.ts#L24-L124) and the [five-project matches](evidence-details.md#five-project-comparison) exercise these findings. |
| `@list` operations outside the collection-GET heuristic   | Covered            | [Tests](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/test/rules/no-query-in-collection.test.ts#L125-L168) cover different paths and a POST list.                                                                      |
| Allowed `api-version` and `$filter`; unrelated operations | Covered            | [Controls](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/test/rules/no-query-in-collection.test.ts) exercise exemptions and non-list point and POST operations.                                                        |
| Diagnostics targeting library-defined query parameters    | Compiler-prevented | The [App Service example](evidence-details.md#app-service-library-defined-query-parameters) demonstrates the missing warning; the existing library-parameter test reflects this current suppression.                                                                                                             |
| Swagger `x-ms-paths` disambiguation                       | Unassessed         | The Swagger fixture has no verified TypeSpec counterpart in this assessment; see the [fixture mapping](evidence-details.md#fixture-to-test-mapping).                                                                                                                                                             |

## 4. Why diagnostic counts differ

The TypeSpec column counts observed `no-query-in-collection` diagnostics attributed to the same operation and parameter sources; it excludes unrelated warnings.

| Difference (with evidence)                                                                                       | Swagger diagnostics | TypeSpec diagnostics for the same check | Recommended action and rationale                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ------------------: | --------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [App Service: library-defined list parameters](evidence-details.md#app-service-library-defined-query-parameters) |                   7 |                                       0 | Compiler-prevented gap; discuss project-site reporting and assess its wider extent in [#6066](https://github.com/Azure/typespec-azure/issues/6066). |
| [Key Vault: `@list` GET outside Swagger's path heuristic](evidence-details.md#five-project-comparison)           |                   0 |                                       1 | Broader TypeSpec coverage; retain the explicit `@list` behavior.                                                                                    |
| [Network: `@list` POST](evidence-details.md#five-project-comparison)                                             |                   0 |                                       2 | Broader TypeSpec coverage; Swagger checks GET operations only.                                                                                      |

## NOTES

The assessed rule source was commit [`35bba1703d4c261d3807a67a3c1cfa6e2c923d12`](https://github.com/MaryGao/typespec-azure-paging/commit/35bba1703d4c261d3807a67a3c1cfa6e2c923d12); the later PR head `1aa8e2db1fa27810eea297944284d6aa353a0eaa` changed only generated documentation indexes. Specs were pinned to [`939d1a81ec5159e61394cd8ca2589c2c0ce49ccd`](https://github.com/Azure/azure-rest-api-specs/tree/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd). Swagger's rule is staging-only, so default-mode zero counts are not evidence. The full screen retained 2,195 HTTP-aligned TypeSpec diagnostics; alignment does not establish full correspondence.

The [member note](members/QueryParametersInCollectionGet/migration.md), [evidence details](evidence-details.md), and [task manifest](task.json) record the comparison method and remaining limits. Implementation: [Azure/typespec-azure#6056](https://github.com/Azure/typespec-azure/pull/6056).
