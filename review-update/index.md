# DefaultInEnum review update

Candidate: `a477b4ce4c4cf066374bdcabe83e3a6f62b7c02f`.

The proposed rule is now `@azure-tools/typespec-azure-core/use-known-enum-default`. The rule consumes `getUnionAsEnum().allMembers` instead of traversing unions again; that collection preserves colliding inherited values without changing the name-keyed map used by existing consumers.

The revised documentation has one Incorrect and one Correct section, each with named-union and ARM-property subsections. All five actual snippets compiled with expected target counts; the unchanged ARM resource/operation context is supplied by the validation wrapper, not duplicated in the documentation.

[Validation receipt](validation.json) | [Documentation controls](documentation/results.json) | [Original sealed corpus run](../full-regression/index.md)

The focused recovery run passed 139 tests across the rule, helper, rulesets, and casing-style files. An initial full Core attempt had one unrelated 5-second casing-test timeout (514 passed, 2 skipped); that entire file subsequently passed without relaxing its timeout. Five affected package builds, documentation generation, root formatting/lint/engineering type-check, and Chronus verification passed.

The 487-project corpus results remain tied to the original `dd233ce` candidate and its old rule ID. They were not rerun on this review commit. Earlier live CI results likewise do not describe this new candidate; its normal CI rerun is separate.

All three review threads are left unresolved for Timo.
