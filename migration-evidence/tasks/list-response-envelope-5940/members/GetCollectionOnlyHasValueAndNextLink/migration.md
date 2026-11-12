# GetCollectionOnlyHasValueAndNextLink

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule covers the response-envelope intent of
[GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts),
with broader collection scope and inherited-property handling. It is not
bug-for-bug equivalent: Swagger's direct-property check produces apparent
false positives when `nextLink` is inherited.

## 2. Actual coverage

All 489 selected ARM projects were assessed. Diagnostics are individual
findings, not projects.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics, raw | 438 | Unassessed separately |

**Assessed coverage:** The 438 Swagger findings represent 313 distinct
project/rule/JSON paths. Of these, 284 match a TypeSpec invalid-envelope
category on the same operation, 28 are inherited-envelope findings, and one
is a referenced sibling-document finding. The combined TypeSpec rule does
not provide a separately attributable raw total for this Swagger member.
Category matching is not proof of complete predicate equivalence. See the
[full analysis](../../full-corpus/swagger-only-analysis.md).

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Collection GET and `@list` scope | Covered; broader than Swagger | The TypeSpec rule also selects `@list` operations and `/operations`; see the [scope tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts). |
| Inherited `value` and `nextLink` | Covered; behavior differs | TypeSpec walks inherited properties; the [28 cases](../../full-corpus/swagger-only-analysis.md) show Swagger's direct-property false positives. |
| Single-page `value`-only response | Both report an envelope finding | Two [Compute extension-list responses](../../full-corpus/warning-details-03.md#project-182) lack `nextLink` and are flagged by both envelope checks. |
| Extra properties and indexers | Covered by focused tests | TypeSpec reports an invalid envelope independently of paging defects; see the [response tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts#L321). |

## 4. Why diagnostic counts differ

The 28 Swagger-only findings have an inherited `nextLink` and an effective
two-property envelope. The sibling-document case is reported in the separate
PricingsAPI TypeSpec project. TypeSpec also checks operations outside the
Swagger selector; see the [group differences](../../migration.md#4-why-diagnostic-counts-differ).
Both linters also flag three Compute status GETs that appear not to be lists.

## NOTES

The [group report](../../migration.md) records the shared population, raw
TypeSpec total, revisions, and limitations. The TypeSpec implementation is
[pinned to the assessed candidate](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts).
