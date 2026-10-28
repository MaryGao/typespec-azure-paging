# Supporting evidence and replay preparation

This is published evidence with a local final review-receipt append. Full-corpus execution
and numerical investigations passed. Local replay receipts are linked below;
the parent verified source-ref readback and all three fresh asset downloads.
The parent published immutable compact evidence `8c0784f` and verified migration-note
API readback. Separate local source/readiness reviews and GitHub A/B checkpoints
are clean on unchanged `68d7ddf`; [review receipts](reviews.json) retain exact
review IDs/UTCs, Balanced reliability and independent parent verification.
Workflow gates are complete subject to parent final current-head/publication
verification and publication/readback of this append. PR remains OPEN DRAFT.
The [publication receipt](publication-receipt.json) retains stable source/release
links and verified download byte lengths/SHA-256 values.
Read [migration.md](migration.md) before interpreting isolated test totals.

## Sources and ownership

- Native PR: `Azure/typespec-azure#5846`.
- Preserve its exact head repository/branch:
  `MaryGao/typespec-azure-paging:fix/pageable-requires-200-response`.
- Tested immutable snapshot S:
  `c4497d2c5a034f2cefb2be403b616ba883d036eb`.
- Snapshot tree:
  `eab9878c52b99f4a6104130ab07e694d5d5513a4`.
- Original native head and S prerequisite:
  `13631cdad77c33d5e11d7f75aaf6190a426ab7fb`.
- User-authorized outer LOCAL checkpoint C:
  `68d7ddf11a93dd52f0efedebc36c67c925afc64b`.
  C has the same tree as S, verified independently. At a separate explicit user
  request, the outer coordinator pushed this checkpoint normally to the exact
  existing fork branch and verified draft PR #5846 at C. This is not final
  review/validation approval. Do not rerun solely for commit/push metadata.
- Candidate Core gitlink:
  `fbb44a7037e1eda84fd108a96aaaffc8a7dc045a`.
- Frozen specs:
  `Azure/azure-rest-api-specs@2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.
- Frozen tooling:
  `Azure/typespec-azure@729b948037d6c2d71284c929ec2f2d96d2a7793f`.
- Validator semantic intake:
  [frozen Common selector](https://github.com/Azure/azure-openapi-validator/blob/9fb5ab82feac40d7273cbcb227fb565c9cc18f06/packages/rulesets/src/spectral/az-common.ts#L295-L306).
  Runtime production package identities, not this source revision alone, identify
  the code actually executed.

The implementation/instruction checkout is untouched. Native changes, snapshot,
tooling, specs, evidence and output resources have separate ownership. No other
paging PR is part of this task. All independent local/GitHub reviews and every
push/source/evidence/asset publication approval remain outer-owned. The parent
reports that separate independent local development and readiness reviews passed
without significant issues. Both GitHub checkpoints completed clean in round 1/5,
with review-specific empty comments/threads, mandatory final collectors and
independent parent bundled collection at each exact numeric review/head. Reviewer
agents are idle; no fixes or semantic repair cycles were needed.

## Validation and artifact claims

The canonical 11-case rule suite preserves exact one-finding/operation-target
assertions for both template reuse paths. Core build/lint, rulesets build/eight
tests, docs regeneration, changed-document formatting and Chronus status passed.

The approved entire Core profile was:

```powershell
pnpm --dir packages\typespec-azure-core exec vitest run --pool=threads --maxWorkers=1
```

It discovered the original 60 files/504 tests: 502 passed, and the same two
existing `no-openapi.test.ts` `@example`/`@useRef` skips. The default 5000ms test
and 10000ms hook limits were unchanged. Earlier full-suite timeout failures and
the separately built baseline/draft 89-case comparison receipts remain retained;
the original timeout cause is unproven.

The 17-package compatible artifact closure consists of six Azure archives and
11 Core archives. Azure and Core use their separate frozen Chronus policies.
Every archive's package identity, SHA-256, full member inventory and packed
compiled-file equality were checked against the independently built snapshot.
Original Azure bytes were not overwritten. Core packaging eventually used the
verified installed Chronus directly, avoiding a pnpm execution preflight.
Interrupted installation metadata and failed packaging receipts are retained
locally; do not describe that installation as unchanged.

Actual frozen-specs integration used candidate `tsp-integration` patch/install
stages only, never checkout/reset. It restored original specs package/workspace/
source-lock bytes. Existing injected framework controls passed 28/28, no skips.
Those are framework/no-boolean controls, not paging parity.

Four paging-specific fixtures use the same actual compiler/emitter/linter
artifacts and actual production ruleset loader/Spectral runner. ARM-provider
common POST and data-plane POST each have an incorrect 201 and compliant 200
case. Their genuine unchanged emitted Swagger `info.version` is `0000-00-00`;
it is passed to the official `http-reachable` worker, not used to implement the
native rule. Incorrect cases are native raw/aligned/production 1/1/1; compliant
cases are 0/0/0. Production rule enablement is not manufactured.

Actual loaded packages include compiler/HTTP 1.17.0, Azure Core/ARM/rulesets
0.73.0, AutoRest emitter 0.73.2, AutoRest launcher 3.8.0, validator 2.2.4,
validator-core 1.0.7 and validator-rulesets 2.2.6. The separately downloaded
required AutoRest core is 3.10.9; 222 installed package files were hashed.
This bootstrap cache is not automatically included in the analyzer's baseline
fingerprints. No complete transitive engine-locking claim is made. Registry
dependencies, including the actual openapi3 development package, are not
misrepresented as candidate-built code.

## Comparison policy and commands

All execution checkouts and dataset outputs are under the worktrees boundary.
Use Node 26.12.1, native/tooling pnpm 11.10.0, and specs-declared pnpm 12.6.0.
The analyzer itself is invoked through Node with the **specs** pnpm on `PATH`.
Do not install the legacy linked local-linter profile.

Invocation-scoped environment:

```powershell
$env:PNPM_CONFIG_REGISTRY = 'https://packagefeedproxy.microsoft.io/npm/'
$env:PNPM_CONFIG_FETCH_RETRIES = '0'
$env:npm_config_registry = 'https://packagefeedproxy.microsoft.io/npm/'
$env:npm_config_fetch_retries = '0'
$env:autorest_registry = 'https://packagefeedproxy.microsoft.io/npm/'
```

Set `TEMP`/`TMP` to the task-owned staging area under worktrees, not OS temp.
Set invocation-scoped Git long-path configuration; use read-only Git operations
without optional index locks. Never weaken registry/integrity/TLS/supply-chain
policy to recover a failure.

From the frozen tooling `packages\typespec-lintdiff` directory, after validating
the clean candidate/specs and full artifact closure:

```powershell
node --import tsx/esm test\harness\native-coverage.ts `
  --candidate-repo "$Worktrees\snapshot-pageable-requires-200-response-5846" `
  --specs-repo "$Worktrees\specs-pageable-requires-200-response-5846" `
  --tgz-dir "$Worktrees\candidate-artifacts-pageable-requires-200-response-5846" `
  --validator-rule PageableRequires200Response `
  --tsp-rule @azure-tools/typespec-azure-core/pageable-requires-200-response `
  --scope http-reachable --concurrency 2 `
  --output "$Worktrees\NEW-empty-full-run"
```

