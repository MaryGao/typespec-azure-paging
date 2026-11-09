model Pet {
  #suppress "@azure-tools/typespec-azure-core/use-known-enum-default" "Preserve the existing API default."
  kind: "cat" | "dog" | string = "bird";
}
