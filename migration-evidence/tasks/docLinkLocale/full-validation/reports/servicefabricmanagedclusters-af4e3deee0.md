# specification\servicefabricmanagedclusters\resource-manager\Microsoft.ServiceFabric\ServiceFabricManagedClusters: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\servicefabricmanagedclusters\resource-manager\Microsoft.ServiceFabric\ServiceFabricManagedClusters`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [Union DiskType, NodeType.tsp:1110](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters/NodeType.tsp#L1110) | [nodetype.json:540](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters/preview/2021-07-01-preview/nodetype.json#L540) `/definitions/DiskType/description`<br>[nodetype.json:540](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters/preview/2021-09-01-privatepreview/nodetype.json#L540) `/definitions/DiskType/description`<br>[nodetype.json:543](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters/preview/2021-11-01-preview/nodetype.json#L543) `/definitions/DiskType/description`<br>and 16 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
