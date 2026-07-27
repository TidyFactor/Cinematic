#!/usr/bin/env node
/**
 * validate-skill.js — Validates skill frontmatter, file integrity,
 * command reference completeness, and path linkages across agent targets.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AGENTS_SKILL_DIR = path.join(ROOT, '.agents', 'skills', 'cinematic-landing-kit');
const CLAUDE_SKILL_DIR = path.join(ROOT, '.claude-skill');

const REQUIRED_COMMANDS = [
  'init', 'brand', 'clone-brand', 'media', 'film', 'hero',
  'theme', 'typeface', 'transitions', 'i18n', 'perf', 'a11y',
  'convert', 'audit', 'variant', 'deploy'
];

let errors = [];
let warnings = [];

function log(msg) {
  console.log(`[validate-skill] ${msg}`);
}

function checkFrontmatter(filePath, skillName) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing skill file: ${path.relative(ROOT, filePath)}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) {
    errors.push(`File ${path.relative(ROOT, filePath)} is missing YAML frontmatter header ('---')`);
    return;
  }
  const parts = content.split('---');
  if (parts.length < 3) {
    errors.push(`Invalid frontmatter formatting in ${path.relative(ROOT, filePath)}`);
    return;
  }
  const frontmatter = parts[1];
  if (!frontmatter.includes('name:')) {
    errors.push(`Missing 'name:' field in frontmatter of ${path.relative(ROOT, filePath)}`);
  }
  if (!frontmatter.includes('description:')) {
    errors.push(`Missing 'description:' field in frontmatter of ${path.relative(ROOT, filePath)}`);
  }
  log(`✓ Frontmatter valid for ${path.relative(ROOT, filePath)}`);
}

function checkCommands(refDir) {
  if (!fs.existsSync(refDir)) {
    errors.push(`Missing command references directory: ${path.relative(ROOT, refDir)}`);
    return;
  }
  for (const cmd of REQUIRED_COMMANDS) {
    const cmdFile = path.join(refDir, `${cmd}.md`);
    if (!fs.existsSync(cmdFile)) {
      errors.push(`Missing command reference spec for '${cmd}': ${path.relative(ROOT, cmdFile)}`);
    }
  }
  log(`✓ All ${REQUIRED_COMMANDS.length} command specs present in ${path.relative(ROOT, refDir)}`);
}

function checkDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    errors.push(`Missing required directory (${label}): ${path.relative(ROOT, dirPath)}`);
  } else {
    log(`✓ Directory verified: ${label}`);
  }
}

function main() {
  log('Starting skill validation check...');

  // 1. Check Antigravity / Agentic IDE Skill
  checkFrontmatter(path.join(AGENTS_SKILL_DIR, 'SKILL.md'), 'cinematic-landing-kit');
  checkCommands(path.join(AGENTS_SKILL_DIR, 'references', 'commands'));

  // 2. Check Claude Skill
  checkFrontmatter(path.join(CLAUDE_SKILL_DIR, 'SKILL.md'), 'tidyfactor-cinematic');
  checkCommands(path.join(CLAUDE_SKILL_DIR, 'references', 'commands'));

  // 3. Check Core Repositories
  checkDirectory(path.join(ROOT, 'memory'), 'memory');
  checkDirectory(path.join(ROOT, 'templates', 'layouts'), 'templates/layouts');
  checkDirectory(path.join(ROOT, 'scripts'), 'scripts');

  // 4. Check Root Markdown entry point
  const agentsMd = path.join(ROOT, 'AGENTS.md');
  if (!fs.existsSync(agentsMd)) {
    errors.push('Missing root AGENTS.md');
  } else {
    log('✓ Root AGENTS.md verified');
  }

  // Summary
  if (warnings.length > 0) {
    console.warn('\nWarnings:');
    warnings.forEach(w => console.warn(`  ⚠ ${w}`));
  }

  if (errors.length > 0) {
    console.error('\n✖ Validation failed with errors:');
    errors.forEach(e => console.error(`  ❌ ${e}`));
    process.exit(1);
  }

  log('✨ All skill validation checks passed successfully!\n');
}

main();
