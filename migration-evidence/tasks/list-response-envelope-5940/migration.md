# Collection response and paging migration

## 1. Scope

The TypeSpec `list-response-envelope` rule combines the intent of these Swagger validators:

- [GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts)
- [CollectionObjectPropertiesNaming](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/collection-object-properties-naming.ts)
- [XmsPageableForListCalls](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts)

The rule selects project `@list` operations and collection-shaped GET paths. Operation paging and HTTP 200 response-envelope findings are reported independently. One envelope diagnostic covers missing or extra properties on a response model. The four message types cover missing `@list`, invalid `value` array, paging metadata/name issues, and invalid envelopes.

The previous `list-operation-missing-pageable` rule ID is retired; existing configurations and suppressions must migrate to `list-response-envelope`. `no-query-in-collection` is separate and unchanged.

## 2. Five-project comparison

Candidate: `db524dc7b54d3488377b24e8d489a7b739ba6dd4`. Specs: `939d1a81ec5159e61394cd8ca2589c2c0ce49ccd`. TypeSpec was assessed in target-only mode with HTTP-reachable alignment; project-default activation was not assessed.

| Project | Swagger findings | TypeSpec warnings |
| --- | ---: | ---: |
| Advisor | 2 | 2 |
| Compute | 22 | 22 |
| Key Vault | 4 | 4 |
| Network | 32 distinct rule paths (340 raw) | 32 |
| Storage | 8 | 8 |

Network's 340 raw findings repeat across 19 emitted Swagger files. They reduce to 19 distinct pageable paths and 13 distinct envelope paths. No project had a higher TypeSpec count in this comparison. Equal counts do not prove finding-by-finding or predicate equivalence. `CollectionObjectPropertiesNaming` had no observations in these projects, which does not establish its semantic coverage.

The existing Swagger datasets were reused. The updated TypeSpec rule was loaded into the same installed runtime using an isolated loader and a session copy of the native worker with a ruleset-alias identification fix. The shared specs checkout and worker were not changed. The compared compiled rule's SHA-256 is `0561fdb5b04b7867353679093a40579fdd8e167252a75cddc2253762335a392a`.

## 3. Remaining differences

TypeSpec checks native paging metadata, inherited properties, JSON names, and open indexers; its `@list` scope includes operations beyond Swagger's collection GET selectors. The rule also requires TypeSpec paging-property names to match emitted JSON names because AutoRest uses TypeSpec names in `x-ms-pageable`. These checks can produce findings beyond Swagger in other projects.

The three Compute `InstanceView` GETs return status rather than lists and appear to be false positives in both validators. Single-page responses without `nextLink` are also reported by the selected Swagger rules and the TypeSpec rule.

## 4. Verification

The focused ARM rule tests, ARM source build, changed-file lint, formatting, and whitespace checks passed. The five-project comparison above is not a full-corpus validation.
