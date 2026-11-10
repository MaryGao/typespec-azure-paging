import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const candidate = "C:\\dev\\worktrees\\native-get-must-not-have-request-body-5983";
const specs = "C:\\dev\\worktrees\\specs-get-must-not-have-request-body-5983";
const baseline =
  "C:\\dev\\worktrees\\xms-pageable-validation-5844\\shared-swagger-arm-20261026-2cd3c5dd";
const worker =
  "C:\\dev\\worktrees\\xms-pageable-validation-5844\\tooling-complete-52eeec48\\packages\\typespec-lintdiff\\test\\harness\\native-coverage-worker.mjs";
const rule = "@azure-tools/typespec-azure-core/no-request-body";
const armRules = ["GetMustNotHaveRequestBody", "DeleteMustNotHaveRequestBody"];
const dpRules = ["RequestBodyNotAllowed"];
const candidateCommit = "a9c4d8a1db1bad607cd21d856421c6b1b712d746";
const specsCommit = "2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9";
const identity = "aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995";
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const git = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const evidence = (...parts) => path.join(root, "evidence", ...parts);
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}
const projectInput = (project) => ({
  specsRepo: specs,
  project: { sourcePath: project.sourcePath, apiVersion: project.apiVersion },
  validatorRules: project.audience === "arm" ? armRules : [],
  tspRules: [rule],
  scope: "source",
  nativeMode: "target-only",
});

