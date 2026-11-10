# Native TypeSpec coverage analysis

Validators: `MissingXmsErrorResponse`
Native rules: `@azure-tools/typespec-azure-resource-manager/missing-error-decorator`
Scope: `source`; partial: false.

**This is observed coverage, not an automatic equivalence decision.**
Primary counting unit: sum of raw member validator occurrences versus aligned native diagnostics, counted once.
Member-native attribution is unavailable. Test every member's semantics, including members with no observations.
Cross-validator overlap is not normalized. Equal source locations do not establish one actionable grouped violation.
JSON paths and source locations are different identity domains. One-sided projects and outliers require investigation.
Source diagnostics include all declared versions; Swagger uses the latest emitted API version.

| Measure | Value |
| --- | ---: |
| Selected / assessable projects | 487 / 487 |
| Unassessed projects | 0 |
| Validator / native / overlap projects | 9 / 9 / 9 |
| Observed validator-project coverage | 100 |
| Validator raw / file-independent paths | 20 / 20 |
| Native raw / aligned / source targets | 26 / 26 / 23 |
| Native findings under project defaults | not assessed |
| Validator excess / native excess | 2 / 5 |
| Raw validator excess / raw native excess (primary) | 0 / 6 |

## Member observations (not member-native coverage)

- MissingXmsErrorResponse: 20 raw observations; completeness not determined.

## One-sided projects


## Unassessed projects


## Diagnostic outliers

| Project | Validator raw | Native aligned | Raw difference | Validator paths | Native targets | Location difference |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| specification/search/resource-manager/Microsoft.Search/Search | 3 | 7 | -4 | 3 | 7 | -4 |
| specification/resources/resource-manager/Microsoft.Resources/deploymentStacks | 3 | 4 | -1 | 3 | 1 | 2 |
| specification/solutions/resource-manager/Microsoft.Solutions/Solutions | 4 | 5 | -1 | 4 | 5 | -1 |
