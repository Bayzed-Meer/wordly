import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import gradient from 'gradient-string';

export function clearScreen() {
    process.stdout.write('\x1Bc');
}

export function displayWelcomeScreen() {
    clearScreen();

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
            chalk.cyan('The classic word guessing game\n\n'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan'
            }
        )
    );

    const legend =
        chalk.black.bgGreen(' X ') + chalk.gray(' = Correct position  ') +
        chalk.black.bgYellow(' X ') + chalk.gray(' = Wrong position  ') +
        chalk.white.bgGray(' X ') + chalk.gray(' = Not in word ');

    console.log(boxen(legend, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
    }));
}

export function displayBoard(attempts, maxAttempts, wordLength) {
    clearScreen();

    console.log(
        gradient(['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5']).multiline(
            figlet.textSync('WORDLE', {
                font: 'Standard',
                horizontalLayout: 'default'
            })
        )
    );

    console.log(chalk.dim('─'.repeat(wordLength * 10)) + '\n');

    for (let i = 0; i < maxAttempts; i++) {
        if (i < attempts.length) {
            const { guess, result } = attempts[i];
            console.log('  ' + formatGuess(guess, result));
        } else {
            const empty = (chalk.gray('[ _ ]') + ' ').repeat(wordLength).trim();
            console.log('  ' + empty);
        }
        console.log();
    }

    console.log(chalk.dim('─'.repeat(wordLength * 10)));
    console.log(chalk.cyan(`  📊  Attempts: ${attempts.length}/${maxAttempts}`));
    console.log();
}

export function formatGuess(guess, result) {
    let formatted = '';
    for (let i = 0; i < guess.length; i++) {
        const letter = ` ${guess[i]} `;
        if (result[i] === 'correct') {
            formatted += chalk.black.bgGreen(letter);
        } else if (result[i] === 'present') {
            formatted += chalk.black.bgYellow(letter);
        } else {
            formatted += chalk.white.bgGray(letter);
        }
        formatted += ' ';
    }
    return formatted;
}

export function displayWinMessage(attempts) {
    console.log();
    console.log(
        boxen(
            gradient(['red', 'orange', 'yellow', 'green', 'blue', 'purple'])(figlet.textSync('YOU WON!', { font: 'Standard' })) +
            '\n\n' +
            chalk.green.bold(`Congratulations! You guessed it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'green'
            }
        )
    );
}

export function displayLossMessage(word) {
    console.log();
    console.log(
        boxen(
            chalk.red.bold('GAME OVER\n\n') +
            chalk.yellow(`The word was: ${chalk.bold(word)}\n`) +
            chalk.gray('Better luck next time!'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'red'
            }
        )
    );
}

export function displayGoodbyeMessage() {
    console.log(
        boxen(
            chalk.cyan.bold('Thanks for playing Wordle!\n') +
            chalk.gray('Come back soon!'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan'
            }
        )
    );
}

export async function showLoadingAnimation() {
    const spinner = ora({
        text: '🎲  Selecting a word...',
        spinner: 'dots'
    }).start();

    await new Promise(resolve => setTimeout(resolve, 1000));
    spinner.succeed('✨  Word selected! Good luck!');
    await new Promise(resolve => setTimeout(resolve, 500));
}

export function showCheckingSpinner() {
    return ora('Checking guess...').start();
}