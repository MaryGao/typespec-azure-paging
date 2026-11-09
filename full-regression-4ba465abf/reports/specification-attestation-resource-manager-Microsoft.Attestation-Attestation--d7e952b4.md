# specification/attestation/resource-manager/Microsoft.Attestation/Attestation: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2021-06-01`.

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
| `attestation.json` | `["definitions","AttestationServiceCreationSpecificParams","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `attestation.json` | `["definitions","AttestationServiceCreationSpecificParams","properties","tpmAttestationAuthentication"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `attestation.json` | `["definitions","AttestationServicePatchSpecificParams","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `attestation.json` | `["definitions","AttestationServicePatchSpecificParams","properties","tpmAttestationAuthentication"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `attestation.json` | `["definitions","StatusResult","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `attestation.json` | `["definitions","StatusResult","properties","tpmAttestationAuthentication"]` | `["Enabled","Disabled"]` | `"Enabled"` |

[Native receipt](../native-29.json) | [Worker input](../native-29.input.json) | [Worker log](../native-29.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.
