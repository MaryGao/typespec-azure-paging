# specification/netapp/resource-manager/Microsoft.NetApp/NetApp: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-06-15-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/25 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `netapp.json` | `["definitions","AccountEncryption","properties","keySource"]` | `["Microsoft.NetApp","Microsoft.KeyVault"]` | `"Microsoft.NetApp"` |
| `netapp.json` | `["definitions","BucketProperties","properties","permissions"]` | `["ReadOnly","ReadWrite"]` | `"ReadOnly"` |
| `netapp.json` | `["definitions","ElasticBackupProperties","properties","snapshotUsage"]` | `["UseExistingSnapshot","CreateNewSnapshot"]` | `"CreateNewSnapshot"` |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","unixAccessRule"]` | `["ReadOnly","ReadWrite","NoAccess"]` | `"NoAccess"` |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","nfsv3"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","nfsv4"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","ElasticExportPolicyRule","properties","rootAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","ElasticSmbProperties","properties","smbEncryption"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","ExportPolicyRule","properties","chownMode"]` | `["Restricted","Unrestricted"]` | `"Restricted"` |
| `netapp.json` | `["definitions","LdapConfiguration","properties","secureLdapType"]` | `["LdapOverTLS","None"]` | `"None"` |
| `netapp.json` | `["definitions","LdapConfiguration","properties","bindAuthenticationLevel"]` | `["Anonymous","Simple"]` | `"Anonymous"` |
| `netapp.json` | `["definitions","ListReplicationsRequest","properties","exclude"]` | `["None","Deleted"]` | `"None"` |
| `netapp.json` | `["definitions","NetworkSiblingSet","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` |
| `netapp.json` | `["definitions","PoolProperties","properties","serviceLevel"]` | `["Standard","Premium","Ultra","StandardZRS","Flexible"]` | `"Premium"` |
| `netapp.json` | `["definitions","PoolProperties","properties","qosType"]` | `["Auto","Manual"]` | `"Auto"` |
| `netapp.json` | `["definitions","PoolProperties","properties","encryptionType"]` | `["Single","Double"]` | `"Single"` |
| `netapp.json` | `["definitions","UpdateNetworkSiblingSetRequest","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","serviceLevel"]` | `["Standard","Premium","Ultra","StandardZRS","Flexible"]` | `"Premium"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","networkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","effectiveNetworkFeatures"]` | `["Basic","Standard","Basic_Standard","Standard_Basic"]` | `"Basic"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","securityStyle"]` | `["ntfs","unix"]` | `"unix"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","encryptionKeySource"]` | `["Microsoft.NetApp","Microsoft.KeyVault"]` | `"Microsoft.NetApp"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","fileAccessLogs"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","avsDataStore"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `netapp.json` | `["definitions","VolumeProperties","properties","enableSubvolumes"]` | `["Enabled","Disabled"]` | `"Disabled"` |

[Native receipt](../native-353.json) | [Worker input](../native-353.input.json) | [Worker log](../native-353.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
