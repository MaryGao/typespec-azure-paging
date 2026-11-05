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
