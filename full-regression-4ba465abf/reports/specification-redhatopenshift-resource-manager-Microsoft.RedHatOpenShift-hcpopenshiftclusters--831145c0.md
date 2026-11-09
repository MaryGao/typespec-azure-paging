# specification/redhatopenshift/resource-manager/Microsoft.RedHatOpenShift/hcpopenshiftclusters: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-09-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/10 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["definitions","ApiProfile","properties","visibility"]` | `["Public","Private"]` | `"Public"` |
| `openapi.json` | `["definitions","ClusterImageRegistryProfile","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","CustomerManagedEncryptionProfile","properties","encryptionType"]` | `["KMS"]` | `"KMS"` |
| `openapi.json` | `["definitions","HcpOpenShiftClusterProperties","properties","cryptoRestrictions"]` | `["None","FIPS"]` | `"None"` |
| `openapi.json` | `["definitions","IngressProfile","properties","type"]` | `["Public","Private","Disabled"]` | `"Public"` |
| `openapi.json` | `["definitions","NetworkProfile","properties","networkType"]` | `["OVNKubernetes","Other"]` | `"OVNKubernetes"` |
| `openapi.json` | `["definitions","OsDiskProfile","properties","diskStorageAccountType"]` | `["Premium_LRS","StandardSSD_LRS","Standard_LRS"]` | `"Premium_LRS"` |
| `openapi.json` | `["definitions","OsDiskProfile","properties","diskType"]` | `["Managed","Ephemeral"]` | `"Managed"` |
| `openapi.json` | `["definitions","PlatformProfile","properties","outboundType"]` | `["LoadBalancer"]` | `"LoadBalancer"` |
| `openapi.json` | `["definitions","TokenClaimValidationRule","properties","type"]` | `["RequiredClaim"]` | `"RequiredClaim"` |

[Native receipt](../native-392.json) | [Worker input](../native-392.input.json) | [Worker log](../native-392.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
