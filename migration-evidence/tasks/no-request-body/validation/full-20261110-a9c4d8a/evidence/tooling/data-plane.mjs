import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..", "..");
const specs = "C:\\dev\\worktrees\\specs-get-must-not-have-request-body-5983";
const tooling = "C:\\dev\\worktrees\\tooling-no-request-body-full-20261110";
const worker = path.join(
  tooling,
  "packages",
  "typespec-lintdiff",
  "test",
  "harness",
  "native-coverage-worker.mjs",
);
const supplementary = process.env.LINTDIFF_DP_OUTPUT === "data-plane-supplement";
const output = path.join(root, supplementary ? "data-plane-supplement" : "data-plane");
const rule = "@azure-tools/typespec-azure-core/no-request-body";
const swaggerRule = "RequestBodyNotAllowed";
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const git = (...args) =>
  execFileSync("git", args, { cwd: specs, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
const relative = (file) => file.replaceAll("\\", "/");
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

async function prepare() {
  assert(
    !fs.existsSync(path.join(output, "selection.json")),
    "Data-plane selection already exists.",
  );
  assert(
    git("rev-parse", "HEAD") === "2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9",
    "Wrong frozen specifications.",
  );
  assert(git("status", "--porcelain") === "", "Specifications contain authored changes.");
  assert(
    sha(fs.readFileSync(worker)) ===
      "8b912c6cee552c9c89946dbba04c5e03c286d89320175e9f332d595d05234609",
    "Pinned worker changed.",
  );
  const { selectLatestApiVersion } = await import(
    pathToFileURL(
      path.join(tooling, "packages", "typespec-lintdiff", "test", "harness", "spec-dataset.ts"),
    ).href
  );
  const files = git("ls-files", "-z", "--", "specification")
    .split("\0")
    .filter(Boolean)
    .map(relative);
  const tracked = new Map(files.map((file) => [file.toLowerCase(), file]));
  const frozen = new Map();
  function loadFrozen(names) {
    const missing = [...new Set(names)].filter((name) => !frozen.has(name));
    for (let start = 0; start < missing.length; start += 32) {
      const batch = missing.slice(start, start + 32);
      const bytes = execFileSync("git", ["cat-file", "--batch"], {
        cwd: specs,
        input: batch.map((file) => `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9:${file}\n`).join(""),
        maxBuffer: 128 * 1024 * 1024,
      });
      let offset = 0;
      for (const file of batch) {
        const end = bytes.indexOf(10, offset);
        const header = bytes.toString("utf8", offset, end);
        const match = /^[0-9a-f]{40,64} blob (\d+)$/.exec(header);
        assert(match, `Missing frozen Git blob: ${file}: ${header}`);
        const size = Number(match[1]);
        frozen.set(file, Buffer.from(bytes.subarray(end + 1, end + 1 + size)));
        offset = end + 1 + size + 1;
      }
    }
  }
  const supplementalDirectories = supplementary
    ? read(
        path.join(root, "evidence", "data-plane-discovery-audit.json"),
      ).configsOutsideDataPlaneDirectories.map((file) => path.posix.dirname(file))
    : [];
  const dataPlaneFiles = files.filter((file) =>
    supplementary
      ? supplementalDirectories.some((directory) => file.startsWith(directory + "/"))
      : file.includes("/data-plane/"),
  );
  const configs = dataPlaneFiles.filter((file) => file.endsWith("/tspconfig.yaml"));
  const mains = dataPlaneFiles.filter((file) => file.endsWith("/main.tsp"));
  const configDirectories = new Set(configs.map((file) => path.posix.dirname(file)));
  const mainDirectories = new Set(mains.map((file) => path.posix.dirname(file)));
  const directories = [...configDirectories].filter((dir) => mainDirectories.has(dir)).sort();
  const projects = directories.map((sourcePath, index) => ({
    index,
    slug:
      String(index).padStart(3, "0") +
      "-" +
      sourcePath
        .split("/")
        .filter((p) => p !== "specification" && p !== "data-plane")
        .join("-")
        .toLowerCase(),
    sourcePath,
    swaggerCandidates: [],
    invalidCandidateJson: [],
    sourceFiles: dataPlaneFiles
      .filter(
        (file) =>
          file.startsWith(sourcePath + "/") &&
          (file.endsWith(".tsp") || file === sourcePath + "/tspconfig.yaml"),
      )
      .map((file) => ({ file, sha256: sha(fs.readFileSync(path.join(specs, file))) })),
  }));
  const fromSpecs = createRequire(path.join(specs, "package.json"));
  const compiler = await import(pathToFileURL(fromSpecs.resolve("@typespec/compiler")).href);
  for (const project of projects) {
    const cwd = path.join(specs, project.sourcePath);
    const [options, diagnostics] = await compiler.resolveCompilerOptions(compiler.NodeHost, {
      cwd,
      entrypoint: path.join(cwd, "main.tsp"),
      overrides: { emit: [] },
    });
    const autorest = options.options?.["@azure-tools/typespec-autorest"];
    project.emitterConfigDiagnostics = diagnostics.map((d) => ({
      code: d.code,
      severity: d.severity,
      message: d.message,
    }));
    project.swaggerOutputRoot = autorest?.["emitter-output-dir"]
      ? relative(path.relative(specs, path.resolve(autorest["emitter-output-dir"])))
      : project.sourcePath;
    project.swaggerOutputPattern = autorest?.["output-file"];
    project.hasExplicitAutorestOptions = autorest !== undefined;
  }
  function ownsFile(project, file) {
    if (!file.startsWith(project.swaggerOutputRoot + "/")) return false;
    if (project.swaggerOutputPattern) {
      const expression = project.swaggerOutputPattern
        .split(/(\{[^}]+\})/g)
        .map((part) =>
          part.startsWith("{") ? "[^/]+" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        )
        .join("");
      return new RegExp("^" + expression + "$").test(
        file.slice(project.swaggerOutputRoot.length + 1),
      );
    }
    return !projects.some(
      (other) =>
        other.sourcePath.length > project.sourcePath.length &&
        other.sourcePath.startsWith(project.sourcePath + "/") &&
        file.startsWith(other.sourcePath + "/"),
    );
  }
  const jsonFiles = files.filter(
    (file) =>
      file.endsWith(".json") &&
      !file.split("/").includes("examples") &&
      projects.some((project) => ownsFile(project, file)),
  );
  loadFrozen(jsonFiles);
  for (const file of jsonFiles) {
    const owners = projects.filter((project) => ownsFile(project, file));
    if (!owners.length) continue;
    let document;
    try {
      document = JSON.parse(frozen.get(file).toString("utf8"));
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      for (const project of owners)
        project.invalidCandidateJson.push({ file, error: error.message });
      continue;
    }
    if (!(document.swagger || document.openapi) || typeof document.info?.version !== "string")
      continue;
    for (const project of owners)
      project.swaggerCandidates.push({
        file,
        apiVersion: document.info.version,
        format: document.swagger ? `swagger-${document.swagger}` : `openapi-${document.openapi}`,
        sha256: sha(frozen.get(file)),
      });
  }
  for (const project of projects) {
    const eligible = project.swaggerCandidates.filter((file) => file.format === "swagger-2.0");
    project.apiVersion = selectLatestApiVersion(eligible.map((file) => file.apiVersion));
    project.swaggerFiles = eligible.filter((file) => file.apiVersion === project.apiVersion);
    project.swaggerSelectionStatus = project.invalidCandidateJson.length
      ? "unassessed-invalid-candidate-json"
      : project.swaggerFiles.length
        ? "selected"
        : "unassessed-no-local-oas2";
  }
  const retained = new Map();
  const referenceFailures = [];
  let queue = [
    ...new Set(projects.flatMap((project) => project.swaggerFiles.map((file) => file.file))),
  ];
  while (queue.length) {
    loadFrozen(queue);
    const next = new Set();
    for (const file of queue) {
      if (retained.has(file)) continue;
      const bytes = frozen.get(file);
      const destination = path.join(output, "dataset", file);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, bytes);
      retained.set(file, sha(bytes));
      const document = JSON.parse(bytes.toString("utf8"));
      function references(value) {
        if (!value || typeof value !== "object") return;
        if (typeof value.$ref === "string") {
          const part = value.$ref.split("#")[0];
          if (part && !/^[a-z]+:/i.test(part)) {
            const target = path.posix.normalize(
              path.posix.join(path.posix.dirname(file), decodeURIComponent(part)),
            );
            assert(
              !target.startsWith("../") && !path.posix.isAbsolute(target),
              "Reference escapes frozen specs: " + target,
            );
            const canonical = tracked.get(target.toLowerCase());
            if (!canonical)
              referenceFailures.push({
                file,
                reference: value.$ref,
                target,
                error: "Not present in the frozen tracked source.",
              });
            else if (!retained.has(canonical)) next.add(canonical);
          }
        }
        for (const child of Object.values(value)) references(child);
      }
      references(document);
    }
    queue = [...next].filter((file) => !retained.has(file));
  }
  write(path.join(output, "swagger-file-inventory.json"), {
    specsCommit: "2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9",
    source:
      "Exact frozen Git blobs, independent of the sparse runtime checkout. Selected Swagger plus transitive local reference/example closure.",
    files: [...retained].map(([file, sha256]) => ({ file, sha256 })),
    referenceFailures,
  });
  for (const project of projects) {
    const directory = path.join(output, "projects", project.slug);
    write(path.join(directory, "native-input.json"), {
      specsRepo: specs,
      project: { sourcePath: project.sourcePath, apiVersion: project.apiVersion },
      validatorRules: [],
      tspRules: [rule],
      scope: "source",
      nativeMode: "target-only",
    });
    write(path.join(directory, "spectral-input.json"), project);
  }
  write(path.join(output, "selection.json"), {
    createdAt: new Date().toISOString(),
    specs,
    specsCommit: git("rev-parse", "HEAD"),
    candidateCommit: "a9c4d8a1db1bad607cd21d856421c6b1b712d746",
    worker,
    workerSha256: sha(fs.readFileSync(worker)),
    discovery: supplementary
      ? "Every frozen data-plane preset project outside data-plane directory names, identified by the independent complete Git-tree preset audit; both main.tsp and tspconfig.yaml required. Complements the primary path-based batch without duplicates."
      : "All tracked specification/**/data-plane/** directories containing both main.tsp and tspconfig.yaml; no project-name filter or limit. The independent preset audit adds outside-path projects in the supplemental batch.",
    comparison:
      "Fresh native source programs versus latest frozen Git OAS2 version selected using the official selectLatestApiVersion helper; all files at that version and their local reference closure. Swagger ownership follows resolved AutoRest emitter-output-dir/output-file; absent explicit output patterns use nearest-project local ownership. Source/version populations are not aligned.",
    limitation:
      "Separate explicit selected-rule Spectral profile, not a saved data-plane baseline or full AutoRest production execution. Missing OAS2, unsupported formats, invalid inputs and compilation failures are unassessed. Fragment-only and SDK config-only directories are inventoried, not silently counted as projects.",
    validatorRules: [swaggerRule],
    tspRules: [rule],
    scope: "source",
    nativeMode: "target-only",
    concurrency: 1,
    workerTimeoutMs: 240000,
    configDirectories: configs.length,
    mainDirectories: mains.length,
    configWithoutMain: [...configDirectories].filter((dir) => !mainDirectories.has(dir)),
    mainWithoutConfig: [...mainDirectories].filter((dir) => !configDirectories.has(dir)),
    projects,
  });
  console.log(
    JSON.stringify(
      {
        projects: projects.length,
        configs: configs.length,
        mains: mains.length,
        withSelectedOas2: projects.filter((p) => p.swaggerSelectionStatus === "selected").length,
        missingOas2: projects.filter((p) => !p.swaggerFiles.length).map((p) => p.sourcePath),
        invalidCandidateJson: projects
          .filter((p) => p.invalidCandidateJson.length)
          .map((p) => ({ project: p.sourcePath, files: p.invalidCandidateJson })),
      },
      null,
      2,
    ),
  );
}

