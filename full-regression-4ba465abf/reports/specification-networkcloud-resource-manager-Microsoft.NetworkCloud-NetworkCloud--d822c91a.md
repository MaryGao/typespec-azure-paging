# specification/networkcloud/resource-manager/Microsoft.NetworkCloud/NetworkCloud: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-08-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/36 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `networkcloud.json` | `["definitions","AgentOptions","properties","hugepagesSize"]` | `["2M","1G"]` | `"2M"` |
| `networkcloud.json` | `["definitions","BareMetalMachineCordonParameters","properties","evacuate"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","BareMetalMachinePowerOffParameters","properties","skipShutdown"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","BareMetalMachineReplaceParameters","properties","safeguardMode"]` | `["All","None"]` | `"All"` |
| `networkcloud.json` | `["definitions","BareMetalMachineReplaceParameters","properties","storagePolicy"]` | `["Preserve","DiscardAll"]` | `"DiscardAll"` |
| `networkcloud.json` | `["definitions","BgpAdvertisement","properties","advertiseToFabric"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","BgpServiceLoadBalancerConfiguration","properties","fabricPeeringEnabled"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","CloudServicesNetworkProperties","properties","enableDefaultEgressEndpoints"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","CloudServicesNetworkStorageOptions","properties","mode"]` | `["None","Standard"]` | `"Standard"` |
| `networkcloud.json` | `["definitions","ClusterContinueUpdateVersionParameters","properties","machineGroupTargetingMode"]` | `["AlphaByRack"]` | `"AlphaByRack"` |
| `networkcloud.json` | `["definitions","ClusterScanRuntimeParameters","properties","scanActivity"]` | `["Scan","Skip"]` | `"Scan"` |
| `networkcloud.json` | `["definitions","ClusterSecretArchive","properties","useKeyVault"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","IpAddressPool","properties","autoAssign"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","IpAddressPool","properties","onlyUseHostIps"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","L2NetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","L2NetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","L3NetworkAttachmentConfiguration","properties","ipamEnabled"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","L3NetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","hybridAksIpamEnabled"]` | `["True","False"]` | `"True"` |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","L3NetworkProperties","properties","ipAllocationType"]` | `["IPV4","IPV6","DualStack"]` | `"DualStack"` |
| `networkcloud.json` | `["definitions","OsDisk","properties","createOption"]` | `["Ephemeral","Persistent"]` | `"Ephemeral"` |
| `networkcloud.json` | `["definitions","OsDisk","properties","deleteOption"]` | `["Delete"]` | `"Delete"` |
| `networkcloud.json` | `["definitions","RuntimeProtectionConfiguration","properties","definitionUpdateMode"]` | `["Automatic","None"]` | `"None"` |
| `networkcloud.json` | `["definitions","RuntimeProtectionConfiguration","properties","enforcementLevel"]` | `["Audit","Disabled","OnDemand","Passive","RealTime"]` | `"Disabled"` |
| `networkcloud.json` | `["definitions","ServiceLoadBalancerBgpPeer","properties","bfdEnabled"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","ServiceLoadBalancerBgpPeer","properties","bgpMultiHop"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","TrunkedNetworkAttachmentConfiguration","properties","pluginType"]` | `["DPDK","SRIOV","OSDevice","MACVLAN","IPVLAN"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","TrunkedNetworkProperties","properties","hybridAksPluginType"]` | `["DPDK","SRIOV","OSDevice"]` | `"SRIOV"` |
| `networkcloud.json` | `["definitions","VirtualMachineAssignRelayParameters","properties","relayType"]` | `["Platform","Public"]` | `"Platform"` |
| `networkcloud.json` | `["definitions","VirtualMachinePowerOffParameters","properties","skipShutdown"]` | `["True","False"]` | `"False"` |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","bootMethod"]` | `["BIOS","UEFI"]` | `"UEFI"` |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","isolateEmulatorThread"]` | `["False","True"]` | `"True"` |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","virtioInterface"]` | `["Modern","Transitional"]` | `"Modern"` |
| `networkcloud.json` | `["definitions","VirtualMachineProperties","properties","vmDeviceModel"]` | `["T1","T2","T3"]` | `"T2"` |
| `networkcloud.json` | `["definitions","VulnerabilityScanningSettings","properties","containerScan"]` | `["Disabled","Enabled"]` | `"Enabled"` |

[Native receipt](../native-356.json) | [Worker input](../native-356.input.json) | [Worker log](../native-356.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
