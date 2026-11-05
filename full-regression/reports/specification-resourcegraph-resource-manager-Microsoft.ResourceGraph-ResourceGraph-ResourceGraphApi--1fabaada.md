# specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/ResourceGraph/ResourceGraphApi: DefaultInEnum

## Scope

Saved API version: `2024-04-01`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

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
| `resourcegraph.json` | `["definitions","FacetRequestOptions","properties","sortOrder"]` | `["asc","desc"]` | `"desc"` | Compliant |
| `resourcegraph.json` | `["definitions","QueryRequestOptions","properties","resultFormat"]` | `["table","objectArray"]` | `"objectArray"` | Compliant |
| `resourcegraph.json` | `["definitions","QueryRequestOptions","properties","authorizationScopeFilter"]` | `["AtScopeAndBelow","AtScopeAndAbove","AtScopeExact","AtScopeAboveAndBelow"]` | `"AtScopeAndBelow"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-404.json) | [Exact worker input](../native-404.input.json) | [Worker log](../native-404.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.
