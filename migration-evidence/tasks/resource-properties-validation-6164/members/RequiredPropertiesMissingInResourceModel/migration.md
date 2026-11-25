# RequiredPropertiesMissingInResourceModel migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All 56 approved services were assessed using 57 default-tag Swagger files and 56 unprojected TypeSpec projects; no project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** The 50 collection-response findings are Swagger false positives for the resource identity check; the remaining 24 require review. The populations are not version-aligned, and project-level zeroes do not prove one-to-one correspondence. Swagger counts are emitted diagnostics with README configuration, not a proven suppression-inclusive total. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ) and the [inventory](../../evidence-details.md).

## 3. Why diagnostic counts differ

| Difference (with evidence) | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis |
| --- | ---: | ---: | --- |
| [Collection-response envelopes](../../collection-findings.md) | 50 | 0 observed in the projects | Swagger false positives: the models are collection responses, not individual ARM resources. |
| [Resource Health](../../evidence-details.md#interpreted-examples-and-outstanding-cases) | 1 | 0 observed in the project | A local resource-shaped model is not diagnosed; whether the non-resource endpoint should be covered is unresolved. |
| [Other response models](../../evidence-details.md#swagger-diagnostic-inventory) | 23 | 0 observed in the projects | Individual classification and version alignment remain incomplete. |

**Raw-count reconciliation:** 74 − 0 = 50 + 1 + 23; native zeroes are project-level observations.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only `name`, `id`, and `type` on registered ARM resources | Covered for tested cases | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) exercise compliant and invalid identity properties. |
| Collection-response envelopes | Swagger false positives | The [50 findings](../../collection-findings.md) concern collections rather than individual ARM resources. |
| Other GET and local resource-shaped responses | Unassessed | The [inventory](../../evidence-details.md#swagger-diagnostic-inventory) and Resource Health example show selection differences requiring policy review. |

## NOTES

The [group report](../../migration.md) and [evidence](../../evidence-details.md) record revisions, suppression limits and validation results.
