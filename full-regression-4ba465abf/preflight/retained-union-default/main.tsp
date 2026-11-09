import "@azure-tools/typespec-azure-core";
union First { Value: "first" }
union Second { Value: "second" }
union Kind { First, Second, string }
model Settings { value: Kind = "second"; }