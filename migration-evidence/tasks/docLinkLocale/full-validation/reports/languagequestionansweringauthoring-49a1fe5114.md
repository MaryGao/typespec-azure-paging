# specification\cognitiveservices\data-plane\LanguageQuestionAnsweringAuthoring: docLinkLocale differences

## 1. Scope

TypeSpec source programs for `specification\cognitiveservices\data-plane\LanguageQuestionAnsweringAuthoring`, at specs revision `489ca9fba553863941a9e52c73bd0fd390a5d25b`; candidate `aa07faea278fd1d58225687a6b3abaffba8a839b`. Swagger references below are exact normalized-description matches in checked-in OAS2 documents from the same service family, not proof of API-version projection.

## 2. Difference inventory

Unique TypeSpec source warnings: **1**; warnings with at least one exact Swagger description: **1**. **Swagger-only:** none observed in assessed OAS2 documents.

## 3. Detailed differences

The TypeSpec rule checks documentation strings; the Swagger selector passes a parent object to a string-only matcher, so the matching descriptions are not reported.

| TypeSpec warning | Matching Swagger descriptions |
| --- | --- |
| [ModelProperty source, models.tsp:711](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cognitiveservices/data-plane/LanguageQuestionAnsweringAuthoring/models.tsp#L711) | [questionanswering-authoring.json:1371](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cognitiveservices/data-plane/LanguageQuestionAnsweringAuthoring/preview/2023-11-15-preview/questionanswering-authoring.json#L1371) `/definitions/QnaRecord/properties/source/description`<br>[questionanswering-authoring.json:1821](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cognitiveservices/data-plane/LanguageQuestionAnsweringAuthoring/preview/2025-05-15-preview/questionanswering-authoring.json#L1821) `/definitions/ImportQnaRecord/properties/source/description`<br>[questionanswering-authoring.json:2209](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cognitiveservices/data-plane/LanguageQuestionAnsweringAuthoring/preview/2025-05-15-preview/questionanswering-authoring.json#L2209) `/definitions/QnaRecord/properties/source/description`<br>and 5 more |

Complete diagnostics, all matching versions, and input hashes are retained in `analysis.json` and the run receipts.
