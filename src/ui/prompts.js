import chalk from 'chalk';
import inquirer from 'inquirer';
import {MAX_WORD_LENGTH, MIN_WORD_LENGTH} from '../constants.js';

export async function confirmReady() {
    try {
        const { ready } = await inquirer.prompt([
            {
                type: 'input',
                name: 'ready',
                message: chalk.cyan('🚀  Ready to play? (y/n)'),
                validate(input) {
                    const val = input.trim().toLowerCase();
                    if (['y', 'yes', 'n', 'no'].includes(val)) return true;
                    return "Please enter 'y' or 'n'";
                }
            }
        ]);

        const isReady = ['y', 'yes'].includes(ready.trim().toLowerCase());

        if (!isReady) {
            console.log(chalk.yellow('\n👋  Maybe next time!\n'));
            process.exit(0);
        }
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Game cancelled. See you next time!\n'));
        throw error;
    }
}

export async function getPlayerModeChoice() {
    try {
        const { mode } = await inquirer.prompt([
            {
                type: 'list',
                name: 'mode',
                message: chalk.cyan('Choose your game mode:'),
                choices: [
                    {
                        name: chalk.green('Default') + chalk.gray(' (5 letters, 6 attempts)'),
                        value: 'default'
                    },
                    {
                        name: chalk.yellow('Custom') + chalk.gray(' (choose your settings)'),
                        value: 'custom'
                    }
                ],
                default: 'default',
                pageSize: 2
            }
        ]);

        return mode;
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Game cancelled. See you next time!\n'));
        throw error;
    }
}

export async function getCustomGameSettings() {
    try {
        return await inquirer.prompt([
            {
                type: 'input',
                name: 'wordLength',
                message: chalk.cyan(`Enter word length (${MIN_WORD_LENGTH}-${MAX_WORD_LENGTH}):`),
                validate(input) {
                    const num = Number.parseInt(input);

                    if (Number.isNaN(num)) {
                        return chalk.red('Please enter a valid number');
                    }
                    if (num < MIN_WORD_LENGTH || num > MAX_WORD_LENGTH) {
                        return chalk.red(`Word length must be between ${MIN_WORD_LENGTH} and ${MAX_WORD_LENGTH}`);
                    }
                    return true;
                },
                filter(input) {
                    return Number.parseInt(input);
                }
            },
            {
                type: 'input',
                name: 'maxAttempts',
                message: chalk.cyan('Enter maximum attempts:'),
                validate(input) {
                    const num = Number.parseInt(input);

                    if (Number.isNaN(num)) {
                        return chalk.red('Please enter a valid number');
                    }

                    return true;
                },
                filter(input) {
                    return Number.parseInt(input);
                }
            }
        ]);
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Game cancelled. See you next time!\n'));
        throw error;
    }
}

export async function getPlayerGuess(wordLength) {
    try {
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'guess',
                message: chalk.cyan('💭  Enter your guess:'),
                validate: (input) => {
                    const upperInput = input.trim().toUpperCase();

                    if (upperInput.length !== wordLength) return `Guess must be exactly ${wordLength} letters`;
                    if (!/^[A-Z]+$/.test(upperInput)) return 'Only letters allowed';

                    return true;
                },
                filter: (input) => input.trim().toUpperCase(),
            }
        ]);

        return response.guess;
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Game cancelled. Thanks for playing!\n'));
        throw error;
    }
}

export async function askPlayAgain() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'playAgain',
                message: chalk.cyan('Would you like to play again?'),
                default: true
            }
        ]);

        return response.playAgain;
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Thanks for playing!\n'));
        throw error;
    }
}

