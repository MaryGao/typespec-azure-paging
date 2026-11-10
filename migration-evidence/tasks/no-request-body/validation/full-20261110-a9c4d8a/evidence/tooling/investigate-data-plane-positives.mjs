import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..", "..");
const selection = JSON.parse(fs.readFileSync(path.join(root, "selection.json"), "utf8"));
const specs = "C:\\dev\\worktrees\\specs-get-must-not-have-request-body-5983";
const fromSpecs = createRequire(path.join(specs, "package.json"));
const load = (name) => import(pathToFileURL(fromSpecs.resolve(name)).href);
const compiler = await load("@typespec/compiler");
const http = await load("@typespec/http");
const mode = process.argv[2] ?? "purview";
if (!["purview", "run-history"].includes(mode)) throw new Error("Expected purview or run-history.");
const runHistory = mode === "run-history";
const projectPath = runHistory
  ? "specification/machinelearningservices/data-plane/RunHistory"
  : "specification/purview/data-plane/datamap";
const wireCount = runHistory ? 3 : 6;
const aliasCount = runHistory ? 0 : 6;
const directory = path.join(
  root,
  "data-plane",
  "projects",
  runHistory ? "064-machinelearningservices-runhistory" : "079-purview-datamap",
);
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const observed = read(path.join(directory, "native.json"));
const swagger = read(path.join(directory, "spectral.json"));
const project = path.join(specs, projectPath);
const rule = "@azure-tools/typespec-azure-core/no-request-body";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const [options, configDiagnostics] = await compiler.resolveCompilerOptions(compiler.NodeHost, {
  cwd: project,
  entrypoint: path.join(project, "main.tsp"),
  overrides: { emit: [] },
});
const program = await compiler.compile(compiler.NodeHost, path.join(project, "main.tsp"), {
  ...options,
  emit: [],
  noEmit: true,
  warningAsError: false,
  linterRuleSet: { enable: { [rule]: true } },
});
assert(
  ![...configDiagnostics, ...program.diagnostics].some((d) => d.severity === "error"),
  "Focused positive-case compile failed.",
);
const location = (target) => {
  const source = compiler.getSourceLocation(target, { locateId: true });
  assert(source && !source.isSynthetic, "Synthetic diagnostic location.");
  const position = source.file.getLineAndCharacterOfPosition(source.pos);
  return {
    sourceFile: path.relative(project, source.file.path).replaceAll("\\", "/"),
    line: position.line + 1,
    column: position.character + 1,
  };
};
const diagnostics = program.diagnostics.filter((d) => d.code === rule);
const actual = diagnostics.map((d) => ({
  rule: d.code,
  message: d.message,
  ...location(d.target),
}));
assert(
  JSON.stringify(actual) === JSON.stringify(observed.rawDiagnostics),
  "Focused positive-case diagnostics differ from the full run.",
);
assert(
  diagnostics.length === wireCount + aliasCount && swagger.rawTargetCount === wireCount,
  "Unexpected positive-case observation counts.",
);
const [services, errors] = http.getAllHttpServices(program);
assert(!errors.some((d) => d.severity === "error"), "Positive-case service metadata failed.");
const serviceOperations = services.flatMap((service) => service.operations);
const serviceSet = new Set(serviceOperations.map((entry) => entry.operation));
const bodyDescription = (body) =>
  body
    ? {
        kind: body.type.kind,
        name: body.type.name,
        property: body.property?.name,
        optional: body.property?.optional,
      }
    : null;
