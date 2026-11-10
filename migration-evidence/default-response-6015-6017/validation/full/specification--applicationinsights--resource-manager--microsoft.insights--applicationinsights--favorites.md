# ApplicationInsights/Favorites: full default-response comparison

## 1. Scope

Project: `specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites`; saved Swagger API `2015-05-01`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 5 | 5 | 1.000 |
| RequiredDefaultResponse | 5 | 5 | 0 | 0.000 |

5 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 0 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`routes.tsp:24`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L24) | `Favorites.FavoritesOperationGroup.list` | GET | `Favorites_List` |
| [`routes.tsp:68`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L68) | `Favorites.FavoritesOperationGroup.get` | GET | `Favorites_Get` |
| [`routes.tsp:91`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L91) | `Favorites.FavoritesOperationGroup.add` | PUT | `Favorites_Add` |
| [`routes.tsp:121`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L121) | `Favorites.FavoritesOperationGroup.update` | PATCH | `Favorites_Update` |
| [`routes.tsp:150`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L150) | `Favorites.FavoritesOperationGroup.delete` | DELETE | `Favorites_Delete` |

## 3. Detailed differences

The zero-versus-5 MissingDefaultResponse difference comprises 5 confirmed response-key-selector false negatives on saved wire operations and 0 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Favorites/routes.tsp#L24):

```typespec
/**
   * Gets a list of favorites defined within an Application Insights component.
   */
  @autoRoute
  @get
  @action("favorites")
  list is ArmProviderActionSync<
    Response = {
      @bodyRoot @identifiers(#[]) _: ApplicationInsightsComponentFavorite[];
    },
    Scope = Extension.ResourceGroup,
    Parameters = {
      /**
       * The name of the Application Insights component resource.
       */
      @path
      @segment("components")
      resourceName: string;

      /**
       * The type of favorite. Value can be either shared or user.
       */
      @query("favoriteType")
      favoriteType?: FavoriteType = FavoriteType.shared;

      /**
       * Source type of favorite to return. When left out, the source type defaults to 'other' (not present in this enum).
       */
      @query("sourceType")
      sourceType?: FavoriteSourceType;

      /**
       * Flag indicating whether or not to return the full content for each applicable favorite. If false, only return summary content for favorites.
       */
      @query("canFetchContent")
      canFetchContent?: boolean;

      /**
       * Tags that must be present on each favorite returned.
       */
      @query("tags")
      tags?: string[];
    },
    Error = never
  >
```

The corresponding `GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites` saved response map has no default:

```json
{
  "200": {
    "description": "The request has succeeded.",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/ApplicationInsightsComponentFavorite"
      }
    }
  }
}
```

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-21.json), [concrete operation correspondence](evidence/correspondence/specification--applicationinsights--resource-manager--Microsoft.Insights--ApplicationInsights--Favorites.json), [historical production registration/completion](evidence/full-validator-provenance.json).
