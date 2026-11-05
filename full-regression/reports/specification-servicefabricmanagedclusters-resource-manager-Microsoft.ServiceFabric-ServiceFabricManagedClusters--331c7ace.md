# specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters: DefaultInEnum

## Scope

Saved API version: `2026-05-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 7 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `servicefabricmanagedclusters.json` | `["definitions","FrontendConfiguration","properties","ipAddressType"]` | `["IPv4","IPv6"]` | `"IPv4"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","IpConfiguration","properties","privateIPAddressVersion"]` | `["IPv4","IPv6"]` | `"IPv4"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","ManagedClusterProperties","properties","clusterUpgradeMode"]` | `["Automatic","Manual"]` | `"Automatic"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","NodeTypeProperties","properties","dataDiskType"]` | `["Standard_LRS","StandardSSD_LRS","Premium_LRS","PremiumV2_LRS","StandardSSD_ZRS","Premium_ZRS"]` | `"StandardSSD_LRS"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","NodeTypeSkuCapacity","properties","scaleType"]` | `["None","Manual","Automatic"]` | `"None"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","PublicIPAddressConfiguration","properties","publicIPAddressVersion"]` | `["IPv4","IPv6"]` | `"IPv4"` | Compliant |
| `servicefabricmanagedclusters.json` | `["definitions","VmssDataDisk","properties","diskType"]` | `["Standard_LRS","StandardSSD_LRS","Premium_LRS","PremiumV2_LRS","StandardSSD_ZRS","Premium_ZRS"]` | `"StandardSSD_LRS"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-458.json) | [Exact worker input](../native-458.input.json) | [Worker log](../native-458.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
