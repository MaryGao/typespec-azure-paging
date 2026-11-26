# RequiredPropertiesMissingInResourceModel migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All 56 approved services were assessed using 57 default-tag Swagger files and 56 unprojected TypeSpec projects; no project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** 68 Swagger findings are false positives for the resource identity check; 6 remain under review. Swagger counts are emitted diagnostics with README configuration, not a proven suppression-inclusive total. See the [inventory](../../evidence-details.md).

## 3. Why diagnostic counts differ

| Response type | Swagger findings | Assessment |
| --- | ---: | --- |
| [Collections and quota lookup](../../collection-findings.md) | 57 | False positives: 50 list envelopes, 6 CDN analytics responses, and 1 Batch quota lookup. |
| Other non-resource responses | 11 | False positives: 10 [operation/status results](../../operation-status-findings.md) and 1 [settings response](../../evidence-details.md#host-settings-response-false-positive). |
| [Other responses](../../evidence-details.md#interpreted-examples-and-outstanding-cases) | 6 | Under review; no confirmed TypeSpec gaps. |

TypeSpec reported zero findings across the projects. The Swagger and TypeSpec versions were not matched case by case.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only `name`, `id`, and `type` on registered ARM resources | Covered for tested cases | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) exercise compliant and invalid identity properties. |
| Collection and quota responses | Swagger false positives | The [57 findings](../../collection-findings.md) concern lists, analytics, or a quota lookup, not individual ARM resources. |
| Other non-resource responses | Swagger false positives | [Operation/status results](../../operation-status-findings.md) and [host settings](../../evidence-details.md#host-settings-response-false-positive) are not individual ARM resources. |
| Other GET and local resource-shaped responses | Unassessed | The [inventory](../../evidence-details.md#swagger-diagnostic-inventory) and Resource Health example show selection differences requiring policy review. |

## NOTES

The [group report](../../migration.md) and [evidence](../../evidence-details.md) record revisions, suppression limits and validation results.
