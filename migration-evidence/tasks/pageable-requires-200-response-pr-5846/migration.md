# PageableRequires200Response

> Published evidence. Required full ARM analysis passed.
> Specs preservation and release-asset download verification passed.
> Both local/GitHub A/B checkpoints are clean on unchanged `68d7ddf`.
> Workflow gates are complete subject to final parent current-head/publication verification.
> PR remains OPEN DRAFT; no merge or ready marking is claimed.

The [publication receipt](publication-receipt.json) links the
[published release](https://github.com/MaryGao/typespec-azure-paging/releases/tag/migration-evidence-pageable-5846-v3)
and exact frozen specs source. The parent verified source-ref readback and all
three fresh asset download lengths/SHA-256 values; this is not regeneration.
The [prior immutable evidence](https://github.com/MaryGao/typespec-azure-paging/blob/8c0784fda238e99a81167d97223e77ec40fc386f/migration-evidence/tasks/pageable-requires-200-response-pr-5846/migration.md)
was published and API-readback verified. [Review receipts](reviews.json) record
separate clean A/B round-1 Balanced reviews, mandatory final collectors and
independent parent verification. Publication/readback of this review append and
the parent's final live checks remain; no production change or rerun was needed.

## 1. Conclusion and scope

The opt-in Azure Core warning detects a genuine common authoring gap: a concrete
next-link pageable POST can return only HTTP 201, including in data-plane APIs.
The existing ARM GET status policy does not supply that common POST/data-plane
check. Actual candidate-package controls show that both the native rule and
production Swagger validator flag the invalid POST and accept its HTTP 200
correction, separately for ARM-provider and data-plane services.

The implementation correction preserves this policy and eliminates duplicate
findings from template traversal. It still checks the authored concrete operation,
including operations reused from a generic interface. Existing ARM defaults are
unchanged. Selecting both the common rule and the existing ARM GET status rule
can legitimately report the same invalid GET; the native documentation explains
that overlap.

This is not a full raw-Swagger equivalence claim. Native next-link metadata does
not cover every legacy `x-ms-pageable` representation, notably
`nextLinkName: null`. Native severity is warning and both standard presets leave
the rule disabled; production Swagger severity is error. Analysis explicitly
enables the native rule and retains source suppressions.

[Frozen identities](task.json) distinguish the tested snapshot from the
source-identical user-authorized checkpoint. PR #5846 remains draft; its checkpoint
push is not review approval or completion.
The corpus profile is production ARM, latest emitted API version per project,
with `http-reachable` source-location filtering. That filtering does not rerun
arbitrary version-dependent paging/status predicates. Data-plane controls do not
constitute a data-plane corpus study.

## 2. Actual coverage

| Population                                  | Selected | Assessed | Unassessed | Swagger raw | Native raw/aligned |
| ------------------------------------------- | -------: | -------: | ---------: | ----------: | -----------------: |
| Same-project representative, API 2021-07-01 |        1 |        1 |          0 |           0 |              0 / 0 |
| Required unfiltered ARM corpus              |      487 |      487 |          0 |           0 |              0 / 0 |

Neither population has affected projects: observed project coverage is N/A,
not 100%. Full overlap, both one-sided sets, both directional excesses and
residuals are empty/zero. Independent observation reanalysis matched every
aggregate and all 487 project rows. Counts compare Swagger occurrences, file-independent JSON paths,
native diagnostics and distinct source targets separately; they are not exact
cross-engine diagnostic identities.

Required local validations already passed: 11 canonical rule cases; the full
Core population of 502 passed and two existing skips out of 504; eight rulesets
tests; seven actual published-example/registered-overlap cases; 28 injected
framework tests without skips; and four paging-specific cross-audience controls.
All 17 candidate archives were verified against the immutable build.

## 3. Function-level coverage

| Audited behavior                                     | Evidence and claim                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Concrete next-link GET/POST lacking numeric 200      | Two native cases; actual ARM/data-plane POST controls each native 1, Swagger 1.                       |
| Numeric 200 compliance                               | Three native cases: implicit, explicit, union; actual explicit-200 controls each native 0, Swagger 0. |
| Default response / 2XX range                         | Two native cases require a distinct numeric 200; emitted-representation parity is unassessed.         |
| No `@list` / no next-link metadata                   | Two native exclusion cases; not a claim about arbitrary Swagger metadata.                             |
| Concrete operation / interface template reuse        | Two regressions assert exactly one warning at the authored operation declaration.                     |
| ARM GET overlap                                      | Three registered-rule controls, within the seven-case published-example suite.                        |
| Default activation and severity                      | Presets remain off; actual positive controls have no default target findings.                         |
| Legacy null next-link / version-sensitive predicates | Declared scope/alignment limits, not covered, retired, or proven rare.                                |

The [complete behavior/test-claim matrix](function-claim-matrix.json) separates
unit-only evidence from actual artifact controls. Its deliberately selected cases
are neither an exhaustive semantic denominator nor an estimate of real-spec
prevalence.

## 4. Why diagnostic counts differ

The full run compiled and validated all 487 projects, emitting 649 Swagger
documents. No failed, unassessed, one-sided or signed-gap project remains to
investigate. This is absence of observed violations, not predicate equivalence
or proof that excluded legacy representations are rare. Nothing was cancelled,
normalized by names, or silently discarded. [Saved reports and observations](runs/full/coverage.md)
retain each project/API version separately.

The original concrete-template regression produced two native findings for one
authored operation. Compiler-supported template declaration/instance filtering
now produces exactly one, with a precise target assertion. This was a native
traversal defect, not an emitter feature.

Earlier failures remain in local receipts. The first representative failed AutoRest
resolution and was unassessed, not compliant; its authorized retry passed, without
proving the transport cause. Recovered Core timeouts retained limits/skips and an
unproven cause. Separately, pushed-checkpoint Ubuntu 22 CI had
one TCGC `use-correct-verb` 10000ms timeout (4398 passed, one failed, four skipped).
Its cause remains unproven. The parent reports that the single authorized CI
rerun, run `40640778232` attempt 2, passed at the unchanged checkpoint; applicable
checks have no failing/pending entries. No source or timeout change was made.

## 5. Examples and required action

The actual [invalid data-plane control](examples/data-plane-incorrect/main.tsp)
uses the supported Core template:

```typespec
@list
@post
@route("/widgets:search")
op searchWidgets is RpcOperation<
  {},
  {
    @statusCode status: 201;
    @body body: Page<Widget>;
  }
>;
```

With the linked imports/service/model setup, native and production Swagger each
report one finding. Changing `201` to `200` in the
[compliant control](examples/data-plane-correct/main.tsp) produces zero in both.
The separate [ARM invalid](examples/arm-incorrect/main.tsp) and
[ARM compliant](examples/arm-correct/main.tsp) controls agree, without claiming
registered ARM resource-operation validation.

No additional production semantic change is demonstrated by this corpus.
Keep the production validator: zero observed violations cannot justify retirement,
and legacy raw-Swagger boundaries are not full parity. See
[supporting evidence and replay preparation](evidence-details.md) for frozen
source retention, artifact/runtime identities and reproduction limits.
