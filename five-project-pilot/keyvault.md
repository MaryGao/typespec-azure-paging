# KeyVault: DefaultInEnum comparison

## Scope

Project: `specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault`; saved API version `2026-06-01-preview`. Fourteen authored `.tsp` files, 220 retained project inputs, and one saved primary Swagger document. Candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution is explicitly enabled, `target-only`, source scope, preserving authored suppressions. Swagger observations come from verified saved production logs.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native worker | Success, exit 0 |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Static primary Swagger enum/default sites / violations | 1 / 0 |
| Attributable diagnostic differences | None observed |

## Detailed cases

Saved file: `swagger/preview/2026-06-01-preview/openapi.json`.

| JSON path | Declared enum | Default | Membership |
| --- | --- | --- | --- |
| `$.definitions.ManagedHsmProperties.properties.publicNetworkAccess` | `"Enabled"`, `"Disabled"` | `"Enabled"` | Compliant |

At frozen `models.tsp:1755`, the authored declaration is `publicNetworkAccess?: PublicNetworkAccess = PublicNetworkAccess.Enabled;`. The extensible union is declared at `models.tsp:448`, includes `string`, and declares the matching `"Enabled"` value. This supplies a real compliant extensible-default example.

The same file also contains `publicNetworkAccess?: string = "enabled";` at line 1160. That is a plain scalar default and outside this rule. The different casing is not evidence of a missed enum violation: property names alone do not identify a shared type or schema.

There are no diagnostic discrepancies or observed violating defaults. The single site does not exercise numeric membership or arbitrary-precision behavior.

## Evidence and boundaries

[Worker input](evidence/keyvault/input.json) | [Native receipt](evidence/keyvault/native.json) | [Worker log](evidence/keyvault/worker.log) | [Exact saved enum/default values and schema hash](evidence/keyvault/saved-enum-defaults.json) | [Source hashes](evidence/keyvault/source-files.json) | [Source corroboration, historical log hashes, and line-numbered excerpts](evidence/keyvault/historical-validation.json)

Saved logs show production mode, active error-severity target selection, actual document validation, and successful Spectral return; both raw/stderr files were hash-checked. [Shared provenance, controls, policy differences, and remaining gates](index.md). No fresh Swagger generation, selected-version correspondence proof, or equivalence claim.
