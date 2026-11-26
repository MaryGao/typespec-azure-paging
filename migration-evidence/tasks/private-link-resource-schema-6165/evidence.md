# Private link migration evidence

## Diagnostic differences

The grouped-case identity is service plus exact GET path and the response-shape defect described by the diagnostic. Native diagnostics target the TypeSpec operation; Swagger diagnostics target its GET 200 response. There are no one-sided diagnostic cases in the approved real-service population.

### Swagger-only cases

**0 cases, 0 raw diagnostics.** No Swagger diagnostic lacked a corresponding native diagnostic.

### TypeSpec-only cases

**0 cases, 0 raw diagnostics.** No native diagnostic lacked a corresponding Swagger diagnostic.

### Unresolved differing diagnostics

**0 cases, 0 raw diagnostics.** No projects failed or lacked a service counterpart. Version alignment remains a limit on the comparison, not a proven one-sided lint defect.

## Population and limits

The approved list is [56 suitable ARM services](https://github.com/markcowl/azure-rest-api-specs/blob/30a602e9e17f834fb9de6c3f500dbc1a5f2447cb/documentation/typespec-arm-resource-data/Report_20261106/provisioning-validation-services.md#services-suitable-for-validation), pinned to `30a602e9e17f834fb9de6c3f500dbc1a5f2447cb`. Both sides use the same service list; [selection.json](selection.json) records all 56 TypeSpec projects and 57 selected Swagger documents. All 56 native compiles and 57 reused Swagger executions were assessed. This is not an all-spec-repository run.

Candidate: `9fc24d4768a0c7b1a490de863958abe44085881f`; core: `123e997958ced3b632caa0a4486e306d1487ca82`; specs: `1775cd6359369f2e5092d08ada94b4b4c1b8acba`. [validation.json](validation.json) records source and artifact fingerprints, actual imported package versions, and integrity checks. [input-hashes.json](input-hashes.json) records the verified specification inputs; [observations.json](observations.json) records per-service source and document mappings, route ownership, GET 200 schemas/bodies, and target diagnostic excerpts.

TypeSpec explicitly enables only the target rule on unprojected source and retains authored suppressions. Swagger uses selected checked-in stable API documents (preview where no stable exists) and does not apply README suppressions. Native diagnostics are warnings; Swagger diagnostics are errors. The native rule is disabled in the recommended resource-manager ruleset.

Swagger input/reference and output hashes and package entrypoint hashes were verified for every reused execution. Exact AutoRest core and full transitive tool dependency identities were not independently captured; these results are not presented as a complete fresh-checkout replay.

| Service                                    | Selected Swagger API version(s) | Swagger candidate routes | Native candidate routes | Swagger raw diagnostics | Native raw diagnostics |
| ------------------------------------------ | ------------------------------- | -----------------------: | ----------------------: | ----------------------: | ---------------------: |
| apicenter                                  | 2024-03-01                      |                        0 |                       0 |                       0 |                      0 |
| attestation                                | 2021-06-01                      |                        3 |                       3 |                       0 |                      0 |
| batch                                      | 2026-10-01                      |                        3 |                       3 |                       0 |                      0 |
| botservice                                 | 2022-09-15                      |                        3 |                       3 |                       0 |                      0 |
| cdn                                        | 2026-10-01                      |                        0 |                       0 |                       0 |                      0 |
| certificateregistration                    | 2024-11-01                      |                        0 |                       0 |                       0 |                      0 |
| communication                              | 2026-03-18                      |                        0 |                       0 |                       0 |                      0 |
| containerregistry                          | 2026-11-01                      |                        3 |                       3 |                       0 |                      0 |
| containerregistry-tasks                    | 2019-04-01                      |                        0 |                       0 |                       0 |                      0 |
| containerservice                           | 2026-09-01                      |                        3 |                       3 |                       1 |                      1 |
| databox                                    | 2025-07-01                      |                        0 |                       0 |                       0 |                      0 |
| databricks                                 | 2026-01-01                      |                        3 |                       3 |                       0 |                      0 |
| desktopvirtualization                      | 2026-04-16                      |                        6 |                       6 |                       0 |                      0 |
| domainregistration                         | 2024-11-01                      |                        0 |                       0 |                       0 |                      0 |
| durabletask                                | 2026-02-01                      |                        3 |                       3 |                       0 |                      0 |
| enclave                                    | 2026-04-01                      |                        0 |                       0 |                       0 |                      0 |
| eventhubs                                  | 2026-01-01                      |                        3 |                       3 |                       0 |                      0 |
| fabric                                     | 2023-11-01                      |                        0 |                       0 |                       0 |                      0 |
| healthbot                                  | 2025-11-01                      |                        0 |                       0 |                       0 |                      0 |
| healthcareapis                             | 2024-03-31                      |                        6 |                       6 |                       0 |                      0 |
| kubernetes                                 | 2026-05-01                      |                        0 |                       0 |                       0 |                      0 |
| kubernetesconfiguration-extensions         | 2025-03-01                      |                        0 |                       0 |                       0 |                      0 |
| kubernetesconfiguration-extensiontypes     | 2024-11-01-preview              |                        0 |                       0 |                       0 |                      0 |
| kubernetesconfiguration-fluxconfigurations | 2025-04-01                      |                        0 |                       0 |                       0 |                      0 |
| kubernetesconfiguration-privatelinkscopes  | 2024-11-01-preview              |                        3 |                       3 |                       0 |                      0 |
| loadtesting                                | 2022-12-01                      |                        0 |                       0 |                       0 |                      0 |
| machinelearning                            | 2026-09-01                      |                        3 |                       3 |                       0 |                      0 |
| maps                                       | 2023-06-01                      |                        0 |                       3 |                       0 |                      0 |
| monitor                                    | 2025-10-03                      |                        0 |                       0 |                       0 |                      0 |
| mysql                                      | 2024-12-30                      |                        3 |                       3 |                       0 |                      0 |
| postgresql                                 | 2026-10-01                      |                        3 |                       3 |                       0 |                      0 |
| qumulo                                     | 2026-04-16                      |                        0 |                       0 |                       0 |                      0 |
| recoveryservices                           | 2026-11-01                      |                        1 |                       1 |                       0 |                      0 |
| redis                                      | 2024-11-01                      |                        3 |                       3 |                       0 |                      0 |
| redisenterprise                            | 2026-09-01                      |                        3 |                       3 |                       0 |                      0 |
| relationships                              | 2026-08-01                      |                        0 |                       0 |                       0 |                      0 |
| resourceconnector                          | 2022-10-27                      |                        0 |                       0 |                       0 |                      0 |
| resourcehealth                             | 2026-07-01                      |                        0 |                       0 |                       0 |                      0 |
| search                                     | 2026-11-01                      |                        3 |                       3 |                       0 |                      0 |
| secretsstoreextension                      | 2026-09-25-preview              |                        0 |                       0 |                       0 |                      0 |
| selfhelp                                   | 2023-06-01                      |                        0 |                       0 |                       0 |                      0 |
| serialconsole                              | 2024-07-01                      |                        0 |                       0 |                       0 |                      0 |
| servicebus                                 | 2026-01-01                      |                        3 |                       3 |                       0 |                      0 |
| servicefabric                              | 2021-06-01, 2021-06-01          |                        0 |                       0 |                       0 |                      0 |
| servicefabricmanagedclusters               | 2026-02-01                      |                        0 |                       0 |                       0 |                      0 |
| servicegroups                              | 2026-08-01                      |                        0 |                       0 |                       0 |                      0 |
| servicenetworking                          | 2026-03-01                      |                        3 |                       3 |                       0 |                      0 |
| signalr                                    | 2024-03-01                      |                        3 |                       3 |                       0 |                      0 |
| sitemanager                                | 2025-06-01                      |                        0 |                       0 |                       0 |                      0 |
| sphere                                     | 2024-04-01                      |                        0 |                       0 |                       0 |                      0 |
| standbypool                                | 2026-04-01                      |                        0 |                       0 |                       0 |                      0 |
| storage                                    | 2026-09-01                      |                        3 |                       3 |                       0 |                      0 |
| storageactions                             | 2026-03-01                      |                        0 |                       0 |                       0 |                      0 |
| subscription                               | 2021-10-01                      |                        0 |                       0 |                       0 |                      0 |
| verifiedid                                 | 2024-01-26-preview              |                        0 |                       0 |                       0 |                      0 |
| webpubsub                                  | 2024-03-01                      |                        3 |                       3 |                       0 |                      0 |
| **Total**                                  | **57 documents**                |                   **73** |                  **76** |                   **1** |                  **1** |

## Raw-count reconciliation

Swagger-only `0` plus shared `1` equals Swagger raw `1`. TypeSpec-only `0` plus shared `1` equals native raw `1`. Signed difference: `1 - 1 = +0 - 0 + 0 unresolved = 0`. The shared observation below is retained only to explain raw counts, not as a gap case.

### Shared observation

Container Service has the sole diagnostic on each side:

- GET `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources`, Swagger operation `PrivateLinkResources_List`, status `200`, schema `PrivateLinkResourcesListResult`.
- [Swagger diagnostic target](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L3404): The private endpoint model "PrivateLinkResourcesListResult" schema does not conform to the common type definition.
- [TypeSpec operation](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/ManagedCluster.tsp#L625): The private link resource GET response must contain a `value` array with items containing `properties.groupId`, `properties.requiredMembers`, and `properties.requiredZoneNames`.
- [Swagger item definition](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2026-09-01/managedClusters.json#L10402) and [TypeSpec item definition](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/containerservice/resource-manager/Microsoft.ContainerService/aks/CommonModels.tsp#L3434) contain `groupId` and `requiredMembers` directly on the item, but lack the nested `properties` bag and `requiredZoneNames`. The operation is associated with the resolved `ManagedCluster` resource, although the returned `PrivateLinkResource` is a plain model.

This is the same observed schema-shape defect on both sides. No false-positive or service-compatibility classification is needed to reconcile a migration difference; whether the historical API should change is an ARM compatibility decision.

## Route inventory differences

Maps' three unprojected TypeSpec routes are absent from the selected Swagger `2023-06-01` document. None has a rule diagnostic. These are not TypeSpec-only diagnostic cases. The comparison does not prove which API-version change caused this inventory difference and does not classify it under a known version-aware linting issue.

| TypeSpec-only route inventory entry                                                                                                                                             | Source                                                                                                                                                                                                                      | Resolved resource owner   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/privateLinkResources`                                       | [`PrivateLinkResource.tsp:38`](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/maps/resource-manager/Microsoft.Maps/Maps/PrivateLinkResource.tsp#L38)             | PrivateLinkResource       |
| `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}` | [`PrivateEndpointConnection.tsp:25`](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/maps/resource-manager/Microsoft.Maps/Maps/PrivateEndpointConnection.tsp#L25) | PrivateEndpointConnection |
| `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/privateEndpointConnections`                                 | [`PrivateEndpointConnection.tsp:49`](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/maps/resource-manager/Microsoft.Maps/Maps/PrivateEndpointConnection.tsp#L49) | PrivateEndpointConnection |

All 73 selected Swagger paths have exact native counterparts. All 76 native candidate paths, including Maps, belong to resolved resources rather than provider-level operations. No one-sided finding attributable to the native resource-selection boundary was observed.

## Function-level observations

| Path/schema behavior                                             | Swagger observed routes | Native observed routes | Population outcome                                                                   |
| ---------------------------------------------------------------- | ----------------------: | ---------------------: | ------------------------------------------------------------------------------------ |
| Private endpoint connection point GET 200                        |                      24 |                     25 | No diagnostics; the native-only route inventory entry is in Maps.                    |
| Private endpoint connection collection GET 200 and `value` items |                      24 |                     25 | No diagnostics; the native-only route inventory entry is in Maps.                    |
| Private link resource collection GET 200 and `value` items       |                      25 |                     26 | One shared response-shape finding; the native-only route inventory entry is in Maps. |

All selected Swagger routes have a GET 200 schema; native matching operations expose single response payloads and resolved resource ownership. References and inherited native model structures were evaluated by the respective implementations. This does not prove every nullable, visibility, encoded-name, inheritance, method, or status-code interaction in real services.
