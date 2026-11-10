# Automation: MissingXmsErrorResponse comparison

## 1. Scope

Project: `specification/automation/resource-manager/Microsoft.Automation/Automation`; saved Swagger API `2024-10-23`. Candidate `74e56a0f144190769180d5dbb27179db8b448c9c`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Assessed: **Swagger 1; TypeSpec 1; matched 1; Swagger-only 0; TypeSpec-only 0**. This compares verified historical production Swagger execution with a fresh, explicitly enabled native source-scope run, not a fresh Swagger run or selected-version projection. Source suppressions remain honored; default activation is not assessed.

Evidence: [native receipt](evidence/automation/native.json), [saved findings](evidence/automation/saved-findings.json), [operation correspondence](evidence/automation/correspondence.json), [saved production provenance](evidence/automation/saved-validator-provenance.json), [run](evidence/execution.json).

## 2. Difference inventory

No differing cases. The single finding was matched by HTTP route, verb, status and source operation, not just count.

| Swagger operation | Response | Native location |
| --- | --- | --- |
| `Schedule_CreateOrUpdate` | PUT 409, unmarked | `Schedule.tsp:43` |

Both identify the schedule create/update response beneath `automationAccounts/{automationAccountName}/schedules/{scheduleName}`.

## 3. Detailed differences

None observed in this project. Swagger reports an error on the response entry; TypeSpec reports a warning on the operation. This sample establishes one concrete 409 correspondence, not general equivalence across versions, ranges or the full corpus.