const findings = diagnostics.map((diagnostic) => {
  const operation = diagnostic.target;
  assert(operation.kind === "Operation", "Diagnostic target is not an operation.");
  const [resolved, metadataErrors] = http.getHttpOperation(program, operation);
  assert(
    !metadataErrors.some((d) => d.severity === "error") &&
      resolved.verb === "delete" &&
      resolved.parameters.body &&
      !compiler.isVoidType(resolved.parameters.body.type),
    "Missing actual DELETE payload metadata.",
  );
  const chain = [];
  const seen = new Set();
  for (let source = operation; source; source = source.sourceOperation) {
    assert(!seen.has(source), "Cyclic sourceOperation alias chain.");
    seen.add(source);
    chain.push(source);
  }
  const inDeclaredService = serviceSet.has(operation);
  const originals = chain.filter((source) => serviceSet.has(source));
  assert(originals.length === 1, "No unique actual service operation in alias chain.");
  const original = serviceOperations.find((entry) => entry.operation === originals[0]);
  assert(
    original.verb === resolved.verb &&
      original.path === resolved.path &&
      original.parameters.body &&
      !compiler.isVoidType(original.parameters.body.type),
    "Alias differs from its body-bearing wire operation.",
  );
  const matches = swagger.files.flatMap((file) =>
    file.findings
      .filter(
        (finding) =>
          finding.path[0] === "paths" &&
          finding.path[1] === original.path &&
          finding.path[2] === original.verb,
      )
      .map((finding) => {
        const sourceFile = path.join(root, "data-plane", "dataset", file.file);
        assert(
          path.resolve(finding.source).toLowerCase() === path.resolve(sourceFile).toLowerCase(),
          "Swagger diagnostic attribution differs from selected input.",
        );
        const bytes = fs.readFileSync(sourceFile);
        assert(
          createHash("sha256").update(bytes).digest("hex") === file.sha256,
          "Frozen Swagger changed.",
        );
        const document = JSON.parse(bytes);
        const bodyParameter = finding.path.slice(0, -1).reduce((node, key) => node[key], document);
        assert(bodyParameter.in === "body", "Swagger target is not a request-body parameter.");
        return {
          file: file.file,
          apiVersion: file.apiVersion,
          path: original.path,
          verb: original.verb,
          operationId: document.paths[original.path][original.verb].operationId,
          diagnosticPath: finding.path,
          bodyParameter: {
            name: bodyParameter.name,
            required: bodyParameter.required,
            schema: bodyParameter.schema,
          },
        };
      }),
  );
  assert(matches.length === 1, "No unique actual Swagger body finding for the wire operation.");
  return {
    ...location(operation),
    operation: compiler.getTypeName(operation),
    inDeclaredHttpService: inDeclaredService,
    verb: resolved.verb,
    path: resolved.path,
    body: bodyDescription(resolved.parameters.body),
    sourceOperationChain: chain.map((source) => ({
      operation: compiler.getTypeName(source),
      ...location(source),
    })),
    originalOperation: compiler.getTypeName(original.operation),
    originalLocation: location(original.operation),
    originalBody: bodyDescription(original.parameters.body),
    sameBodyTypeIdentityAsOriginal: resolved.parameters.body.type === original.parameters.body.type,
    swagger: matches[0],
    classification: inDeclaredService
      ? "Actual service DELETE body also reported by Swagger."
      : "Client alias of that same body-bearing service operation, established by compiler sourceOperation object identity.",
  };
});
assert(
  findings.filter((f) => f.inDeclaredHttpService).length === wireCount &&
    findings.filter((f) => !f.inDeclaredHttpService).length === aliasCount,
  "Unexpected service/alias split.",
);
const groups = new Map();
for (const finding of findings) {
  const key = JSON.stringify([finding.swagger.file, finding.verb, finding.path]);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(finding);
}
assert(
  groups.size === wireCount &&
    [...groups.values()].every(
      (group) =>
        group.length === (runHistory ? 1 : 2) &&
        group.filter((f) => f.inDeclaredHttpService).length === 1,
    ),
  "Unexpected warning-to-wire correspondence.",
);
const result = {
  status: "all-positive-native-findings-and-Swagger-observations-exactly-corresponded",
  candidateCommit: selection.candidateCommit,
  specsCommit: selection.specsCommit,
  project: projectPath,
  nativeRaw: wireCount + aliasCount,
  swaggerRaw: wireCount,
  rawDiagnostics: actual,
  sourceFiles: (runHistory
    ? ["main.tsp", "routes-runs.tsp"]
    : ["main.tsp", "routes.tsp", "client.tsp"]
  ).map((file) => ({
    file,
    sha256: createHash("sha256")
      .update(fs.readFileSync(path.join(project, file)))
      .digest("hex"),
  })),
  demonstratedWireOperations: wireCount,
  serviceNativeWarnings: wireCount,
  clientAliasNativeWarnings: aliasCount,
  correspondence:
    "Actual diagnostic Operation objects; compiler sourceOperation alias identities; declared HTTP service membership; exact HTTP verb/path; unique production Spectral body-parameter findings in hash-verified frozen Swagger.",
  findings,
  countInterpretation: runHistory
    ? "Three actual service DELETE bodies map one-to-one to three real Swagger body findings. No source client-alias multiplicity occurs here. Exact source Operation identity and body-bearing verb/path correspondence, not equal counts alone, establish these three concrete matches."
    : "Six real body-bearing DELETE wire operations are observed on both sides. TypeSpec additionally reports their six client aliases. Raw 12-versus-6 counts and the six-warning excess remain unchanged; this explanatory correspondence is not a global count normalization or whole-rule equivalence proof.",
  policy:
    "Existing source suppressions concern other rules and do not suppress the new no-request-body rule. Existing service behavior is retained; no specification, rule or suppression changes made.",
  limits:
    "Source and selected checked-in Swagger versions are not generally aligned. Exact concrete correspondences do not establish completeness for unobserved positive cases or full production AutoRest parity.",
};
fs.writeFileSync(
  path.join(
    root,
    "evidence",
    runHistory ? "run-history-positive-investigation.json" : "purview-gap-investigation.json",
  ),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      status: result.status,
      wireOperations: result.demonstratedWireOperations,
      cases: [...groups.values()].map((group) => ({
        path: group[0].path,
        operationId: group[0].swagger.operationId,
        nativeService: group.find((f) => f.inDeclaredHttpService).operation,
        nativeAlias: group.find((f) => !f.inDeclaredHttpService)?.operation,
      })),
    },
    null,
    2,
  ),
);
