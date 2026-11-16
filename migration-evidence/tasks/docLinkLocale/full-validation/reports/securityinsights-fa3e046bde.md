# specification\securityinsights\resource-manager\Microsoft.SecurityInsights\SecurityInsights: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\securityinsights\resource-manager\Microsoft.SecurityInsights\SecurityInsights`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty requiredPermissions, models.tsp:10673](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/models.tsp#L10673) | [openapi.json:15752](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/preview/2025-07-01-preview/openapi.json#L15752) `/definitions/ConnectorDefinitionsResourceProvider/properties/requiredPermissions/description`<br>[openapi.json:15742](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/preview/2025-10-01-preview/openapi.json#L15742) `/definitions/ConnectorDefinitionsResourceProvider/properties/requiredPermissions/description`<br>[openapi.json:8885](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/stable/2025-09-01/openapi.json#L8885) `/definitions/ConnectorDefinitionsResourceProvider/properties/requiredPermissions/description`<br>and 16 more |
| [Model ResourceProviderRequiredPermissions, models.tsp:10680](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/models.tsp#L10680) | [dataConnectorDefinitions.json:686](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/preview/2023-07-01-preview/dataConnectorDefinitions.json#L686) `/definitions/ResourceProviderRequiredPermissions/description`<br>[dataConnectorDefinitions.json:686](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/preview/2023-08-01-preview/dataConnectorDefinitions.json#L686) `/definitions/ResourceProviderRequiredPermissions/description`<br>[dataConnectorDefinitions.json:686](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights/preview/2023-09-01-preview/dataConnectorDefinitions.json#L686) `/definitions/ResourceProviderRequiredPermissions/description`<br>and 16 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
