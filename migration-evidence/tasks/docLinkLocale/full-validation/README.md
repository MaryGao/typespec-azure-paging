# docLinkLocale: full-repository comparison

## 1. Scope

Specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; TypeSpec candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. The TypeSpec linter was explicitly enabled, ran without emission, and retained source suppressions. The Swagger linter ran the production `docLinkLocale` Spectral rule on checked-in OAS2 JSON/YAML; five compatible complete-validator executions were reused. This rule-only replay is not a full AutoRest validation of every other rule.

TypeSpec main/client programs are unprojected; Swagger includes historical checked-in versions. Matching complete description text in the same service family is supporting evidence, not proof of semantic or version alignment. Swagger README suppressions were not applied.

Swagger declares this rule as an error; the TypeSpec rule is a warning and is disabled in the recommended presets.

## 2. Difference inventory

| Measure | Count |
| --- | ---: |
| Primary TypeSpec programs assessed / discovered | 955 / 956 |
| Supplemental nested TypeSpec programs assessed / attempted | 2 / 3 |
| TypeSpec programs with failures | 2 |
| Raw TypeSpec warnings in specs (including program duplicates) | 100 |
| Unique TypeSpec source warnings | 52 |
| Unique TypeSpec warnings with an exact same-service Swagger description | 52 |
| Unique TypeSpec warnings without an exact same-service Swagger description | 0 |
| Swagger OAS2 documents assessed | 16237 |
| Localized Swagger descriptions found in assessed OAS2 documents | 1666 |
| Swagger rule diagnostics | 0 |
| Swagger documents with replay failures | 0 |
| OAS3 documents (rule not applicable) | 61 |

**Swagger-only findings:** none observed in assessed OAS2 documents.

**TypeSpec-only:** 52 unique source warnings have an exact matching Swagger description and no corresponding Swagger diagnostic in the assessed corpus. No warnings lacked an exact text match.

Each case also has a matching target name in the Swagger pointer, a name/value field, or an operation ID. The [identity witnesses](identity-witnesses.json) provide one example per case; they do not prove API-version equivalence.

## 3. Detailed differences

The existing Swagger selector passes a parent object to a string-only pattern function; TypeSpec intentionally checks the documentation string instead. Exact source locations, matching Swagger JSON pointers, and up to three Swagger versions per case appear in the project reports. All exact-text matching versions are retained in `analysis.json`. A same-URL-only match is weaker evidence and is not treated as an exact correspondence.

| Project | Unique TypeSpec warnings | With exact Swagger description | Report |
| --- | ---: | ---: | --- |
| `specification\cognitiveservices\data-plane\LanguageQuestionAnsweringAuthoring` | 1 | 1 | [Report](reports/languagequestionansweringauthoring-49a1fe5114.md) |
| `specification\compute\resource-manager\Microsoft.Compute\Bulkactions` | 1 | 1 | [Report](reports/bulkactions-26eb1a9b22.md) |
| `specification\compute\resource-manager\Microsoft.Compute\Compute\Compute` | 2 | 2 | [Report](reports/compute-020916c66e.md) |
| `specification\computebulkactions\ComputeBulkActions.Management` | 1 | 1 | [Report](reports/computebulkactions-management-945904d4e7.md) |
| `specification\computeschedule\resource-manager\Microsoft.ComputeSchedule\ComputeSchedule` | 1 | 1 | [Report](reports/computeschedule-982aecfdf4.md) |
| `specification\containerregistry\resource-manager\Microsoft.ContainerRegistry\Registry` | 1 | 1 | [Report](reports/registry-cfefa2d59c.md) |
| `specification\containerservice\resource-manager\Microsoft.ContainerService\aks` | 2 | 2 | [Report](reports/aks-3bf984ea1d.md) |
| `specification\cost-management\resource-manager\Microsoft.CostManagement\CostManagement` | 3 | 3 | [Report](reports/costmanagement-f3d7cb5d42.md) |
| `specification\databoxedge\resource-manager\Microsoft.DataBoxEdge\DataBoxEdge` | 1 | 1 | [Report](reports/databoxedge-b822726002.md) |
| `specification\databricks\resource-manager\Microsoft.Databricks\Databricks` | 4 | 4 | [Report](reports/databricks-cc23d066fa.md) |
| `specification\datafactory\resource-manager\Microsoft.DataFactory\DataFactory` | 2 | 2 | [Report](reports/datafactory-e9c8116863.md) |
| `specification\machinelearningservices\resource-manager\Microsoft.MachineLearningServices\MachineLearningServices` | 14 | 14 | [Report](reports/machinelearningservices-0fe3f4759b.md) |
| `specification\marketplacecatalog\data-plane\Products` | 3 | 3 | [Report](reports/products-2fc2cd8dd8.md) |
| `specification\marketplacecatalog\data-plane\Search` | 2 | 2 | [Report](reports/search-57f9379d85.md) |
| `specification\marketplacecatalog\resource-manager\Microsoft.Marketplace\Products` | 2 | 2 | [Report](reports/products-9f4ca63b6d.md) |
| `specification\network\resource-manager\Microsoft.Network\Network` | 1 | 1 | [Report](reports/network-42851a2fdc.md) |
| `specification\network\resource-manager\Microsoft.Network\Network\Network` | 1 | 1 | [Report](reports/network-3b1951901b.md) |
| `specification\operationalinsights\resource-manager\Microsoft.OperationalInsights\OperationalInsights` | 1 | 1 | [Report](reports/operationalinsights-fec1883852.md) |
| `specification\security\resource-manager\Microsoft.Security\Security\AlertsAPI` | 3 | 3 | [Report](reports/alertsapi-b5e84ece55.md) |
| `specification\securityinsights\resource-manager\Microsoft.SecurityInsights\SecurityInsights` | 2 | 2 | [Report](reports/securityinsights-fa3e046bde.md) |
| `specification\servicefabric\resource-manager\Microsoft.ServiceFabric\ServiceFabric` | 2 | 2 | [Report](reports/servicefabric-4ec129e7d8.md) |
| `specification\servicefabricmanagedclusters\resource-manager\Microsoft.ServiceFabric\ServiceFabricManagedClusters` | 1 | 1 | [Report](reports/servicefabricmanagedclusters-af4e3deee0.md) |
| `specification\sql\resource-manager\Microsoft.Sql\SQL` | 1 | 1 | [Report](reports/sql-324e783e54.md) |

## 4. Coverage limits and evidence

Failed standalone TypeSpec programs: 2. Failed fragments included by another assessed program: 1; failed import-only fragments with all dependencies assessed in parent programs: 1. Configurations without a same-directory entrypoint: 1; descendant-program coverage is recorded in `analysis.json`. One nested entrypoint was not directly imported by an assessed program; it contains only imports whose dependencies were all assessed, so none remain unresolved. Source files with literal localized links but not imported by an assessed program: 0; this textual audit does not detect dynamically constructed links. See `analysis.json` for exact paths and errors.

Swagger candidate files: 16306; assessed OAS2: 16237; OAS3 not applicable: 61; non-OpenAPI marker matches: 8; replay failures: 0; files in missing chunks: 0. Failed files and missing chunks remain unassessed.

An independent literal-key discovery audit scanned 28491 JSON/YAML files containing `swagger` or `openapi` text and found no additional root OAS2/OAS3 documents or parse failures among the 41 previously unselected files with a version key.

Per-case matches and input hashes are recorded in `analysis.json`. Detailed program receipts and the versioned Swagger replay manifest are retained in the local coverage cache.
