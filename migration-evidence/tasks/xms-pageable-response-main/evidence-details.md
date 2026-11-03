# Supporting details

## Source of truth and native contract

The original [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/native/legacyRules/XmsPageableMustHaveCorrespondingResponse.ts)
is registered as ARM-only, with error severity and ID `R4012`. With a truthy
`x-ms-pageable.nextLinkName`, it selects a response before checking its schema:
literal 200, otherwise the numerically first success key, otherwise default.
If the schema resolves, the named property must exist in the body. A header does
not satisfy this requirement; a missing schema is skipped.

The [issue analysis](https://github.com/Azure/typespec-azure/issues/5844#issuecomment-6462129771)
establishes the native gaps and valid controls. The implementation extends the
existing coherent ARM `list-response-envelope` responsibility rather than adding
a second public rule. Existing automatic library-all membership and the disabled
recommended resource-manager mapping are unchanged.

Native paging metadata points to a source property, but HTTP metadata can exclude
that property from a response body. The added check uses compiler paging metadata,
HTTP response selection, inherited property enumeration, HTTP payload eligibility,
and native encoded names. It does not emit or parse Swagger.

## Representative semantic regression

```typespec
model Base {
  @pageItems value: string[];
  @header @nextLink nextLink?: string;
}
model Page extends Base {}

@list @get op list(): Page;
```

The source property exists, but it is a header rather than a body property.
The rule must diagnose the missing body correspondence. The same issue is
covered for ignored properties and fallback responses. An explicit body that
preserves its child properties remains valid.

## Response-selection and naming controls

The focused suite covers a bodyless 200 before an invalid 202, numerically ordered
201/202 alternatives, a default fallback, and native success ranges. Selecting a
response must not depend on which response happens to have a body.

Fallback bodies may use custom `items`, `cursor`, and additional properties when
the paging name corresponds to a serialized body property. They do not inherit
the existing strict HTTP 200 `value`/`nextLink` envelope restriction.

Independent source review identified an encoded-name gap in the first local
draft: a source property named `cursor` but serialized as `continuation` could
incorrectly satisfy paging metadata naming `cursor`. The correction checks
eligible serialized property names. Controls include a differently authored body
property serialized as `cursor`, structured-suffix JSON, XML, inherited HTTP
metadata, and explicit-body semantics.

## Intentional boundaries and pending investigation

The existing TypeSpec policy is broader than this single Swagger predicate:
it retains strict HTTP 200 envelope naming and shape checks. It is a warning,
not the original error, and remains disabled in the recommended ARM ruleset.
The existing project-authored semantic paging path and ARM-provider collection
path are preserved rather than silently changing the existing audience.

Body correspondence is checked for declared HTTP media types. This native
representation policy can differ from a single canonical Swagger schema in
mixed JSON/XML services. Such differences require explicit investigation in
later coverage; this checkpoint does not claim bug-for-bug emitter equivalence.

Create-only lifecycle properties are not newly rejected: the pinned emitter's
existing schema-sharing behavior can retain them. The production implementation
does not simulate that emitter's global XML strategy or parse its output.

## Validation and replay limits

Only repository-local semantic tests, package checks, documentation examples,
and independent source review are part of this draft checkpoint. Final results,
including failed attempts and bounded retries, are retained in
[validation.json](validation.json).

No candidate packages have been packed or injected. No real-service diagnostics,
count normalization, full-population analysis, evidence download round trip, or
portable coverage replay is claimed. The local execution logs are not published
as portable evidence. Later acceptance requires these deferred gates and both
independent migration-review checkpoints.
