#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const prompts = require('prompts');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(PACKAGE_ROOT, 'package.json'));

async function main() {
  console.log(`\n  ${chalk.bold.yellow('🎬 Cinematic Landing Kit')} ${chalk.dim(`v${pkg.version}`)}\n`);

  let targetDirArg = process.argv[2];
  let flags = {};

  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--layout=')) {
      flags.layout = arg.split('=')[1];
    }
  });

  if (targetDirArg && targetDirArg.startsWith('--')) {
    targetDirArg = null;
  }

  let responses;
  try {
    responses = await prompts(
      [
        {
          type: targetDirArg ? null : 'text',
          name: 'projectDir',
          message: 'Project directory name:',
          initial: 'my-cinematic-landing'
        },
        {
          type: flags.layout ? null : 'select',
          name: 'layout',
          message: 'Select a layout template:',
          choices: [
            { title: 'Fullbleed Film (Long scroll film hero - Perfume, Watches, Luxury items)', value: 'fullbleed' },
            { title: 'Editorial (Split-screen hero - Furniture, Auto, Skincare)', value: 'editorial' },
            { title: 'Spatial (Establishing-shot hero - Real Estate, Architecture, Hospitality)', value: 'spatial' },
            { title: 'Interface (Device mockup hero - SaaS, Digital Apps)', value: 'interface' },
            { title: 'Minimal (Centered hero - Books, Digital products, Lightweight)', value: 'minimal' }
          ],
          initial: 0
        }
      ],
      {
        onCancel: () => {
          console.log(chalk.red('\n✖ Operation cancelled.'));
          process.exit(0);
        }
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const projectDir = targetDirArg || responses.projectDir || 'my-cinematic-landing';
  const layout = flags.layout || responses.layout || 'fullbleed';

  const targetPath = path.resolve(process.cwd(), projectDir);

  if (fs.existsSync(targetPath)) {
    const files = fs.readdirSync(targetPath);
    if (files.length > 0) {
      console.log(chalk.red(`\n✖ Directory "${projectDir}" already exists and is not empty.`));
      process.exit(1);
    }
  } else {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const spinner = ora(`Scaffolding project in ${chalk.cyan(projectDir)}...`).start();

  try {
    // 1. Copy core directories (including .agents and .claude-skill)
    const dirsToCopy = ['memory', 'scripts', 'assets', 'templates', '.agents', '.claude-skill'];
    for (const dir of dirsToCopy) {
      const srcDir = path.join(PACKAGE_ROOT, dir);
      const destDir = path.join(targetPath, dir);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
      }
    }

    // 2. Copy root configuration & markdown files
    const filesToCopy = ['brand.json', 'AGENTS.md', '.gitignore', 'requirements.txt', 'LICENSE', 'README.md'];
    for (const file of filesToCopy) {
      const srcFile = path.join(PACKAGE_ROOT, file);
      const destFile = path.join(targetPath, file);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
      }
    }

    // 3. Set up index.html from selected layout template
    const layoutPath = path.join(PACKAGE_ROOT, 'templates', 'layouts', `${layout}.html`);
    const indexPath = path.join(targetPath, 'index.html');

    if (fs.existsSync(layoutPath)) {
      fs.copyFileSync(layoutPath, indexPath);
    } else {
      const defaultLayout = path.join(PACKAGE_ROOT, 'templates', 'layouts', 'fullbleed.html');
      if (fs.existsSync(defaultLayout)) {
        fs.copyFileSync(defaultLayout, indexPath);
      }
    }

    // 4. Create target project package.json
    const projectPkg = {
      name: path.basename(projectDir).toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      version: pkg.version,
      private: true,
      description: 'Cinematic scroll-driven luxury landing page',
      scripts: {
        "dev": "python -m http.server 8123",
        "serve": "npx serve ."
      }
    };
    fs.writeFileSync(
      path.join(targetPath, 'package.json'),
      JSON.stringify(projectPkg, null, 2),
      'utf8'
    );

    spinner.succeed(chalk.green(`Project scaffolded successfully in ${chalk.bold(projectDir)}!`));

    console.log(`
  ${chalk.bold('Next steps:')}

    1. ${chalk.cyan(`cd ${projectDir}`)}
    2. Start local preview server:
       ${chalk.cyan('npm run dev')}  ${chalk.dim('# (Python server at http://localhost:8123)')}
       ${chalk.dim('or')}
       ${chalk.cyan('npm run serve')}

    3. Customization & Brand Configuration:
       Edit ${chalk.yellow('brand.json')} to update colors, typography, voice, and media provider tokens.
       Read ${chalk.yellow('AGENTS.md')} for full AI Agent workflow instructions and slash commands.

  ${chalk.bold.yellow('✨ Happy Building!')}
`);

  } catch (err) {
    spinner.fail(chalk.red('Failed to scaffold project.'));
    console.error(err);
    process.exit(1);
  }
}

main();
