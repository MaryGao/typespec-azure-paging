# docLinkLocale migration

## 1. Conclusion and scope

The opt-in TypeSpec rule `@azure-tools/typespec-azure-core/no-localized-doc-links` implements the intended documentation-link policy of Swagger rule [docLinkLocale](https://github.com/Azure/azure-openapi-validator/blob/18a7944e7fc3155e8ef1498665465ed5f455f54a/docs/doc-link-locale.md), rather than reproducing its defective selector. The check is limited to case-sensitive `https://docs.microsoft.com/<locale>/azure/` links in declaration and operation-response documentation.

## 2. Actual coverage

The full comparison used specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b` and TypeSpec candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`.

| Result | Count |
| --- | ---: |
| Swagger-only findings in assessed OAS2 documents | 0 |
| Unique TypeSpec-only source warnings | 52 |
| TypeSpec-only warnings with an exact same-service Swagger description | 52 |
| Raw TypeSpec warnings before deduplication | 100 |
| TypeSpec projects with warnings | 23 |
| Swagger OAS2 documents assessed | 16,237 |
| Localized descriptions in those Swagger documents | 1,666 |

All 52 TypeSpec warnings have a full-description text match after whitespace normalization in a checked-in Swagger document from the same service family. Each also has a matching name in a Swagger pointer, name/value field, or operation ID; see the [identity witnesses](full-validation/identity-witnesses.json). No Swagger `docLinkLocale` finding was observed. TypeSpec was not API-version-projected; the Swagger corpus includes historical versions, so these matches are evidence of correspondence, not proof of API-version or semantic equivalence. The eight findings from the five-project sample are included in these counts.

The [full comparison](full-validation/README.md) includes all affected projects, individual source locations, matching Swagger descriptions, coverage limits, and machine-readable case evidence.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Localized Microsoft documentation link in declaration or operation-response documentation | Covered by TypeSpec | The candidate reports a warning; the Swagger selector prevents its string matcher from checking the description. |
| Locale-free link or different host/path | Covered by TypeSpec | The rule does not warn outside its intended URL pattern. |
| Localized external-document URL or server description | Outside TypeSpec rule scope | These are not declaration or operation-response documentation. |
| OpenAPI 3 document | Not applicable to the Swagger rule | The production Swagger rule is restricted to OAS2. |
| Severity and enablement | Intentional difference | Swagger declares an error; the TypeSpec rule is a warning and disabled in the recommended presets. |

## 4. Why diagnostic counts differ

**Swagger-only: 0.** The rule-only replay produced no `docLinkLocale` findings in 16,237 OAS2 documents, despite finding 1,666 descriptions containing localized links.

**TypeSpec-only: 52.** These unique source warnings span 23 projects and comprise 31 model properties, 12 models, six unions, one union variant, and two operations. All 52 have matching Swagger description text and name evidence. For example, the localized link in [`DiskControllerTypes`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/Compute/models.tsp#L920) also appears in [a checked-in Swagger description](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01/ComputeRP.json#L15664), but Swagger produces no finding.

The Swagger selector supplies a parent object, which its string-only pattern function ignores. A synthetic control also shows that changing only the selector to return the string would not fix the policy: the `match` option would reject a locale-free description rather than report a localized one. The TypeSpec rule intentionally follows the documented policy. API Management's localized `externalDocs.url` fields and Language Question Answering's `@server` description are outside its documentation scope, not additional findings.

## NOTES

- The candidate rule was explicitly enabled with no emission; authored TypeSpec suppressions were retained. Swagger README suppressions were not applied.
- Of 956 primary TypeSpec programs, 955 were assessed. An AWS shared fragment failed standalone but was included in assessed AWS programs. Two of three additional nested entrypoints were assessed; the remaining entrypoint consists only of three imports, all covered by its assessed parent programs. The one configuration without a same-directory entrypoint has four assessed descendant programs. All 35 source files containing literal localized links were included in assessed programs; dynamically constructed links are not covered by this textual check.
- Swagger used the production `docLinkLocale` Spectral rule in a rule-only replay, not a full run of every AutoRest rule. It assessed 16,237 OAS2 documents; 61 OAS3 documents were not applicable, eight marker matches were not OpenAPI roots, and no replay files failed. Five compatible full-validator receipts were reused. An independent literal-key discovery audit found no additional OAS2/OAS3 roots.
- Runtime versions: TypeSpec compiler `1.18.0`, Azure Core `0.74.0`, OpenAPI validator `2.2.4`, validator rulesets `2.2.6`, Spectral core `1.24.0`, Node `26.5.0`. Versioned raw receipts and Swagger results are retained in the local coverage cache.
- The Azure Core build, 33 focused rule tests, 22 ruleset tests, formatting and lint passed. Positive, negative, and suppression controls passed.
