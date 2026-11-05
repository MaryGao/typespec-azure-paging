import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const candidate = "C:\\dev\\worktrees\\native-default-in-enum-5972";
const specs = "C:\\dev\\worktrees\\specs-default-in-enum-5972";
const artifacts = "C:\\dev\\worktrees\\evidence-default-in-enum-5972\\.local\\artifacts";
const output = "C:\\Users\\marygao\\project\\coverage-reports\\default-in-enum\\evidence";
const requireFromCandidate = createRequire(path.join(candidate, "core", "packages", "compiler", "package.json"));
const requireFromSpecs = createRequire(path.join(specs, "package.json"));
const tar = requireFromCandidate("tar");
const sha = (data) => createHash("sha256").update(data).digest("hex");
const results = [];
for (const name of fs.readdirSync(artifacts).filter((file) => file.endsWith(".tgz")).sort()) {
  const file = path.join(artifacts, name);
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
        if (relative === "package.json") manifest = JSON.parse(bytes.toString("utf8"));
        entries.push({ file: relative, sha256: sha(bytes) });
      });
    },
  });
  if (!manifest) throw new Error(`Missing package manifest: ${name}`);
  const resolver = manifest.name === "@azure-tools/typespec-azure-examples"
    ? createRequire(requireFromSpecs.resolve("@azure-tools/typespec-autorest"))
    : requireFromSpecs;
  const packagePath = resolver.resolve.paths(manifest.name)
    .map((directory) => path.join(directory, manifest.name))
    .find((directory) => fs.existsSync(path.join(directory, "package.json")));
  if (!packagePath) throw new Error(`Cannot locate installed package: ${manifest.name}`);
  const root = fs.realpathSync(packagePath);
  const entrypoint = path.join(root, manifest.main ?? "package.json");
  const mismatches = entries.filter((entry) => {
    const file = path.join(root, entry.file);
    return !fs.existsSync(file) || sha(fs.readFileSync(file)) !== entry.sha256;
  });
  const result = {
    name: manifest.name,
    version: manifest.version,
    archive: name,
    archiveSha256: sha(fs.readFileSync(file)),
    installedRoot: root,
    entrypoint,
    entrypointSha256: sha(fs.readFileSync(entrypoint)),
    verifiedFiles: entries.length - mismatches.length,
    mismatches,
  };
  results.push(result);
  console.log(`${result.name}: ${result.verifiedFiles} packed files matched; ${mismatches.length} mismatches`);
}
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, "runtime-identity.json"), JSON.stringify({
  status: results.every((item) => item.mismatches.length === 0) ? "passed" : "failed",
  node: process.version,
  specs,
  artifacts: results,
}, null, 2) + "\n");
if (results.length !== 15 || results.some((item) => item.mismatches.length !== 0)) {
  throw new Error("Installed candidate does not match all 15 packed artifacts.");
}
