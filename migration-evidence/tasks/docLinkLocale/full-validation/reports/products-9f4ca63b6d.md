# specification\marketplacecatalog\resource-manager\Microsoft.Marketplace\Products: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\marketplacecatalog\resource-manager\Microsoft.Marketplace\Products`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty market, main.tsp:49](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/resource-manager/Microsoft.Marketplace/Products/main.tsp#L49) | [openapi.json:463](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/resource-manager/Microsoft.Marketplace/Products/stable/2025-05-01/openapi.json#L463) `/paths/~1providers~1Microsoft.Marketplace~1products/get/parameters/1/description`<br>[products.json:143](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/preview/2023-01-01-preview/products.json#L143) `/paths/~1products/get/parameters/3/description`<br>[products.json:43](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/preview/2023-05-01-preview/products.json#L43) `/paths/~1products~1{id}/get/parameters/1/description`<br>and 2 more |
| [ModelProperty market, main.tsp:208](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/resource-manager/Microsoft.Marketplace/Products/main.tsp#L208) | [openapi.json:557](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/resource-manager/Microsoft.Marketplace/Products/stable/2025-05-01/openapi.json#L557) `/paths/~1providers~1Microsoft.Marketplace~1products~1{productId}/get/parameters/2/description` |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
