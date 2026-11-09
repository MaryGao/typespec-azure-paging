import { strict as assert } from "node:assert";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repo = process.argv[2];
const require = createRequire(
  path.join(repo, "packages", "typespec-azure-resource-manager", "package.json"),
);
const load = (name) => import(pathToFileURL(require.resolve(name)).href);
const { createTester } = await load("@typespec/compiler/testing");
const { $linter } = await load("@azure-tools/typespec-azure-core");
const tester = createTester(path.join(repo, "packages", "typespec-azure-playground-website"), {
  libraries: [
    "@typespec/http",
    "@typespec/rest",
    "@typespec/versioning",
    "@typespec/openapi",
    "@azure-tools/typespec-azure-core",
    "@azure-tools/typespec-azure-resource-manager",
    "@azure-tools/typespec-azure-rulesets",
    "@azure-tools/typespec-client-generator-core",
  ],
});
const rule = "@azure-tools/typespec-azure-core/no-request-body";
const results = [];

async function check(name, code, linterRuleSet, expected) {
  const instance = await tester.createInstance();
  const [, diagnostics] = await instance.compileAndDiagnose(code, {
    compilerOptions: { linterRuleSet },
  });
  const errors = diagnostics.filter((d) => d.severity === "error");
  assert.deepEqual(
    errors.map((d) => `${d.code}: ${d.message}`),
    [],
    name,
  );
  const target = diagnostics.filter((d) => d.code === rule);
  assert.equal(target.length, expected, `${name}: target diagnostic count`);
  assert.ok(
    target.every((d) => d.severity === "warning" && d.target.kind === "Operation"),
    name,
  );
  results.push({
    name,
    targetCount: target.length,
    ambientCount: diagnostics.length - target.length,
    messages: target.map((d) => d.message),
  });
}

const doc = await readFile(
  path.join(repo, "packages", "typespec-azure-core", "src", "rules", "no-request-body.md"),
  "utf8",
);
const snippets = [...doc.matchAll(/```tsp\r?\n([\s\S]*?)```/g)].map((match) => match[1]);
assert.equal(snippets.length, 4);
for (let index = 0; index < snippets.length; index++) {
  const setup =
    index % 2 === 0
      ? `
        import "@typespec/http";
        import "@azure-tools/typespec-azure-core";
        using TypeSpec.Http;
        using Azure.Core;
        model Widget { name: string; }
      `
      : `
        import "@typespec/http";
        import "@typespec/rest";
        import "@azure-tools/typespec-azure-resource-manager";
        using TypeSpec.Http;
        using Azure.ResourceManager;
        @armProviderNamespace namespace Microsoft.Contoso;
        model Widget is TrackedResource<{}> {
          ...ResourceNameParameter<Widget>;
        }
      `;
  await check(
    `documentation example ${index + 1}`,
    setup + snippets[index],
    { enable: { [rule]: true } },
    index < 2 ? 2 : 0,
  );
}

const controls = `
  import "@typespec/http";
  import "@azure-tools/typespec-azure-core";
  using TypeSpec.Http;
  @service namespace Example;
  @route("/read") @get
  op read(@body filter: { name: string }): string;
  @route("/remove") @delete
  op remove(@body options: { force: boolean }): void;
`;
await check("explicit opt-in", controls, { enable: { [rule]: true } }, 2);
const disable = Object.fromEntries(
  $linter.rules
    .filter((r) => r.name !== "no-request-body")
    .map((r) => [`@azure-tools/typespec-azure-core/${r.name}`, "isolate new rule activation"]),
);
await check(
  "Core library all",
  controls,
  { extends: ["@azure-tools/typespec-azure-core/all"], disable },
  2,
);
for (const preset of ["data-plane", "resource-manager"]) {
  await check(
    `${preset} preset default inactivity`,
    controls,
    { extends: [`@azure-tools/typespec-azure-rulesets/${preset}`] },
    0,
  );
}
await writeFile(process.argv[3], JSON.stringify(results, null, 2) + "\n");
console.log(JSON.stringify(results, null, 2));
