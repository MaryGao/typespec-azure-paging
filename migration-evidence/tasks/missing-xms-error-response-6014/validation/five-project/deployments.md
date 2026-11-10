# Deployments: MissingXmsErrorResponse comparison

## 1. Scope

Project: `specification/resources/resource-manager/Microsoft.Resources/deployments`; saved Swagger API `2026-06-01`. Candidate `74e56a0f144190769180d5dbb27179db8b448c9c`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Assessed: **Swagger 5; TypeSpec 5; matched 5; Swagger-only 0; TypeSpec-only 0**. Verified historical production Swagger execution is compared with fresh, explicitly enabled native source-scope lint. No fresh Swagger execution or selected-version projection was performed. Source suppressions are retained; default activation is not assessed.

Evidence: [native receipt](evidence/deployments/native.json), [saved responses](evidence/deployments/saved-responses.json), [operation correspondence](evidence/deployments/correspondence.json), [saved production provenance](evidence/deployments/saved-validator-provenance.json), [run](evidence/execution.json).

## 2. Difference inventory

No differing cases. All five unmarked POST 400 responses on deployment `/validate` operations match by route, verb, status and source location:

| Swagger operation | Native location |
| --- | --- |
| `Deployments_ValidateAtScope` | `DeploymentExtended.tsp:149` |
| `Deployments_ValidateAtManagementGroupScope` | `DeploymentExtended.tsp:304` |
| `Deployments_ValidateAtTenantScope` | `DeploymentExtended.tsp:526` |
| `Deployments_ValidateAtSubscriptionScope` | `DeploymentExtended.tsp:718` |
| `Deployments_Validate` | `DeploymentExtended.tsp:897` |

## 3. Detailed differences

None observed. Five additional unmarked HEAD 404 existence responses appear in both saved Swagger and native HTTP metadata, and neither rule reports them. This is measured project evidence for the narrow HEAD/404 exemption, not an exemption for all HEAD errors. Injected controls separately confirm HEAD/500 still warns.

Severity/location differ intentionally: Swagger error at the response entry versus native warning at the operation.
