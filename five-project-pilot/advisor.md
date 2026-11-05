# Advisor: DefaultInEnum comparison

## Scope

Project: `specification/advisor/resource-manager/Microsoft.Advisor/Advisor`; saved API version `2026-08-01-preview`. Thirteen authored `.tsp` files, 156 retained project inputs, and one saved primary Swagger document. Candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution explicitly enables `@azure-tools/typespec-azure-core/default-in-enum`, retains source suppressions, and uses `target-only` source scope. Saved Swagger results are historical production executions of `DefaultInEnum`, not fresh validation.

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

There are no target diagnostics to map and no enum/default site in the selected primary Swagger document. This project supports compatibility of the enabled candidate with the real source program; it does not demonstrate violating-case detection or compliant enum/default handling.

The historical `openapi.jsonl` explicitly logs the target at error severity for TypeSpec-generated schemas, production selection, validation of the chosen document, and successful Spectral return. Both raw/stderr files were checked against the sealed hash inventory. Zero is established from those logs, not inferred solely from the absent rule shard.

## Evidence and boundaries

[Worker input](evidence/advisor/input.json) | [Native receipt](evidence/advisor/native.json) | [Worker log](evidence/advisor/worker.log) | [Saved schema inventory](evidence/advisor/saved-enum-defaults.json) | [Source hashes](evidence/advisor/source-files.json) | [Historical log hashes and line-numbered excerpts](evidence/advisor/historical-validation.json)

The [shared report](index.md) records package hashes, discriminating injected controls, focused tests, intentional policy differences, and outstanding gates. No default-activation, selected-version projection equivalence, full-corpus, or data-plane conclusion is made.
