# specification/azure-kusto/resource-manager/Microsoft.Kusto/Kusto: DefaultInEnum

## Scope

Saved API version: `2025-02-14`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 14 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `kusto.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}","put","parameters","5"]` | `["Admin","None"]` | `"Admin"` | Compliant |
| `kusto.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}","patch","parameters","5"]` | `["Admin","None"]` | `"Admin"` | Compliant |
| `kusto.json` | `["definitions","ClusterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `kusto.json` | `["definitions","ClusterProperties","properties","engineType"]` | `["V2","V3"]` | `"V3"` | Compliant |
| `kusto.json` | `["definitions","ClusterProperties","properties","restrictOutboundNetworkAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `kusto.json` | `["definitions","ClusterProperties","properties","publicIPType"]` | `["IPv4","DualStack"]` | `"IPv4"` | Compliant |
| `kusto.json` | `["definitions","EventGridConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` | Compliant |
| `kusto.json` | `["definitions","EventGridConnectionWithManagedIdentityProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` | Compliant |
| `kusto.json` | `["definitions","EventHubConnectionProperties","properties","compression"]` | `["None","GZip"]` | `"None"` | Compliant |
| `kusto.json` | `["definitions","EventHubConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` | Compliant |
| `kusto.json` | `["definitions","EventHubConnectionWithManagedIdentityProperties","properties","compression"]` | `["None","GZip"]` | `"None"` | Compliant |
| `kusto.json` | `["definitions","EventHubConnectionWithManagedIdentityProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` | Compliant |
| `kusto.json` | `["definitions","IotHubConnectionProperties","properties","databaseRouting"]` | `["Single","Multi"]` | `"Single"` | Compliant |
| `kusto.json` | `["definitions","VirtualNetworkConfiguration","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-154.json) | [Exact worker input](../native-154.input.json) | [Worker log](../native-154.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
