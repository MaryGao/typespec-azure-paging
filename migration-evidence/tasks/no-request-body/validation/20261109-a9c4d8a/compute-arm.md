# Compute ARM: no-request-body comparison

## 1. Scope

Project: `specification/compute/resource-manager/Microsoft.Compute/Compute/Compute`; selected Swagger API: `2026-04-01`.
Native revision: `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core revision: `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs revision: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

**assessed.** Swagger target observations: **0**. Native raw/source warnings: **0** (0 GET, 0 DELETE). Differing source observations: **0** (0 Swagger-only, 0 native-only). Native ambient diagnostics: 0.

Audience: arm; Swagger policies: `GetMustNotHaveRequestBody`, `DeleteMustNotHaveRequestBody`. TypeSpec rule: `@azure-tools/typespec-azure-core/no-request-body`.

Comparison profile: Fresh native source diagnostics versus immutable historical ARM production observations.

Source programs and selected Swagger are not version/reachability aligned; client-only and nonselected-version operations remain in source scope. Raw warning counts and Swagger parameter diagnostics use different units; normalized actionable completeness is **not determined**. No full-population equivalence is claimed.

Evidence: [native receipt](evidence/compute-arm/native.json), [worker input](evidence/compute-arm/input.json), [execution receipt](evidence/compute-arm/execution.json), [selected Spectral receipt](evidence/compute-arm/spectral.json), [historical production evidence](evidence/compute-arm/historical.json), [selection/provenance](selection.json).

## 2. Difference inventory

No differing observations in this selected population. Matching zero counts are not proof of positive-case equivalence.

## 3. Detailed differences

The fresh native source program compiled successfully with the target explicitly enabled and emitted no target or ambient diagnostics. The selected Swagger population contains 84 GET and 21 DELETE operations. Hash-verified historical production logs register both ARM policies, validate the selected saved Swagger, and complete successfully. A fresh explicit-rule Spectral evaluation of the same saved Swagger also reports zero.

Injected positive and compliant controls demonstrate runtime execution, but this project's zero-finding result does not establish real-spec positive-case equivalence.
