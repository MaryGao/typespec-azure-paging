import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const selection = JSON.parse(fs.readFileSync(path.join(root, "selection.json"), "utf8"));
const fromSpecs = createRequire(path.join(selection.specs, "package.json"));
const validatorEntry = fromSpecs.resolve("@microsoft.azure/openapi-validator");
const fromValidator = createRequire(validatorEntry);
const rulesetEntry = fromValidator.resolve("@microsoft.azure/openapi-validator-rulesets");
const fromRulesets = createRequire(rulesetEntry);
const production = fromValidator("@microsoft.azure/openapi-validator-rulesets");
const { Spectral, Document } = fromRulesets("@stoplight/spectral-core");
const { Json } = fromRulesets("@stoplight/spectral-parsers");
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
const profiles = {
  arm: {
    source: production.spectralRulesets.azARM,
    rules: ["GetMustNotHaveRequestBody", "DeleteMustNotHaveRequestBody"],
  },
  "data-plane": {
    source: production.spectralRulesets.azDataplane,
    rules: ["RequestBodyNotAllowed"],
  },
};
const linterByAudience = {};
const registration = {};
for (const [audience, profile] of Object.entries(profiles)) {
  const rules = {};
  for (const name of profile.rules) {
    assert(profile.source.rules[name], `Production rule is missing: ${name}`);
    rules[name] = { ...profile.source.rules[name] };
  }
  const payload = { rules };
  production.deleteRulesPropertiesInPayloadNotValidForSpectralRules(payload);
  const linter = new Spectral();
  linter.setRuleset(payload);
  registration[audience] = Object.fromEntries(
    profile.rules.map((name) => {
      assert(linter.ruleset.rules[name].enabled, `Production rule is disabled: ${name}`);
      const definition = rules[name];
      return [
        name,
        {
          given: definition.given,
          severity: definition.severity,
          resolved: definition.resolved ?? true,
          then: {
            field: definition.then.field,
            function:
              typeof definition.then.function === "function"
                ? definition.then.function.name
                : definition.then.function,
            functionOptions: definition.then.functionOptions,
          },
        },
      ];
    }),
  );
  linterByAudience[audience] = linter;
}
const runtime = {
  node: process.version,
  validatorEntrypoint: validatorEntry,
  rulesetEntrypoint: rulesetEntry,
  rulesetEntrypointSha256: sha(fs.readFileSync(rulesetEntry)),
  rulesetsVersion: fromValidator("@microsoft.azure/openapi-validator-rulesets/package.json")
    .version,
  registration,
  defaultSeveritiesPreserved: true,
  profile:
    "Explicit selected production Spectral rule definitions with the default reference resolver; not a full AutoRest production pipeline, baseline refresh, or official ARM analyzer run.",
};
write(path.join(root, "evidence", "spectral-profile.json"), runtime);
const body = { name: "body", in: "body", schema: { type: "object" } };
const operation = (parameters = []) => ({ parameters, responses: { 200: { description: "OK" } } });
const fixture = {
  swagger: "2.0",
  info: { title: "Request body selector control", version: "1.0" },
  paths: {
    "/body": { get: operation([body]), delete: operation([body]), post: operation([body]) },
    "/bodyless": { get: operation(), delete: operation() },
    "/path-level-only": { parameters: [body], get: operation(), delete: operation() },
    "/local-ref": { get: operation([{ $ref: "#/parameters/RequestBody" }]) },
  },
  "x-ms-paths": { "/extra?mode=a": { get: operation([body]), delete: operation([body]) } },
  parameters: { RequestBody: body },
};
const controls = [];
for (const [audience, profile] of Object.entries(profiles)) {
  const findings = await linterByAudience[audience].run(
    new Document(JSON.stringify(fixture), Json),
  );
  const ambient = findings.filter((item) => !profile.rules.includes(item.code));
  const counts = Object.fromEntries(
    profile.rules.map((name) => [name, findings.filter((item) => item.code === name).length]),
  );
  const expected =
    audience === "arm"
      ? { GetMustNotHaveRequestBody: 3, DeleteMustNotHaveRequestBody: 1 }
      : { RequestBodyNotAllowed: 3 };
  const passed =
    ambient.length === 0 && profile.rules.every((name) => counts[name] === expected[name]);
  controls.push({ audience, status: passed ? "passed" : "failed", expected, counts, findings });
}
write(path.join(root, "evidence", "spectral-controls.json"), {
  status: controls.every((item) => item.status === "passed") ? "passed" : "failed",
  fixture,
  controls,
  coverage:
    "GET/DELETE positives, POST/bodyless negatives, local parameter reference, path-item-level selector omission, and different x-ms-paths scopes.",
});
assert(
  controls.every((item) => item.status === "passed"),
  "Selected production Spectral controls failed.",
);

for (const project of selection.projects) {
  const profile = profiles[project.audience];
  const files = [];
  for (const input of project.swaggerFiles) {
    const bytes = fs.readFileSync(input.file);
    assert(sha(bytes) === input.sha256, `Changed selected Swagger: ${input.file}`);
    const document = JSON.parse(bytes);
    const result = await linterByAudience[project.audience].run(
      new Document(bytes.toString("utf8"), Json, input.file),
    );
    const findings = result.filter((item) => profile.rules.includes(item.code));
    const ambient = result.filter((item) => !profile.rules.includes(item.code));
    const operations = [];
    for (const section of ["paths", "x-ms-paths"]) {
      for (const [route, item] of Object.entries(document[section] ?? {})) {
        for (const verb of ["get", "delete"]) {
          if (!item[verb]) continue;
          operations.push({
            section,
            route,
            verb,
            operationId: item[verb].operationId,
            directBodyParameters: (item[verb].parameters ?? []).filter((p) => p.in === "body")
              .length,
            parameterReferences: (item[verb].parameters ?? [])
              .filter((p) => p.$ref)
              .map((p) => p.$ref),
          });
        }
      }
    }
    files.push({
      file: input.file,
      sha256: input.sha256,
      apiVersion: document.info.version,
      findings,
      ambientDiagnostics: ambient,
      operations,
      counts: Object.fromEntries(
        profile.rules.map((name) => [name, findings.filter((item) => item.code === name).length]),
      ),
    });
  }
  const status = files.every((file) => file.ambientDiagnostics.length === 0)
    ? "assessed"
    : "unassessed";
  const counts = Object.fromEntries(
    profile.rules.map((name) => [name, files.reduce((sum, file) => sum + file.counts[name], 0)]),
  );
  write(path.join(root, "evidence", project.slug, "spectral.json"), {
    project: project.sourcePath,
    audience: project.audience,
    status,
    counts,
    files,
    source:
      project.audience === "arm"
        ? "Hash-verified shared baseline Swagger; historical production findings remain the primary ARM comparison."
        : "Checked-in Swagger at frozen specs revision; separate selected-rule Spectral profile.",
  });
  console.log(`${project.name}: ${status}; selected Spectral findings ${JSON.stringify(counts)}`);
}
