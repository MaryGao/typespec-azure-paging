# specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/ManagedNetworkFabric: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-07-15`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/29 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `managednetworkfabric.json` | `["definitions","AccessControlListProperties","properties","defaultAction"]` | `["Permit","Deny"]` | `"Permit"` |
| `managednetworkfabric.json` | `["definitions","BfdConfiguration","properties","administrativeState"]` | `["Enabled","Disabled","MAT","RMA"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","BgpConfiguration","properties","v4OverV6BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","BgpConfiguration","properties","v6OverV4BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","BmpConfigurationProperties","properties","exportPolicy"]` | `["Pre-Policy","Post-Policy","All","LocalRib"]` | `"All"` |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkBmpProperties","properties","configurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkPropertiesOptionAProperties","properties","v4OverV6BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkPropertiesOptionAProperties","properties","v6OverV4BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","GlobalAccessControlListActionProperties","properties","enableCount"]` | `["True","False"]` | `"False"` |
| `managednetworkfabric.json` | `["definitions","GlobalNetworkTapRuleActionProperties","properties","enableCount"]` | `["True","False"]` | `"False"` |
| `managednetworkfabric.json` | `["definitions","InternalNetworkProperties","properties","extension"]` | `["NoExtension","NPB"]` | `"NoExtension"` |
| `managednetworkfabric.json` | `["definitions","InternalNetworkProperties","properties","isMonitoringEnabled"]` | `["True","False"]` | `"False"` |
| `managednetworkfabric.json` | `["definitions","L2IsolationDomainProperties","properties","extendedVlan"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","L3IsolationDomainProperties","properties","redistributeConnectedSubnets"]` | `["True","False"]` | `"True"` |
| `managednetworkfabric.json` | `["definitions","L3IsolationDomainProperties","properties","redistributeStaticRoutes"]` | `["True","False"]` | `"False"` |
| `managednetworkfabric.json` | `["definitions","NetworkFabricControllerProperties","properties","isWorkloadManagementNetworkEnabled"]` | `["True","False"]` | `"True"` |
| `managednetworkfabric.json` | `["definitions","NetworkFabricControllerProperties","properties","nfcSku"]` | `["Basic","Standard","HighPerformance"]` | `"Standard"` |
| `managednetworkfabric.json` | `["definitions","NetworkTapProperties","properties","pollingType"]` | `["Pull","Push"]` | `"Pull"` |
| `managednetworkfabric.json` | `["definitions","NetworkTapRuleMatchCondition","properties","encapsulationType"]` | `["None","GTPv1"]` | `"None"` |
| `managednetworkfabric.json` | `["definitions","NetworkToNetworkInterconnectProperties","properties","nniType"]` | `["CE","NPB"]` | `"CE"` |
| `managednetworkfabric.json` | `["definitions","NetworkToNetworkInterconnectProperties","properties","isManagementType"]` | `["True","False"]` | `"True"` |
| `managednetworkfabric.json` | `["definitions","NniBmpProperties","properties","configurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","QosProperties","properties","qosConfigurationState"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `managednetworkfabric.json` | `["definitions","RoutePolicyProperties","properties","defaultAction"]` | `["Permit","Deny"]` | `"Deny"` |
| `managednetworkfabric.json` | `["definitions","RoutePolicyProperties","properties","addressFamilyType"]` | `["IPv4","IPv6"]` | `"IPv4"` |
| `managednetworkfabric.json` | `["definitions","StatementConditionProperties","properties","type"]` | `["Or","And"]` | `"Or"` |
| `managednetworkfabric.json` | `["definitions","StaticRouteConfiguration","properties","extension"]` | `["NoExtension","NPB"]` | `"NoExtension"` |
| `managednetworkfabric.json` | `["definitions","UniqueRouteDistinguisherProperties","properties","uniqueRdConfigurationState"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `managednetworkfabric.json` | `["definitions","UniqueRouteDistinguisherProperties","properties","nniDerivedUniqueRdConfigurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` |

[Native receipt](../native-304.json) | [Worker input](../native-304.input.json) | [Worker log](../native-304.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
