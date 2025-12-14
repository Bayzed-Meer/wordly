import chalk from 'chalk';
import boxen from 'boxen';
import { APP_VERSION, APP_DESCRIPTION, APP_AUTHOR } from '../constants.js';

export async function aboutCommand() {
    try {
        const aboutText =
            chalk.cyan.bold(`${APP_DESCRIPTION}\n\n`) +
            chalk.gray('Version: ') + chalk.green(`${APP_VERSION}\n`) +
            chalk.gray('Author: ') + chalk.green(`${APP_AUTHOR}\n`) +
            chalk.blue('Report issues and suggest features at: https://github.com/Bayzed-Meer/wordly\n');

        console.log(
            boxen(aboutText, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan'
            })
        );

        console.log(chalk.cyan('📚 How to play:\n'));
        console.log(chalk.white('  • Guess the hidden word in limited attempts'));
        console.log(chalk.white('  • Green = correct letter and position'));
        console.log(chalk.white('  • Yellow = correct letter, wrong position'));
        console.log(chalk.white('  • Gray = letter not in word\n'));

        console.log(chalk.cyan('🚀 Quick start:\n'));
        console.log(chalk.green('  wordle play') + chalk.gray('           # Start a game with defaults'));
        console.log(chalk.green('  wordle play -l 6') + chalk.gray('      # Play with 6-letter words'));
        console.log(chalk.green('  wordle play -a 10') + chalk.gray('     # Play with 10 attempts\n'));
    } catch (error) {
        process.exit(1);
    }
}

export default {
    name: 'about',
    description: 'Learn about Wordle CLI',
    action: aboutCommand
};

