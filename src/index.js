#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { registerCommands } from './commands/index.js';
import { APP_VERSION } from './constants.js';

const program = new Command();

program
    .name('wordle')
    .description(chalk.cyan('🎮 Play Wordle in your terminal! Guess the hidden word in a fun, challenging CLI game.'))
    .version(APP_VERSION, '-v, --version', 'Display version number');

registerCommands(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}