#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const prompts = require('prompts');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(PACKAGE_ROOT, 'package.json'));

/* ─────────────────────────────────────────────────────────────────────
   Layout registry
   - name:     short CLI alias (used in --layout=<name> flag)
   - file:     actual template filename in templates/layouts/
   - emoji:    display emoji for menu
   - label:    short name in the menu
   - desc:     one-line description shown after the dash
   ───────────────────────────────────────────────────────────────────── */
const LAYOUTS = [
  {
    name:  'film',
    file:  'fullbleed',
    emoji: '🎬',
    label: 'Cinematic Film',
    desc:  'Luxury products, brand campaigns & transformation stories',
  },
  {
    name:  'story',
    file:  'editorial',
    emoji: '📖',
    label: 'Brand Story',
    desc:  'Split-screen founder & editorial layouts',
  },
  {
    name:  'space',
    file:  'spatial',
    emoji: '🏛️',
    label: 'Spatial Walkthrough',
    desc:  'Immersive location & environment tours',
  },
  {
    name:  'app',
    file:  'interface',
    emoji: '💻',
    label: 'App & Platform',
    desc:  'Device mockups & UI workflow demos',
  },
  {
    name:  'creator',
    file:  'minimal',
    emoji: '✨',
    label: 'Creator',
    desc:  'Lightweight personal brand & digital product pages',
  },
  {
    name:  'product',
    file:  'product',
    emoji: '🛒',
    label: 'Single Product',
    desc:  'High-conversion e-commerce with social proof & WhatsApp',
  },
  {
    name:  'store',
    file:  'store',
    emoji: '📲',
    label: 'Product Store',
    desc:  'Multi-product showcase with WhatsApp conversion',
  },
];

// Build lookup maps
const LAYOUT_BY_NAME = new Map(LAYOUTS.map(l => [l.name, l]));
// Also accept legacy template file names directly (fullbleed, editorial, etc.)
LAYOUTS.forEach(l => { if (l.file !== l.name) LAYOUT_BY_NAME.set(l.file, l); });

function isInteractiveTerminal() {
  return (
    Boolean(process.stdin.isTTY) &&
    Boolean(process.stdout.isTTY) &&
    !process.env.CI &&
    process.env.NO_PROMPT !== '1'
  );
}

function parseCliArgs() {
  const args = process.argv.slice(2);
  let targetDirArg = null;
  let flags = {
    layout: undefined,
    yes: false,
    defaults: false,
    help: false,
    version: false,
  };

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg === '--version' || arg === '-v') {
      flags.version = true;
    } else if (arg.startsWith('--layout=')) {
      flags.layout = arg.split('=')[1];
    } else if (arg === '--yes' || arg === '-y') {
      flags.yes = true;
    } else if (arg === '--defaults') {
      flags.defaults = true;
    } else if (!arg.startsWith('--') && !targetDirArg) {
      targetDirArg = arg;
    }
  }

  return { targetDirArg, flags };
}

async function safePrompts(questions, flags, isInteractive) {
  if (!isInteractive || flags.yes || flags.defaults) {
    return {};
  }

  const activeQuestions = questions.filter(q => q && q.type !== null);
  if (activeQuestions.length === 0) {
    return {};
  }

  return Promise.race([
    prompts(activeQuestions, {
      onCancel() {
        console.log(chalk.red('\n✖ Operation cancelled.'));
        process.exit(0);
      }
    }),
    new Promise(resolve => {
      setTimeout(() => {
        console.log(
          chalk.yellow(
            '\nInteractive input timeout. Falling back to defaults.'
          )
        );
        resolve({});
      }, 1000);
    })
  ]);
}

