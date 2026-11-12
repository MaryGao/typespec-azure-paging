# QueryParametersInCollectionGet member migration

## 1. Conclusion and scope

The TypeSpec rule `no-query-in-collection` is not fully equivalent to [`QueryParametersInCollectionGet`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/query-parameters-in-collection-get.md): library-targeted warnings can be suppressed by the compiler. See the [group conclusion](../../migration.md#1-conclusion-and-scope) and [issue #6066](https://github.com/Azure/typespec-azure/issues/6066).

## 2. Actual coverage

The five-project sample matched all 131 Swagger findings to aligned TypeSpec diagnostics. The full operation-level comparison remains unassessed; the [group coverage section](../../migration.md#2-actual-coverage) records the population, raw counts, and failed project.

## 3. Function-level coverage

| Behavior                                                   | Result             | Rationale                                                                                                                                                           |
| ---------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project-defined collection GET queries and list operations | Covered            | See the [focused-test mapping](../../evidence-details.md#fixture-to-test-mapping) and [five-project comparison](../../evidence-details.md#five-project-comparison). |
| Library-defined query parameters                           | Compiler-prevented | The [App Service case](../../evidence-details.md#app-service-library-defined-query-parameters) has Swagger findings without corresponding TypeSpec warnings.        |
| Swagger `x-ms-paths` disambiguation                        | Unassessed         | No corresponding TypeSpec source fixture was verified; see the [fixture mapping](../../evidence-details.md#fixture-to-test-mapping).                                |

## 4. Why diagnostic counts differ

The [group difference table](../../migration.md#4-why-diagnostic-counts-differ) separates the App Service Swagger-only gap from broader TypeSpec-only `@list` findings in Key Vault and Network.

## NOTES

The [group note](../../migration.md) and [evidence details](../../evidence-details.md) contain the source revisions, staging-only method, and validation limitations.
