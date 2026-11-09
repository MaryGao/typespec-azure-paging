
import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
@service @armProviderNamespace namespace Microsoft.ReviewExamples;
union PetKind {
  Cat: "cat",
  Dog: "dog",
  string,
}

model Pet {
  kind: PetKind = PetKind.Cat;
}
