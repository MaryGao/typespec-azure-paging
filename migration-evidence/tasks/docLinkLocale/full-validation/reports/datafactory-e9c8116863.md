# specification\datafactory\resource-manager\Microsoft.DataFactory\DataFactory: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\datafactory\resource-manager\Microsoft.DataFactory\DataFactory`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty location, models.tsp:10299](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/models.tsp#L10299) | [IntegrationRuntime.json:86](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/preview/2017-09-01-preview/entityTypes/IntegrationRuntime.json#L86) `/definitions/IntegrationRuntimeComputeProperties/properties/location/description`<br>[openapi.json:19868](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/stable/2018-06-01/openapi.json#L19868) `/definitions/IntegrationRuntimeComputeProperties/properties/location/description` |
| [ModelProperty scriptActions, models.tsp:18065](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/models.tsp#L18065) | [openapi.json:18442](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/stable/2018-06-01/openapi.json#L18442) `/definitions/HDInsightOnDemandLinkedServiceTypeProperties/properties/scriptActions/description` |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
