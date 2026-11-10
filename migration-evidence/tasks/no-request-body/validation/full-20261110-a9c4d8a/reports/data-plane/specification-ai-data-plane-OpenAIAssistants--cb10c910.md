# specification/ai/data-plane/OpenAIAssistants: no-request-body

## 1. Scope

**assessed.** Candidate `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Selected Swagger API: `2025-01-01-preview`.

Audience: data-plane. Native raw warnings: **0** (0 GET, 0 DELETE). Swagger target observations: **0**. Native-minus-Swagger difference: 0. Ambient diagnostics: 0.

Source and selected Swagger are not version/reachability aligned; raw operation warnings and parameter-level Swagger diagnostics are different units. Source suppressions remain honored, default activation is not assessed by target-only workers, and actionable equivalence is undetermined. Evidence: [native receipt](../../data-plane/projects/008-ai-openaiassistants/native.json), [Swagger receipt](../../data-plane/projects/008-ai-openaiassistants/spectral.json), [full summary](../../index.md).

## 2. Difference inventory

No differing observations in this selected population. Zero/zero is not proof of positive-case equivalence.

## 3. Detailed differences

The source program compiled successfully with the target explicitly enabled; selected Swagger had no target observations. The separate Spectral worker loads the installed production RequestBodyNotAllowed definition, preserves its severity, validates positive/compliant controls, and evaluates exact frozen Git Swagger blobs and their retained reference closure. No positive-case equivalence claim follows from this result.
