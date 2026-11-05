# Compute: DefaultInEnum comparison

## Scope

Project: `specification/compute/resource-manager/Microsoft.Compute/Compute/Compute`; saved API version `2026-04-01`. Twenty-seven authored `.tsp` files, 2,224 retained project inputs, and one saved primary Swagger document. Candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution explicitly enables the rule with source suppressions retained, in `target-only` source scope. Swagger comparison reuses historical production execution.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native worker | Success, exit 0 |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Static primary Swagger enum/default sites / violations | 0 / 0 |
| Attributable diagnostic differences | None observed |

## Detailed differences and controls

There are no target diagnostics to map and no enum/default site in the primary `ComputeRP.json` snapshot. This is compatibility evidence, not evidence that real violating defaults are detected.

The saved `ComputeRP.jsonl` records active error-severity selection of `DefaultInEnum`, production mode, validation of the primary TypeSpec-generated document **and** `common-types/v1/common.json`, followed by successful Spectral return. The static inventory is restricted to the primary document; the historical execution includes that shared dependency. Both raw/stderr files were hash-verified.

## Evidence and boundaries

[Worker input](evidence/compute/input.json) | [Native receipt](evidence/compute/native.json) | [Worker log](evidence/compute/worker.log) | [Saved schema inventory](evidence/compute/saved-enum-defaults.json) | [Source hashes](evidence/compute/source-files.json) | [Historical log hashes and line-numbered excerpts](evidence/compute/historical-validation.json)

See the [shared report](index.md) for runtime identity, positive/negative controls, intentional semantic differences, and uncompleted gates. Native source traversal is not a selected-version OpenAPI projection, and these counts do not establish equivalence.
