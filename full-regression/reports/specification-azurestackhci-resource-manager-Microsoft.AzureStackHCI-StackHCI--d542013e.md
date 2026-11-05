# specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI: DefaultInEnum

## Scope

Saved API version: `2026-10-15-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 16 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `hci.json` | `["definitions","ArcGatewayProperties","properties","arcGatewayStatus"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `hci.json` | `["definitions","ClusterJobProperties","properties","deploymentMode"]` | `["Validate","Deploy"]` | `"Deploy"` | Compliant |
| `hci.json` | `["definitions","ClusterProperties","properties","identityProvider"]` | `["ActiveDirectory","LocalIdentity"]` | `"ActiveDirectory"` | Compliant |
| `hci.json` | `["definitions","ClusterReportedProperties","properties","hardwareClass"]` | `["Small","Medium","Large"]` | `"Medium"` | Compliant |
| `hci.json` | `["definitions","ConfidentialVmProperties","properties","confidentialVmIntent"]` | `["Enable","Disable"]` | `"Disable"` | Compliant |
| `hci.json` | `["definitions","ConfidentialVmProperties","properties","confidentialVmStatus"]` | `["Enabled","PartiallyEnabled","Disabled"]` | `"Disabled"` | Compliant |
| `hci.json` | `["definitions","DeploymentCluster","properties","hardwareClass"]` | `["Small","Medium","Large"]` | `"Medium"` | Compliant |
| `hci.json` | `["definitions","DeploymentSettingsProperties","properties","operationType"]` | `["ClusterProvisioning","ClusterUpgrade"]` | `"ClusterProvisioning"` | Compliant |
| `hci.json` | `["definitions","EdgeMachineNicDetail","properties","rdmaCapability"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `hci.json` | `["definitions","HciNicDetail","properties","rdmaCapability"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `hci.json` | `["definitions","InfrastructureNetwork","properties","dnsServerConfig"]` | `["UseDnsServer","UseForwarder"]` | `"UseDnsServer"` | Compliant |
| `hci.json` | `["definitions","OptionalServices","properties","confidentialVmIntent"]` | `["Enable","Disable"]` | `"Disable"` | Compliant |
| `hci.json` | `["definitions","OsProvisionProfile","properties","operationType"]` | `["Provision","Update","ReImage","Reset"]` | `"Provision"` | Compliant |
| `hci.json` | `["definitions","SecurityProperties","properties","securedCoreComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` | Compliant |
| `hci.json` | `["definitions","SecurityProperties","properties","wdacComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` | Compliant |
| `hci.json` | `["definitions","SecurityProperties","properties","smbEncryptionForIntraClusterTrafficComplianceAssignment"]` | `["Audit","ApplyAndAutoCorrect"]` | `"Audit"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-161.json) | [Exact worker input](../native-161.input.json) | [Worker log](../native-161.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