The representative adds literal `--filter ComputeSku --limit 1`; the full run
does not. No moving source ref is refreshed between them. The analyzer's normal
candidate patch/install stages are intrinsic to the comparison; no unrelated
workspace reinstall or manual refresh is authorized.

Production AutoRest uses local installed validator extension, `--v3 --spectral
--azure-validator --semantic-validator=false --model-validator=false
--message-format=json --openapi-type=arm --openapi-subtype=arm`. Readme
suppressions are not applied. Source-native suppressions remain effective.
Latest emitted Swagger API version is selected per project, with referenced
document attribution and relative-reference closure retained.

Failed compile/validation/native/projection projects stay unassessed. A failed
CLI is not compliant or a reusable successful baseline. Raw validator
occurrences, file-independent JSON paths, raw/aligned diagnostics and distinct
native source targets are separate units; no fuzzy-name normalization is used.
Every one-sided project and both count-gap directions require investigation.

## Recovery paths and published evidence

The original unfiltered run assessed all 487 selected ARM projects, with no
compile/validation/native failure or unassessed project. Its 649 emitted Swagger
documents produced 222905 observations across 121 rules; those are **all-rule**
counts. The selected PageableRequires200Response has zero raw/path observations,
and native raw/aligned/default/source-target counts are all zero. Both one-sided
sets and both signed-gap directions are empty. Independent reanalysis matched
every aggregate and all 487 rows. Coverage percentage is N/A; semantic equivalence
remains undetermined. Positive/compliant controls, not this zero-positive corpus,
establish activation and the evidenced common POST policy.

The immutable original baseline identity is
`392e4b32fe44923ddbf82b02a8908401e6ea9852580a45cc15a9e4d3d3c9d39a`.
It inventories 93496 dataset files. Local [asset preparation](asset-preparation.json)
distinguishes its original identity from the privacy-sanitized derivative.
All archived members are read back and SHA-256 verified before handoff.
Sanitization aliases execution roots; it does not change selected diagnostic
arrays or official coverage bytes. The derivative has a freshly computed file
inventory/identity, not the original seal. The
[baseline portability receipt](baseline-portability.json) distinguishes saved-context
schema/compatibility checks from fresh-engine reuse, which is not claimed.
Windows dataset separators are retained; cross-platform sealed CLI reuse is not
claimed. Compact `runs/full` inputs are extracted numerical observations, not
a complete reusable dataset; the archive retains the full relative-reference
closure. No installed `node_modules` directory is published.

