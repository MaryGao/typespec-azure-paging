import "@azure-tools/typespec-azure-core";

union Count { Zero: 0, One: 1, int32 }
model Settings { count: Count = 2; }
