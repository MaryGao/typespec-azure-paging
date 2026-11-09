union PetKind {
  Cat: "cat",
  Dog: "dog",
  string,
}

model Pet {
  kind: PetKind = PetKind.Cat;
}
