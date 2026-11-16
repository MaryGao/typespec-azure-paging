# specification\compute\resource-manager\Microsoft.Compute\Compute\Compute: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\compute\resource-manager\Microsoft.Compute\Compute\Compute`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [Union DiskControllerTypes, models.tsp:920](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/Compute/models.tsp#L920) | [ComputeRP.json:15664](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01/ComputeRP.json#L15664) `/definitions/DiskControllerTypes/description`<br>[ComputeRP.json:14686](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-03-01/ComputeRP.json#L14686) `/definitions/DiskControllerTypes/description`<br>[ComputeRP.json:14295](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2025-11-01/ComputeRP.json#L14295) `/definitions/DiskControllerTypes/description`<br>and 12 more |
| [ModelProperty ultraSSDEnabled, models.tsp:8337](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/Compute/models.tsp#L8337) | [dedicatedHost.json:868](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2023-03-01/dedicatedHost.json#L868) `/definitions/DedicatedHostGroupProperties/properties/additionalCapabilities/properties/ultraSSDEnabled/description`<br>[dedicatedHost.json:868](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2023-07-01/dedicatedHost.json#L868) `/definitions/DedicatedHostGroupProperties/properties/additionalCapabilities/properties/ultraSSDEnabled/description`<br>[dedicatedHost.json:930](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2023-09-01/dedicatedHost.json#L930) `/definitions/DedicatedHostGroupProperties/properties/additionalCapabilities/properties/ultraSSDEnabled/description`<br>and 7 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
