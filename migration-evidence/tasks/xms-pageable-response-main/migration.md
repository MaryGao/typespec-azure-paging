# XmsPageableMustHaveCorrespondingResponse migration

## 1. Conclusion and scope

The TypeSpec linter `@azure-tools/typespec-azure-resource-manager/list-response-envelope`
extends coverage of
[`XmsPageableMustHaveCorrespondingResponse`](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/xms-pageable-must-have-corresponding-response.md).
**Migration equivalence remains undetermined: real-service comparison is deferred
at the author's requested draft-review checkpoint.** The existing strict HTTP 200
envelope policy remains separate from the targeted fallback-response
correspondence check. Warning severity and recommended-ruleset inactivity are
preserved, so this is not default-enforcement or severity parity.

## 2. Actual coverage

No real service projects have been run. The planned frozen ARM population has
487 projects; all remain unassessed by this candidate. This is a local semantic
implementation checkpoint, not a completed migration comparison.

Reported diagnostics below mean individual findings, not project counts.

| Count                             | Swagger linter | TypeSpec linter |
| --------------------------------- | -------------- | --------------- |
| Reported real-project diagnostics | Unassessed     | Unassessed      |

[Why diagnostic counts differ](#4-why-diagnostic-counts-differ) cannot yet be
determined. No zero-findings, overlap, or equivalence claim is made.

## 3. Function-level coverage

| Behavior                                                                       | Local semantic result                                                                   |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Next link excluded from the response body by inherited header/ignored metadata | Detected                                                                                |
| HTTP 202 and default response correspondence                                   | Detected without imposing the strict HTTP 200 envelope                                  |
| HTTP 200 precedence; otherwise lowest numeric success response                 | Covered, including reversed source-union ordering                                       |
| Selected response has no body                                                  | Skipped without falling through to another response                                     |
| Corresponding inherited or explicit-body property                              | Accepted                                                                                |
| Custom fallback names and additional properties                                | Accepted when the named next link is in the body                                        |
| Serialized property name differs from paging metadata                          | Detected; a differently authored property with the matching serialized name is accepted |
| Declared body media types and structured JSON suffixes                         | Checked using native encoded-name metadata                                              |
| Create-only properties retained by the existing emitter policy                 | Accepted; no new read-visibility restriction                                            |
| Existing strict HTTP 200 value/nextLink envelope                               | Preserved                                                                               |
| Real-service behavior, diagnostic correspondence, and package injection        | Unassessed                                                                              |

See [supporting details](evidence-details.md) for the contract and validation limits.

## 4. Why diagnostic counts differ

No real-project diagnostic comparison has run, so differences remain unassessed.
Local tests do not establish corpus agreement. The existing stricter HTTP 200
policy, warning severity, explicit activation, source-to-emission multiplicity,
and per-media-type native checking must be considered in a future comparison,
not assumed equivalent.

## NOTES

This draft checkpoint was explicitly requested before any real service projects
are involved. Artifact packing/injection, shared-baseline recovery and integrity
verification, full frozen-population comparison, count investigations, independent
evidence recovery, and both GitHub migration-review checkpoints remain pending.

The candidate starts from canonical `Azure/typespec-azure:main` at
`ef4b930980a3937ac1ca6ce244b2c98cd64c71eb`, with compiler submodule
`05b9bad7c57b9b58e8fb5390f9bab081a1a9ac31`.
Node is 26.5.0; pnpm is 11.10.0. No emitted-OpenAPI inspection or emitter
dependency is introduced into production rule logic.

The selected shared baseline is `swagger-arm-20261026-2cd3c5dd`; its frozen specs
source is `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`, not the metadata commit
`1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`.
Discovery alone is not baseline-integrity verification or a candidate coverage
run. Any later consumer must verify the sealed data and explicitly use the
supported frozen-reference policy.

Candidate commit: `82587931b7d8892e65fcdbc4a28bf6c493308304`.
The final focused suite passes 56 tests; the full ARM suite passes 786 tests.
Build, owning-package lint, root lint, formatting, documentation examples,
Chronus, and whitespace checks pass. Independent source review found an
encoded-name issue that was corrected and independently reviewed clean.

The first final full-suite attempt had two test timeouts; the one authorized
single-worker diagnostic passes without changing test or hook timeouts.
These results and the remaining migration gates are recorded in
[validation.json](validation.json). This draft is not final migration acceptance.

The documentation-only follow-up restores the original wording and examples with
small correspondence additions. Documentation was regenerated, the two restored
examples were compiled with their required service context, and generated examples
were verified identical. Production code and tests are unchanged from the
previously validated commit `f376baefbdc1fa2fe1486485cda6624d068adf1c`.
