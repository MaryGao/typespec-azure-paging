# specification/containerservice/resource-manager/Microsoft.ContainerService/aks: DefaultInEnum

## Scope

Saved API version: `2026-07-02-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 28 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `managedClusters.json` | `["definitions","AdvancedNetworkingPerformance","properties","accelerationMode"]` | `["BpfVeth","None"]` | `"None"` | Compliant |
| `managedClusters.json` | `["definitions","AgentPoolUpgradeProfileProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `managedClusters.json` | `["definitions","AzureKeyVaultKms","properties","keyVaultNetworkAccess"]` | `["Public","Private"]` | `"Public"` | Compliant |
| `managedClusters.json` | `["definitions","ContainerServiceNetworkProfile","properties","outboundType"]` | `["loadBalancer","userDefinedRouting","managedNATGateway","userAssignedNATGateway","none"]` | `"loadBalancer"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","queryLogging"]` | `["Error","Log"]` | `"Error"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","protocol"]` | `["PreferUDP","ForceTCP"]` | `"PreferUDP"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","forwardDestination"]` | `["ClusterCoreDNS","VnetDNS"]` | `"ClusterCoreDNS"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","forwardPolicy"]` | `["Sequential","RoundRobin","Random"]` | `"Sequential"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSOverride","properties","serveStale"]` | `["Verify","Immediate","Disable"]` | `"Immediate"` | Compliant |
| `managedClusters.json` | `["definitions","LocalDNSProfile","properties","mode"]` | `["Preferred","Required","Disabled"]` | `"Preferred"` | Compliant |
| `managedClusters.json` | `["definitions","MachineOSProfile","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `managedClusters.json` | `["definitions","MachineProperties","properties","priority"]` | `["Spot","Regular"]` | `"Regular"` | Compliant |
| `managedClusters.json` | `["definitions","MachineProperties","properties","evictionPolicy"]` | `["Delete","Deallocate"]` | `"Delete"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","scaleSetPriority"]` | `["Spot","Regular"]` | `"Regular"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterAgentPoolProfileProperties","properties","scaleSetEvictionPolicy"]` | `["Delete","Deallocate"]` | `"Delete"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterBootstrapProfile","properties","artifactSource"]` | `["Cache","Direct"]` | `"Direct"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterLoadBalancerProfile","properties","backendPoolType"]` | `["NodeIPConfiguration","NodeIP","PodIP"]` | `"NodeIPConfiguration"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterLoadBalancerProfile","properties","clusterServiceLoadBalancerHealthProbeMode"]` | `["ServiceNodePort","Shared"]` | `"ServiceNodePort"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterNodeProvisioningProfile","properties","defaultNodePools"]` | `["None","Auto"]` | `"Auto"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterPoolUpgradeProfile","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterSnapshotProperties","properties","snapshotType"]` | `["NodePool","ManagedCluster"]` | `"NodePool"` | Compliant |
| `managedClusters.json` | `["definitions","ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler","properties","addonAutoscaling"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managedClusters.json` | `["definitions","NetworkPolicies","properties","ingress"]` | `["DenyAll","AllowAll","AllowSameNamespace"]` | `"AllowSameNamespace"` | Compliant |
| `managedClusters.json` | `["definitions","NetworkPolicies","properties","egress"]` | `["DenyAll","AllowAll","AllowSameNamespace"]` | `"AllowAll"` | Compliant |
| `managedClusters.json` | `["definitions","NvidiaGPUProfile","properties","driverMode"]` | `["DevicePlugin","DRA"]` | `"DevicePlugin"` | Compliant |
| `managedClusters.json` | `["definitions","SnapshotProperties","properties","snapshotType"]` | `["NodePool","ManagedCluster"]` | `"NodePool"` | Compliant |
| `managedClusters.json` | `["definitions","SnapshotProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-197.json) | [Exact worker input](../native-197.input.json) | [Worker log](../native-197.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
