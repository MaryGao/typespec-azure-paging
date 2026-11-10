# Native TypeSpec coverage analysis

Validators: `MissingDefaultResponse`, `RequiredDefaultResponse`
Native rules: `@azure-tools/typespec-azure-resource-manager/missing-default-response`
Scope: `source`; partial: false.

**This is observed coverage, not an automatic equivalence decision.**
Primary counting unit: sum of raw member validator occurrences versus aligned native diagnostics, counted once.
Member-native attribution is unavailable. Test every member's semantics, including members with no observations.
Cross-validator overlap is not normalized. Equal source locations do not establish one actionable grouped violation.
JSON paths and source locations are different identity domains. One-sided projects and outliers require investigation.
Source diagnostics include all declared versions; Swagger uses the latest emitted API version.

| Measure | Value |
| --- | ---: |
| Selected / assessable projects | 487 / 487 |
| Unassessed projects | 0 |
| Validator / native / overlap projects | 7 / 24 / 7 |
| Observed validator-project coverage | 100 |
| Validator raw / file-independent paths | 178 / 178 |
| Native raw / aligned / source targets | 486 / 486 / 486 |
| Native findings under project defaults | not assessed |
| Validator excess / native excess | 0 / 308 |
| Raw validator excess / raw native excess (primary) | 0 / 308 |

## Member observations (not member-native coverage)

- MissingDefaultResponse: 0 raw observations; completeness not determined.
- RequiredDefaultResponse: 178 raw observations; completeness not determined.

## One-sided projects

- Native only: `specification/apimanagement/resource-manager/Microsoft.ApiManagement/ApiManagement`
- Native only: `specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices`
- Native only: `specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB`
- Native only: `specification/cost-management/resource-manager/Microsoft.CostManagement/CostManagement`
- Native only: `specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge`
- Native only: `specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/DeviceProvisioningServices`
- Native only: `specification/frontdoor/resource-manager/Microsoft.Network/FrontDoor`
- Native only: `specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault`
- Native only: `specification/newrelic/resource-manager/NewRelic.Observability/NewRelicObservability`
- Native only: `specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform`
- Native only: `specification/quota/resource-manager/Microsoft.Quota/Quota`
- Native only: `specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup`
- Native only: `specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/ResourceConnector`
- Native only: `specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker`
- Native only: `specification/signalr/resource-manager/Microsoft.SignalRService/SignalRService`
- Native only: `specification/web/resource-manager/Microsoft.Web/AppService`
- Native only: `specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService`

## Unassessed projects


## Diagnostic outliers

| Project | Validator raw | Native aligned | Raw difference | Validator paths | Native targets | Location difference |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| specification/web/resource-manager/Microsoft.Web/AppService | 0 | 106 | -106 | 0 | 106 | -106 |
| specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/DataBoxEdge | 0 | 71 | -71 | 0 | 71 | -71 |
| specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup | 0 | 56 | -56 | 0 | 56 | -56 |
| specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB | 0 | 12 | -12 | 0 | 12 | -12 |
| specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker | 0 | 12 | -12 | 0 | 12 | -12 |
| specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/DeviceProvisioningServices | 0 | 10 | -10 | 0 | 10 | -10 |
| specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService | 0 | 9 | -9 | 0 | 9 | -9 |
| specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform | 0 | 7 | -7 | 0 | 7 | -7 |
| specification/signalr/resource-manager/Microsoft.SignalRService/SignalRService | 0 | 6 | -6 | 0 | 6 | -6 |
| specification/quota/resource-manager/Microsoft.Quota/Quota | 0 | 5 | -5 | 0 | 5 | -5 |
| specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices | 0 | 4 | -4 | 0 | 4 | -4 |
| specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault | 0 | 4 | -4 | 0 | 4 | -4 |
| specification/cost-management/resource-manager/Microsoft.CostManagement/CostManagement | 0 | 2 | -2 | 0 | 2 | -2 |
| specification/apimanagement/resource-manager/Microsoft.ApiManagement/ApiManagement | 0 | 1 | -1 | 0 | 1 | -1 |
| specification/frontdoor/resource-manager/Microsoft.Network/FrontDoor | 0 | 1 | -1 | 0 | 1 | -1 |
| specification/newrelic/resource-manager/NewRelic.Observability/NewRelicObservability | 0 | 1 | -1 | 0 | 1 | -1 |
| specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/ResourceConnector | 0 | 1 | -1 | 0 | 1 | -1 |
