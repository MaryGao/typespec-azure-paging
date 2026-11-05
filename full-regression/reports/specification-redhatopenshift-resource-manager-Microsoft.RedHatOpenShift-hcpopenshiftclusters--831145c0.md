# specification/redhatopenshift/resource-manager/Microsoft.RedHatOpenShift/hcpopenshiftclusters: DefaultInEnum

## Scope

Saved API version: `2026-09-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 10 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["definitions","ApiProfile","properties","visibility"]` | `["Public","Private"]` | `"Public"` | Compliant |
| `openapi.json` | `["definitions","ClusterImageRegistryProfile","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","CustomerManagedEncryptionProfile","properties","encryptionType"]` | `["KMS"]` | `"KMS"` | Compliant |
| `openapi.json` | `["definitions","HcpOpenShiftClusterProperties","properties","cryptoRestrictions"]` | `["None","FIPS"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","IngressProfile","properties","type"]` | `["Public","Private","Disabled"]` | `"Public"` | Compliant |
| `openapi.json` | `["definitions","NetworkProfile","properties","networkType"]` | `["OVNKubernetes","Other"]` | `"OVNKubernetes"` | Compliant |
| `openapi.json` | `["definitions","OsDiskProfile","properties","diskStorageAccountType"]` | `["Premium_LRS","StandardSSD_LRS","Standard_LRS"]` | `"Premium_LRS"` | Compliant |
| `openapi.json` | `["definitions","OsDiskProfile","properties","diskType"]` | `["Managed","Ephemeral"]` | `"Managed"` | Compliant |
| `openapi.json` | `["definitions","PlatformProfile","properties","outboundType"]` | `["LoadBalancer"]` | `"LoadBalancer"` | Compliant |
| `openapi.json` | `["definitions","TokenClaimValidationRule","properties","type"]` | `["RequiredClaim"]` | `"RequiredClaim"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-392.json) | [Exact worker input](../native-392.input.json) | [Worker log](../native-392.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