The corrected local provenance guard compares complete metadata per unique
package name, rejects conflicting repeated records and missing/unexpected
identities, and checks current entrypoint hashes. All 487 saved receipts match
the same 11 unique runtime identities. Of these, seven are candidate packages
and four are recorded registry validator/launcher packages. 261 receipts repeat
the identical rulesets record; 226 contain it once, consistent with the producer's
per-load recording. The failed exact-array guard and reconciliation remain local.

Outer-reported Ubuntu 22 CI has one TCGC `use-correct-verb.test.ts` timeout in
“standard ARM operations checks put aliases and common overrides”, at unchanged
10000ms; 4398 passed, one failed, four skipped. Cause is unproven. The parent reports the single authorized rerun, run
`40640778232` attempt 2 / Ubuntu Node 22 job `122722293359`, passed at unchanged
checkpoint `68d7ddf`; current applicable checks have no failing/pending entries.
The worker did not run CI or modify source/timeouts.

1. **Read saved evidence:** compact sanitized source/runtime/artifact manifests,
   reports and directly linked examples were published in the
   [prior immutable evidence commit](https://github.com/MaryGao/typespec-azure-paging/tree/8c0784fda238e99a81167d97223e77ec40fc386f/migration-evidence/tasks/pageable-requires-200-response-pr-5846).
   The approved durable large assets are published and fresh-download verified.
   This final local review append still requires parent publication/readback;
   it does not refer circularly to its own future commit.
2. **Reanalyze saved observations:** the dependency-free
   `reanalyze-observations.py` reads actual selected-rule validator shards,
   dataset projects and native receipts, recomputes per-project/count-direction
   metrics and compares them with the saved report. It has already matched the
   representative and full corpus independently. The extracted archive and compact
   inputs are checked in [full archive](full-public-archive-reanalysis.json),
   [compact full](full-compact-reanalysis.json) and
   [compact representative](representative-compact-reanalysis.json) receipts.
   This is not a native/validator rerun or fresh-runtime compatibility validation.
3. **Regenerate coverage:** recover frozen specs, exact snapshot/Core/tooling,
   artifact closure and runtime identities; restore the recorded package manager/
   approved feed; rerun controls and the required full analysis/investigations.
   Do not promise identical counts or prose without a fresh verified execution.

A minimal Git bundle for S has been locally verified against original parent
13631cd. It preserves S without advancing the native branch and contains public
noreply snapshot metadata. Its [local source replay](source-replay.json) recovered
the public prerequisite into a new independent checkout, verified/fetched the
bundle and checked out the exact clean snapshot/tree without copying development
dirt or object alternates. Public frozen Core/specs manifest, lock and license
bytes were also matched; full Core/specs checkouts and regeneration were not run.
That local source replay is distinct from the parent's separately verified
release-asset fresh-download/hash roundtrip; no source or diagnostic rerun was
performed after downloading.
The [source-retention manifest](source-retention.json) records exact frozen
source tuples, bundle prerequisites and original source licenses. Retain the
committed `source-licenses` files with downloaded source snapshots.

Published source retention is the verified personal specs fork
`MaryGao/azure-rest-api-specs`, ref
`migration-source/pageable-requires-200-response-5846`, at the exact frozen specs
SHA. The parent verified exact remote readback at
[`2cd3c5d`](https://github.com/MaryGao/azure-rest-api-specs/tree/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9).
Evidence fork/ref is
`MaryGao/typespec-azure-paging:migration-evidence/pageable-requires-200-response-5846`,
published at prior immutable commit `8c0784fda238e99a81167d97223e77ec40fc386f`
with migration-note API readback verified. The parent will separately publish
this review-receipt append and perform final live verification. The
[non-draft V3 release](https://github.com/MaryGao/typespec-azure-paging/releases/tag/migration-evidence-pageable-5846-v3)
targets the unchanged native checkpoint. All three exact assets were freshly
downloaded and matched their retained sizes/SHA-256 values. Fresh-runtime baseline
reuse and regeneration remain unclaimed. Machine-specific paths/private receipts
must not enter the compact commit. No expiry-only CI artifact is durable evidence.

The [privacy provenance receipt](privacy-public-payload-provenance.json) records
all 449 public path-bearing files and their exact hash/source/pointer or source-line
identity. Generic public payload/documentation paths remain unchanged; task/home
paths are aliased and execution logs stay local. V1 and incomplete V2 remain
local failure artifacts and must not be uploaded. Only the three verified assets
in `asset-preparation.json` were published; stable download links are in the
[publication receipt](publication-receipt.json).
The [final compact-evidence audit](final-evidence-audit.json) records the two
installation-metadata path aliases and refreshed compact file hashes. Original
raw receipts remain local; no archive, corpus or unaffected replay was rerun.

For saved-observation replay, extract `full-arm-sanitized-evidence-v3.zip` into a
new directory, then run `python reanalyze-observations.py EXTRACTED NEW-report.json`.
Run the same helper with `runs/full` or `runs/representative` for compact input.
The helper uses only Python's standard library. Verify asset SHA-256 values
before extraction; these commands do not execute either linter.
