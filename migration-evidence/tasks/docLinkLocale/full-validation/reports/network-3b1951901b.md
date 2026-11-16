# specification\network\resource-manager\Microsoft.Network\Network\Network: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\network\resource-manager\Microsoft.Network\Network\Network`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty communityValue, models.tsp:21140](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/network/resource-manager/Microsoft.Network/Network/Network/models.tsp#L21140) | [serviceCommunity.json:84](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/network/resource-manager/Microsoft.Network/Network/stable/2016-12-01/serviceCommunity.json#L84) `/definitions/BGPCommunity/properties/communityValue/description`<br>[serviceCommunity.json:84](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/network/resource-manager/Microsoft.Network/Network/stable/2017-03-01/serviceCommunity.json#L84) `/definitions/BGPCommunity/properties/communityValue/description`<br>[serviceCommunity.json:84](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/network/resource-manager/Microsoft.Network/Network/stable/2017-06-01/serviceCommunity.json#L84) `/definitions/BGPCommunity/properties/communityValue/description`<br>and 55 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