async function spectral(project, file) {
  const fromSpecs = createRequire(path.join(specs, "package.json"));
  const fromValidator = createRequire(fromSpecs.resolve("@microsoft.azure/openapi-validator"));
  const entrypoint = fromValidator.resolve("@microsoft.azure/openapi-validator-rulesets");
  const fromRulesets = createRequire(entrypoint);
  const production = fromValidator("@microsoft.azure/openapi-validator-rulesets");
  const { Spectral, Document } = fromRulesets("@stoplight/spectral-core");
  const { Json } = fromRulesets("@stoplight/spectral-parsers");
  const definition = production.spectralRulesets.azDataplane.rules[swaggerRule];
  assert(definition, "Production data-plane rule is missing.");
  const payload = { rules: { [swaggerRule]: { ...definition } } };
  production.deleteRulesPropertiesInPayloadNotValidForSpectralRules(payload);
  const linter = new Spectral();
  linter.setRuleset(payload);
  assert(linter.ruleset.rules[swaggerRule].enabled, "Production data-plane rule is disabled.");
  const body = { name: "body", in: "body", schema: { type: "object" } };
  const operation = (parameters) => ({ parameters, responses: { 200: { description: "OK" } } });
  const control = await linter.run(
    new Document(
      JSON.stringify({
        swagger: "2.0",
        info: { title: "Body control", version: "1" },
        paths: {
          "/body": { get: operation([body]), delete: operation([body]), post: operation([body]) },
          "/empty": { get: operation([]), delete: operation([]) },
        },
      }),
      Json,
    ),
  );
  assert(
    control.length === 2 && control.every((item) => item.code === swaggerRule),
    "Production selector controls failed.",
  );
  const result = {
    project: project.sourcePath,
    status: project.swaggerSelectionStatus === "selected" ? "assessed" : "unassessed",
    reason:
      project.swaggerSelectionStatus === "selected" ? undefined : project.swaggerSelectionStatus,
    runtime: {
      node: process.version,
      entrypoint,
      entrypointSha256: sha(fs.readFileSync(entrypoint)),
      rulesetsVersion: fromValidator("@microsoft.azure/openapi-validator-rulesets/package.json")
        .version,
    },
    controls: { status: "passed", findings: control.length },
    registeredRule: {
      name: swaggerRule,
      given: definition.given,
      severity: definition.severity,
      then: {
        field: definition.then.field,
        function: definition.then.function.name,
        functionOptions: definition.then.functionOptions,
      },
    },
    files: [],
  };
  for (const input of project.swaggerFiles) {
    const absolute = path.join(output, "dataset", input.file);
    const bytes = fs.readFileSync(absolute);
    assert(sha(bytes) === input.sha256, `Changed checked-in Swagger: ${input.file}`);
    const diagnostics = await linter.run(new Document(bytes.toString("utf8"), Json, absolute));
    const target = diagnostics.filter((item) => item.code === swaggerRule);
    const ambient = diagnostics.filter((item) => item.code !== swaggerRule);
    const document = JSON.parse(bytes);
    const operations = Object.entries(document.paths ?? {}).flatMap(([route, item]) =>
      ["get", "delete"]
        .filter((verb) => item[verb])
        .map((verb) => ({
          route,
          verb,
          operationId: item[verb].operationId,
          directBodyParameters: (item[verb].parameters ?? []).filter((p) => p.in === "body").length,
        })),
    );
    result.files.push({ ...input, findings: target, ambientDiagnostics: ambient, operations });
    if (ambient.length) {
      result.status = "unassessed";
      result.reason = "Spectral reference/parser diagnostics";
    }
  }
  result.rawTargetCount =
    result.status === "assessed"
      ? result.files.reduce((sum, input) => sum + input.findings.length, 0)
      : null;
  write(file, result);
  console.log(
    `${project.sourcePath}: ${result.status}, Swagger target observations ${result.rawTargetCount ?? "unassessed"}`,
  );
}

