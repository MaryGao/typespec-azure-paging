# specification\marketplacecatalog\data-plane\Products: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\marketplacecatalog\data-plane\Products`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **3**; warnings with at least one exact Swagger description: **3**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty market, models.tsp:910](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/models.tsp#L910) | [openapi.json:2183](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/stable/2025-05-01/openapi.json#L2183) `/parameters/SingleMarketParameter/description` |
| [ModelProperty market, models.tsp:917](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/models.tsp#L917) | [openapi.json:2087](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/stable/2025-05-01/openapi.json#L2087) `/parameters/ListingMarketParameter/description` |
| [ModelProperty market, models.tsp:924](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/models.tsp#L924) | [openapi.json:2095](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/marketplacecatalog/data-plane/Products/stable/2025-05-01/openapi.json#L2095) `/parameters/ListingSkusMarketParameter/description` |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
