#!/usr/bin/env node
/**
 * build-antigravity.js — packages the Google Antigravity Agent Skill bundle
 * (.agents/skills/cinematic-landing-kit) into a distributable archive.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync, execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SKILL_NAME = "tidyfactor-cinematic";
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

function zipArchive(stagePath, outFile, cwdDir) {
  log("zipping Antigravity agent bundle...");
  if (fs.existsSync(outFile)) fs.rmSync(outFile);

  const stageBasename = path.basename(stagePath);

  // 1. Try native `zip` command
  try {
    execFileSync("zip", ["-r", "-q", outFile, stageBasename], {
      cwd: cwdDir,
      stdio: "inherit",
    });
    return;
  } catch (err) {
    log("`zip` binary unavailable or failed; trying Python fallback...");
  }

  // 2. Try Python built-in zipfile module (Cross-platform: Linux, macOS, Windows)
  try {
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    execFileSync(pythonCmd, ["-m", "zipfile", "-c", outFile, stageBasename], {
      cwd: cwdDir,
      stdio: "inherit",
    });
    return;
  } catch (pyErr) {
    log("Python zipfile fallback failed; trying PowerShell fallback...");
  }

  // 3. Try PowerShell Compress-Archive (Windows fallback)
  try {
    const tmpZip = outFile.replace(/\.(zip)$/, ".zip");
    if (fs.existsSync(tmpZip)) fs.rmSync(tmpZip);
    const result = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Compress-Archive -Path "${stagePath}" -DestinationPath "${tmpZip}" -Force`,
      ],
      { stdio: "inherit" }
    );
    if (result.status === 0) {
      if (tmpZip !== outFile) {
        fs.renameSync(tmpZip, outFile);
      }
      return;
    }
  } catch (winErr) {
    // Ignore and throw cumulative error
  }

  throw new Error("Failed to create zip archive via zip, Python, or PowerShell.");
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

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  zipArchive(STAGE_DIR, OUT_FILE, DIST_DIR);

  const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`done → ${path.relative(ROOT, OUT_FILE)} (${sizeKb} KB)`);
}

main();
