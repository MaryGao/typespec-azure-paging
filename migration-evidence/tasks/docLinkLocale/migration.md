# docLinkLocale migration

## 1. Conclusion and scope

The TypeSpec linter rule `@azure-tools/typespec-azure-core/no-localized-doc-links` implements the intended documentation-link policy of Swagger linter rule [docLinkLocale](https://github.com/Azure/azure-openapi-validator/blob/18a7944e7fc3155e8ef1498665465ed5f455f54a/docs/doc-link-locale.md), but is not bug-for-bug equivalent. The Swagger linter passes a description's parent object to a string-only pattern function and misses the localized links; the TypeSpec linter intentionally avoids this defect. The TypeSpec check is limited to case-sensitive `https://docs.microsoft.com/<locale>/azure/` links in declaration and operation-response documentation.

## 2. Actual coverage

The initial assessment covered five projects, three ARM and two data-plane, with no compilation or Swagger execution failures. Counts are individual diagnostics, not project counts.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Raw diagnostics | 0 | 8 |

**Assessed coverage:** All eight TypeSpec warnings have an exact corresponding description, after whitespace normalization, in the selected Swagger documents; Swagger reported none. This confirms the observed difference on these descriptions, not complete equivalence or a coverage percentage. The source programs were not API-version-projected; only one Swagger version per project was checked. Full-repository validation is underway. See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Localized Microsoft documentation link in declaration documentation | Covered by TypeSpec | The candidate reports a warning; the Swagger linter's selector prevents its string matcher from checking the description. |
| Locale-free link or different host/path | Covered by TypeSpec | The rule does not warn outside its intended URL pattern. |
| Localized external-document URL or server description | Outside assessed policy | These are not declaration or operation-response documentation. |

## 4. Why diagnostic counts differ

The eight TypeSpec-only findings comprise two in Compute, three in Cost Management, and three in Marketplace Products. All eight descriptions also occur in the selected Swagger documents. For example, the localized link in [`DiskControllerTypes`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/Compute/models.tsp#L920) appears in [the checked-in Swagger description](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01/ComputeRP.json#L15664), but Swagger produces no finding. One Cost Management description contains two localized URLs but generates one TypeSpec warning.

The Swagger linter's selector supplies a parent object, which its string-only pattern function ignores. A synthetic control also shows that changing only the selector to return the string would not fix the policy: the `match` option would reject a locale-free description rather than report a localized one. API Management's localized `externalDocs.url` fields and Language Question Answering's `@server` description are outside the checked documentation scope, not additional findings.

## NOTES

- The TypeSpec rule is opt-in in the recommended ARM and data-plane presets and was explicitly enabled for the comparison.
- TypeSpec source suppressions were retained; Swagger README suppressions were not applied. The TypeSpec candidate was `aa07faea278fd1d58225687a6b3abaffba8a839b`; the specs revision was `489ca9fba553863941a9e52c73bd0fd390a5d25b`.
- The Azure Core build, 33 focused rule tests, 22 ruleset tests, formatting and lint passed. Positive, negative and suppression controls passed.
- Five individual comparison reports, raw receipts, and versioned Swagger logs are retained locally. A full-repository comparison was subsequently approved and is in progress.
