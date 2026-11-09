# Key Vault Keys data plane: no-request-body comparison

## 1. Scope

Project: `specification/keyvault/data-plane/Keys`; selected Swagger API: `2026-07-01-preview`.
Native revision: `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core revision: `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs revision: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

**assessed.** Swagger target observations: **0**. Native raw/source warnings: **0** (0 GET, 0 DELETE). Differing source observations: **0** (0 Swagger-only, 0 native-only). Native ambient diagnostics: 0.

Audience: data-plane; Swagger policies: `RequestBodyNotAllowed`. TypeSpec rule: `@azure-tools/typespec-azure-core/no-request-body`.

Comparison profile: Fresh native source diagnostics versus explicit RequestBodyNotAllowed Spectral evaluation of checked-in OAS2 at the same frozen specs revision. Separate selected-rule profile, not production AutoRest execution or an ARM baseline.

Source programs and selected Swagger are not version/reachability aligned; client-only and nonselected-version operations remain in source scope. Raw warning counts and Swagger parameter diagnostics use different units; normalized actionable completeness is **not determined**. No full-population equivalence is claimed.

Evidence: [native receipt](evidence/keyvault-keys-data-plane/native.json), [worker input](evidence/keyvault-keys-data-plane/input.json), [execution receipt](evidence/keyvault-keys-data-plane/execution.json), [selected Spectral receipt](evidence/keyvault-keys-data-plane/spectral.json), [selection/provenance](selection.json).

## 2. Difference inventory

No differing observations in this selected population. Matching zero counts are not proof of positive-case equivalence.

## 3. Detailed differences

The fresh native source program compiled successfully with the target explicitly enabled and emitted no target or ambient diagnostics. The selected Swagger population contains 7 GET and 2 DELETE operations. A separate selected-rule Spectral profile loaded the installed production data-plane RequestBodyNotAllowed definition without changing its severity and evaluated the frozen checked-in OAS2 document. This is not an ARM-baseline coverage claim or a full AutoRest production run.

Injected positive and compliant controls demonstrate runtime execution, but this project's zero-finding result does not establish real-spec positive-case equivalence.
