# CollectionObjectPropertiesNaming

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule checks the array-valued `value`
intent of [CollectionObjectPropertiesNaming](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/collection-object-properties-naming.ts).
The selectors differ: Swagger checks pageable `_List` operations, while
TypeSpec checks `@list` operations. Complete predicate equivalence remains
unassessed.

## 2. Actual coverage

All 489 selected ARM projects were assessed. Diagnostics are individual
findings, not projects.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics, raw | 3 | Unassessed separately |

**Assessed coverage:** All three distinct Swagger project/rule/JSON paths
match a TypeSpec invalid-array diagnostic category on the same operation.
Two paths point to the same TypeSpec source location, so this is not a
one-to-one count of distinct TypeSpec diagnostics. The combined TypeSpec
rule has no separately attributable raw total for this member.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Missing or non-array `value` | Observed coverage | The three findings match TypeSpec invalid-array categories; see the raw findings for [Machine Learning](../../full-corpus/full-warning-details.md#project-304) and [App Service](../../full-corpus/full-warning-details.md#project-483). |
| Different list selectors | Scope differs | Swagger uses an operation-ID pattern and paging extension, while TypeSpec uses `@list`; see the [pinned implementations](../../evidence-details.md#frozen-membership). |
| Compliant array and paging metadata | Covered by focused tests | The [paging tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts#L194) accept compliant inherited responses. |

## 4. Why diagnostic counts differ

The three observed Swagger paths have corresponding TypeSpec categories, but
the selection predicates and diagnostic identities differ. The shared
TypeSpec rule can also report an independent envelope warning for the same
response. No separate TypeSpec member total or coverage percentage is
inferred.

## NOTES

The [group report](../../migration.md) records the shared population, raw
TypeSpec total, revisions, and limitations. The TypeSpec implementation is
[pinned to the assessed candidate](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts).
