# specification\servicefabric\resource-manager\Microsoft.ServiceFabric\ServiceFabric: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\servicefabric\resource-manager\Microsoft.ServiceFabric\ServiceFabric`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **2**; warnings with at least one exact Swagger description: **2**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty instanceCloseDelayDuration, ServiceResource.tsp:430](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/ServiceResource.tsp#L430) | [application.json:2145](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2020-12-01-preview/application.json#L2145) `/definitions/StatelessServiceProperties/properties/instanceCloseDelayDuration/description`<br>[application.json:2167](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2020-12-01-preview/application.json#L2167) `/definitions/StatelessServiceUpdateProperties/properties/instanceCloseDelayDuration/description`<br>[servicefabric.json:4763](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2023-11-01-preview/servicefabric.json#L4763) `/definitions/StatelessServiceProperties/properties/instanceCloseDelayDuration/description`<br>and 4 more |
| [ModelProperty instanceCloseDelayDuration, ServiceResource.tsp:461](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/ServiceResource.tsp#L461) | [application.json:2145](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2020-12-01-preview/application.json#L2145) `/definitions/StatelessServiceProperties/properties/instanceCloseDelayDuration/description`<br>[application.json:2167](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2020-12-01-preview/application.json#L2167) `/definitions/StatelessServiceUpdateProperties/properties/instanceCloseDelayDuration/description`<br>[servicefabric.json:4763](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric/preview/2023-11-01-preview/servicefabric.json#L4763) `/definitions/StatelessServiceProperties/properties/instanceCloseDelayDuration/description`<br>and 4 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
