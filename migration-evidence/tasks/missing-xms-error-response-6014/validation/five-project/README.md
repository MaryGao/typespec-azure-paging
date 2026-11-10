# MissingXmsErrorResponse: approved five-project pilot

| Project | Saved Swagger | Fresh native | Matched | Swagger-only | Native-only |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Automation](automation.md) | 1 | 1 | 1 | 0 | 0 |
| [Deployments](deployments.md) | 5 | 5 | 5 | 0 | 0 |
| [Search](search.md) | 3 | 7 | 3 | 0 | 4 |
| [Solutions](solutions.md) | 4 | 5 | 4 | 0 | 1 |
| [Storage](storage.md) | 0 | 0 | 0 | 0 | 0 |
| **Total** | **13** | **18** | **13** | **0** | **5** |

All 13 selected historical findings match concrete native route/verb/status/source operations. Four native-only warnings inspect Search SDK customizations outside its service; one covers a Solutions response emitted under `x-ms-paths`, which the legacy selector ignores. There are no unexplained or Swagger-only findings in this selected sample. Deployments additionally verifies five HEAD/404 exemptions; Storage is a no-explicit-error negative control.

**Boundaries:** five purposively selected projects, not the full corpus. Swagger results are preserved production executions from baseline `swagger-arm-20261026-2cd3c5dd`, not fresh runs. The baseline content seal, relevant indexes, 1,600 selected retained source files, Swagger inputs and raw validator logs were hash-verified against frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Native candidate is `74e56a0f144190769180d5dbb27179db8b448c9c`, core `8574d5453f7bf9a07dc09bd41edac579af71d94b`.

The existing pinned native worker was invoked directly for this bounded pilot, rather than passing unsupported filters to the full shared-baseline analyzer. Native mode is `target-only`, scope `source`; suppressions are retained, and default activation and selected-version projection are not assessed. All five project receipts are assessed, with no compile failures.

All 15 injected package archives matched installed payloads byte-for-byte. Five injected controls verify unmarked 400/500 detection, HEAD/404 exemption versus HEAD/500, marked envelopes, marked-body-only rejection and source suppression, even when configuration disables the target.

Evidence: [selection](selection.json), [baseline verification](evidence/baseline-subset.json), [runtime identity](evidence/runtime-identity.json), [controls](evidence/controls.json), [execution](evidence/execution.json), [correspondence summary](evidence/audit-summary.json).

This is partial migration evidence, not release readiness. The native implementation and PR #6028 remain unchanged. The user subsequently approved full validation with the same historical Swagger baseline; its outcome is reported separately.
