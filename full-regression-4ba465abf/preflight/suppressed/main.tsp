import "@azure-tools/typespec-azure-core";

union Mode { Automatic: "automatic", Manual: "manual", string }
model Settings {
  #suppress "@azure-tools/typespec-azure-core/use-known-enum-default" "Preserve the existing default."
  mode: Mode = "other";
}
