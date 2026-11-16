# specification\containerregistry\resource-manager\Microsoft.ContainerRegistry\Registry: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\containerregistry\resource-manager\Microsoft.ContainerRegistry\Registry`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty isDataAction, models.tsp:157](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/models.tsp#L157) | [containerregistry.json:3499](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2021-06-01-preview/containerregistry.json#L3499) `/definitions/OperationDefinition/properties/isDataAction/description`<br>[containerregistry.json:3567](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2021-08-01-preview/containerregistry.json#L3567) `/definitions/OperationDefinition/properties/isDataAction/description`<br>[containerregistry.json:3756](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2021-12-01-preview/containerregistry.json#L3756) `/definitions/OperationDefinition/properties/isDataAction/description`<br>and 18 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
