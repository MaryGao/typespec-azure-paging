# specification/batch/resource-manager/Microsoft.Batch/Batch: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-06-01`.

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
| `openapi.json` | `["definitions","AutoStorageBaseProperties","properties","authenticationMode"]` | `["StorageKeys","BatchAccountManagedIdentity"]` | `"StorageKeys"` |
| `openapi.json` | `["definitions","BatchAccountCreateProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `openapi.json` | `["definitions","BatchAccountProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `openapi.json` | `["definitions","BatchAccountUpdateProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `openapi.json` | `["definitions","NetworkConfiguration","properties","dynamicVnetAssignmentScope"]` | `["none","job"]` | `"none"` |
| `openapi.json` | `["definitions","TaskSchedulingPolicy","properties","nodeFillType"]` | `["Spread","Pack"]` | `"Spread"` |

[Native receipt](../native-163.json) | [Worker input](../native-163.input.json) | [Worker log](../native-163.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
