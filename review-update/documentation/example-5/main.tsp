
import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
@service @armProviderNamespace namespace Microsoft.ReviewExamples;
model Pet {
  #suppress "@azure-tools/typespec-azure-core/use-known-enum-default" "Preserve the existing API default."
  kind: "cat" | "dog" | string = "bird";
}
