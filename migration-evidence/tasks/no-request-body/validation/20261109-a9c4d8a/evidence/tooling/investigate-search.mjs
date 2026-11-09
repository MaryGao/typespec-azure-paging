import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..", "..");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const selection = read(path.join(root, "selection.json"));
const fromSpecs = createRequire(path.join(selection.specs, "package.json"));
const load = (name) => import(pathToFileURL(fromSpecs.resolve(name)).href);
const compiler = await load("@typespec/compiler");
const http = await load("@typespec/http");
const tcgc = await load("@azure-tools/typespec-client-generator-core");
const selected = selection.projects.find((project) => project.slug === "search-arm");
const project = path.join(selection.specs, selected.sourcePath);
const main = path.join(project, "main.tsp");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const [options, configDiagnostics] = await compiler.resolveCompilerOptions(compiler.NodeHost, {
  cwd: project,
  entrypoint: main,
  overrides: { emit: [] },
});
const program = await compiler.compile(compiler.NodeHost, main, {
  ...options,
  emit: [],
  noEmit: true,
  warningAsError: false,
  linterRuleSet: { enable: { [selection.typeSpecRule]: true } },
});
assert(
  ![...configDiagnostics, ...program.diagnostics].some((d) => d.severity === "error"),
  "Search semantic investigation did not compile.",
);
const location = (target) => {
  const source = compiler.getSourceLocation(target, { locateId: true });
  if (!source || source.isSynthetic) return null;
  const position = source.file.getLineAndCharacterOfPosition(source.pos);
  return {
    sourceFile: path.relative(project, source.file.path).replaceAll("\\", "/"),
    line: position.line + 1,
    column: position.character + 1,
  };
};
const observed = read(path.join(root, "evidence", selected.slug, "native.json"));
const diagnostics = program.diagnostics.filter((d) => d.code === selection.typeSpecRule);
const locations = diagnostics.map((d) => location(d.target));
assert(
  JSON.stringify(locations) ===
    JSON.stringify(
      observed.rawDiagnostics.map(({ sourceFile, line, column }) => ({ sourceFile, line, column })),
    ),
  "Investigation differs from saved five-project findings.",
);
const [services, serviceDiagnostics] = http.getAllHttpServices(program);
assert(!serviceDiagnostics.some((d) => d.severity === "error"), "HTTP service inspection failed.");
const serviceOperations = services.flatMap((service) => service.operations);
const operations = [];
compiler.navigateProgram(program, {
  operation: (operation) => {
    operations.push(operation);
  },
});
const swagger = read(path.join(root, "evidence", selected.slug, "spectral.json"));
const dataset = path.join(selection.baselineDirectory, "dataset");
const baseline = read(path.join(selection.baselineDirectory, "baseline.json"));
const inventory = new Map(
  baseline.files.map((item) => [item.file.replaceAll("\\", "/"), item.sha256]),
);
const referencedInputs = new Map();
function resolveParameter(parameter, file, seen = new Set()) {
  if (!parameter?.$ref) return parameter;
  const [relative, pointer] = parameter.$ref.split("#");
  assert(
    pointer?.startsWith("/") && !/^[a-z]+:/i.test(relative),
    "Unsupported parameter reference.",
  );
  const targetFile = relative ? path.resolve(path.dirname(file), relative) : file;
  const key = `${targetFile}#${pointer}`;
  assert(!seen.has(key), "Cyclic parameter reference.");
  seen.add(key);
  const datasetRelative = path.relative(dataset, targetFile);
  assert(
    !datasetRelative.startsWith(`..${path.sep}`) && !path.isAbsolute(datasetRelative),
    "Referenced parameter escapes retained dataset.",
  );
  const bytes = fs.readFileSync(targetFile);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  assert(
    sha256 === inventory.get(datasetRelative.replaceAll("\\", "/")),
    "Referenced parameter file changed.",
  );
  referencedInputs.set(datasetRelative, sha256);
  const target = pointer
    .slice(1)
    .split("/")
    .reduce(
      (node, part) => node?.[decodeURIComponent(part).replaceAll("~1", "/").replaceAll("~0", "~")],
      JSON.parse(bytes),
    );
  assert(target !== undefined, "Unresolved parameter reference.");
  return resolveParameter(target, targetFile, seen);
}
const contexts = [
  ["go", "go"],
  ["csharp", "csharp"],
  ["javascript", "ts"],
].map(([scope, emitter]) => [
  scope,
  tcgc.createTCGCContext(program, `@azure-tools/typespec-${emitter}`, { mutateNamespace: false }),
]);
const describeBody = (body) =>
  body
    ? {
        typeKind: body.type.kind,
        typeName: body.type.name,
        explicitProperty: body.property?.name,
        properties:
          body.type.kind === "Model"
            ? [...body.type.properties.values()].map((p) => ({
                name: p.name,
                optional: p.optional,
                typeKind: p.type.kind,
                typeName: p.type.name,
              }))
            : [],
      }
    : null;
