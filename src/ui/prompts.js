import chalk from 'chalk';
import inquirer from 'inquirer';

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
