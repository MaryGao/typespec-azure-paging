
import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
@service @armProviderNamespace namespace Microsoft.DefaultInEnumControls;
model Widget is TrackedResource<WidgetProperties> {
  ...ResourceNameParameter<Widget>;
}

model WidgetProperties {
  mode: "automatic" | "manual" | string = "automatic";
}

@armResourceOperations
interface Widgets {
  get is ArmResourceRead<Widget>;
}
