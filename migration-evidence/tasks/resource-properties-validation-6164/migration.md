# Resource properties validation migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md) and [`AzureResourceTagsSchema`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/azure-resource-tags-schema.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All **56 approved services** were assessed: 57 default-tag checked-in Swagger files and 56 unprojected TypeSpec projects. No project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** All 74 Swagger diagnostics are from the required-properties rule; none are from the tags rule. The TypeSpec linter reported none. **60 Swagger findings are false positives**: 50 collection responses and 10 operation/status responses. The other 14 require review. The populations are not version-aligned. Source suppressions were retained; Swagger counts are emitted diagnostics with README configuration, not a proven suppression-inclusive total. A synthetic control also found a nullable-tag-value difference. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ) and the [complete inventory](evidence-details.md).

## 3. Why diagnostic counts differ

| Difference (with evidence) | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis |
| --- | ---: | ---: | --- |
| [Collection-response envelopes](collection-findings.md) | 50 | 0 observed in the projects | Swagger false positives for resource-envelope identity checks: these models are collection responses, not individual ARM resources. |
| [Operation/status responses](operation-status-findings.md) | 10 | 0 observed in the projects | Swagger false positives: these are operation, command or ownership-status results, not individual ARM resources. |
| [Resource Health `availabilityStatus`](evidence-details.md#interpreted-examples-and-outstanding-cases) | 1 | 0 observed in the project | Its resource-shaped TypeSpec model extends a local `ProxyResource`, while the TypeSpec linter checks registered ARM resources. The endpoint is described as non-resource; whether it belongs in the rule's policy remains unresolved. |
| [Other Swagger responses](evidence-details.md#swagger-diagnostic-inventory) | 13 | 0 observed in the projects | Examples include quota, analytics and settings responses. Individual classification and version alignment remain incomplete. |

**Raw-count reconciliation:** 74 − 0 = 50 + 10 + 1 + 13. TypeSpec zeros are project-level observations, not proof of case-by-case equivalence.

A separate [synthetic control](evidence-details.md#nullable-string-values-control) shows that Swagger accepts nullable string **values** in a tags record, while TypeSpec reports them. This is not a real-service diagnostic in the table; deciding whether to align that behavior remains open.

## 4. Swagger false-positive model links

These are the Swagger definitions for all 60 findings classified as false positives: 50 collection-response models and 10 operation/status-response models.

| Collection-response model | Swagger definition |
| --- | --- |
| Attestation `OperationList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/attestation/resource-manager/Microsoft.Attestation/Attestation/stable/2021-06-01/attestation.json#L1078) |
| Batch `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/batch/resource-manager/Microsoft.Batch/Batch/stable/2026-10-01/openapi.json#L5512) |
| Batch `SupportedSkusResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/batch/resource-manager/Microsoft.Batch/Batch/stable/2026-10-01/openapi.json#L6975) |
| Batch `OutboundEnvironmentEndpointCollection` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/batch/resource-manager/Microsoft.Batch/Batch/stable/2026-10-01/openapi.json#L5561) |
| Bot Service `OperationEntityListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/botservice/resource-manager/Microsoft.BotService/BotService/preview/2023-09-15-preview/botservice.json#L3631) |
| CDN `OperationsListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/cdn/resource-manager/Microsoft.Cdn/Cdn/stable/2026-10-01/openapi.json#L14025) |
| Certificate Registration `CsmOperationCollection` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/openapi.json#L1825) |
| Container Registry `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2026-11-01/containerregistry.json#L5290) |
| Container Registry `RegistryUsageListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2026-11-01/containerregistry.json#L6115) |
| AKS `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L10129) |
| AKS `KubernetesVersionListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L6516) |
| AKS `TrustedAccessRoleListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L11319) |
| AKS `OutboundEnvironmentEndpointCollection` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L10215) |
| AKS `PrivateLinkResourcesListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L10438) |
| Data Box `OperationList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/databox/resource-manager/Microsoft.DataBox/DataBox/stable/2025-07-01/databox.json#L4439) |
| Databricks `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/databricks/resource-manager/Microsoft.Databricks/Databricks/stable/2026-01-01/openapi.json#L2261) |
| Domain Registration `CsmOperationCollection` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/openapi.json#L1162) |
| Event Hubs `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/stable/2026-01-01/openapi.json#L6188) |
| Event Hubs `AvailableClustersList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/stable/2026-01-01/openapi.json#L4512) |
| Event Hubs `EHNamespaceIdListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/stable/2026-01-01/openapi.json#L4997) |
| Event Hubs `PrivateLinkResourcesListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/stable/2026-01-01/openapi.json#L6367) |
| Fabric `RpSkuEnumerationForNewResourceResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/fabric/resource-manager/Microsoft.Fabric/Fabric/stable/2023-11-01/fabric.json#L1035) |
| Fabric `RpSkuEnumerationForExistingResourceResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/fabric/resource-manager/Microsoft.Fabric/Fabric/stable/2023-11-01/fabric.json#L1014) |
| Health Bot `AvailableOperations` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/healthbot/resource-manager/Microsoft.HealthBot/HealthBot/stable/2025-11-01/healthbot.json#L533) |
| Healthcare APIs `ListOperations` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/HealthcareApis/preview/2025-04-01-preview/healthcare-apis.json#L3958) |
| PostgreSQL `OperationList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/PostgreSql/stable/2026-10-01/openapi.json#L8679) |
| PostgreSQL `CapabilityList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/PostgreSql/stable/2026-10-01/openapi.json#L5799) |
| PostgreSQL `QuotaUsageList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/PostgreSql/stable/2026-10-01/openapi.json#L9013) |
| Recovery Services `ClientDiscoveryResponse` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/stable/2026-11-01/openapi.json#L1691) |
| Recovery Services `ReplicationUsageList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/stable/2026-11-01/openapi.json#L2689) |
| Recovery Services `VaultUsageList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/stable/2026-11-01/openapi.json#L3712) |
| Redis `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/redis/resource-manager/Microsoft.Cache/Redis/stable/2024-11-01/redis.json#L2828) |
| Redis `NotificationListResponse` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/redis/resource-manager/Microsoft.Cache/Redis/stable/2024-11-01/redis.json#L2767) |
| Resource Connector `applianceOperationsList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/ResourceConnector/preview/2025-03-01-preview/appliances.json#L1382) |
| Resource Health `availabilityStatusListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/ResourceHealth/stable/2026-07-01/ResourceHealth.json#L2356) |
| Resource Health `operationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/ResourceHealth/stable/2026-07-01/ResourceHealth.json#L2680) |
| Search `QuotaUsagesListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/search/resource-manager/Microsoft.Search/Search/stable/2026-11-01/search.json#L2820) |
| Serial Console `SerialConsoleOperations` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/serialconsole/resource-manager/Microsoft.SerialConsole/SerialConsole/stable/2024-07-01/openapi.json#L659) |
| Service Bus `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/servicebus/resource-manager/Microsoft.ServiceBus/ServiceBus/stable/2026-01-01/servicebus.json#L5836) |
| Service Bus `PrivateLinkResourcesListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/servicebus/resource-manager/Microsoft.ServiceBus/ServiceBus/stable/2026-01-01/servicebus.json#L6012) |
| SignalR `OperationList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/signalr/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-01-01-preview/signalr.json#L3197) |
| SignalR `SignalRUsageList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/signalr/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-01-01-preview/signalr.json#L4310) |
| SignalR `SkuList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/signalr/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-01-01-preview/signalr.json#L4404) |
| Storage `OperationListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/storage/resource-manager/Microsoft.Storage/Storage/stable/2026-09-01/openapi.json#L15609) |
| Storage `UsageListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/storage/resource-manager/Microsoft.Storage/Storage/stable/2026-09-01/openapi.json#L19327) |
| Storage `StorageSkuListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/storage/resource-manager/Microsoft.Storage/Storage/stable/2026-09-01/openapi.json#L18520) |
| Storage Actions `StorageTaskAssignmentsListResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/storageactions/resource-manager/Microsoft.StorageActions/StorageActions/stable/2026-03-01/storageactions.json#L949) |
| Web PubSub `OperationList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-12-01-preview/webpubsub.json#L3891) |
| Web PubSub `SignalRServiceUsageList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-12-01-preview/webpubsub.json#L4650) |
| Web PubSub `SkuList` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/preview/2025-12-01-preview/webpubsub.json#L4744) |

