# Resource properties validation migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md) and [`AzureResourceTagsSchema`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/azure-resource-tags-schema.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All **56 approved services** were assessed: 57 default-tag checked-in Swagger files and 56 unprojected TypeSpec projects. No project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** All 74 Swagger findings are from the required-properties rule; none are from the tags rule. **67 are false positives; 7 remain under review.** TypeSpec source suppressions were retained. Swagger counts reflect emitted diagnostics with README configuration, not a proven suppression-inclusive total. See the [complete inventory](evidence-details.md).

## 3. Why diagnostic counts differ

| Response type | Swagger findings | Assessment |
| --- | ---: | --- |
| [Collections](collection-findings.md) | 56 | False positives: 50 list envelopes and 6 CDN analytics responses. |
| Other non-resource responses | 11 | False positives: 10 [operation/status results](operation-status-findings.md) and 1 [settings response](evidence-details.md#host-settings-response-false-positive). |
| [Other responses](evidence-details.md#interpreted-examples-and-outstanding-cases) | 7 | Under review; no confirmed TypeSpec gaps. |

TypeSpec reported zero findings across the projects. The Swagger and TypeSpec versions were not matched case by case.

A separate [synthetic control](evidence-details.md#nullable-string-values-control) shows that Swagger accepts nullable string **values** in a tags record, while TypeSpec reports them. This is not a real-service diagnostic in the table; deciding whether to align that behavior remains open.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only resource identity properties | Covered for registered ARM resources | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) cover compliant and invalid identity properties. Swagger's broader response selection and unregistered models remain policy questions. |
| String-valued and nullable tags records | Covered for the tested cases | [Tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L84-L135) cover string tags and a nullable record; the Machine Learning Services warning no longer appears. |
| Nullable individual tag values | Different | The [synthetic control](evidence-details.md#nullable-string-values-control) shows Swagger accepts them but TypeSpec rejects them. |

## NOTES

- **Inputs:** [Specs revision](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba), [TypeSpec revision](https://github.com/Azure/typespec-azure/commit/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9), [scope and execution details](evidence-details.md#revisions-and-limitations).
- **Validation:** The ARM package suite passed 92 files and 1,027 tests at the assessed head. Build/type-check, TypeSpec library lint, changed-file Oxlint and formatting passed. The published evidence does not establish a fresh-checkout replay.
- **Members:** [Required properties](members/RequiredPropertiesMissingInResourceModel/migration.md) and [tags schema](members/AzureResourceTagsSchema/migration.md).
