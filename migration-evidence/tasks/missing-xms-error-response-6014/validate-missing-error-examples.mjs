import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const repo = process.argv[2];
const output = process.argv[3];
const require = createRequire(join(repo, "package.json"));
const prettier = require("prettier");
const { Tester } = await import(
  pathToFileURL(join(repo, "packages", "typespec-azure-resource-manager", "test", "tester.ts"))
);
const rule = "@azure-tools/typespec-azure-resource-manager/missing-error-decorator";
const documents = [
  "packages\\typespec-azure-resource-manager\\src\\rules\\missing-error-decorator.md",
  "website\\src\\content\\docs\\docs\\libraries\\azure-resource-manager\\rules\\missing-error-decorator.md",
];
const results = [];
for (const document of documents) {
  const markdown = await readFile(join(repo, document), "utf8");
  const { ast } = await prettier.__debug.parse(markdown, { parser: "markdown" });
  for (const section of ["Incorrect", "Correct"]) {
    let active = false;
    const snippets = [];
    for (const node of ast.children) {
      if (node.type === "heading" && node.depth === 2) {
        active = node.children.map((child) => child.value ?? "").join("") === section;
      } else if (active && node.type === "code" && node.lang === "tsp") {
        snippets.push(node.value);
      }
    }
    assert.equal(snippets.length, 1, `${document}: unique ${section} example`);
    const runner = await Tester.createInstance();
    const [, diagnostics] = await runner.compileAndDiagnose(snippets[0], {
      compilerOptions: { linterRuleSet: { enable: { [rule]: true } } },
    });
    const actual = diagnostics.map(({ code, severity, message }) => ({ code, severity, message }));
    assert.deepEqual(
      actual,
      section === "Incorrect"
        ? [
            {
              code: rule,
              severity: "warning",
              message: "Response status '400' must use a response model marked with @error.",
            },
          ]
        : [],
      `${document}: ${section}`,
    );
    results.push({
      document: document.replaceAll("\\", "/"),
      documentSha256: createHash("sha256").update(markdown).digest("hex"),
      section,
      snippetSha256: createHash("sha256").update(snippets[0]).digest("hex"),
      diagnostics: actual,
    });
  }
}
await writeFile(output, JSON.stringify({ results }, null, 2) + "\n");
process.stdout.write(
  "Verified authored and generated incorrect/correct examples with the registered rule.\n",
);
