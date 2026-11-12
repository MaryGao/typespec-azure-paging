# Collection response and paging migration

## 1. Conclusion and scope

The TypeSpec linter rule `list-response-envelope` combines the intent of the
Swagger linter rules
[`GetCollectionOnlyHasValueAndNextLink`](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts),
[`CollectionObjectPropertiesNaming`](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/collection-object-properties-naming.ts),
[`XmsPageableForListCalls`](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/xms-pageable-for-list-calls.ts),
and [`XmsPageableMustHaveCorrespondingResponse`](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/XmsPageableMustHaveCorrespondingResponse.ts).

**The rules are not scope- or bug-for-bug equivalent.** TypeSpec also checks
`@list` operations outside the Swagger collection-GET selectors and requires
continuation metadata where Swagger accepts `nextLinkName: null`. The Swagger
envelope check overlooks inherited properties, producing 28 apparent false
positives that TypeSpec avoids. Both linters also appear to flag three Compute
status GETs that are not lists. Complete predicate equivalence and default rule
activation remain unassessed.

## 2. Actual coverage

All 489 selected ARM projects were assessed; none remained unassessed.
Reported diagnostics are individual findings, not project counts.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics, raw | 904 | 616 |
| Distinct project/rule/JSON paths | 594 | — |
| HTTP-aligned warnings | — | 608 |

The fourth Swagger rule produced **zero findings** across all 651 emitted
Swagger inputs. It adds no Swagger-only cases to the previous comparison.
Its isolated native-rule rerun and positive control are described in the
[member note](members/XmsPageableMustHaveCorrespondingResponse/migration.md).

**Assessed coverage:** The Swagger findings comprise 594 distinct
project/rule/JSON paths. Of these, 564 have a corresponding TypeSpec
diagnostic category on the same operation; 28 are the inherited-envelope
findings above, and two are attributed to a referenced sibling document whose
TypeSpec warnings occur in the separate PricingsAPI project. The matching
uses operation and diagnostic category, not one-to-one defect identity.
Comparable violation totals and coverage percentages are therefore
unassessed; matching categories do not prove complete predicate equivalence.

