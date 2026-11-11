# Source and focused-test evidence

## Frozen membership

| Swagger rule | Pinned implementation | Pinned documentation |
| --- | --- | --- |
| `GetCollectionOnlyHasValueAndNextLink` | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts) | [Guideline](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-collection-only-has-value-and-next-link.md) |
| `XmsPageableForListCalls` | [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts) | [Guideline](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/xms-pageable-for-list-calls.md) |

The ARM ruleset selector at
[e1b8b207](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts)
selects GET 200 response properties for the envelope check, excluding raw paths
ending in `}`, `operations`, or `default`. Its function tests the parity of path
segments after the provider namespace. The pageable selector excludes paths
ending in `}` or `/default`; its function applies the same path-parity heuristic
and requires a truthy `x-ms-pageable`.

The approved TypeSpec population is a superset: any `@list` operation, or any
GET with the provider-tail collection path shape. Path-shaped collection GETs
must also have `@list`. The shared scope includes `/operations`. The response
shape and paging metadata are checked independently of HTTP response status.
Diagnostics are prioritized per operation: missing `@list` first, then
paging/envelope defects, then extra properties.
The rule uses four diagnostic message types; paging metadata/name defects share
one message, as do extra properties and open indexers.

## Existing TypeSpec coverage and tests

The candidate extends the existing
[`list-response-envelope` implementation](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/src/rules/list-response-envelope.ts)
and retires `list-operation-missing-pageable`. The existing value-array behavior
for `CollectionObjectPropertiesNaming` remains under the same public rule.

- [`list-response-envelope.test.ts`](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts):
  collection identity, path boundaries, body variants and unions, encoded names,
  paging markers, indexers, inheritance, and status-code ranges.
- [`list-response-envelope-paging.test.ts`](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts):
  prioritized missing-marker diagnostics, paged responses outside HTTP 200,
  generic/template operations, inherited library operations and targets.
- AutoRest's [paging metadata mapping](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-autorest/src/openapi.ts)
  uses TypeSpec property names for `x-ms-pageable`; the rule therefore requires
  paging-property TypeSpec names to agree with JSON wire names.

The focused development run reported 61 ARM rule tests and 18 ruleset tests
passing, both package source builds, changed-file lint, formatting, and
whitespace checks. The final knowledge-summary change was formatting- and
diff-checked. No Swagger or TypeSpec real-project validation has run. The final
source review found and prompted correction of inherited library-operation
coverage and stale rule documentation; subsequent review was clean.

## Known differences and unassessed scope

- Swagger permits `x-ms-pageable.nextLinkName: null`; this TypeSpec rule requires
  `@nextLink`.
- The TypeSpec superset can select operations not selected by the Swagger path
  heuristic.
- No real-project counts, correspondence analysis, false-positive review, or
  five-project validation has been performed. The pinned Swagger baseline is
  selected but not recovered.
- `no-query-in-collection` is intentionally not part of this task and remains
  unchanged.
