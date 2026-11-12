# XmsPageableMustHaveCorrespondingResponse

## 1. Conclusion and scope

The [Swagger rule](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/XmsPageableMustHaveCorrespondingResponse.ts)
checks that the response schema of an operation with `x-ms-pageable` contains
the property named by `nextLinkName`. It skips falsy names, including `null`,
and reports only when the selected successful response has a resolved schema
without that property.

The TypeSpec rule checks the standard `value`/`nextLink` envelope and list
metadata in its own operation scope. The rules are not equivalent: Swagger
accepts custom continuation-property names and selects a successful response;
TypeSpec checks HTTP 200 envelopes and requires standard names and metadata.

## 2. Actual coverage

| Measure | Result |
| --- | ---: |
| Selected and assessed ARM projects | 489 |
| Emitted Swagger inputs assessed | 651 |
| Swagger findings, raw / distinct paths | 0 / 0 |
| Additional Swagger-only cases | 0 |

No finding means this corpus does not demonstrate TypeSpec coverage of the
fourth rule's violations; it does not establish predicate equivalence. The
combined TypeSpec rule's warnings cannot be assigned uniquely to this member.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Missing named continuation property | No corpus findings | A synthetic positive control with a named but absent property produced one Swagger finding. |
| Null or missing `nextLinkName` | Different policy | Swagger skips it; TypeSpec requires paging metadata for `@list` operations. |
| Other successful statuses, custom names, and non-list operations | Equivalence unassessed | The Swagger and TypeSpec selectors and response checks differ. |

## 4. Why diagnostic counts differ

This member contributes zero to the four-rule totals. The 30 previously
identified Swagger-only distinct paths come from other members; see the
[individual analysis](../../full-corpus/swagger-only-analysis.md).

## NOTES

The isolated rerun used installed `@microsoft.azure/openapi-validator-core`
1.0.7 and `@microsoft.azure/openapi-validator-rulesets` 2.2.6. It ran the
installed native rule on every emitted input from the completed primary
dataset and the successful one-project retry, using local file references and
the same example-file exclusion as the validator plugin. All 651 inputs
completed; the positive control produced one expected finding. Archived
validator logs also record that the rule was loaded and the native plugin
completed for each input.

The installed rule file's SHA-256 is
`bd4f33354228d2cee9a08ec44d59920298548b59e49fe0ba2c870fde81556c31`.
Machine-readable rerun receipts remain in the validation environment. The
other three Swagger results and TypeSpec receipts were reused, not rerun.
The [group report](../../migration.md) records revisions and other limits.
