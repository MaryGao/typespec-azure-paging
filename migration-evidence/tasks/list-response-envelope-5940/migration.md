# Collection response and paging migration

## 1. Conclusion and scope

The TypeSpec `list-response-envelope` rule combines
[GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-collection-only-has-value-and-next-link.md)
and [XmsPageableForListCalls](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/xms-pageable-for-list-calls.md).
The agreed collection scope is the union of `@list` operations and collection-shaped
GET paths, including `/operations`. This deliberately extends Swagger's response
selector; Swagger also permits `nextLinkName: null`, whereas the TypeSpec rule
requires continuation metadata. Real-project equivalence remains unassessed.

## 2. Actual coverage

| Count | Swagger linter | TypeSpec linter |
| --- | --- | --- |
| Real-project diagnostics | Unassessed | Unassessed |

**Assessed coverage:** Source and focused-test analysis support the intended checks;
real-project coverage, comparable counts, and correspondence are unassessed.
Representative validation is deferred until the PR is manually reviewed and
explicitly approved for validation.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Collection identity | Focused tests; real projects unassessed | `@list` operations and Swagger-shaped GET paths are both selected; see [predicate tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts). |
| Required list and paging markers | Focused tests; real projects unassessed | Missing `@list`, `@pageItems`, or `@nextLink` are independently reported; see [paging tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts). |
| HTTP 200 response envelope | Focused tests; real projects unassessed | Union members, status ranges including 200, missing bodies, JSON names, array value, inherited properties and indexers are covered by [response tests](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts). |
| Paging-property names | Focused tests; real projects unassessed | TypeSpec property names must match emitted JSON names because AutoRest uses TypeSpec names for `x-ms-pageable`; see [AutoRest emission](https://github.com/Azure/typespec-azure/blob/refactor/paging-collection-api-5940/packages/typespec-autorest/src/openapi.ts). |
| Collection query parameters | Separate rule | `no-query-in-collection` is unchanged and will be handled in a separate task. |

## 4. Why diagnostic counts differ

Unassessed: no representative-project diagnostics have been collected for this
candidate. Broader TypeSpec scope, separate warning messages, and Swagger's
`nextLinkName: null` support may affect comparison; their project impact has not
been measured.

## NOTES

- [Envelope member](members/GetCollectionOnlyHasValueAndNextLink/migration.md)
- [Pageable member](members/XmsPageableForListCalls/migration.md)
- Existing `CollectionObjectPropertiesNaming` value-array coverage is retained.
- Selected shared Swagger baseline `swagger-arm-20261026-2cd3c5dd` at source
  commit `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`, discovered from
  `msyyc/azure-rest-api-specs:evidence/shared-swagger-baseline` commit
  `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`. Its descriptor reports 487
  projects and 649 Swagger files. The archive has not been recovered and no
  Swagger or TypeSpec project validation has been run.
- Focused development checks reported passing: 61 ARM rule tests, 18 ruleset
  tests, both package source builds, changed-file lint, formatting and
  whitespace checks. These are unit/package checks, not real-project coverage.
- The previous `list-operation-missing-pageable` rule ID is retired; existing
  configurations and suppressions must migrate to `list-response-envelope`.
- Candidate development began from Azure/typespec-azure main at
  `ce1ca4c66f918a92113a035d3e7d908aa25d62f5`; the reviewed rule commit is
  `305296dec9d74e5f0f43a0dc50e699c28b245f56`. This commit includes the main
  update that added unrelated Azure HTTP unified YAML examples.
