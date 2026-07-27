#!/usr/bin/env node
/**
 * build-skill.js — packages the distributable Claude Skill (.skill file)
 * for TidyFactor Cinematic from the repo's single source of truth.
 *
 * WHY THIS EXISTS
 * ----------------
 * The repo has ONE copy of memory/, templates/, scripts/, requirements.txt,
 * and brand.json — read directly by any AI agent via AGENTS.md. Those files
 * are never duplicated in git.
 *
 * `.claude-skill/` (SKILL.md + references/) is the Claude-specific wrapper.
 * It is git-tracked but intentionally incomplete on its own — it has no
 * memory/, templates/, or scripts/ of its own.
 *
 * A Claude Skill (.skill upload on claude.ai, or a folder under
 * .claude/skills/ for Claude Code) must be SELF-CONTAINED: it ships alone,
 * with no access to sibling folders in this repo. So at *build time only*
 * (never committed), this script assembles:
 *
 *   dist/tidyfactor-cinematic/
 *     ├── SKILL.md                  ← from .claude-skill/SKILL.md
 *     ├── references/               ← from .claude-skill/references/
 *     ├── memory/                   ← copied from repo root memory/
 *     ├── templates/                ← copied from repo root templates/
 *     ├── scripts/                  ← copied from repo root scripts/
 *     ├── assets/.gitkeep           ← copied from repo root assets/
 *     ├── brand.json                ← copied from repo root brand.json (template)
 *     ├── requirements.txt          ← copied from repo root
 *     └── LICENSE                   ← copied from repo root
 *
 * ...then zips it to dist/tidyfactor-cinematic.skill.
 *
 * Usage:
 *   node tools/build-skill.js
 *   node tools/build-skill.js --out dist/custom-name.skill
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SKILL_NAME = "tidyfactor-cinematic";
const SRC_WRAPPER = path.join(ROOT, ".claude-skill");
const DIST_DIR = path.join(ROOT, "dist");
const STAGE_DIR = path.join(DIST_DIR, SKILL_NAME);

const args = process.argv.slice(2);
const outFlagIdx = args.indexOf("--out");
const OUT_FILE =
  outFlagIdx !== -1 && args[outFlagIdx + 1]
    ? path.resolve(ROOT, args[outFlagIdx + 1])
    : path.join(DIST_DIR, `${SKILL_NAME}.skill`);

// Single-source folders/files copied as-is from repo root into the package.
const ROOT_COPIES = [
  "memory",
  "templates",
  "scripts",
  "assets",
  "brand.json",
  "requirements.txt",
  "LICENSE",
];

function log(msg) {
  console.log(`[build-skill] ${msg}`);
}

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    log(`  ⚠ skipped (not found): ${path.relative(ROOT, src)}`);
    return;
  }
  fs.cpSync(src, dest, { recursive: true });
}

function assertExists(p, hint) {
  if (!fs.existsSync(p)) {
    throw new Error(`Missing required path: ${p}\n${hint || ""}`);
  }
}

function main() {
  log("running skill validation before build...");
  execFileSync("node", [path.join(__dirname, "validate-skill.js"), "--sync"], { stdio: "inherit" });

  log(`repo root: ${ROOT}`);
  assertExists(
    SRC_WRAPPER,
    "Expected .claude-skill/SKILL.md + references/ at the repo root."
  );
  assertExists(path.join(SRC_WRAPPER, "SKILL.md"));

  log("cleaning previous build...");
  rmrf(STAGE_DIR);
  fs.mkdirSync(STAGE_DIR, { recursive: true });

  log("staging Claude wrapper (SKILL.md + references/)...");
  copyRecursive(
    path.join(SRC_WRAPPER, "SKILL.md"),
    path.join(STAGE_DIR, "SKILL.md")
  );
  copyRecursive(
    path.join(SRC_WRAPPER, "references"),
    path.join(STAGE_DIR, "references")
  );

  log("staging single-source-of-truth files from repo root...");
  for (const name of ROOT_COPIES) {
    const src = path.join(ROOT, name);
    const dest = path.join(STAGE_DIR, name);
    copyRecursive(src, dest);
    log(`  + ${name}`);
  }

  fs.writeFileSync(
    path.join(STAGE_DIR, "README.md"),
    [
      "# TidyFactor Cinematic — Claude Skill package",
      "",
      "Built from https://github.com/alwkala/Cinematic-Landing-Kit — this",
      "package is a generated artifact (see tools/build-skill.js in that",
      "repo). Do not hand-edit files here; edit the source and rebuild.",
      "",
      "- `memory/`, `templates/`, `scripts/`, `brand.json` — identical to",
      "  the repo root, copied verbatim at build time.",
      "- `SKILL.md`, `references/` — the Claude-specific command wrapper.",
      "",
    ].join("\n")
  );

  log("zipping...");
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  if (fs.existsSync(OUT_FILE)) fs.rmSync(OUT_FILE);

  try {
    execFileSync("zip", ["-r", "-q", OUT_FILE, SKILL_NAME], {
      cwd: DIST_DIR,
      stdio: "inherit",
    });
  } catch (err) {
    try {
      const { spawnSync } = require("child_process");
      const tmpZip = OUT_FILE.replace(/\.skill$/, ".zip");
      if (fs.existsSync(tmpZip)) fs.rmSync(tmpZip);
      const result = spawnSync(
        "powershell",
        [
          "-NoProfile", "-NonInteractive", "-Command",
          `Compress-Archive -Path "${path.join(DIST_DIR, SKILL_NAME)}" -DestinationPath "${tmpZip}" -Force`,
        ],
        { stdio: "inherit" }
      );
      if (result.status !== 0) throw new Error("Compress-Archive failed");
      fs.renameSync(tmpZip, OUT_FILE);
    } catch (winErr) {
      throw new Error(
        "`zip` command and PowerShell fallback both failed.\n" +
          "Install zip (e.g. `apt-get install zip`) or use `archiver` npm package.\n" +
          err.message
      );
    }
  }

  const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`done → ${path.relative(ROOT, OUT_FILE)} (${sizeKb} KB)`);
}

main();
