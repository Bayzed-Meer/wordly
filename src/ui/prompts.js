import chalk from 'chalk';
import inquirer from 'inquirer';
import { storage } from '../utils/storage.js';

export async function getPlayerGuess(wordLength) {
    try {
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'guess',
                message: chalk.cyan('💭  Enter your guess:'),
                validate: input => {
                    const upperInput = input.trim().toUpperCase();

                    if (upperInput.length !== wordLength) return `Guess must be exactly ${wordLength} letters`;
                    if (!/^[A-Z]+$/.test(upperInput)) return 'Only letters allowed';

                    return true;
                },
                filter: input => input.trim().toUpperCase()
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
                type: 'input',
                name: 'playAgain',
                message: chalk.cyan('Would you like to play again? (y/n):'),
                validate(input) {
                    const answer = input.trim().toLowerCase();

                    if (['y', 'yes', 'n', 'no'].includes(answer)) {
                        return true;
                    }

                    return chalk.red("Please enter 'y' or 'n'");
                },
                filter(input) {
                    return input.trim().toLowerCase();
                }
            }
        ]);

        return ['y', 'yes'].includes(response.playAgain);
    } catch (error) {
        console.log(chalk.yellow('\n\n👋  Game cancelled. Thanks for playing!\n'));
        throw error;
    }
}

export async function handleReset() {
    try {
        const { resetChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'resetChoice',
                message: chalk.yellow('⚠️  Are you sure you want to reset all statistics?'),
                choices: [
                    { name: chalk.red('Yes, reset my statistics permanently.'), value: true },
                    { name: chalk.green('No, keep my statistics.'), value: false }
                ],
                default: false
            }
        ]);

        if (resetChoice) {
            storage.resetStats();
            console.log(chalk.green('\n✅  Statistics reset successfully!\n'));
        } else {
            console.log(chalk.gray('\nReset cancelled.\n'));
        }
    } catch (error) {
        console.log(chalk.yellow('\n\nReset cancelled.\n'));
        throw error;
    }
}
