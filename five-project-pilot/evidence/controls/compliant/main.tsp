import "@azure-tools/typespec-azure-core";

union Mode { Automatic: "automatic", Manual: "manual", string }
union Count { Zero: 0, One: 1, int32 }
model Settings {
  mode: Mode = Mode.Automatic;
  count: Count = 0;
  nullable: Mode | null = null;
}
