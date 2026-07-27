#!/usr/bin/env node
/**
 * build-antigravity.js — packages the Google Antigravity Agent Skill bundle
 * (.agents/skills/cinematic-landing-kit) into a distributable archive.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync, execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SKILL_NAME = "cinematic-landing-kit";
const SRC_WRAPPER = path.join(ROOT, ".agents", "skills", SKILL_NAME);
const DIST_DIR = path.join(ROOT, "dist");
const STAGE_DIR = path.join(DIST_DIR, "antigravity-" + SKILL_NAME);
const OUT_FILE = path.join(DIST_DIR, `${SKILL_NAME}.agents.zip`);

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
  console.log(`[build-antigravity] ${msg}`);
}

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

function main() {
  log("running skill validation before build...");
  execFileSync("node", [path.join(__dirname, "validate-skill.js"), "--sync"], { stdio: "inherit" });

  log(`repo root: ${ROOT}`);
  if (!fs.existsSync(SRC_WRAPPER)) {
    throw new Error(`Missing required path: ${SRC_WRAPPER}`);
  }

  log("cleaning previous build...");
  rmrf(STAGE_DIR);
  fs.mkdirSync(STAGE_DIR, { recursive: true });

  log("staging Antigravity wrapper (SKILL.md + references/)...");
  copyRecursive(SRC_WRAPPER, STAGE_DIR);

  log("staging single-source-of-truth files...");
  for (const name of ROOT_COPIES) {
    const src = path.join(ROOT, name);
    const dest = path.join(STAGE_DIR, name);
    copyRecursive(src, dest);
    log(`  + ${name}`);
  }

  log("zipping Antigravity bundle...");
  if (fs.existsSync(OUT_FILE)) fs.rmSync(OUT_FILE);

  try {
    execFileSync("zip", ["-r", "-q", OUT_FILE, path.basename(STAGE_DIR)], {
      cwd: DIST_DIR,
      stdio: "inherit",
    });
  } catch (err) {
    const result = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Compress-Archive -Path "${STAGE_DIR}" -DestinationPath "${OUT_FILE}" -Force`,
      ],
      { stdio: "inherit" }
    );
    if (result.status !== 0) {
      throw new Error("Failed to create Antigravity zip archive.");
    }
  }

  const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`done → ${path.relative(ROOT, OUT_FILE)} (${sizeKb} KB)`);
}

main();