function printBanner() {
  const v = `v${pkg.version}`;
  console.log('');
  console.log(chalk.yellow('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.yellow('  ║') + chalk.bold.white('  🎬  Cinematic Landing Kit  ') + chalk.dim(v.padEnd(7)) + '             ' + chalk.yellow('║'));
  console.log(chalk.yellow('  ║') + chalk.dim('  Build luxury AI-powered landing pages in minutes     ') + chalk.yellow('║'));
  console.log(chalk.yellow('  ╚═══════════════════════════════════════════════════════╝'));
  console.log('');
}

function printHelp() {
  printBanner();
  const names = LAYOUTS.map(l => l.name).join(', ');
  console.log(`  ${chalk.bold('Usage:')}`);
  console.log(`    $ npx create-cinematic-kit [project-dir] [options]\n`);
  console.log(`  ${chalk.bold('Options:')}`);
  console.log(`    ${chalk.cyan('--layout=<name>')}   Select layout template`);
  console.log(`    ${chalk.cyan('-y, --yes')}         Accept all defaults (non-interactive)`);
  console.log(`    ${chalk.cyan('--defaults')}        Use default settings`);
  console.log(`    ${chalk.cyan('-v, --version')}     Display version number`);
  console.log(`    ${chalk.cyan('-h, --help')}        Display this help message\n`);
  console.log(`  ${chalk.bold('Layout Templates:')}\n`);
  LAYOUTS.forEach(l => {
    console.log(`    ${chalk.cyan(l.name.padEnd(10))} ${l.emoji}  ${chalk.bold(l.label)} — ${chalk.dim(l.desc)}`);
  });
  console.log('');
  console.log(`  ${chalk.bold('Examples:')}`);
  console.log(`    ${chalk.dim('$ npx create-cinematic-kit my-store --layout=store')}`);
  console.log(`    ${chalk.dim('$ npx create-cinematic-kit my-launch --layout=film --yes')}`);
  console.log(`    ${chalk.dim('$ npx create-cinematic-kit --layout=product -y    # CI/agent')}`);
  console.log('');
}

function printSuccessSummary(projectDir, layout) {
  const displayName = `${layout.emoji}  ${layout.label}`;
  const isWhatsApp = layout.name === 'product' || layout.name === 'store';

  console.log('');
  console.log(chalk.green('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.green('  ║') + chalk.bold.white('  ✅  Project Scaffolded Successfully!                 ') + chalk.green('║'));
  console.log(chalk.green('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.green('  ║') + `  📁  ${chalk.cyan(projectDir + '/')}`.padEnd(57) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  📄  ${chalk.white('index.html')}   ${chalk.dim('(' + displayName + ')')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  🧠  ${chalk.white('AGENTS.md')}    ${chalk.dim('(AI Agent rules)')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  🎨  ${chalk.white('brand.json')}   ${chalk.dim('(Design tokens)')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  🧰  ${chalk.white('memory/')}      ${chalk.dim('(20 AI memory files)')}`.padEnd(62) + chalk.green('║'));
  console.log(chalk.green('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.green('  ║') + chalk.bold.white('  🚀  Next Steps:                                       ') + chalk.green('║'));
  console.log(chalk.green('  ║') + `  ${chalk.dim('1.')}  ${chalk.cyan('cd ' + projectDir)}`.padEnd(58) + chalk.green('║'));
  console.log(chalk.green('  ║') + `  ${chalk.dim('2.')}  Edit ${chalk.yellow('brand.json')} — add colors, fonts, voice`.padEnd(62) + chalk.green('║'));
  if (isWhatsApp) {
    console.log(chalk.green('  ║') + `  ${chalk.dim('3.')}  Set ${chalk.yellow('WHATSAPP_NUMBER')} in index.html`.padEnd(62) + chalk.green('║'));
    console.log(chalk.green('  ║') + `  ${chalk.dim('4.')}  Open AI agent → type: ${chalk.cyan('init')}`.padEnd(60) + chalk.green('║'));
    console.log(chalk.green('  ║') + `  ${chalk.dim('5.')}  ${chalk.cyan('npm run dev')} — preview at ${chalk.underline('localhost:8123')}`.padEnd(62) + chalk.green('║'));
  } else {
    console.log(chalk.green('  ║') + `  ${chalk.dim('3.')}  Open AI agent → type: ${chalk.cyan('init')}`.padEnd(60) + chalk.green('║'));
    console.log(chalk.green('  ║') + `  ${chalk.dim('4.')}  ${chalk.cyan('npm run dev')} — preview at ${chalk.underline('localhost:8123')}`.padEnd(62) + chalk.green('║'));
  }
  console.log(chalk.green('  ╚═══════════════════════════════════════════════════════╝'));
  console.log('');

  if (isWhatsApp) {
    console.log(`  ${chalk.bold.green('💬 WhatsApp Tip:')} Search ${chalk.yellow('WHATSAPP_NUMBER')} in index.html`);
    console.log(`     Replace with your number in E.164 format (e.g. ${chalk.cyan('966512345678')})`);
    console.log('');
  }

  console.log(`  ${chalk.bold.yellow('✨ Happy Building!')}  ${chalk.dim('Docs: https://github.com/alwkala/Cinematic-Landing-Kit')}`);
  console.log('');
}

async function main() {
  const { targetDirArg, flags } = parseCliArgs();

  if (flags.version) {
    console.log(`v${pkg.version}`);
    process.exit(0);
  }

  if (flags.help) {
    printHelp();
    process.exit(0);
  }

  printBanner();

  // Validate --layout flag if explicitly passed
  if (flags.layout && !LAYOUT_BY_NAME.has(flags.layout)) {
    console.error(chalk.red(`  ✖ Unknown layout "${flags.layout}"\n`));
    console.log(`  Available layout names:\n`);
    LAYOUTS.forEach(l => {
      console.log(`    ${chalk.cyan(l.name.padEnd(10))} ${l.emoji}  ${l.label}`);
    });
    console.log('');
    process.exit(1);
  }

  const isInteractive = isInteractiveTerminal();
  const willPrompt = isInteractive && !flags.yes && !flags.defaults && (!targetDirArg || !flags.layout);

  if (!willPrompt && !isInteractive) {
    console.log(chalk.dim('  ℹ Non-interactive mode (CI / agent detected) — using defaults.\n'));
  }

  // Build prompts
  const questions = [
    {
      type: targetDirArg ? null : 'text',
      name: 'projectDir',
      message: 'Project directory name:',
      initial: 'my-cinematic-landing',
      hint: 'Lowercase, hyphens only (e.g. my-perfume-brand)',
    },
    {
      type: flags.layout ? null : 'select',
      name: 'layout',
      message: 'Select a layout template:',
      hint: '↑/↓ navigate · Enter select',
      choices: LAYOUTS.map(l => ({
        title: `${l.emoji}  ${chalk.bold(l.label.padEnd(22))} ${chalk.dim('— ' + l.desc)}`,
        value: l.name,
      })),
      initial: 0,
    },
  ];

  let responses = {};
  try {
    responses = await safePrompts(questions, flags, isInteractive);
  } catch (err) {
    responses = {};
  }

  const projectDir = targetDirArg ?? responses.projectDir ?? 'my-cinematic-landing';
  const layoutName = flags.layout ?? responses.layout ?? 'film';
  const layout = LAYOUT_BY_NAME.get(layoutName) ?? LAYOUTS[0];

  // Announce config in non-interactive mode
  if (!willPrompt) {
    console.log(`  ${chalk.bold('Configuration:')}`);
    console.log(`    • Project:  ${chalk.cyan(projectDir)}`);
    console.log(`    • Layout:   ${chalk.cyan(layout.name)} (${layout.emoji} ${layout.label})`);
    console.log('');
  }

  const targetPath = path.resolve(process.cwd(), projectDir);

  if (fs.existsSync(targetPath)) {
    const files = fs.readdirSync(targetPath);
    if (files.length > 0) {
      console.error(chalk.red(`  ✖ Directory "${projectDir}" already exists and is not empty.`));
      process.exit(1);
    }
  } else {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const spinner = ora({
    text: `Scaffolding ${chalk.cyan(projectDir)} with ${layout.emoji} ${chalk.bold(layout.label)}...`,
    color: 'yellow',
  }).start();

  try {
    // 1. Copy core directories
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
    const templateFile = layout.file;
    const layoutPath = path.join(PACKAGE_ROOT, 'templates', 'layouts', `${templateFile}.html`);
    const indexPath = path.join(targetPath, 'index.html');

    if (fs.existsSync(layoutPath)) {
      fs.copyFileSync(layoutPath, indexPath);
    } else {
      // Fallback to fullbleed
      const fallback = path.join(PACKAGE_ROOT, 'templates', 'layouts', 'fullbleed.html');
      if (fs.existsSync(fallback)) {
        fs.copyFileSync(fallback, indexPath);
      }
    }

    // 4. Create target project package.json
    const projectPkg = {
      name: path.basename(projectDir).toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      version: pkg.version,
      private: true,
      description: 'Cinematic scroll-driven luxury landing page',
      scripts: {
        'dev':   'python -m http.server 8123',
        'serve': 'npx serve .',
      },
    };
    fs.writeFileSync(
      path.join(targetPath, 'package.json'),
      JSON.stringify(projectPkg, null, 2),
      'utf8'
    );

    spinner.succeed(chalk.green('Scaffolding complete!'));

    printSuccessSummary(projectDir, layout);

  } catch (err) {
    spinner.fail(chalk.red('Failed to scaffold project.'));
    console.error(err);
    process.exit(1);
  }
}

main();
