# specification/network/resource-manager/Microsoft.Network/Network/Network: DefaultInEnum

## Scope

Saved API version: `2026-03-01`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 19 / 10 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `firewall.json` | `["definitions","FirewallPacketCaptureParameters","properties","operation"]` | `["Start","Status","Stop"]` | `"Start"` | Compliant |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","connectedGroupPrivateEndpointsScale"]` | `["Standard","HighScale"]` | `"Standard"` | Compliant |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","connectedGroupAddressOverlap"]` | `["Allowed","Disallowed"]` | `"Allowed"` | Compliant |
| `networkManager.json` | `["definitions","ConnectivityConfigurationPropertiesConnectivityCapabilities","properties","peeringEnforcement"]` | `["Unenforced","Enforced"]` | `"Unenforced"` | Compliant |
| `networkManager.json` | `["definitions","NetworkManagerRoutingConfigurationPropertiesFormat","properties","routeTableUsageMode"]` | `["ManagedOnly","UseExisting"]` | `"ManagedOnly"` | Compliant |
| `networkWatcher.json` | `["definitions","PacketCaptureFilter","properties","protocol"]` | `["TCP","UDP","Any"]` | `"Any"` | Compliant |
| `virtualNetwork.json` | `["definitions","PrivateEndpointProperties","properties","ipVersionType"]` | `["IPv4","IPv6","DualStack"]` | `"IPv4"` | Compliant |
| `virtualNetwork.json` | `["definitions","Sku","properties","name"]` | `["Basic","Standard","Developer","Premium"]` | `"Standard"` | Compliant |
| `virtualNetwork.json` | `["definitions","SubnetPropertiesFormat","properties","privateEndpointNetworkPolicies"]` | `["Enabled","Disabled","NetworkSecurityGroupEnabled","RouteTableEnabled"]` | `"Disabled"` | Compliant |
| `virtualNetwork.json` | `["definitions","SubnetPropertiesFormat","properties","privateLinkServiceNetworkPolicies"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-354.json) | [Exact worker input](../native-354.input.json) | [Worker log](../native-354.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
