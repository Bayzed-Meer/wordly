#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen';
import ora from 'ora';
import figlet from 'figlet';
import gradient from 'gradient-string';

class WordleGame {

    async play() {
        this.displayWelcomeScreen();
        await this.confirmReady();
        await this.showLoadingAnimation();
    }

    displayWelcomeScreen() {
        process.stdout.write('\x1Bc');

        console.log(
            gradient(['red', 'orange', 'yellow', 'green', 'blue', 'purple']).multiline(
                figlet.textSync('WORDLE', {
                    font: 'Big',
                    horizontalLayout: 'default'
                })
            )
        );

        console.log(
            boxen(
                chalk.white.bold('Welcome to Wordle!\n\n') +
                chalk.gray('Guess the 5-letter word in 6 attempts.\n') +
                chalk.gray('Each guess must be a valid 5-letter word.'),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'double',
                    borderColor: 'green'
                }
            )
        );

        const legend =
            chalk.black.bgGreen(' X ') + chalk.gray(' = Correct position  ') +
            chalk.black.bgYellow(' X ') + chalk.gray(' = Wrong position  ') +
            chalk.white.bgGray(' X ') + chalk.gray(' = Not in word');

        console.log(boxen(legend, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
        }));
    }

    async confirmReady() {
        try {
            const { ready } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'ready',
                    message: 'Ready to play? (y/n)',
                    validate(input) {
                        const val = input.trim().toLowerCase();
                        if (['y', 'yes', 'n', 'no'].includes(val)) return true;
                        return "Please enter 'y' or 'n'";
                    }
                }
            ]);

            const isReady = ['y', 'yes'].includes(ready.trim().toLowerCase());

            if (!isReady) {
                console.log(chalk.yellow('\nMaybe next time!\n'));
                process.exit(0);
            }

        } catch (error) {
            console.log(chalk.yellow('\n\nGame cancelled. See you next time!\n'));
            throw error;
        }
    }

    async showLoadingAnimation() {
        const spinner = ora({
            text: 'Selecting a word...',
            spinner: 'dots'
        }).start();

        await new Promise(resolve => setTimeout(resolve, 1000));
        spinner.succeed('Word selected! Good luck!');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

try {
    const game = new WordleGame();
    await game.play();
} catch (err) {
    process.exit(1);
}
