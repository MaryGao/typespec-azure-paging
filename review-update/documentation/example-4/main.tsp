
import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
@service @armProviderNamespace namespace Microsoft.ReviewExamples;
model WidgetProperties {
  mode: "automatic" | "manual" | string = "automatic";
}

model Widget is TrackedResource<WidgetProperties> {
  ...ResourceNameParameter<Widget>;
}
@armResourceOperations
interface Widgets {
  get is ArmResourceRead<Widget>;
}
