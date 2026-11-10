# Storage: MissingXmsErrorResponse comparison

## 1. Scope

Project: `specification/storage/resource-manager/Microsoft.Storage/Storage`; saved Swagger API `2026-09-01`. Candidate `74e56a0f144190769180d5dbb27179db8b448c9c`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Assessed: **Swagger 0; TypeSpec 0; matched 0; Swagger-only 0; TypeSpec-only 0**. Saved Swagger is verified historical production execution; native lint was freshly and explicitly enabled in source scope, retaining suppressions. No fresh Swagger run or selected-version projection was performed. Default activation is not assessed.

Evidence: [native receipt](evidence/storage/native.json), [saved response inventory](evidence/storage/saved-responses.json), [HTTP/source audit](evidence/storage/correspondence.json), [saved production provenance](evidence/storage/saved-validator-provenance.json), [run](evidence/execution.json).

## 2. Difference inventory

No differing cases. Neither the saved Swagger inventory nor the native project HTTP audit contains an explicit numeric 4xx/5xx response operation. This is a no-explicit-error negative control, not positive evidence that error-marker enforcement catches violations.

## 3. Detailed differences

None observed. Storage does **not** supply a HEAD/404 control in this sample; those five real-project controls come from Deployments. Zero findings must not be interpreted as migration equivalence or as evidence for status-range, payload-marking, or shared-status behavior.
