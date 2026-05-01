#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".yml",
  ".yaml",
  ".sql",
  ".css",
  ".scss",
  ".html",
  ".env",
]);

const SUSPICIOUS_TOKENS = [
  "\u00C3",
  "\u00C2",
  "\u00E2\u20AC",
  "\u00E2\u20AC\u201C",
  "\u00E2\u20AC\u201D",
  "\u00E2\u20AC\u0153",
  "\u00E2\u20AC\u009D",
  "\u00E2\u20AC\u0098",
  "\u00E2\u20AC\u0099",
  "\uFFFD",
];

function runGit(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error) {
    const details = result.error.code || result.error.message;
    throw new Error(`git ${args.join(" ")} failed to start: ${details}`);
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || "").trim();
    throw new Error(`git ${args.join(" ")} failed${stderr ? `: ${stderr}` : ""}`);
  }
  return result.stdout || "";
}

function parseNullSeparated(output) {
  return output.split("\0").filter(Boolean);
}

function unique(items) {
  return [...new Set(items)];
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (TEXT_EXTENSIONS.has(ext)) return true;
  const base = path.basename(filePath).toLowerCase();
  return base === ".env" || base === ".editorconfig" || base === ".gitattributes";
}

function getStagedFiles() {
  return parseNullSeparated(
    runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMRTUXB", "-z"])
  );
}

function getChangedFiles() {
  const staged = parseNullSeparated(
    runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMRTUXB", "-z"])
  );
  const unstaged = parseNullSeparated(
    runGit(["diff", "--name-only", "--diff-filter=ACMRTUXB", "-z"])
  );
  const untracked = parseNullSeparated(runGit(["ls-files", "--others", "--exclude-standard", "-z"]));
  return unique([...staged, ...unstaged, ...untracked]);
}

function findSuspiciousEntries(content) {
  const findings = [];
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    for (const token of SUSPICIOUS_TOKENS) {
      if (lines[i].includes(token)) {
        findings.push({ line: i + 1, token });
      }
    }
  }
  return findings;
}

function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const buffer = fs.readFileSync(filePath);
  const content = buffer.toString("utf8");
  const findings = findSuspiciousEntries(content);

  if (content.includes("\uFFFD")) {
    findings.push({ line: 0, token: "U+FFFD" });
  }

  return findings;
}

function resolveTargets(args) {
  const modeChanged = args.includes("--changed");
  const modeAll = args.includes("--all");
  const positional = args.filter((arg) => !arg.startsWith("--"));

  if (positional.length > 0) {
    return positional;
  }

  try {
    if (modeAll) {
      return parseNullSeparated(runGit(["ls-files", "-z"]));
    }
    if (modeChanged) return getChangedFiles();
    return getStagedFiles();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`validate-encoding: aviso: ${message}`);
    console.warn("validate-encoding: passe arquivos explicitamente quando git nao estiver acessivel.");
    return [];
  }
}

function main() {
  const args = process.argv.slice(2);
  const targets = resolveTargets(args).filter(isTextFile);

  if (targets.length === 0) {
    console.log("validate-encoding: nenhum arquivo textual selecionado.");
    process.exit(0);
  }

  const issues = [];
  for (const filePath of targets) {
    const findings = validateFile(filePath);
    if (findings.length > 0) {
      issues.push({ filePath, findings });
    }
  }

  if (issues.length === 0) {
    console.log(`validate-encoding: OK (${targets.length} arquivo(s)).`);
    process.exit(0);
  }

  console.error("validate-encoding: caracteres suspeitos encontrados:");
  for (const issue of issues) {
    for (const finding of issue.findings) {
      const lineLabel = finding.line > 0 ? `linha ${finding.line}` : "linha desconhecida";
      console.error(`- ${issue.filePath}: ${lineLabel} (token: ${finding.token})`);
    }
  }
  process.exit(1);
}

main();