TypeSpec has 608 HTTP-aligned warnings. Compared with distinct Swagger paths,
12 projects have higher counts, 474 equal counts, and three lower counts; the
units differ, so these deltas are not counts of unmatched warnings.
See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) and the
[complete project table](full-corpus/full-validation.md#projects).

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Envelope properties | Observed coverage; different inheritance behavior | 284 distinct Swagger envelope findings match a TypeSpec invalid-envelope category on the same operation. The 28 inherited-envelope findings differ; see the [analysis](full-corpus/swagger-only-analysis.md). |
| List and continuation metadata | Observed coverage; scope and policy differ | 277 distinct missing-pageable findings match an operation-level TypeSpec list/paging category. Swagger accepts `nextLinkName: null`; TypeSpec requires continuation metadata. See the [member note](members/XmsPageableForListCalls/migration.md). |
| Pageable response contains named continuation property | No corpus findings; equivalence unproven | The fourth Swagger rule checks a named property in its selected successful response schema. TypeSpec enforces standard envelope and paging metadata for its own operation scope; response selection and custom names differ. See the [member note](members/XmsPageableMustHaveCorrespondingResponse/migration.md). |
| Array-valued `value` | Observed coverage; selectors differ | All three observed naming findings match a TypeSpec invalid-array category on the same operation. Swagger selects pageable `_List` operations; TypeSpec checks `@list` operations. See the [member note](members/CollectionObjectPropertiesNaming/migration.md). |
| Single-page `value`-only response | Both report an envelope finding | Two Compute `ListSinglePage` extension responses lack `nextLink` and are flagged by both envelope checks. This is separate from Swagger accepting `nextLinkName: null` in an existing paging extension. See the [raw findings](full-corpus/warning-details-03.md#project-182). |
| Compliant inherited paging envelope | Covered by focused tests | The [response tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope.test.ts#L261) and [paging tests](https://github.com/Azure/typespec-azure/blob/db524dc7b54d3488377b24e8d489a7b739ba6dd4/packages/typespec-azure-resource-manager/test/rules/list-response-envelope-paging.test.ts#L194) include valid inherited responses and metadata. |

## 4. Why diagnostic counts differ

- **Repeated Swagger inputs:** Network has 340 raw Swagger findings but 32
  distinct project/rule/JSON paths, versus 32 aligned TypeSpec warnings.
  Findings repeat across emitted files; the 32 paths match TypeSpec diagnostic
  categories on their operations. See [Network's raw findings](full-corpus/warning-details-04.md#project-356).
- **Inherited `nextLink`:** DataProtection has 15 and RecoveryServicesBackup
  13 Swagger envelope findings, with no corresponding TypeSpec warning. The
  Swagger check inspects direct properties rather than inherited `allOf`
  properties; the effective schemas contain exactly `value` and `nextLink`.
  This appears to be a Swagger false-positive bug, not a missing TypeSpec
  envelope check. See the [28 individual cases](full-corpus/swagger-only-analysis.md).
- **Referenced document:** BatchPricingsAPI records four raw findings for two
  distinct paths in a sibling `pricings.json`, with no TypeSpec warning in
  BatchPricingsAPI. Both corresponding TypeSpec warning categories occur in
  PricingsAPI. See the [referenced-document analysis](full-corpus/swagger-only-analysis.md#referenced-swagger-document-not-an-additional-typespec-miss).
- **Shared possible false positives:** Both linters report paging/list and
  envelope findings for three Compute `InstanceView` GETs, whose responses are
  status rather than lists. These six findings per side appear to result from
  collection-path classification; review the scope before changing either
  rule. See the [Compute findings](full-corpus/warning-details-03.md#project-182).
- **Broader TypeSpec scope:** PolicyInsights has 18 aligned TypeSpec warnings
  versus one distinct Swagger path; 17 are envelope warnings on `@list` POST
  responses. API Management has 122 versus 112, with ten extra envelope
  warnings on report/action or `operations` paths. AzureArcData and Compute
  BulkActions each have four TypeSpec warnings versus no Swagger findings on
  two `@list` POST responses. See the [investigated differences](full-corpus/full-validation.md#investigated-count-differences).
  These reflect the broader TypeSpec scope; review that policy rather than
  treating the count deltas alone as missing Swagger coverage.
- The other eight projects with higher aligned TypeSpec counts have not all
  been dispositioned finding by finding. Their [raw warnings and project
  counts](full-corpus/full-validation.md#projects) remain available for review;
  no additional unmatched-warning total is inferred.

## NOTES

- The assessed candidate was
  [`db524dc7`](https://github.com/Azure/typespec-azure/tree/db524dc7b54d3488377b24e8d489a7b739ba6dd4)
  and the specs revision was
  [`939d1a81`](https://github.com/Azure/azure-rest-api-specs/tree/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd).
  PR [#6044](https://github.com/Azure/typespec-azure/pull/6044) subsequently
  added only a generated-documentation formatting change at `e1e372fc`; the
  assessed rule source was unchanged.
- Projects were selected by `main.tsp` and an ARM-ruleset configuration.
  Swagger used the latest emitted API version per project. TypeSpec ran
  target-only with HTTP-reachable location alignment; project-default
  activation and other API versions were not assessed. The full run reused
  169 verified TypeSpec prepass results and included one successful retry.
- The [full comparison](full-corpus/full-validation.md), [raw warnings
  line by line](full-corpus/full-warning-details.md), and
  [Swagger-only analysis](full-corpus/swagger-only-analysis.md) retain the
  observations and limitations. Some generated Swagger input files and
  machine-readable receipts remain in the original validation environment
  and are not published in these appendices.
- Member notes:
  [envelope](members/GetCollectionOnlyHasValueAndNextLink/migration.md),
  [value naming](members/CollectionObjectPropertiesNaming/migration.md), and
  [pageability](members/XmsPageableForListCalls/migration.md),
  [corresponding response](members/XmsPageableMustHaveCorrespondingResponse/migration.md).
  [Source and focused-test evidence](evidence-details.md) describes the
  shared implementation and checks.
- This work relates to [issue #5940](https://github.com/Azure/typespec-azure/issues/5940),
  [issue #6037](https://github.com/Azure/typespec-azure/issues/6037),
  and the [collection-API agreement](https://github.com/Azure/typespec-azure/issues/5970#issuecomment-6648847404).
  `list-operation-missing-pageable` is retired in favor of
  `list-response-envelope`; `no-query-in-collection` remains separate.
