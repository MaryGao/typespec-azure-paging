# Source and validation evidence

## Frozen membership

| Swagger rule                           | Pinned implementation                                                                                                                                                                                    | Pinned documentation                                                                                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GetCollectionOnlyHasValueAndNextLink` | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts) | [Guideline](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-collection-only-has-value-and-next-link.md) |
| `CollectionObjectPropertiesNaming`    | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/collection-object-properties-naming.ts)    | [Guideline](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/collection-object-properties-naming.md)    |
| `XmsPageableForListCalls`              | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts)                 | [Guideline](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/xms-pageable-for-list-calls.md)                 |
| `XmsPageableMustHaveCorrespondingResponse` | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/XmsPageableMustHaveCorrespondingResponse.ts) | [Rule notes](members/XmsPageableMustHaveCorrespondingResponse/migration.md) |

The ARM ruleset selector at
[e1b8b207](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts)
selects GET 200 response properties for the envelope check, excluding raw paths
ending in `}`, `operations`, or `default`. The envelope function checks the
selected direct properties. The pageable check applies a list-path heuristic
and requires a truthy `x-ms-pageable`; the naming check selects pageable
operations whose IDs match its `_List` pattern and checks for an array-valued
`value`. The fourth, native rule selects operations with `x-ms-pageable`, skips
falsy `nextLinkName`, and checks whether the selected successful response's
resolved schema contains the named property.

The TypeSpec population includes project `@list` operations and
collection-shaped GETs, including `/operations`. Unmarked collection GETs
receive a missing-`@list` diagnostic. Response-envelope checks inspect HTTP
200 bodies, including inherited JSON-visible properties; paging metadata is
also checked for `@list` operations. Missing-list, value-array, paging, and
envelope diagnostics can be reported independently, with duplicates suppressed
per target and message within an operation.

## Existing TypeSpec coverage and tests

The candidate extends the existing
[`list-response-envelope` implementation](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts)
and retires `list-operation-missing-pageable`. The existing value-array behavior
for `CollectionObjectPropertiesNaming` remains under the same public rule.

- [`list-response-envelope.test.ts`](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts):
  collection identity, path boundaries, body variants and unions, encoded names,
  paging markers, indexers, inheritance, and status-code ranges.
- [`list-response-envelope-paging.test.ts`](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts):
  independent missing-marker and response diagnostics, paging metadata outside HTTP 200,
  generic/template operations, inherited library operations and targets.
- AutoRest's [paging metadata mapping](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-autorest/src/openapi.ts)
  uses TypeSpec property names for `x-ms-pageable`; the rule therefore requires
  paging-property TypeSpec names to agree with JSON wire names.

The focused ARM rule tests, ARM source build, changed-file lint, formatting,
and whitespace checks passed during development.

## Full-corpus comparison

All 489 selected ARM projects were assessed at specs revision
`939d1a81ec5159e61394cd8ca2589c2c0ce49ccd` against candidate
`db524dc7b54d3488377b24e8d489a7b739ba6dd4`. Swagger recorded 904 raw
findings; TypeSpec recorded 616 raw warnings, of which 608 were
HTTP-aligned. Swagger results were grouped by project/rule/JSON path for the
operation-level analysis. The two sides' raw and grouped units differ.

The fourth rule was rerun separately using the installed
`@microsoft.azure/openapi-validator-core` 1.0.7 and
`@microsoft.azure/openapi-validator-rulesets` 2.2.6, against all 651 emitted
Swagger inputs including the retry. It produced zero findings; a synthetic
missing-property positive control produced one. The archived validator logs
also record that this rule was loaded and the native plugin completed for each
input. The other three Swagger results and the TypeSpec receipts were reused.
See the [fourth-rule member note](members/XmsPageableMustHaveCorrespondingResponse/migration.md).

The full run used the latest emitted API version per project. TypeSpec was
target-only; project-default activation was not assessed. It reused 169
verified prepass results, and one failed primary project succeeded on retry.
The subsequent Swagger-only analysis reused the completed Swagger results.
The compiled TypeSpec rule's SHA-256 was
`0561fdb5b04b7867353679093a40579fdd8e167252a75cddc2253762335a392a`.

See the [full project comparison](full-corpus/full-validation.md), [raw
warnings](full-corpus/full-warning-details.md), and [Swagger-only
analysis](full-corpus/swagger-only-analysis.md). The group report records the
observed differences and remaining limitations.
