import "@azure-tools/typespec-azure-core";

union Mode { Automatic: "automatic", Manual: "manual", string }
model Settings { mode: Mode = "other"; }