function prepare() {
  assert(git(candidate, "rev-parse", "HEAD") === candidateCommit, "Candidate changed.");
  assert(git(candidate, "status", "--porcelain") === "", "Candidate is dirty.");
  assert(git(specs, "rev-parse", "HEAD") === specsCommit, "Wrong frozen specifications.");
  const saved = read(path.join(baseline, "baseline.json"));
  const manifest = read(path.join(baseline, "manifest.json"));
  assert(
    manifest.status === "complete" &&
      manifest.completionScope === "swagger-only" &&
      manifest.baselineIdentity === identity &&
      sha(JSON.stringify(saved)) === identity,
    "Unsealed or changed shared baseline.",
  );
  assert(saved.context.specsCommit === specsCommit, "Baseline source mismatch.");
  const inventory = new Map(
    saved.files.map((item) => [item.file.replaceAll("\\", "/"), item.sha256]),
  );
  const verified = new Map();
  function verify(relative) {
    const bytes = fs.readFileSync(path.join(baseline, "dataset", relative));
    const digest = sha(bytes);
    assert(
      digest === inventory.get(relative.replaceAll("\\", "/")),
      `Changed baseline input: ${relative}`,
    );
    verified.set(relative, digest);
    return bytes;
  }
  verify("_meta.json");
  const index = JSON.parse(verify("validator-results.json"));
  const chosen = [
    {
      name: "Advisor ARM",
      slug: "advisor-arm",
      audience: "arm",
      sourcePath: "specification/advisor/resource-manager/Microsoft.Advisor/Advisor",
    },
    {
      name: "Compute ARM",
      slug: "compute-arm",
      audience: "arm",
      sourcePath: "specification/compute/resource-manager/Microsoft.Compute/Compute/Compute",
    },
    {
      name: "Search ARM",
      slug: "search-arm",
      audience: "arm",
      sourcePath: "specification/search/resource-manager/Microsoft.Search/Search",
    },
    {
      name: "Key Vault Keys data plane",
      slug: "keyvault-keys-data-plane",
      audience: "data-plane",
      sourcePath: "specification/keyvault/data-plane/Keys",
      apiVersion: "2026-07-01-preview",
      swaggerRelative: "preview/2026-07-01-preview/keys.json",
    },
    {
      name: "Search data plane",
      slug: "search-data-plane",
      audience: "data-plane",
      sourcePath: "specification/search/data-plane/Search",
      apiVersion: "2026-08-01-preview",
      swaggerRelative: "preview/2026-08-01-preview/search.json",
    },
  ];
  for (const project of chosen) {
    assert(
      git(specs, "diff", "--name-only", "HEAD", "--", project.sourcePath) === "",
      `Changed authored project: ${project.sourcePath}`,
    );
    project.validatorRules = project.audience === "arm" ? armRules : dpRules;
    if (project.audience === "arm") {
      const historical = saved.projects.find((item) => item.sourcePath === project.sourcePath);
      assert(
        historical?.compileStatus === "success" && historical.validationStatus === "success",
        `Missing successful saved project: ${project.slug}`,
      );
      project.apiVersion = historical.apiVersion;
      project.swaggerFiles = historical.swaggerFiles.map((relative) => {
        verify(relative);
        return { file: path.join(baseline, "dataset", relative), sha256: inventory.get(relative) };
      });
      for (const relative of historical.typespecFiles) {
        const bytes = verify(relative);
        const prefix = historical.typespecPath.replaceAll("\\", "/") + "/";
        assert(
          relative.replaceAll("\\", "/").startsWith(prefix),
          "Unexpected saved source prefix.",
        );
        const local = path.join(
          specs,
          project.sourcePath,
          relative.replaceAll("\\", "/").slice(prefix.length),
        );
        assert(sha(fs.readFileSync(local)) === sha(bytes), `Source snapshot mismatch: ${local}`);
      }
      const logs = [];
      for (const relative of [
        ...new Set([...(historical.rawFiles ?? []), ...(historical.validatorLogFiles ?? [])]),
      ]) {
        const bytes = verify(relative);
        if (!relative.endsWith(".jsonl")) continue;
        const rows = bytes.toString("utf8").trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
        const selected = rows.filter((row) =>
          project.validatorRules.some((name) =>
            row.message?.includes(`severity 'Error': '${name}'`),
          ),
        );
        const validating = rows.filter((row) =>
          row.message?.startsWith("spectralPluginFunc: Validating OpenAPI spec."),
        );
        const completed = rows.filter((row) => row.message === "spectralPluginFunc: Return");
        const production = rows.filter((row) =>
          row.message?.startsWith("Detected production run."),
        );
        const failures = rows.filter(
          (row) =>
            row.level === "fatal" ||
            row.message?.includes("spectralPluginFunc: Failed validating:"),
        );
        assert(
          selected.length === 4 &&
            validating.length > 0 &&
            completed.length === 1 &&
            production.length > 0 &&
            failures.length === 0,
          `Incomplete historical execution: ${relative}`,
        );
        const counts = Object.fromEntries(
          project.validatorRules.map((name) => [
            name,
            rows.filter(
              (row) =>
                !["information", "debug", "verbose"].includes(row.level) &&
                JSON.stringify(row).includes(name),
            ).length,
          ]),
        );
        logs.push({
          file: relative,
          sha256: sha(bytes),
          selected,
          validating,
          completed,
          production,
          counts,
        });
      }
      for (const relative of historical.swaggerFiles)
        assert(
          logs.some((log) =>
            log.validating.some((row) => row.message.includes(relative.replaceAll("\\", "/"))),
          ),
          `No production validation receipt: ${relative}`,
        );
      project.historicalCounts = Object.fromEntries(
        project.validatorRules.map((name) => [
          name,
          logs.reduce((sum, log) => sum + log.counts[name], 0),
        ]),
      );
      write(evidence(project.slug, "historical.json"), {
        status: "assessed-from-saved-production-execution",
        baselineIdentity: identity,
        counts: project.historicalCounts,
        logs,
        targetShards: Object.fromEntries(
          project.validatorRules.map((name) => [name, index.rules[name] ?? null]),
        ),
      });
    } else {
      const file = path.join(specs, project.sourcePath, project.swaggerRelative);
      const bytes = fs.readFileSync(file);
      assert(
        read(file).swagger === "2.0" && read(file).info.version === project.apiVersion,
        `Wrong frozen data-plane Swagger: ${file}`,
      );
      project.swaggerFiles = [{ file, sha256: sha(bytes) }];
    }
    write(evidence(project.slug, "input.json"), projectInput(project));
  }
  write(evidence("baseline-subset.json"), {
    baselineIdentity: identity,
    verificationScope:
      "Three selected ARM projects and their retained source/Swagger/production-log inputs; not a full-population verification.",
    verifiedFiles: [...verified].map(([file, sha256]) => ({ file, sha256 })),
  });
  write(path.join(root, "selection.json"), {
    createdAt: new Date().toISOString(),
    candidate,
    candidateCommit,
    coreCommit: git(path.join(candidate, "core"), "rev-parse", "HEAD"),
    specs,
    specsCommit,
    baselineDirectory: baseline,
    baselineIdentity: identity,
    baselineMetadataCommit: "1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6",
    typeSpecRule: rule,
    projects: chosen,
    scope: "source",
    nativeMode: "target-only",
    concurrency: 2,
    workerTimeoutMs: 240000,
    worker: { file: worker, sha256: sha(fs.readFileSync(worker)) },
    audienceProfiles: {
      arm: "Fresh native source diagnostics versus immutable historical ARM production observations.",
      "data-plane":
        "Fresh native source diagnostics versus explicit RequestBodyNotAllowed Spectral evaluation of checked-in OAS2 at the same frozen specs revision. Separate selected-rule profile, not production AutoRest execution or an ARM baseline.",
    },
    pilotOnly: true,
    officialAnalyzerRun: false,
    defaultActivation: "not-assessed",
    alignmentLimit:
      "Source programs include versions/customizations not necessarily emitted in the selected Swagger. Counts are raw observations, not normalized actionable defects or proof of equivalence.",
    rationale:
      "Simple ARM, large ARM, known customization-scope ARM, Key Vault resource data plane, and Search data-plane HTTP patterns.",
    estimate:
      "Exactly five projects, two workers, four-minute per-worker cap; previous five-project native worker window was under one minute. Setup and integrity verification are additional.",
    authorization:
      "Full validation is authorized only if this comparison establishes no gaps; unresolved differences or unassessed populations do not satisfy that condition.",
  });
  assert(
    sha(fs.readFileSync(worker)) ===
      "8b912c6cee552c9c89946dbba04c5e03c286d89320175e9f332d595d05234609",
    "Pinned native worker changed.",
  );
  console.log("Prepared three ARM and two data-plane projects; shared baseline unchanged.");
}

