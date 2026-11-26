# RequiredPropertiesMissingInResourceModel migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All 56 approved services were assessed using 57 default-tag Swagger files and 56 unprojected TypeSpec projects; no project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** 66 Swagger findings are false positives for the resource identity check; 8 remain under review. Swagger counts are emitted diagnostics with README configuration, not a proven suppression-inclusive total. See the [inventory](../../evidence-details.md).

## 3. Why diagnostic counts differ

| Response type | Swagger findings | Assessment |
| --- | ---: | --- |
| [Collections](../../collection-findings.md) | 56 | False positives: 50 list envelopes and 6 CDN analytics responses. |
| [Operation/status results](../../operation-status-findings.md) | 10 | False positives: results, not ARM resources. |
| [Other responses](../../evidence-details.md#interpreted-examples-and-outstanding-cases) | 8 | Under review; no confirmed TypeSpec gaps. |

TypeSpec reported zero findings across the projects. The Swagger and TypeSpec versions were not matched case by case.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only `name`, `id`, and `type` on registered ARM resources | Covered for tested cases | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) exercise compliant and invalid identity properties. |
| Collection responses | Swagger false positives | The [56 findings](../../collection-findings.md) concern lists or analytics collections, not individual ARM resources. |
| Operation/status responses | Swagger false positives | The [10 findings](../../operation-status-findings.md) concern operation, command or ownership-status results. |
| Other GET and local resource-shaped responses | Unassessed | The [inventory](../../evidence-details.md#swagger-diagnostic-inventory) and Resource Health example show selection differences requiring policy review. |

## NOTES

The [group report](../../migration.md) and [evidence](../../evidence-details.md) record revisions, suppression limits and validation results.
