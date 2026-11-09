# specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCIVM: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-04-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/6 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","attestSecureBootEnabled"]` | `["Enabled","Disabled","Unknown"]` | `"Unknown"` |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","attestationCertValidated"]` | `["Valid","Invalid","Unknown"]` | `"Unknown"` |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","bootIntegrityValidated"]` | `["Valid","Invalid","Unknown"]` | `"Unknown"` |
| `stackhcivm.json` | `["definitions","AttestationStatusProperties","properties","healthStatus"]` | `["Pending","Healthy","Unhealthy","Unknown"]` | `"Unknown"` |
| `stackhcivm.json` | `["definitions","LoadBalancerRuleProperties","properties","loadDistribution"]` | `["Default","SourceIP","SourceIPProtocol"]` | `"Default"` |
| `stackhcivm.json` | `["definitions","VirtualMachineInstancePropertiesHardwareProfile","properties","vmSize"]` | `["Default","Standard_A2_v2","Standard_A4_v2","Standard_D2s_v3","Standard_D4s_v3","Standard_D8s_v3","Standard_D16s_v3","Standard_D32s_v3","Standard_DS2_v2","Standard_DS3_v2","Standard_DS4_v2","Standard_DS5_v2","Standard_DS13_v2","Standard_K8S_v1","Standard_K8S2_v1","Standard_K8S3_v1","Standard_K8S4_v1","Standard_NK6","Standard_NK12","Standard_NV6","Standard_NV12","Standard_K8S5_v1","Custom"]` | `"Default"` |

[Native receipt](../native-162.json) | [Worker input](../native-162.input.json) | [Worker log](../native-162.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
