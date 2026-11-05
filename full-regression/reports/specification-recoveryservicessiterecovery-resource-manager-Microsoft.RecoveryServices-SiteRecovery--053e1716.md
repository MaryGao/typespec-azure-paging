# specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/SiteRecovery: DefaultInEnum

## Scope

Saved API version: `2026-08-31-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 5 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `service.json` | `["definitions","A2AContainerMappingInput","properties","automationAccountAuthenticationType"]` | `["RunAsAccount","SystemAssignedIdentity"]` | `"RunAsAccount"` | Compliant |
| `service.json` | `["definitions","A2ACreateProtectionIntentInput","properties","automationAccountAuthenticationType"]` | `["RunAsAccount","SystemAssignedIdentity"]` | `"RunAsAccount"` | Compliant |
| `service.json` | `["definitions","A2AProtectionContainerMappingDetails","properties","automationAccountAuthenticationType"]` | `["RunAsAccount","SystemAssignedIdentity"]` | `"RunAsAccount"` | Compliant |
| `service.json` | `["definitions","A2AReplicationIntentDetails","properties","automationAccountAuthenticationType"]` | `["RunAsAccount","SystemAssignedIdentity"]` | `"RunAsAccount"` | Compliant |
| `service.json` | `["definitions","A2AUpdateContainerMappingInput","properties","automationAccountAuthenticationType"]` | `["RunAsAccount","SystemAssignedIdentity"]` | `"RunAsAccount"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-391.json) | [Exact worker input](../native-391.input.json) | [Worker log](../native-391.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
