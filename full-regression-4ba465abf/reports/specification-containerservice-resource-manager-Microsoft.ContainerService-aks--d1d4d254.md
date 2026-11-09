# specification/containerservice/resource-manager/Microsoft.ContainerService/aks: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-07-02-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/28 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `managedClusters.json` | `["definitions","AdvancedNetworkingPerformance","properties","accelerationMode"]` | `["BpfVeth","None"]` | `"None"` |
| `managedClusters.json` | `["definitions","AgentPoolUpgradeProfileProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `managedClusters.json` | `["definitions","AzureKeyVaultKms","properties","keyVaultNetworkAccess"]` | `["Public","Private"]` | `"Public"` |
| `managedClusters.json` | `["definitions","ContainerServiceNetworkProfile","properties","outboundType"]` | `["loadBalancer","userDefinedRouting","managedNATGateway","userAssignedNATGateway","none"]` | `"loadBalancer"` |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","queryLogging"]` | `["Error","Log"]` | `"Error"` |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","protocol"]` | `["PreferUDP","ForceTCP"]` | `"PreferUDP"` |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","forwardDestination"]` | `["ClusterCoreDNS","VnetDNS"]` | `"ClusterCoreDNS"` |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","forwardPolicy"]` | `["Sequential","RoundRobin","Random"]` | `"Sequential"` |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","serveStale"]` | `["Verify","Immediate","Disable"]` | `"Immediate"` |
| `managedClusters.json` | `["definitions","LocalDNSProfile","properties","mode"]` | `["Preferred","Required","Disabled"]` | `"Preferred"` |
| `managedClusters.json` | `["definitions","MachineOSProfile","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `managedClusters.json` | `["definitions","MachineProperties","properties","priority"]` | `["Spot","Regular"]` | `"Regular"` |
| `managedClusters.json` | `["definitions","MachineProperties","properties","evictionPolicy"]` | `["Delete","Deallocate"]` | `"Delete"` |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","scaleSetPriority"]` | `["Spot","Regular"]` | `"Regular"` |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","scaleSetEvictionPolicy"]` | `["Delete","Deallocate"]` | `"Delete"` |
| `managedClusters.json` | `["definitions","ManagedClusterBootstrapProfile","properties","artifactSource"]` | `["Cache","Direct"]` | `"Direct"` |
| `managedClusters.json` | `["definitions","ManagedClusterLoadBalancerProfile","properties","backendPoolType"]` | `["NodeIPConfiguration","NodeIP","PodIP"]` | `"NodeIPConfiguration"` |
| `managedClusters.json` | `["definitions","ManagedClusterLoadBalancerProfile","properties","clusterServiceLoadBalancerHealthProbeMode"]` | `["ServiceNodePort","Shared"]` | `"ServiceNodePort"` |
| `managedClusters.json` | `["definitions","ManagedClusterNodeProvisioningProfile","properties","defaultNodePools"]` | `["None","Auto"]` | `"Auto"` |
| `managedClusters.json` | `["definitions","ManagedClusterPoolUpgradeProfile","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `managedClusters.json` | `["definitions","ManagedClusterSnapshotProperties","properties","snapshotType"]` | `["NodePool","ManagedCluster"]` | `"NodePool"` |
| `managedClusters.json` | `["definitions","ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler","properties","addonAutoscaling"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `managedClusters.json` | `["definitions","NetworkPolicies","properties","ingress"]` | `["DenyAll","AllowAll","AllowSameNamespace"]` | `"AllowSameNamespace"` |
| `managedClusters.json` | `["definitions","NetworkPolicies","properties","egress"]` | `["DenyAll","AllowAll","AllowSameNamespace"]` | `"AllowAll"` |
| `managedClusters.json` | `["definitions","NvidiaGPUProfile","properties","driverMode"]` | `["DevicePlugin","DRA"]` | `"DevicePlugin"` |
| `managedClusters.json` | `["definitions","SnapshotProperties","properties","snapshotType"]` | `["NodePool","ManagedCluster"]` | `"NodePool"` |
| `managedClusters.json` | `["definitions","SnapshotProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |

[Native receipt](../native-197.json) | [Worker input](../native-197.input.json) | [Worker log](../native-197.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
