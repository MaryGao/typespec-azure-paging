# XmsPageableForListCalls

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule incorporates the paging-metadata
intent of [XmsPageableForListCalls](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts).
The TypeSpec rule requires list and continuation markers; Swagger accepts
`x-ms-pageable` with `nextLinkName: null`, so the policies are not equivalent.

## 2. Actual coverage

All 489 selected ARM projects were assessed. Diagnostics are individual
findings, not projects.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics, raw | 463 | Unassessed separately |

**Assessed coverage:** The 463 Swagger findings represent 278 distinct
project/rule/JSON paths. Of these, 277 match an operation-level TypeSpec
missing-list or paging-metadata category on the same operation; one is a
referenced sibling-document finding with a TypeSpec warning in PricingsAPI.
The combined TypeSpec rule has no separately attributable raw total for this
member, and category matching does not prove complete predicate equivalence.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Missing list marker on collection GET | Observed coverage | The [paging tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts#L32) exercise independent missing-marker and response diagnostics. |
| Missing continuation metadata | Covered; policy differs | TypeSpec requires `@nextLink` rather than accepting Swagger's null form; see the [paging tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts#L135). |
| Compliant paging metadata | Covered by focused tests | [Inherited and standard ARM responses](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts#L194) are accepted. |

## 4. Why diagnostic counts differ

The two formats use different metadata, scope, and diagnostic units. The one
unmatched project path comes from a referenced sibling document; see the
[individual finding and corresponding TypeSpec warning](../../full-corpus/swagger-only-analysis.md#referenced-swagger-document-not-an-additional-typespec-miss).
Repeated Swagger inputs also affect raw totals.

## NOTES

The [group report](../../migration.md) records the shared population, raw
TypeSpec total, revisions, and limitations. The TypeSpec implementation is
[pinned to the assessed candidate](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts).
