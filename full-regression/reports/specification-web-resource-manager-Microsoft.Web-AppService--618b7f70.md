# specification/web/resource-manager/Microsoft.Web/AppService: DefaultInEnum

## Scope

Saved API version: `2026-07-15`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 4 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["definitions","AppServiceEnvironment","properties","upgradePreference"]` | `["None","Early","Late","Manual"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","BackupSchedule","properties","frequencyUnit"]` | `["Day","Hour"]` | `"Day"` | Compliant |
| `openapi.json` | `["definitions","FileSystemApplicationLogsConfig","properties","level"]` | `["Off","Verbose","Information","Warning","Error"]` | `"Off"` | Compliant |
| `openapi.json` | `["definitions","RestoreRequestProperties","properties","operationType"]` | `["Default","Clone","Relocation","Snapshot","CloudFS"]` | `"Default"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-481.json) | [Exact worker input](../native-481.input.json) | [Worker log](../native-481.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
