# specification/networkcloud/resource-manager/Microsoft.NetworkCloud/NetworkCloud: DefaultInEnum

## Scope

Saved API version: `2026-08-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 36 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `networkcloud.json` | `["definitions","AgentOptions","properties","hugepagesSize"]` | `["2M","1G"]` | `"2M"` | Compliant |
| `networkcloud.json` | `["definitions","BareMetalMachineCordonParameters","properties","evacuate"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","BareMetalMachinePowerOffParameters","properties","skipShutdown"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","BareMetalMachineReplaceParameters","properties","safeguardMode"]` | `["All","None"]` | `"All"` | Compliant |
| `networkcloud.json` | `["definitions","BareMetalMachineReplaceParameters","properties","storagePolicy"]` | `["Preserve","DiscardAll"]` | `"DiscardAll"` | Compliant |
| `networkcloud.json` | `["definitions","BgpAdvertisement","properties","advertiseToFabric"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","BgpServiceLoadBalancerConfiguration","properties","fabricPeeringEnabled"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","CloudServicesNetworkProperties","properties","enableDefaultEgressEndpoints"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","CloudServicesNetworkStorageOptions","properties","mode"]` | `["None","Standard"]` | `"Standard"` | Compliant |
| `networkcloud.json` | `["definitions","ClusterContinueUpdateVersionParameters","properties","machineGroupTargetingMode"]` | `["AlphaByRack"]` | `"AlphaByRack"` | Compliant |
| `networkcloud.json` | `["definitions","ClusterScanRuntimeParameters","properties","scanActivity"]` | `["Scan","Skip"]` | `"Scan"` | Compliant |
| `networkcloud.json` | `["definitions","ClusterSecretArchive","properties","useKeyVault"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","IpAddressPool","properties","autoAssign"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","IpAddressPool","properties","onlyUseHostIps"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","L2NetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","L2NetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","L3NetworkAttachmentConfiguration","properties","ipamEnabled"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","L3NetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","hybridAksIpamEnabled"]` | `["True","False"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","ipAllocationType"]` | `["IPV4","IPV6","DualStack"]` | `"DualStack"` | Compliant |
| `networkcloud.json` | `["definitions","OsDisk","properties","createOption"]` | `["Ephemeral","Persistent"]` | `"Ephemeral"` | Compliant |
| `networkcloud.json` | `["definitions","OsDisk","properties","deleteOption"]` | `["Delete"]` | `"Delete"` | Compliant |
| `networkcloud.json` | `["definitions","RuntimeProtectionConfiguration","properties","definitionUpdateMode"]` | `["Automatic","None"]` | `"None"` | Compliant |
| `networkcloud.json` | `["definitions","RuntimeProtectionConfiguration","properties","enforcementLevel"]` | `["Audit","Disabled","OnDemand","Passive","RealTime"]` | `"Disabled"` | Compliant |
| `networkcloud.json` | `["definitions","ServiceLoadBalancerBgpPeer","properties","bfdEnabled"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","ServiceLoadBalancerBgpPeer","properties","bgpMultiHop"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","TrunkedNetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","TrunkedNetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachineAssignRelayParameters","properties","relayType"]` | `["Platform","Public"]` | `"Platform"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachinePowerOffParameters","properties","skipShutdown"]` | `["True","False"]` | `"False"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","bootMethod"]` | `["BIOS","UEFI"]` | `"UEFI"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","isolateEmulatorThread"]` | `["False","True"]` | `"True"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","virtioInterface"]` | `["Modern","Transitional"]` | `"Modern"` | Compliant |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","vmDeviceModel"]` | `["T1","T2","T3"]` | `"T2"` | Compliant |
| `networkcloud.json` | `["definitions","VulnerabilityScanningSettings","properties","containerScan"]` | `["Disabled","Enabled"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-356.json) | [Exact worker input](../native-356.input.json) | [Worker log](../native-356.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