async function artifacts() {
  const tar = createRequire(path.join(candidate, "core", "packages", "compiler", "package.json"))(
    "tar",
  );
  const fromSpecs = createRequire(path.join(specs, "package.json"));
  const results = [];
  for (const archive of fs
    .readdirSync(evidence("artifacts"))
    .filter((name) => name.endsWith(".tgz"))
    .sort()) {
    const file = evidence("artifacts", archive);
    const entries = [];
    let manifest;
    await tar.t({
      file,
      onReadEntry(entry) {
        if (entry.type !== "File") {
          entry.resume();
          return;
        }
        const chunks = [];
        entry.on("data", (chunk) => chunks.push(chunk));
        entry.on("end", () => {
          const bytes = Buffer.concat(chunks);
          const relative = entry.path.replace(/^package\//, "");
          if (relative === "package.json") manifest = JSON.parse(bytes);
          entries.push({ file: relative, sha256: sha(bytes) });
        });
      },
    });
    assert(manifest, `Missing archive manifest: ${archive}`);
    const resolver =
      manifest.name === "@azure-tools/typespec-azure-examples"
        ? createRequire(fromSpecs.resolve("@azure-tools/typespec-autorest"))
        : fromSpecs;
    const installed = resolver.resolve
      .paths(manifest.name)
      .map((directory) => path.join(directory, manifest.name))
      .find((directory) => fs.existsSync(path.join(directory, "package.json")));
    assert(installed, `Missing installed artifact: ${manifest.name}`);
    const installedRoot = fs.realpathSync(installed);
    const sourceRoot = manifest.name.startsWith("@typespec/")
      ? path.join(candidate, "core")
      : candidate;
    const sourcePackage = path.join(sourceRoot, "packages", manifest.name.split("/")[1]);
    const installedMismatches = entries.filter((entry) => {
      const local = path.join(installedRoot, entry.file);
      return !fs.existsSync(local) || sha(fs.readFileSync(local)) !== entry.sha256;
    });
    const sourceMismatches = entries.filter((entry) => {
      if (entry.file === "package.json") return false;
      const local = path.join(sourcePackage, entry.file);
      const inherited = path.join(sourceRoot, entry.file);
      const source = fs.existsSync(local)
        ? local
        : /^licen[cs]e/i.test(entry.file)
          ? inherited
          : local;
      return !fs.existsSync(source) || sha(fs.readFileSync(source)) !== entry.sha256;
    });
    results.push({
      name: manifest.name,
      version: manifest.version,
      archive,
      archiveSha256: sha(fs.readFileSync(file)),
      installedRoot,
      packedFiles: entries.length,
      installedMismatches,
      sourceMismatches,
    });
  }
  const passed =
    results.length === 15 &&
    results.every(
      (item) => item.installedMismatches.length === 0 && item.sourceMismatches.length === 0,
    );
  write(evidence("runtime-identity.json"), {
    status: passed ? "passed" : "failed",
    candidateCommit,
    node: process.version,
    sourceComparison:
      "Every packed non-manifest payload compared with current candidate source/build; every packed payload including rewritten manifest compared with installed files.",
    artifacts: results,
  });
  assert(passed, "Source/build/packed/installed runtime mismatch.");
  console.log("All 15 candidate artifacts match their source/build and installed runtime.");
}

async function runWorker(directory) {
  const log = fs.openSync(path.join(directory, "worker.log"), "w");
  const startedAt = new Date().toISOString();
  let timedOut = false;
  const execution = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [worker, path.join(directory, "input.json"), path.join(directory, "native.json")],
      { cwd: specs, stdio: ["ignore", log, log], windowsHide: true },
    );
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, 240000);
    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  }).finally(() => fs.closeSync(log));
  const output = path.join(directory, "native.json");
  const receipt = fs.existsSync(output) ? read(output) : null;
  const result = {
    startedAt,
    completedAt: new Date().toISOString(),
    timedOut,
    ...execution,
    status:
      !timedOut && execution.code === 0 && receipt?.status === "success"
        ? "assessed"
        : "unassessed",
    workerStatus: receipt?.status ?? "missing-receipt",
  };
  write(path.join(directory, "execution.json"), result);
  return result;
}

