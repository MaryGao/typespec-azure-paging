# specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices: DefaultInEnum

## Scope

Saved API version: `2026-09-15-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 3 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `cognitiveservices.json` | `["definitions","DeploymentRouting","properties","mode"]` | `["cost","balanced","quality"]` | `"balanced"` | Compliant |
| `cognitiveservices.json` | `["definitions","Encryption","properties","keySource"]` | `["Microsoft.CognitiveServices","Microsoft.KeyVault"]` | `"Microsoft.KeyVault"` | Compliant |
| `cognitiveservices.json` | `["definitions","RaiRegoProperties","properties","encoding"]` | `["None","Base64"]` | `"None"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-175.json) | [Exact worker input](../native-175.input.json) | [Worker log](../native-175.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
