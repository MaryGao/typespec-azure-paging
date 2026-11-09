# specification/storagecache/resource-manager/Microsoft.StorageCache/StorageCache: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-08-01`.

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
| `openapi.json` | `["definitions","AutoExportJobProperties","properties","adminStatus"]` | `["Enable","Disable"]` | `"Enable"` |
| `openapi.json` | `["definitions","AutoImportJobProperties","properties","adminStatus"]` | `["Enable","Disable"]` | `"Enable"` |
| `openapi.json` | `["definitions","AutoImportJobProperties","properties","conflictResolutionMode"]` | `["Fail","Skip","OverwriteIfDirty","OverwriteAlways"]` | `"Skip"` |
| `openapi.json` | `["definitions","CacheUsernameDownloadSettings","properties","usernameSource"]` | `["AD","LDAP","File","None"]` | `"None"` |
| `openapi.json` | `["definitions","ImportJobProperties","properties","adminStatus"]` | `["Active","Cancel"]` | `"Active"` |
| `openapi.json` | `["definitions","ImportJobProperties","properties","conflictResolutionMode"]` | `["Fail","Skip","OverwriteIfDirty","OverwriteAlways"]` | `"Fail"` |

[Native receipt](../native-471.json) | [Worker input](../native-471.input.json) | [Worker log](../native-471.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
