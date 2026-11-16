# specification\containerservice\resource-manager\Microsoft.ContainerService\aks: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\containerservice\resource-manager\Microsoft.ContainerService\aks`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [UnionVariant none, CommonModels.tsp:821](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/CommonModels.tsp#L821) | [managedClusters.json:12715](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-10-02-preview/managedClusters.json#L12715) `/definitions/NetworkPlugin/x-ms-enum/values/2/description`<br>[managedClusters.json:13075](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2026-01-02-preview/managedClusters.json#L13075) `/definitions/NetworkPlugin/x-ms-enum/values/2/description`<br>[managedClusters.json:13173](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2026-02-02-preview/managedClusters.json#L13173) `/definitions/NetworkPlugin/x-ms-enum/values/2/description`<br>and 47 more |
| [ModelProperty keyId, CommonModels.tsp:3647](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/CommonModels.tsp#L3647) | [managedClusters.json:8445](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2026-07-02-preview/managedClusters.json#L8445) `/definitions/AzureKeyVaultKms/properties/keyId/description`<br>[managedClusters.json:9186](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2026-08-02-preview/managedClusters.json#L9186) `/definitions/AzureKeyVaultKms/properties/keyId/description`<br>[managedClusters.json:9194](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2026-09-02-preview/managedClusters.json#L9194) `/definitions/AzureKeyVaultKms/properties/keyId/description`<br>and 10 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
