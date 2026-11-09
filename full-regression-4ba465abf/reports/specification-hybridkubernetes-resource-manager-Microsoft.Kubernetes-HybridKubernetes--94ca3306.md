# specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/HybridKubernetes: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-05-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/4 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `connectedClusters.json` | `["definitions","ArcAgentProfile","properties","agentAutoUpgrade"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `connectedClusters.json` | `["definitions","ConnectedClusterIdentity","properties","type"]` | `["None","SystemAssigned"]` | `"SystemAssigned"` |
| `connectedClusters.json` | `["definitions","ConnectedClusterProperties","properties","privateLinkState"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `connectedClusters.json` | `["definitions","ConnectedClusterProperties","properties","azureHybridBenefit"]` | `["True","False","NotApplicable"]` | `"NotApplicable"` |

[Native receipt](../native-273.json) | [Worker input](../native-273.input.json) | [Worker log](../native-273.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
