# Resource properties validation migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`RequiredPropertiesMissingInResourceModel`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/required-properties-missing-in-resource-model.md) and [`AzureResourceTagsSchema`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/azure-resource-tags-schema.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All **56 approved services** were assessed: 57 default-tag checked-in Swagger files and 56 unprojected TypeSpec projects. No project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 74 | 0 |

**Analysis:** All 74 Swagger diagnostics are from the required-properties rule; none are from the tags rule. The TypeSpec linter reported none. **60 Swagger findings are false positives**: 50 collection responses and 10 operation/status responses. The other 14 require review. The populations are not version-aligned. Source suppressions were retained; Swagger counts are emitted diagnostics with README configuration, not a proven suppression-inclusive total. A synthetic control also found a nullable-tag-value difference. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ) and the [complete inventory](evidence-details.md).

## 3. Why diagnostic counts differ

| Difference (with evidence) | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis |
| --- | ---: | ---: | --- |
| [Collection-response envelopes](collection-findings.md) | 50 | 0 observed in the projects | Swagger false positives for resource-envelope identity checks: these models are collection responses, not individual ARM resources. |
| [Operation/status responses](operation-status-findings.md) | 10 | 0 observed in the projects | Swagger false positives: these are operation, command or ownership-status results, not individual ARM resources. |
| [Resource Health `availabilityStatus`](evidence-details.md#interpreted-examples-and-outstanding-cases) | 1 | 0 observed in the project | Its resource-shaped TypeSpec model extends a local `ProxyResource`, while the TypeSpec linter checks registered ARM resources. The endpoint is described as non-resource; whether it belongs in the rule's policy remains unresolved. |
| [Other Swagger responses](evidence-details.md#swagger-diagnostic-inventory) | 13 | 0 observed in the projects | Examples include quota, analytics and settings responses. Individual classification and version alignment remain incomplete. |

**Raw-count reconciliation:** 74 − 0 = 50 + 10 + 1 + 13. TypeSpec zeros are project-level observations, not proof of case-by-case equivalence.

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
