# specification/network/resource-manager/Microsoft.Network/Network/Network: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-03-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 19/10 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `firewall.json` | `["definitions","FirewallPacketCaptureParameters","properties","operation"]` | `["Start","Status","Stop"]` | `"Start"` |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","connectedGroupPrivateEndpointsScale"]` | `["Standard","HighScale"]` | `"Standard"` |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","connectedGroupAddressOverlap"]` | `["Allowed","Disallowed"]` | `"Allowed"` |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","peeringEnforcement"]` | `["Unenforced","Enforced"]` | `"Unenforced"` |
| `networkManager.json` | `["definitions","NetworkManagerRoutingConfigurationPropertiesFormat","properties","routeTableUsageMode"]` | `["ManagedOnly","UseExisting"]` | `"ManagedOnly"` |
| `networkWatcher.json` | `["definitions","PacketCaptureFilter","properties","protocol"]` | `["TCP","UDP","Any"]` | `"Any"` |
| `virtualNetwork.json` | `["definitions","PrivateEndpointProperties","properties","ipVersionType"]` | `["IPv4","IPv6","DualStack"]` | `"IPv4"` |
| `virtualNetwork.json` | `["definitions","Sku","properties","name"]` | `["Basic","Standard","Developer","Premium"]` | `"Standard"` |
| `virtualNetwork.json` | `["definitions","SubnetPropertiesFormat","properties","privateEndpointNetworkPolicies"]` | `["Enabled","Disabled","NetworkSecurityGroupEnabled","RouteTableEnabled"]` | `"Disabled"` |
| `virtualNetwork.json` | `["definitions","SubnetPropertiesFormat","properties","privateLinkServiceNetworkPolicies"]` | `["Enabled","Disabled"]` | `"Enabled"` |

[Native receipt](../native-354.json) | [Worker input](../native-354.input.json) | [Worker log](../native-354.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
