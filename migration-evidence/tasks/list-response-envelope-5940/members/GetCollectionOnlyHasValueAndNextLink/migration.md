# GetCollectionOnlyHasValueAndNextLink

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule covers the response-envelope intent of
[GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts),
with an intentionally broader collection scope. Real-project equivalence is
unassessed.

## 2. Actual coverage

| Count | Swagger linter | TypeSpec linter |
| --- | --- | --- |
| Real-project diagnostics | Unassessed | Unassessed |

**Assessed coverage:** Existing source and focused tests exercise the envelope
checks; real-project coverage and correspondence have not been assessed.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Collection GET and `@list` scope | Focused tests; real projects unassessed | The TypeSpec rule uses the agreed union of list markers and collection-shaped GET paths. [Scope tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts) cover extension and provider actions, `/operations`, point paths and controls. |
| JSON `value` array and `nextLink` | Focused tests; real projects unassessed | [Response tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts) cover unions, status ranges, bodies, encoded names, decorators and inherited properties. |
| Extra properties and indexers | Focused tests; real projects unassessed | Additional response properties and open-ended indexers have separate diagnostics in the same [response tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts). |

## 4. Why diagnostic counts differ

Unassessed until representative project comparison. The Swagger selector excludes
some paths that the agreed TypeSpec superset includes.

## NOTES

The [group report](../../migration.md) records the approval gates and combined
scope. Swagger implementation and selector are pinned to
`e1b8b207a196cf2fc288593efec22e6e38ab98d5`.
TypeSpec implementation: [list-response-envelope.ts](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts).
