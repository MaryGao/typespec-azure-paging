# AzureResourceTagsSchema migration

## 1. Scope

The TypeSpec linter `resource-properties-validation` migrates [`AzureResourceTagsSchema`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/azure-resource-tags-schema.md). Implementation: [Azure/typespec-azure#6164](https://github.com/Azure/typespec-azure/pull/6164).

## 2. Coverage

All 56 approved services were assessed using 57 default-tag Swagger files and 56 unprojected TypeSpec projects; no project failed.

| Count | Swagger linter | TypeSpec linter |
| --- | ---: | ---: |
| Reported diagnostics | 0 | 0 |

**Analysis:** The zero observed diagnostics do not establish parity, version alignment or suppression-inclusive coverage. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ).

## 3. Why diagnostic counts differ

The real-service raw-count difference is **0 − 0 = 0**. A [synthetic nullable-value control](../../evidence-details.md#nullable-string-values-control) reveals different behavior: Swagger accepts nullable string tag values and TypeSpec reports them. This control is not included in the real-service counts.

## 4. Function-level coverage

| Behavior | Result | analysis |
| --- | --- | --- |
| String-valued tags, nullable record and non-string values | Covered for tested cases | [Focused tests](https://github.com/Azure/typespec-azure/blob/76b0e3cdfa4fd0069af4d9d26c265934c6c814b9/packages/typespec-azure-resource-manager/test/rules/resource-properties-validation.test.ts#L84-L178) exercise these cases. |
| Nullable individual string values | Different | The [synthetic control](../../evidence-details.md#nullable-string-values-control) demonstrates Swagger acceptance and TypeSpec rejection. A policy decision remains open. |

## NOTES

The [group report](../../migration.md) and [evidence](../../evidence-details.md) record revisions, suppression limits and validation results.
