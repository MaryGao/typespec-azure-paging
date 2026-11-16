# specification\operationalinsights\resource-manager\Microsoft.OperationalInsights\OperationalInsights: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\operationalinsights\resource-manager\Microsoft.OperationalInsights\OperationalInsights`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty functionParameters, models.tsp:1904](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/models.tsp#L1904) | [SavedSearches.json:243](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/preview/2020-03-01-preview/SavedSearches.json#L243) `/definitions/SavedSearchProperties/properties/functionParameters/description`<br>[SavedSearches.json:243](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2020-08-01/SavedSearches.json#L243) `/definitions/SavedSearchProperties/properties/functionParameters/description`<br>[SavedSearches.json:243](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2023-09-01/SavedSearches.json#L243) `/definitions/SavedSearchProperties/properties/functionParameters/description`<br>and 3 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