async function controls() {
  assert(
    read(evidence("runtime-identity.json")).status === "passed",
    "Unverified injected runtime.",
  );
  const fixtures = [
    [
      "invalid-disabled-config",
      '@route("/get") @get op getBody(@body body: { value: string }): void;\n@route("/delete") @delete op deleteBody(@body body?: {}): void;\n@route("/implicit") @get op implicit(value: string): void;',
      3,
    ],
    [
      "compliant",
      '@route("/get") @get op getBodyless(@query name?: string): void;\n@route("/delete") @delete op deleteBodyless(): void;\n@route("/void") @delete op deleteVoid(@body body: void): void;\n@route("/post") @post op postBody(@body body: { value: string }): void;',
      0,
    ],
    [
      "suppressed",
      `#suppress "${rule}" "Intentional control suppression"\n@route("/get") @get op suppressed(@body body: { value: string }): void;`,
      0,
    ],
  ];
  const results = [];
  for (const [slug, source, expected] of fixtures) {
    const relative = path.join(".validation-controls", "no-request-body-a9c4d8a", slug);
    const directory = path.join(specs, relative);
    const content = `import "@typespec/http";\nimport "@azure-tools/typespec-azure-core";\nusing TypeSpec.Http;\n@service namespace PilotControl;\n${source}\n`;
    const config = `linter:\n  disable:\n    "${rule}": "Verify explicit comparison activation"\n`;
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "main.tsp"), content);
    fs.writeFileSync(path.join(directory, "tspconfig.yaml"), config);
    const output = evidence("controls", slug);
    write(
      path.join(output, "input.json"),
      projectInput({ sourcePath: relative, audience: "data-plane" }),
    );
    fs.writeFileSync(path.join(output, "main.tsp"), content);
    fs.writeFileSync(path.join(output, "tspconfig.yaml"), config);
    const execution = await runWorker(output);
    const native = read(path.join(output, "native.json"));
    const passed =
      execution.status === "assessed" &&
      native.rawDiagnostics?.length === expected &&
      native.diagnostics?.length === expected &&
      native.rawDiagnostics.every((item) => item.rule === rule);
    results.push({
      slug,
      expected,
      actual: native.rawDiagnostics?.length,
      status: passed ? "passed" : "failed",
      execution,
    });
    write(evidence("controls.json"), {
      status: results.every((item) => item.status === "passed") ? "passed" : "failed",
      results,
      limitation:
        "Synthetic controls establish injected rule activation/GET/DELETE/compliance/suppression, not real-project positive coverage or default preset activation.",
    });
    assert(passed, `Injected control failed: ${slug}`);
  }
  console.log(
    "Injected GET/DELETE, compliance, disabled-configuration override and suppression controls passed.",
  );
}

async function run() {
  assert(read(evidence("controls.json")).status === "passed", "Injected controls have not passed.");
  const selection = read(path.join(root, "selection.json"));
  assert(sha(fs.readFileSync(worker)) === selection.worker.sha256, "Native worker changed.");
  const pending = [...selection.projects];
  const results = [];
  async function consume() {
    while (pending.length) {
      const project = pending.shift();
      const execution = await runWorker(evidence(project.slug));
      results.push({ slug: project.slug, ...execution });
      write(evidence("execution.json"), { concurrency: 2, timeoutMs: 240000, results });
      console.log(
        `${project.name}: ${execution.status}, ${read(evidence(project.slug, "native.json")).rawDiagnostics?.length ?? "unknown"} target warnings`,
      );
    }
  }
  await Promise.all([consume(), consume()]);
  assert(results.length === 5, "Not exactly five project receipts.");
}

switch (process.argv[2]) {
  case "prepare":
    prepare();
    break;
  case "verify-runtime":
    await artifacts();
    break;
  case "controls":
    await controls();
    break;
  case "run":
    await run();
    break;
  default:
    throw new Error("Expected prepare | verify-runtime | controls | run");
}