const findings = locations.map((where) => {
  const operation = operations.find((op) => JSON.stringify(location(op)) === JSON.stringify(where));
  assert(operation, `No semantic operation at ${JSON.stringify(where)}`);
  const [resolved, errors] = http.getHttpOperation(program, operation);
  assert(!errors.some((d) => d.severity === "error"), "Customization HTTP metadata failed.");
  assert(
    ["get", "delete"].includes(resolved.verb) &&
      resolved.parameters.body !== undefined &&
      !compiler.isVoidType(resolved.parameters.body.type),
    "No resolved non-void GET/DELETE body.",
  );
  const mappings = [];
  for (const [scope, context] of contexts) {
    const originals = serviceOperations.filter(
      (entry) => tcgc.getOverriddenClientMethod(context, entry.operation) === operation,
    );
    assert(
      originals.length === 1,
      `No unique actual SDK override mapping for ${scope}: ${operation.name}`,
    );
    const original = originals[0];
    assert(original.verb === resolved.verb, "Customization and original verbs differ.");
    const matches = swagger.files.flatMap((file) =>
      file.operations
        .filter((entry) => entry.route === original.path && entry.verb === original.verb)
        .map((entry) => {
          const parameters =
            read(file.file)[entry.section][entry.route][entry.verb].parameters ?? [];
          return {
            file: file.file,
            ...entry,
            resolvedBodyParameters: parameters
              .map((p) => resolveParameter(p, file.file))
              .filter((p) => p?.in === "body").length,
          };
        }),
    );
    assert(
      matches.length === 1 && matches[0].resolvedBodyParameters === 0,
      "Original has no unique bodyless Swagger operation after parameter-reference resolution.",
    );
    assert(
      original.parameters.body === undefined || compiler.isVoidType(original.parameters.body.type),
      "Original wire operation has a non-void body.",
    );
    mappings.push({
      scope,
      originalOperation: compiler.getTypeName(original.operation),
      originalLocation: location(original.operation),
      verb: original.verb,
      path: original.path,
      originalBody: describeBody(original.parameters.body),
      savedMatches: matches,
    });
  }
  const inService = serviceOperations.some((entry) => entry.operation === operation);
  assert(!inService, "Reported customization is a declared service operation.");
  const source = fs.readFileSync(path.join(project, where.sourceFile), "utf8").split(/\r?\n/);
  return {
    ...where,
    operation: compiler.getTypeName(operation),
    namespace: compiler.getNamespaceFullName(operation.namespace),
    inDeclaredHttpService: inService,
    verb: resolved.verb,
    path: resolved.path,
    body: describeBody(resolved.parameters.body),
    mappings,
    sourceExcerpt: source.slice(Math.max(0, where.line - 5), where.line + 7).join("\n"),
    classification:
      "Native-only SDK customization outside declared HTTP services. Implicit request-options wrapper appears as a request body to getHttpOperation; original service operation and matching saved Swagger are bodyless.",
  };
});
const result = {
  status: "all-ten-native-only-findings-explained",
  candidateCommit: selection.candidateCommit,
  specsCommit: selection.specsCommit,
  project: selected.sourcePath,
  nativeRaw: observed.rawDiagnostics.length,
  swagger: swagger.counts,
  sourceSha256: createHash("sha256")
    .update(fs.readFileSync(path.join(project, "client.tsp")))
    .digest("hex"),
  correspondence:
    "Exact diagnostic location -> semantic operation -> actual SDK override object identity for Go/C#/JavaScript -> original declared-service HTTP metadata -> exact verb/path in selected saved Swagger. Not name/count-only matching.",
  referencedParameterInputs: [...referencedInputs].map(([file, sha256]) => ({ file, sha256 })),
  findings,
  disposition:
    "Keep all ten raw findings (six GET, four DELETE). No production changes, suppressions or count normalization. This is a source-versus-wire scope gap, not ten demonstrated on-wire bodies; #5993 policy remains unresolved.",
  fullValidation: "Not started: the user's no-gap condition is not met.",
};
fs.writeFileSync(
  path.join(root, "evidence", selected.slug, "gap-investigation.json"),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      status: result.status,
      findings: findings.map((f) => ({
        operation: f.operation,
        line: f.line,
        verb: f.verb,
        bodyProperties: f.body.properties.map((p) => p.name),
        original: f.mappings[0].originalOperation,
        savedOperationId: f.mappings[0].savedMatches[0].operationId,
      })),
    },
    null,
    2,
  ),
);