| Operation/status-response model | Swagger definition |
| --- | --- |
| Bot Service `OperationResultsDescription` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/botservice/resource-manager/Microsoft.BotService/BotService/preview/2023-09-15-preview/botservice.json#L3688) |
| AKS `RunCommandResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L10678) |
| Healthcare APIs `OperationResultsDescription` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/HealthcareApis/preview/2025-04-01-preview/healthcare-apis.json#L4231) |
| Kubernetes extensions `OperationStatusResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensions/stable/2025-03-01/extensions.json#L1039) |
| Flux configurations `OperationStatusResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/fluxconfiguration.json#L1812) |
| Recovery Services `OperationResource` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/stable/2026-11-01/openapi.json#L2308) |
| Redis `OperationStatus` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/redis/resource-manager/Microsoft.Cache/Redis/stable/2024-11-01/redis.json#L2851) |
| Redis Enterprise `OperationStatus` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/redisenterprise/resource-manager/Microsoft.Cache/RedisEnterprise/preview/2026-10-01-preview/redisenterprise.json#L4119) |
| Subscription `SubscriptionCreationResult` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/subscription/resource-manager/Microsoft.Subscription/Subscription/preview/2025-11-01-preview/subscriptions.json#L1336) |
| Subscription `AcceptOwnershipStatusResponse` | [Model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/subscription/resource-manager/Microsoft.Subscription/Subscription/preview/2025-11-01-preview/subscriptions.json#L904) |

## 5. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only resource identity properties | Covered for registered ARM resources | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) cover compliant and invalid identity properties. Swagger's broader response selection and unregistered models remain policy questions. |
| String-valued and nullable tags records | Covered for the tested cases | [Tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L84-L135) cover string tags and a nullable record; the Machine Learning Services warning no longer appears. |
| Nullable individual tag values | Different | The [synthetic control](evidence-details.md#nullable-string-values-control) shows Swagger accepts them but TypeSpec rejects them. |

## NOTES

- **Inputs:** [Specs revision](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba), [TypeSpec revision](https://github.com/Azure/typespec-azure/commit/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9), [scope and execution details](evidence-details.md#revisions-and-limitations).
- **Validation:** The ARM package suite passed 92 files and 1,027 tests at the assessed head. Build/type-check, TypeSpec library lint, changed-file Oxlint and formatting passed. The published evidence does not establish a fresh-checkout replay.
- **Members:** [Required properties](members/RequiredPropertiesMissingInResourceModel/migration.md) and [tags schema](members/AzureResourceTagsSchema/migration.md).
