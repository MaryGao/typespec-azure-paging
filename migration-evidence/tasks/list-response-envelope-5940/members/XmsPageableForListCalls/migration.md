# XmsPageableForListCalls

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule incorporates the paging-metadata
intent of [XmsPageableForListCalls](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts).
The TypeSpec rule requires list and continuation markers; Swagger accepts
`x-ms-pageable` with `nextLinkName: null`. Real-project equivalence is unassessed.

## 2. Actual coverage

| Count                    | Swagger linter | TypeSpec linter |
| ------------------------ | -------------- | --------------- |
| Real-project diagnostics | Unassessed     | Unassessed      |

**Assessed coverage:** Existing source and focused tests exercise missing paging
metadata; real-project coverage and correspondence have not been assessed.

## 3. Function-level coverage

| Behavior                              | Result                                  | Rationale                                                                                                                                                                                                                                                                               |
| ------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing list marker on collection GET | Focused tests; real projects unassessed | TypeSpec prioritizes the missing marker ahead of response/paging diagnostics. See [collection-scope tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts). |
| Missing continuation metadata         | Focused tests; real projects unassessed | TypeSpec requires `@nextLink` rather than accepting Swagger's null form. See [paging tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts).                |

## 4. Why diagnostic counts differ

Unassessed until representative project comparison. The two formats have
different metadata representations and diagnostic units.

## NOTES

The [group report](../../migration.md) records the approval gates and combined
scope. Swagger implementation and selector are pinned to
`e1b8b207a196cf2fc288593efec22e6e38ab98d5`.
TypeSpec implementation: [list-response-envelope.ts](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts).
