# specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCIVM: DefaultInEnum

## Scope

Saved API version: `2026-04-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 6 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","attestSecureBootEnabled"]` | `["Enabled","Disabled","Unknown"]` | `"Unknown"` | Compliant |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","attestationCertValidated"]` | `["Valid","Invalid","Unknown"]` | `"Unknown"` | Compliant |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","bootIntegrityValidated"]` | `["Valid","Invalid","Unknown"]` | `"Unknown"` | Compliant |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","healthStatus"]` | `["Pending","Healthy","Unhealthy","Unknown"]` | `"Unknown"` | Compliant |
| `stackhcivm.json` | `["definitions","LoadBalancerRuleProperties","properties","loadDistribution"]` | `["Default","SourceIP","SourceIPProtocol"]` | `"Default"` | Compliant |
| `stackhcivm.json` | `["definitions","VirtualMachineInstancePropertiesHardwareProfile","properties","vmSize"]` | `["Default","Standard_A2_v2","Standard_A4_v2","Standard_D2s_v3","Standard_D4s_v3","Standard_D8s_v3","Standard_D16s_v3","Standard_D32s_v3","Standard_DS2_v2","Standard_DS3_v2","Standard_DS4_v2","Standard_DS5_v2","Standard_DS13_v2","Standard_K8S_v1","Standard_K8S2_v1","Standard_K8S3_v1","Standard_K8S4_v1","Standard_NK6","Standard_NK12","Standard_NV6","Standard_NV12","Standard_K8S5_v1","Custom"]` | `"Default"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-162.json) | [Exact worker input](../native-162.input.json) | [Worker log](../native-162.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
