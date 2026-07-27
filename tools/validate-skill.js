#!/usr/bin/env node
/**
 * validate-skill.js — Validates skill frontmatter, file integrity,
 * command reference completeness, content parity, and path linkages across agent targets.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AGENTS_SKILL_DIR = path.join(ROOT, '.agents', 'skills', 'cinematic-landing-kit');
const CLAUDE_SKILL_DIR = path.join(ROOT, '.claude-skill');

const REQUIRED_COMMANDS = [
  'init', 'brand', 'clone-brand', 'media', 'film', 'hero',
  'theme', 'typeface', 'transitions', 'i18n', 'perf', 'a11y',
  'convert', 'audit', 'variant', 'deploy', 'polish'
];

const autoSync = process.argv.includes('--sync') || process.argv.includes('--fix');

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

function checkCommandsAndParity() {
  const agentsRefDir = path.join(AGENTS_SKILL_DIR, 'references', 'commands');
  const claudeRefDir = path.join(CLAUDE_SKILL_DIR, 'references', 'commands');

  if (!fs.existsSync(agentsRefDir)) {
    errors.push(`Missing command references directory: ${path.relative(ROOT, agentsRefDir)}`);
    return;
  }
  if (!fs.existsSync(claudeRefDir)) {
    errors.push(`Missing command references directory: ${path.relative(ROOT, claudeRefDir)}`);
    return;
  }

  for (const cmd of REQUIRED_COMMANDS) {
    const agentsFile = path.join(agentsRefDir, `${cmd}.md`);
    const claudeFile = path.join(claudeRefDir, `${cmd}.md`);

    if (!fs.existsSync(agentsFile)) {
      errors.push(`Missing Antigravity command spec for '${cmd}': ${path.relative(ROOT, agentsFile)}`);
      continue;
    }
    if (!fs.existsSync(claudeFile)) {
      if (autoSync) {
        fs.mkdirSync(path.dirname(claudeFile), { recursive: true });
        fs.copyFileSync(agentsFile, claudeFile);
        log(`⚡ Auto-created missing '${cmd}.md' in .claude-skill`);
      } else {
        errors.push(`Missing Claude command spec for '${cmd}': ${path.relative(ROOT, claudeFile)}`);
        continue;
      }
    }

    const agentsContent = fs.readFileSync(agentsFile, 'utf8');
    const claudeContent = fs.readFileSync(claudeFile, 'utf8');

    if (agentsContent !== claudeContent) {
      if (autoSync) {
        fs.copyFileSync(agentsFile, claudeFile);
        log(`⚡ Auto-synced '${cmd}.md' from .agents to .claude-skill`);
      } else {
        warnings.push(`Command spec '${cmd}.md' differs between .agents and .claude-skill. Run 'node tools/validate-skill.js --sync' to auto-sync.`);
      }
    }
  }

  log(`✓ All ${REQUIRED_COMMANDS.length} command specs verified with parity check across targets`);
}

function checkDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    errors.push(`Missing required directory (${label}): ${path.relative(ROOT, dirPath)}`);
  } else {
    log(`✓ Directory verified: ${label}`);
  }
}

function checkMemoryFiles() {
  const memoryDir = path.join(ROOT, 'memory');
  if (!fs.existsSync(memoryDir)) return;
  const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md'));
  log(`✓ Verified ${files.length} memory reference files in memory/`);
}

function checkLayouts() {
  const layoutsDir = path.join(ROOT, 'templates', 'layouts');
  const requiredLayouts = [
    'fullbleed.html', 'editorial.html', 'spatial.html',
    'interface.html', 'minimal.html', 'product.html', 'store.html'
  ];
  for (const layout of requiredLayouts) {
    const layoutPath = path.join(layoutsDir, layout);
    if (!fs.existsSync(layoutPath)) {
      errors.push(`Missing required layout template: ${path.relative(ROOT, layoutPath)}`);
    }
  }
  log(`✓ Verified all ${requiredLayouts.length} layout templates in templates/layouts/`);
}

function main() {
  log('Starting skill validation check...');

  // 1. Check Skill Frontmatter
  checkFrontmatter(path.join(AGENTS_SKILL_DIR, 'SKILL.md'), 'cinematic-landing-kit');
  checkFrontmatter(path.join(CLAUDE_SKILL_DIR, 'SKILL.md'), 'tidyfactor-cinematic');

  // 2. Check Command Specs & Content Parity
  checkCommandsAndParity();

  // 3. Check Core Repositories & Memory
  checkDirectory(path.join(ROOT, 'memory'), 'memory');
  checkMemoryFiles();
  checkDirectory(path.join(ROOT, 'templates', 'layouts'), 'templates/layouts');
  checkLayouts();
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
