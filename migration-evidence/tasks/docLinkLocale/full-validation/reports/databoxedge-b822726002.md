# specification\databoxedge\resource-manager\Microsoft.DataBoxEdge\DataBoxEdge: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\databoxedge\resource-manager\Microsoft.DataBoxEdge\DataBoxEdge`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [Model CloudEdgeManagementRole, models.tsp:3889](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge/models.tsp#L3889) | [databoxedge.json:4694](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge/preview/2022-04-01-preview/databoxedge.json#L4694) `/definitions/CloudEdgeManagementRole/description`<br>[databoxedge.json:5160](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge/preview/2022-12-01-preview/databoxedge.json#L5160) `/definitions/CloudEdgeManagementRole/description`<br>[databoxedge.json:5165](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge/preview/2023-01-01-preview/databoxedge.json#L5165) `/definitions/CloudEdgeManagementRole/description`<br>and 4 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
