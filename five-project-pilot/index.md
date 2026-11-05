# DefaultInEnum: five-project validation

**5/5 projects assessed; zero target-rule findings in both the fresh native runs and the verified historical Swagger logs.** This is a bounded ARM pilot, not full regression, data-plane validation, equivalence, or release acceptance.

| Project | API version | Authored `.tsp` files | Saved primary Swagger files | Enum/default sites | Saved Swagger findings | Fresh TypeSpec raw / source | Detail |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| Advisor | 2026-08-01-preview | 13 | 1 | 0 | 0 | 0 / 0 | [Report](advisor.md) |
| Compute | 2026-04-01 | 27 | 1 | 0 | 0 | 0 / 0 | [Report](compute.md) |
| KeyVault | 2026-06-01-preview | 14 | 1 | 1 | 0 | 0 / 0 | [Report](keyvault.md) |
| Network | 2026-03-01 | 133 | 19 | 10 | 0 | 0 / 0 | [Report](network.md) |
| Storage | 2026-09-01 | 32 | 1 | 6 | 0 | 0 / 0 | [Report](storage.md) |
| Total | Five exact project/version pairs | 219 | 23 | 17 | 0 | 0 / 0 | |

All five workers exited successfully; each receipt has an empty ambient-diagnostics array. Counts of authored `.tsp` files above cover the selected project directories, not imported dependencies. `selection.json.sourceFiles` instead counts all retained project inputs, including examples and configuration.

This published subset omits approximately 46 MB of complete historical raw logs. Their hashes, execution messages, and original line numbers are retained in each `historical-validation.json`; full logs remain in the sealed baseline and the requested local report folder's `evidence/<project>/swagger-raw/`. Native receipts/logs, source inventories, control sources, and development logs are included. Absolute paths in receipts identify the original execution environment, not portable checkout paths.

## Scope and comparison policy

The five familiar service families match the local `comp-reports` sample; they are not a statistical sample. [selection.json](selection.json) pins exact paths, versions, revisions, baseline identity, and worker hash.

- Native rule: `@azure-tools/typespec-azure-core/default-in-enum`; Swagger rule: `DefaultInEnum`.
- Native execution: `target-only`, `scope: source`, source suppressions retained, target rule explicitly enabled. Default preset activation is **not assessed** by these runs. The compiler checks the complete source program, not a projection corresponding exactly to the selected emitted API version.
- Swagger comparison: reuse of successful **saved production executions**, not fresh Swagger generation or a new Spectral run.
- Each selected JSONL log was hash-checked against the sealed baseline inventory. Its messages show production selection of `DefaultInEnum` at error severity for both manual and TypeSpec-generated schemas, actual selected-file validation, and successful Spectral return. No target finding was present. The missing `DefaultInEnum` index shard alone was not treated as proof of zero.
- The 17-site inventory is a separate static membership check of the 23 primary Swagger files. It is not a Spectral execution count or a one-to-one inventory of native properties. Historical logs also record validation of shared dependency Swagger files.

[Execution receipt](evidence/execution.json) | [Historical verification](evidence/historical-validation.json) | [Selected baseline hashes](evidence/baseline-subset.json)

## Difference inventory

There are no observed target-rule diagnostic differences to attribute. Advisor and Compute have no primary saved enum/default sites and therefore offer only compilation/activation compatibility evidence. KeyVault, Network, and Storage supply 17 compliant string sites. None of the five real projects supplies an observed violating site or numeric enum/default site.

The per-project reports list every saved site, declared values, defaults, source corroboration, and raw evidence. Property-name matches are supporting evidence, not proof of semantic/schema correspondence. Network's three shared defaults are imported from `Network/Common`, outside the selected project directory.

## Discriminating injected controls

The same injected runtime was exercised before real-project execution:

| Control | Expected / actual raw findings | Result |
| --- | --- | --- |
| Undeclared string default | 1 / 1 | Passed; target diagnostic at `main.tsp:4:18` |
| Undeclared numeric default | 1 / 1 | Passed |
| Declared string/numeric defaults and explicit nullable null | 0 / 0 | Passed |
| Authored target-rule suppression | 0 / 0 | Passed |

The invalid-string control's configuration explicitly disables the target, demonstrating that the worker's explicit comparison activation takes effect. Controls do not add real projects or prove production preset activation. [Control summary](evidence/controls.json); individual inputs, source/configuration, receipts, and logs are under `evidence/controls/`.

The first control worker succeeded with its expected diagnostic, but the session runner initially expected status `assessed` instead of the worker's actual `success`. That harness-only mismatch stopped before any real-project run. Original evidence is retained in [the initial receipt](evidence/controls-initial-runner-status-mismatch.json). The runner now records `workerStatus: success` separately from assessment status; all four controls subsequently passed.

## Candidate and runtime provenance

| Identity | Value |
| --- | --- |
| Draft implementation PR | [Azure/typespec-azure#5973](https://github.com/Azure/typespec-azure/pull/5973), based on and targeting `main` |
| Main base | `f578e3ad757c9e4ea827e7d20212e7c53c303f43` |
| Tested candidate | `2f052caee34c4ba271e56a3e9754524b6d9216e1` |
| Candidate compiler gitlink | `f87a4e2d51c5cc0b3d995d4c7542578d55799804` |
| Frozen specs | `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9` |
| Baseline | `swagger-arm-20261026-2cd3c5dd` |
| Baseline metadata commit | `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6` |
| Baseline identity | `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995` |
| Native worker SHA256 | `8b912c6cee552c9c89946dbba04c5e03c286d89320175e9f332d595d05234609` |
| Native compiler / Azure Core | `1.17.0` / `0.73.0` |
| Saved validator / validator-core / rulesets | `2.2.4` / `1.0.7` / `2.2.6` |
| Node / candidate pnpm / specs pnpm | `26.5.0` / `11.10.0` / `12.6.0` |
| Registry used for installation | `https://packagefeedproxy.microsoft.io/npm/` |

The isolated runtime uses 15 tarballs built from the candidate and its pinned compiler closure. **All 2,867 packed files matched installed bytes, with zero mismatches.** [Artifact archive hashes and installed identities](evidence/runtime-identity.json); every native receipt independently records resolved runtime entrypoints and hashes. The target production source was checked against candidate HEAD.

Selected retained source files, selected Swagger documents, baseline metadata/index, and all 46 selected historical raw/stderr log files were hash-verified. This does not claim complete revalidation of the entire baseline inventory. The original source checkout and other rule tasks were not changed.

## Focused development checks and limitations

Compatible dependency builds, target-rule rebuild, affected-package scoped lint, and scoped formatting completed. The focused rule suite passed **17/17**, and ruleset registration/preset tests passed **14/14**. [Retained development logs](evidence/development/)

The initial numeric regression failed because the pinned compiler interns literal types by a JavaScript-number key: `9007199254740993` and `9007199254740992` collide before this rule can distinguish them. The regression now uses distinguishable nonmember `9007199254740994`, while retaining the valid large-number case. Production code was not changed to parse source text or bypass the compiler. Canonical numeric metadata is preserved where available; arbitrary-precision distinction is not guaranteed by this compiler.

Intentional boundaries remain: compiler errors own invalid closed defaults; explicit nullable null defaults are accepted natively; Swagger severity is error versus native warning; recommended ARM/data-plane presets explicitly disable the new rule. Matching zeros do not erase these differences.

Full package suites, root/type-aware lint, generated references and actual documentation-snippet compilation, full frozen-population coverage, recovery verification, and independent semantic/release reviews remain outstanding. No full corpus or Swagger regeneration was run. PR remains a draft.
