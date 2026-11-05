# specification/netapp/resource-manager/Microsoft.NetApp/NetApp: DefaultInEnum

## Scope

Saved API version: `2026-06-15-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 25 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `netapp.json` | `["definitions","AccountEncryption","properties","keySource"]` | `["Microsoft.NetApp","Microsoft.KeyVault"]` | `"Microsoft.NetApp"` | Compliant |
| `netapp.json` | `["definitions","BucketProperties","properties","permissions"]` | `["ReadOnly","ReadWrite"]` | `"ReadOnly"` | Compliant |
| `netapp.json` | `["definitions","ElasticBackupProperties","properties","snapshotUsage"]` | `["UseExistingSnapshot","CreateNewSnapshot"]` | `"CreateNewSnapshot"` | Compliant |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","unixAccessRule"]` | `["ReadOnly","ReadWrite","NoAccess"]` | `"NoAccess"` | Compliant |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","nfsv3"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","nfsv4"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","rootAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","ElasticSmbProperties","properties","smbEncryption"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","ExportPolicyRule","properties","chownMode"]` | `["Restricted","Unrestricted"]` | `"Restricted"` | Compliant |
| `netapp.json` | `["definitions","LdapConfiguration","properties","secureLdapType"]` | `["LdapOverTLS","None"]` | `"None"` | Compliant |
| `netapp.json` | `["definitions","LdapConfiguration","properties","bindAuthenticationLevel"]` | `["Anonymous","Simple"]` | `"Anonymous"` | Compliant |
| `netapp.json` | `["definitions","ListReplicationsRequest","properties","exclude"]` | `["None","Deleted"]` | `"None"` | Compliant |
| `netapp.json` | `["definitions","NetworkSiblingSet","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` | Compliant |
| `netapp.json` | `["definitions","PoolProperties","properties","serviceLevel"]` | `["Standard","Premium","Ultra","StandardZRS","Flexible"]` | `"Premium"` | Compliant |
| `netapp.json` | `["definitions","PoolProperties","properties","qosType"]` | `["Auto","Manual"]` | `"Auto"` | Compliant |
| `netapp.json` | `["definitions","PoolProperties","properties","encryptionType"]` | `["Single","Double"]` | `"Single"` | Compliant |
| `netapp.json` | `["definitions","UpdateNetworkSiblingSetRequest","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","serviceLevel"]` | `["Standard","Premium","Ultra","StandardZRS","Flexible"]` | `"Premium"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","effectiveNetworkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","securityStyle"]` | `["ntfs","unix"]` | `"unix"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","encryptionKeySource"]` | `["Microsoft.NetApp","Microsoft.KeyVault"]` | `"Microsoft.NetApp"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","fileAccessLogs"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","avsDataStore"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `netapp.json` | `["definitions","VolumeProperties","properties","enableSubvolumes"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-353.json) | [Exact worker input](../native-353.input.json) | [Worker log](../native-353.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
