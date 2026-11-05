# Network: DefaultInEnum comparison

## Scope

Project: `specification/network/resource-manager/Microsoft.Network/Network/Network`; saved API version `2026-03-01`. There are 133 authored `.tsp` files in the selected project directory, 4,773 retained project inputs, and 19 primary saved Swagger documents. Imported `../Common/main.tsp` is outside that source-file count.

Candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution uses explicit target activation, `target-only` source scope, and retained source suppressions. Swagger results are verified historical production observations.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native worker | Success, exit 0 |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Primary Swagger enum/default sites / static violations | 10 / 0 |
| Attributable diagnostic differences | None observed |

## Detailed cases

All files below are relative to `swagger/stable/2026-03-01/`; paths are under `$.definitions`.

| Swagger file | Schema/property path | Default | Declared enum |
| --- | --- | --- | --- |
| `firewall.json` | `FirewallPacketCaptureParameters.properties.operation` | `"Start"` | Start, Status, Stop |
| `networkManager.json` | `ConnectivityConfigurationPropertiesConnectivityCapabilities.properties.connectedGroupPrivateEndpointsScale` | `"Standard"` | Standard, HighScale |
| `networkManager.json` | `ConnectivityConfigurationPropertiesConnectivityCapabilities.properties.connectedGroupAddressOverlap` | `"Allowed"` | Allowed, Disallowed |
| `networkManager.json` | `ConnectivityConfigurationPropertiesConnectivityCapabilities.properties.peeringEnforcement` | `"Unenforced"` | Unenforced, Enforced |
| `networkManager.json` | `NetworkManagerRoutingConfigurationPropertiesFormat.properties.routeTableUsageMode` | `"ManagedOnly"` | ManagedOnly, UseExisting |
| `networkWatcher.json` | `PacketCaptureFilter.properties.protocol` | `"Any"` | TCP, UDP, Any |
| `virtualNetwork.json` | `PrivateEndpointProperties.properties.ipVersionType` | `"IPv4"` | IPv4, IPv6, DualStack |
| `virtualNetwork.json` | `Sku.properties.name` | `"Standard"` | Basic, Standard, Developer, Premium |
| `virtualNetwork.json` | `SubnetPropertiesFormat.properties.privateEndpointNetworkPolicies` | `"Disabled"` | Enabled, Disabled, NetworkSecurityGroupEnabled, RouteTableEnabled |
| `virtualNetwork.json` | `SubnetPropertiesFormat.properties.privateLinkServiceNetworkPolicies` | `"Enabled"` | Enabled, Disabled |

All ten saved defaults are declared values. The remaining 15 primary documents have no enum/default sites. These static results are not fresh Spectral findings.

### Authored source corroboration

The selected project's `models.tsp` contains the following named-member defaults:

| Line | Property | Default |
| ---: | --- | --- |
| 10449 | `operation` | `AzureFirewallPacketCaptureOperationType.Start` |
| 10739 | `name` | `BastionHostSkuName.Standard` |
| 15713 | `connectedGroupPrivateEndpointsScale` | `ConnectedGroupPrivateEndpointsScale.Standard` |
| 15718 | `connectedGroupAddressOverlap` | `ConnectedGroupAddressOverlap.Allowed` |
| 15723 | `peeringEnforcement` | `PeeringEnforcement.Unenforced` |
| 16211 | `routeTableUsageMode` | `RouteTableUsageMode.ManagedOnly` |
| 18734 | `protocol` | `PcProtocol.Any` |

The three initially unmatched properties are in the imported sibling `Network/Common/main.tsp`: `privateEndpointNetworkPolicies` at line 1234 defaults to `.Disabled`; `privateLinkServiceNetworkPolicies` at line 1239 defaults to `.Enabled`; `ipVersionType` at line 2935 defaults to `.IPv4`. `models.tsp:6` imports that common file.

These declarations corroborate compliant source defaults, not a proven one-to-one API-version/schema mapping. The shared properties are outside the selected root's source filter and retained-root hash inventory. Raw native findings are also zero, so this filtering did not discard an observed target diagnostic. The common-file corroboration is separately pinned and hash-checked in [dependency evidence](evidence/network/source-dependency-evidence.json).

## Historical execution and evidence

All 38 selected raw/stderr log files were hash-checked. Each of the 19 JSONL logs selects `DefaultInEnum` at error severity in production, records primary document validation, and reaches successful Spectral return. Their additional dependency-document validation is retained rather than conflated with the 19-document static inventory. No target finding is recorded.

[Worker input](evidence/network/input.json) | [Native receipt](evidence/network/native.json) | [Worker log](evidence/network/worker.log) | [Exact schema paths, values, and hashes](evidence/network/saved-enum-defaults.json) | [Selected-root source hashes](evidence/network/source-files.json) | [Historical log verification and source corroboration](evidence/network/historical-validation.json)

There are no differing target diagnostics to investigate. This project has no observed violating or numeric enum/default site. [Shared runtime, controls, semantic boundaries, and outstanding gates](index.md). No equivalence or release-readiness conclusion follows from matching zeros.
