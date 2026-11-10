# specification/machinelearningservices/data-plane/RunHistory: no-request-body

## 1. Scope

**assessed.** Candidate `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Selected Swagger API: `v1.0`.

Audience: data-plane. Native raw warnings: **3** (0 GET, 3 DELETE). Swagger target observations: **3**. Native-minus-Swagger difference: 0. Ambient diagnostics: 0.

Source and selected Swagger are not version/reachability aligned; raw operation warnings and parameter-level Swagger diagnostics are different units. Source suppressions remain honored, default activation is not assessed by target-only workers, and actionable equivalence is undetermined. Evidence: [native receipt](../../data-plane/projects/064-machinelearningservices-runhistory/native.json), [Swagger receipt](../../data-plane/projects/064-machinelearningservices-runhistory/spectral.json), [full summary](../../index.md).

## 2. Difference inventory

- `routes-runs.tsp:131:3`: DELETE operations must not have a request body. Remove the request body.
- `routes-runs.tsp:403:3`: DELETE operations must not have a request body. Remove the request body.
- `routes-runs.tsp:630:3`: DELETE operations must not have a request body. Remove the request body.

## 3. Detailed differences

All **three native warnings correspond one-to-one to three real DELETE-body Swagger observations**. Actual compiler diagnostic Operation identity and declared HTTP service membership establish the source operations; exact resolved HTTP verb/path and each frozen Swagger body parameter establish the wire correspondence. These are deleteRunServices, deleteRunServicesByExperimentId and deleteRunServicesByExperimentName. No client-alias multiplicity occurs in this project. [Complete positive-case correspondence](../../evidence/run-history-positive-investigation.json). Matching counts alone would not have established this result, and these concrete matches do not establish whole-rule equivalence.
