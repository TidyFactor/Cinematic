#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(PACKAGE_ROOT, 'package.json'));

function printBanner() {
  const v = `v${pkg.version}`;
  console.log('');
  console.log(chalk.yellow('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.yellow('  ║') + chalk.bold.white('  🤖  Agent Skill Installer  ') + chalk.dim(v.padEnd(7)) + '                 ' + chalk.yellow('║'));
  console.log(chalk.yellow('  ║') + chalk.dim('  Equip Antigravity, Claude Code, Cursor & Windsurf     ') + chalk.yellow('║'));
  console.log(chalk.yellow('  ╚═══════════════════════════════════════════════════════╝'));
  console.log('');
}

function printSuccessSummary() {
  console.log('');
  console.log(chalk.green('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.green('  ║') + chalk.bold.white('  ✅  Skill Installed Successfully!                    ') + chalk.green('║'));
  console.log(chalk.green('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.green('  ║') + `  📂  ${chalk.cyan('.agents/skills/cinematic-landing-kit/SKILL.md')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  📚  ${chalk.cyan('.agents/skills/cinematic-landing-kit/references/')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  🧰  ${chalk.cyan('.agents/skills/cinematic-landing-kit/memory/')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  🤖  ${chalk.cyan('.claude-skill/')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  📄  ${chalk.cyan('AGENTS.md')} ${chalk.dim('(Updated workspace agent rules)')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.green('  ║') + chalk.bold.white('  🚀  Supported AI Agent Slash Commands:               ') + chalk.green('║'));
  console.log(chalk.green('  ║') + `  • ${chalk.cyan('init')}      — Full working cinematic page in 1 pass`.padEnd(60) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  • ${chalk.cyan('brand')}     — Scaffolds & validates brand.json tokens`.padEnd(60) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  • ${chalk.cyan('media')}     — Generates keyframes & video clips`.padEnd(60) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  • ${chalk.cyan('film')}      — Builds canvas scroll frame sequence`.padEnd(60) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  • ${chalk.cyan('perf')} / ${chalk.cyan('a11y')} — Quality-bar budget checks`.padEnd(60) + chalk.green('║'));
  console.log(chalk.green('  ╚═══════════════════════════════════════════════════════╝'));
  console.log('');
  console.log(`  ${chalk.bold.yellow('✨ Your AI Agent is now fully empowered!')} ${chalk.dim('Prompt your agent with: "init"')}`);
  console.log('');
}

async function main() {
  printBanner();

  const workspaceRoot = process.cwd();
  const skillDir = path.join(workspaceRoot, '.agents', 'skills', 'cinematic-landing-kit');

  const spinner = ora({
    text: `Installing Agent Skill in ${chalk.cyan('.agents/skills/cinematic-landing-kit')}...`,
    color: 'yellow',
  }).start();

  try {
    // 1. Ensure target skill directory exists
    fs.mkdirSync(skillDir, { recursive: true });

    // 2. Copy SKILL.md from package template or repo source
    const srcSkillMd = path.join(PACKAGE_ROOT, '.agents', 'skills', 'cinematic-landing-kit', 'SKILL.md');
    const destSkillMd = path.join(skillDir, 'SKILL.md');
    if (fs.existsSync(srcSkillMd)) {
      fs.copyFileSync(srcSkillMd, destSkillMd);
    } else {
      const agentsMdPath = path.join(PACKAGE_ROOT, 'AGENTS.md');
      let agentsContent = fs.existsSync(agentsMdPath) ? fs.readFileSync(agentsMdPath, 'utf8') : '';
      const skillFrontmatter = `---\nname: cinematic-landing-kit\ndescription: Build single-file scroll-driven luxury landing pages (Apple x Cartier aesthetic) using HTML5, GSAP, Lenis, and canvas scroll films.\n---\n\n`;
      fs.writeFileSync(destSkillMd, skillFrontmatter + agentsContent, 'utf8');
    }

    // 3. Copy supporting skill resources: memory, references, scripts, templates, brand.json
    const srcSkillReferences = path.join(PACKAGE_ROOT, '.agents', 'skills', 'cinematic-landing-kit', 'references');
    if (fs.existsSync(srcSkillReferences)) {
      fs.cpSync(srcSkillReferences, path.join(skillDir, 'references'), { recursive: true });
    } else {
      const claudeReferences = path.join(PACKAGE_ROOT, '.claude-skill', 'references');
      if (fs.existsSync(claudeReferences)) {
        fs.cpSync(claudeReferences, path.join(skillDir, 'references'), { recursive: true });
      }
    }

    const copyDirs = ['memory', 'scripts', 'templates'];
    for (const dir of copyDirs) {
      const srcDir = path.join(PACKAGE_ROOT, dir);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, path.join(skillDir, dir), { recursive: true });
      }
    }

    const srcBrand = path.join(PACKAGE_ROOT, 'brand.json');
    if (fs.existsSync(srcBrand)) {
      fs.copyFileSync(srcBrand, path.join(skillDir, 'brand.json'));
    }

    // 4. Copy .claude-skill wrapper for Claude Code / Claude.ai compatibility
    const srcClaudeSkill = path.join(PACKAGE_ROOT, '.claude-skill');
    const destClaudeSkill = path.join(workspaceRoot, '.claude-skill');
    if (fs.existsSync(srcClaudeSkill) && !fs.existsSync(destClaudeSkill)) {
      fs.cpSync(srcClaudeSkill, destClaudeSkill, { recursive: true });
    }

    // 5. Update or create workspace root AGENTS.md & rules
    const rootAgentsMd = path.join(workspaceRoot, 'AGENTS.md');
    const srcAgentsMd = path.join(PACKAGE_ROOT, 'AGENTS.md');
    let agentsContent = fs.existsSync(srcAgentsMd) ? fs.readFileSync(srcAgentsMd, 'utf8') : '';

    if (fs.existsSync(rootAgentsMd)) {
      const existing = fs.readFileSync(rootAgentsMd, 'utf8');
      if (!existing.includes('Cinematic Luxury Landing-Page Engine')) {
        fs.appendFileSync(rootAgentsMd, `\n\n<!-- Cinematic Landing Kit Skill Installed -->\n${agentsContent}\n`, 'utf8');
      }
    } else {
      fs.mkdirSync(path.dirname(rootAgentsMd), { recursive: true });
      fs.writeFileSync(rootAgentsMd, `${agentsContent}\n`, 'utf8');
    }

    // Update optional rules files if present or requested (.cursorrules, .windsurfrules, .clinerules)
    const ruleNotice = `\n# Cinematic Landing Kit — AI Agent Rules\n# Read AGENTS.md and .agents/skills/cinematic-landing-kit/SKILL.md for instructions.\n`;
    ['.cursorrules', '.windsurfrules', '.clinerules'].forEach(ruleFile => {
      const rulePath = path.join(workspaceRoot, ruleFile);
      if (fs.existsSync(rulePath)) {
        const existing = fs.readFileSync(rulePath, 'utf8');
        if (!existing.includes('Cinematic Landing Kit')) {
          fs.appendFileSync(rulePath, ruleNotice, 'utf8');
        }
      }
    });

    spinner.succeed(chalk.green('Skill installation complete!'));

    printSuccessSummary();

  } catch (err) {
    spinner.fail(chalk.red('Failed to install Agent Skill.'));
    console.error(err);
    process.exit(1);
  }
}

main();
