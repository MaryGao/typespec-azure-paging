# specification/storagemover/resource-manager/Microsoft.StorageMover/StorageMover: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-05-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/7 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `storagemover.json` | `["definitions","JobDefinitionProperties","properties","jobType"]` | `["OnPremToCloud","CloudToCloud","OnPremToCloudAgentLess"]` | `"OnPremToCloud"` |
| `storagemover.json` | `["definitions","JobDefinitionProperties","properties","dataIntegrityValidation"]` | `["SaveVerifyFileMD5","SaveFileMD5","None"]` | `"None"` |
| `storagemover.json` | `["definitions","JobRunProperties","properties","triggerType"]` | `["Manual","Scheduled"]` | `"Manual"` |
| `storagemover.json` | `["definitions","NfsMountEndpointProperties","properties","sourceType"]` | `["NfsMount","FSX-EFS"]` | `"NfsMount"` |
| `storagemover.json` | `["definitions","SchedulerTime","properties","minute"]` | `[0,30]` | `0` |
| `storagemover.json` | `["definitions","SmbMountEndpointProperties","properties","sourceType"]` | `["SmbMount","FSX-SMB"]` | `"SmbMount"` |
| `storagemover.json` | `["definitions","Time","properties","minute"]` | `[0,30]` | `0` |

[Native receipt](../native-473.json) | [Worker input](../native-473.input.json) | [Worker log](../native-473.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
