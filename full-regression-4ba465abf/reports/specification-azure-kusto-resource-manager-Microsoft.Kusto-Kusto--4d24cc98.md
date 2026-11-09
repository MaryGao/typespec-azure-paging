# specification/azure-kusto/resource-manager/Microsoft.Kusto/Kusto: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-02-14`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/14 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `kusto.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}","put","parameters","5"]` | `["Admin","None"]` | `"Admin"` |
| `kusto.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}","patch","parameters","5"]` | `["Admin","None"]` | `"Admin"` |
| `kusto.json` | `["definitions","ClusterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `kusto.json` | `["definitions","ClusterProperties","properties","engineType"]` | `["V2","V3"]` | `"V3"` |
| `kusto.json` | `["definitions","ClusterProperties","properties","restrictOutboundNetworkAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `kusto.json` | `["definitions","ClusterProperties","properties","publicIPType"]` | `["IPv4","DualStack"]` | `"IPv4"` |
| `kusto.json` | `["definitions","EventGridConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` |
| `kusto.json` | `["definitions","EventGridConnectionWithManagedIdentityProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` |
| `kusto.json` | `["definitions","EventHubConnectionProperties","properties","compression"]` | `["None","GZip"]` | `"None"` |
| `kusto.json` | `["definitions","EventHubConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` |
| `kusto.json` | `["definitions","EventHubConnectionWithManagedIdentityProperties","properties","compression"]` | `["None","GZip"]` | `"None"` |
| `kusto.json` | `["definitions","EventHubConnectionWithManagedIdentityProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` |
| `kusto.json` | `["definitions","IotHubConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` |
| `kusto.json` | `["definitions","VirtualNetworkConfiguration","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` |

[Native receipt](../native-154.json) | [Worker input](../native-154.input.json) | [Worker log](../native-154.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
