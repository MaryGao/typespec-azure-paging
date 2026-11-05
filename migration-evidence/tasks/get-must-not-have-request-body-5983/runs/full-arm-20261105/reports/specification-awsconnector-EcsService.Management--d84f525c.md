# specification/awsconnector/EcsService.Management

**Status:** assessed. Saved Swagger findings: **0**; fresh native raw/source findings: **0/0**. Ambient diagnostics: **0**.

| Scope | Value |
|---|---|
| Saved Swagger API version | `2024-12-01` |
| Candidate | `5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b` |
| Frozen specs | `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9` |
| Selected source inventory | 1 TypeSpec files; 9 retained inputs |
| Saved Swagger inventory | 1 documents; 3 GET operations |
| Saved operation-level GET body parameters | 0 |
| Raw Swagger-minus-native difference | 0 |

The project compiled successfully with the target rule explicitly enabled. No target count discrepancy was observed. This clean real project supplies compatibility/compliant-case evidence, not proof of detection on a real violation.

## Diagnostics

No native target findings.

## Evidence and limits

[Native receipt](../native-83.json) | [Worker input](../native-83.input.json) | [Coverage](../coverage.md) | [Historical verification](../preflight/historical-full.json) | [Artifact verification](../preflight/artifact-verification.json).

Historical production logs were hash-verified, explicitly selected GetMustNotHaveRequestBody, validated each saved primary Swagger document and completed successfully. Absence of an aggregate rule shard was not treated as proof of zero findings. Static local/relative parameter-reference resolution corroborates saved GET/body counts.

Native source scope is not a projection aligned to the saved emitted API version. The candidate compiler differs from the historical producer. Source suppressions remain honored; the target is explicitly enabled, so project default activation is not assessed. Injected positive/compliant/suppression controls are separate evidence and not real violating project sites.
