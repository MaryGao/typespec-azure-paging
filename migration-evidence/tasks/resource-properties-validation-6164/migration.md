# Resource properties validation migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md) and [`AzureResourceTagsSchema`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/azure-resource-tags-schema.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All **56 approved services** were assessed: 57 default-tag checked-in Swagger files and 56 unprojected TypeSpec projects. No project failed.

| Result | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |
| False positives | 74 | 0 |
| Confirmed violations among reported diagnostics | 0 | 0 |

**Final analysis:** No migration gaps were identified across the **56 approved services**. All 74 Swagger diagnostics flagged responses that were not individual ARM resources: **57 collection or quota responses** and **17 other non-resource responses**. The TypeSpec rule checks only registered ARM resources. Neither linter reported tags-schema diagnostics. See the [case breakdown](#3-why-diagnostic-counts-differ).

These are observed results, not a version-matched or suppression-inclusive parity claim. See the [validation scope and limitations](evidence-details.md#population).

## 3. Why diagnostic counts differ

| Response type | Swagger findings | Assessment |
| --- | ---: | --- |
| [Collections and quota lookup](collection-findings.md) | 57 | False positives: 50 list envelopes, 6 CDN analytics responses, and 1 Batch quota lookup. |
| Other non-resource responses | 17 | False positives: 10 [operation results](operation-status-findings.md), 4 [configuration and status responses](evidence-details.md#configuration-and-status-response-false-positives), and 3 [other GET responses](evidence-details.md#interpreted-examples-and-outstanding-cases). |

No findings remain under review, and no TypeSpec gaps were confirmed in the scoped comparison. The Swagger and TypeSpec versions were not matched case by case.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| Read-only resource identity properties | Covered for registered ARM resources | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L23-L78) cover compliant and invalid identity properties. |
| String-valued and nullable tags records | Covered for the tested cases | [Tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L84-L135) cover string tags and a nullable record; the Machine Learning Services warning no longer appears. |

## NOTES

- **Inputs:** [Specs revision](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba), [TypeSpec revision](https://github.com/Azure/typespec-azure/commit/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9), [scope and execution details](evidence-details.md#revisions-and-limitations).
- **Validation:** The ARM package suite passed 92 files and 1,027 tests at the assessed head. Build/type-check, TypeSpec library lint, changed-file Oxlint and formatting passed. The published evidence does not establish a fresh-checkout replay.
- **Members:** [Required properties](members/RequiredPropertiesMissingInResourceModel/migration.md) and [tags schema](members/AzureResourceTagsSchema/migration.md).
