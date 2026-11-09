# specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-10-15-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/16 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `hci.json` | `["definitions","ArcGatewayProperties","properties","arcGatewayStatus"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `hci.json` | `["definitions","ClusterJobProperties","properties","deploymentMode"]` | `["Validate","Deploy"]` | `"Deploy"` |
| `hci.json` | `["definitions","ClusterProperties","properties","identityProvider"]` | `["ActiveDirectory","LocalIdentity"]` | `"ActiveDirectory"` |
| `hci.json` | `["definitions","ClusterReportedProperties","properties","hardwareClass"]` | `["Small","Medium","Large"]` | `"Medium"` |
| `hci.json` | `["definitions","ConfidentialVmProperties","properties","confidentialVmIntent"]` | `["Enable","Disable"]` | `"Disable"` |
| `hci.json` | `["definitions","ConfidentialVmProperties","properties","confidentialVmStatus"]` | `["Enabled","PartiallyEnabled","Disabled"]` | `"Disabled"` |
| `hci.json` | `["definitions","DeploymentCluster","properties","hardwareClass"]` | `["Small","Medium","Large"]` | `"Medium"` |
| `hci.json` | `["definitions","DeploymentSettingsProperties","properties","operationType"]` | `["ClusterProvisioning","ClusterUpgrade"]` | `"ClusterProvisioning"` |
| `hci.json` | `["definitions","EdgeMachineNicDetail","properties","rdmaCapability"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `hci.json` | `["definitions","HciNicDetail","properties","rdmaCapability"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `hci.json` | `["definitions","InfrastructureNetwork","properties","dnsServerConfig"]` | `["UseDnsServer","UseForwarder"]` | `"UseDnsServer"` |
| `hci.json` | `["definitions","OptionalServices","properties","confidentialVmIntent"]` | `["Enable","Disable"]` | `"Disable"` |
| `hci.json` | `["definitions","OsProvisionProfile","properties","operationType"]` | `["Provision","Update","ReImage","Reset"]` | `"Provision"` |
| `hci.json` | `["definitions","SecurityProperties","properties","securedCoreComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` |
| `hci.json` | `["definitions","SecurityProperties","properties","wdacComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` |
| `hci.json` | `["definitions","SecurityProperties","properties","smbEncryptionForIntraClusterTrafficComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` |

[Native receipt](../native-161.json) | [Worker input](../native-161.input.json) | [Worker log](../native-161.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
