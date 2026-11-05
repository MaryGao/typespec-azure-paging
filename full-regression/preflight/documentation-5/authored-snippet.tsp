model Pet {
  #suppress "@azure-tools/typespec-azure-core/default-in-enum" "Preserve the existing API default."
  kind: "cat" | "dog" | string = "bird";
}
