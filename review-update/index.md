# DefaultInEnum review update

Current candidate: `59641e2ef3f3fc8966dde0f07f5d0d70ed460703`.

The proposed rule is `@azure-tools/typespec-azure-core/use-known-enum-default`. At the user's request, all shared-helper and helper-test changes from the initial review update were reverted. The rule again collects members locally, preserving values that the existing name-keyed map can drop. The naming and documentation improvements remain.

The revised documentation has one Incorrect and one Correct section, each with named-union and ARM-property subsections. All five actual snippets compiled with expected target counts; the unchanged ARM resource/operation context is supplied by the validation wrapper, not duplicated in the documentation.

[Current rollback receipt](helper-revert.json) | [Earlier review validation](validation.json) | [Documentation controls](documentation/results.json) | [Original sealed corpus run](../full-regression/index.md)

The current rollback passed all 48 focused rule/helper/rulesets cases, Core build, root formatting/lint, and Chronus verification. The helper and its test file exactly match their original versions and no longer add changes to this PR.

The earlier `a477b4ce` packet remains historical: its focused recovery run passed 139 tests; an initial full Core attempt had one unrelated 5-second casing-test timeout (514 passed, 2 skipped), followed by a passing recovery without relaxing timeouts. Five affected builds, documentation generation, root formatting/lint/engineering type-check, and Chronus verification passed for that earlier candidate. Its shared-helper API approach has since been removed.

The 487-project corpus results remain tied to the original `dd233ce` candidate and its old rule ID. They were not rerun on either review commit. Earlier live CI results likewise do not describe the current candidate; its normal CI rerun is separate.

All three review threads are left unresolved for Timo.
