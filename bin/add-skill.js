#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const PACKAGE_ROOT = path.resolve(__dirname, '..');

async function main() {
  console.log(`\n  ${chalk.bold.yellow('🤖 Cinematic Landing Kit - Agent Skill Installer')} ${chalk.dim('v1.0.0')}\n`);

  const workspaceRoot = process.cwd();
  const skillDir = path.join(workspaceRoot, '.agents', 'skills', 'cinematic-landing-kit');

  const spinner = ora(`Installing Agent Skill in ${chalk.cyan('.agents/skills/cinematic-landing-kit')}...`).start();

  try {
    // 1. Ensure target skill directory exists
    fs.mkdirSync(skillDir, { recursive: true });

    // 2. Copy memory reference files
    const srcMemory = path.join(PACKAGE_ROOT, 'memory');
    const destMemory = path.join(skillDir, 'memory');
    if (fs.existsSync(srcMemory)) {
      fs.cpSync(srcMemory, destMemory, { recursive: true });
    }

    // 3. Prepare SKILL.md with frontmatter for skill discovery
    const agentsMdPath = path.join(PACKAGE_ROOT, 'AGENTS.md');
    let agentsContent = '';
    if (fs.existsSync(agentsMdPath)) {
      agentsContent = fs.readFileSync(agentsMdPath, 'utf8');
    }

    const skillFrontmatter = `---
name: cinematic-landing-kit
description: Build single-file scroll-driven luxury landing pages (Apple x Cartier aesthetic) using HTML5, GSAP, Lenis, and canvas scroll films.
---

`;

    const fullSkillContent = skillFrontmatter + agentsContent;
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), fullSkillContent, 'utf8');

    // 4. Update workspace root AGENTS.md if present
    const rootAgentsMd = path.join(workspaceRoot, 'AGENTS.md');
    const importNotice = `\n<!-- Cinematic Landing Kit Skill Installed -->\n`;

    if (fs.existsSync(rootAgentsMd)) {
      const existing = fs.readFileSync(rootAgentsMd, 'utf8');
      if (!existing.includes('Cinematic Landing Kit')) {
        fs.appendFileSync(rootAgentsMd, `\n${importNotice}${agentsContent}\n`, 'utf8');
      }
    } else {
      fs.mkdirSync(path.dirname(rootAgentsMd), { recursive: true });
      fs.writeFileSync(rootAgentsMd, `${agentsContent}\n`, 'utf8');
    }

    spinner.succeed(chalk.green(`Agent Skill installed successfully!`));

    console.log(`
  ${chalk.bold('Installed artifacts:')}
    • ${chalk.cyan('.agents/skills/cinematic-landing-kit/SKILL.md')}
    • ${chalk.cyan('.agents/skills/cinematic-landing-kit/memory/')}
    • ${chalk.cyan('AGENTS.md')} (Updated workspace rules)

  ${chalk.bold.yellow('✨ Your AI Agent is now ready to build luxury landing pages!')}
`);

  } catch (err) {
    spinner.fail(chalk.red('Failed to install Agent Skill.'));
    console.error(err);
    process.exit(1);
  }
}

main();