async function subprocess(args, logFile) {
  const log = fs.openSync(logFile, "w");
  const startedAt = new Date().toISOString();
  let timedOut = false;
  const result = await new Promise((resolve) => {
    const child = spawn(process.execPath, args, {
      cwd: specs,
      stdio: ["ignore", log, log],
      windowsHide: true,
    });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, 240000);
    child.once("error", (error) => {
      clearTimeout(timer);
      resolve({ error: error.message });
    });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  }).finally(() => fs.closeSync(log));
  return { startedAt, finishedAt: new Date().toISOString(), timedOut, ...result };
}

async function run() {
  const selection = read(path.join(output, "selection.json"));
  assert(sha(fs.readFileSync(worker)) === selection.workerSha256, "Worker changed.");
  const arm = read(path.join(root, "arm", "manifest.json"));
  assert(
    arm.baselineContext,
    "ARM runtime installation is not complete; do not race the shared specs installation.",
  );
  assert(
    read(path.join(root, "evidence", "runtime-identity.json")).status === "passed",
    "Unverified candidate runtime.",
  );
  const results = [];
  for (const project of selection.projects) {
    const directory = path.join(output, "projects", project.slug);
    const nativeExecution = await subprocess(
      [worker, path.join(directory, "native-input.json"), path.join(directory, "native.json")],
      path.join(directory, "native-worker.log"),
    );
    const nativeFile = path.join(directory, "native.json");
    const native = fs.existsSync(nativeFile) ? read(nativeFile) : null;
    const spectralExecution = await subprocess(
      [
        import.meta.filename,
        "spectral-worker",
        path.join(directory, "spectral-input.json"),
        path.join(directory, "spectral.json"),
      ],
      path.join(directory, "spectral-worker.log"),
    );
    const spectralFile = path.join(directory, "spectral.json");
    const swagger = fs.existsSync(spectralFile) ? read(spectralFile) : null;
    const nativeAssessed =
      nativeExecution.code === 0 && !nativeExecution.timedOut && native?.status === "success";
    const swaggerAssessed =
      spectralExecution.code === 0 && !spectralExecution.timedOut && swagger?.status === "assessed";
    const result = {
      project: project.sourcePath,
      slug: project.slug,
      status: nativeAssessed && swaggerAssessed ? "assessed" : "unassessed",
      nativeAssessed,
      swaggerAssessed,
      nativeExecution,
      spectralExecution,
      nativeRawCount: nativeAssessed ? native.rawDiagnostics.length : null,
      swaggerRawCount: swaggerAssessed ? swagger.rawTargetCount : null,
      nativeError:
        native?.error ??
        (nativeAssessed ? undefined : "Native worker failed or produced no successful receipt."),
      swaggerError:
        swagger?.reason ??
        (swaggerAssessed ? undefined : "Spectral worker failed or produced no assessable receipt."),
      nativeGet: nativeAssessed
        ? native.rawDiagnostics.filter((d) => d.message.startsWith("GET ")).length
        : null,
      nativeDelete: nativeAssessed
        ? native.rawDiagnostics.filter((d) => d.message.startsWith("DELETE ")).length
        : null,
    };
    results.push(result);
    write(path.join(directory, "execution.json"), result);
    write(path.join(output, "execution.json"), {
      completed: results.length,
      total: selection.projects.length,
      results,
    });
    console.log(
      `[${results.length}/${selection.projects.length}] ${result.status}: ${project.sourcePath}; native=${result.nativeRawCount ?? "unassessed"} Swagger=${result.swaggerRawCount ?? "unassessed"}`,
    );
  }
  write(path.join(output, "completion.json"), {
    completedAt: new Date().toISOString(),
    total: results.length,
    assessed: results.filter((r) => r.status === "assessed").length,
    unassessed: results.filter((r) => r.status !== "assessed"),
    allProjectsAttempted: results.length === selection.projects.length,
  });
}

switch (process.argv[2]) {
  case "prepare":
    await prepare();
    break;
  case "run":
    await run();
    break;
  case "spectral-worker":
    await spectral(read(process.argv[3]), process.argv[4]);
    break;
  default:
    throw new Error("Expected prepare | run | spectral-worker");
}
