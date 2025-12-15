import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';
import { MIN_WORD_LENGTH, MAX_WORD_LENGTH, DEFAULT_WORD_LENGTH, DEFAULT_MAX_ATTEMPTS } from '../constants.js';

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
        boxen(chalk.white.bold('Welcome to Wordle!\n\n') + chalk.cyan('The classic word guessing game\n\n'), {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
        })
    );

    const legend =
        chalk.black.bgGreen(' X ') +
        chalk.gray(' = Correct position  ') +
        chalk.black.bgYellow(' X ') +
        chalk.gray(' = Wrong position  ') +
        chalk.white.bgGray(' X ') +
        chalk.gray(' = Not in word ');

    console.log(
        boxen(legend, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
        })
    );
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
            gradient(['red', 'orange', 'yellow', 'green', 'blue', 'purple'])(
                figlet.textSync('YOU WON!', { font: 'Standard' })
            ) +
                '\n\n' +
                chalk.green.bold(
                    `Congratulations! You guessed it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`
                ),
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
        boxen(chalk.cyan.bold('Thanks for playing Wordle!\n') + chalk.gray('Come back soon!'), {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
        })
    );
}

export async function showLoadingAnimation() {
    const spinner = ora({
        text: '🎲  Selecting a word...',
        spinner: 'dots'
    }).start();

    await new Promise(resolve => setTimeout(resolve, 5000));
    spinner.succeed('✨  Word selected! Good luck!');
    await new Promise(resolve => setTimeout(resolve, 500));
}

export function showCheckingSpinner() {
    return ora('Checking guess...').start();
}

export function displayInvalidSyntaxError() {
    console.log(chalk.red.bold('\n❌ Invalid flag syntax detected!\n'));
    console.log(chalk.yellow('You used the incorrect syntax with short flags and equals signs.'));
    console.log(chalk.cyan('\n📖 Correct usage:\n'));
    console.log(chalk.white('  ✅ Short flags with space:'));
    console.log(chalk.green('     wordle play -l 6 -a 8\n'));
    console.log(chalk.white('  ✅ Long flags with equals:'));
    console.log(chalk.green('     wordle play --length=6 --attempts=8\n'));
    console.log(chalk.white('  ✅ Long flags with space:'));
    console.log(chalk.green('     wordle play --length 6 --attempts 8\n'));
    console.log(chalk.gray('Tip: Run "wordle play --help" for more information.\n'));
}

export function displayWordLengthError(value, errorType) {
    console.log(chalk.red.bold('\n❌  Invalid word length!\n'));

    if (errorType === 'non-numeric') {
        console.log(chalk.yellow(`You entered: "${value}"`));
        console.log(chalk.cyan('\n📏  Word length must be a NUMBER\n'));
        console.log(chalk.white('You entered a non-numeric value. Please use numbers only.'));
    } else if (errorType === 'too-small') {
        console.log(chalk.yellow(`You specified: ${value}`));
        console.log(chalk.cyan(`\n📏  Word length is too short! Minimum is ${MIN_WORD_LENGTH}\n`));
        console.log(chalk.white(`Your value (${value}) is below the minimum allowed length.`));
    } else if (errorType === 'too-large') {
        console.log(chalk.yellow(`You specified: ${value}`));
        console.log(chalk.cyan(`\n📏  Word length is too long! Maximum is ${MAX_WORD_LENGTH}\n`));
        console.log(chalk.white(`Your value (${value}) is above the maximum allowed length.`));
    }

    console.log(chalk.gray(`\n✅  Valid range: ${MIN_WORD_LENGTH} to ${MAX_WORD_LENGTH}\n`));
    console.log(chalk.white('Examples:'));
    console.log(chalk.green(`  wordle play -l ${MIN_WORD_LENGTH}     # ${MIN_WORD_LENGTH}-letter words`));
    console.log(
        chalk.green(`  wordle play -l ${DEFAULT_WORD_LENGTH}     # ${DEFAULT_WORD_LENGTH}-letter words (default)`)
    );
    console.log(chalk.green(`  wordle play -l ${MAX_WORD_LENGTH}     # ${MAX_WORD_LENGTH}-letter words\n`));
}

export function displayAttemptsError(value, errorType) {
    console.log(chalk.red.bold('\n❌  Invalid number of attempts!\n'));

    if (errorType === 'non-numeric') {
        console.log(chalk.yellow(`You entered: "${value}"`));
        console.log(chalk.cyan('\n🎯  Number of attempts must be a NUMBER\n'));
        console.log(chalk.white('You entered a non-numeric value. Please use numbers only.'));
    } else if (errorType === 'too-small') {
        console.log(chalk.yellow(`You specified: ${value}`));
        console.log(chalk.cyan('\n🎯  Number of attempts must be at least 1\n'));
        console.log(chalk.white(`Your value (${value}) is too low. You need at least 1 attempt to play!`));
    }

    console.log(chalk.gray('\n✅  Valid range: 1 or more\n'));
    console.log(chalk.white('Examples:'));
    console.log(chalk.green(`  wordle play -a 1      # 1 attempt`));
    console.log(
        chalk.green(`  wordle play -a ${DEFAULT_MAX_ATTEMPTS}      # ${DEFAULT_MAX_ATTEMPTS} attempts (default)`)
    );
    console.log(chalk.green('  wordle play -a 10     # 10 attempts'));
    console.log(chalk.green('  wordle play -a 20     # 20 attempts\n'));
}

export function displayStats(stats) {
    const winPercentage = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

    const lastPlayed = stats.lastPlayed ? new Date(stats.lastPlayed).toLocaleString() : 'Never';

    const statsDisplay =
        chalk.bold.cyan('GAME STATISTICS\n\n') +
        chalk.white(`Games Played:    ${chalk.yellow(stats.gamesPlayed)}\n`) +
        chalk.white(`Games Won:       ${chalk.green(stats.gamesWon)}\n`) +
        chalk.white(`Win Rate:        ${chalk.yellow(winPercentage + '%')}\n`) +
        chalk.white(`Current Streak:  ${chalk.cyan(stats.currentStreak)}\n`) +
        chalk.white(`Max Streak:      ${chalk.magenta(stats.maxStreak)}\n\n`) +
        chalk.dim(`Last Played: ${lastPlayed}`);

    console.log(
        boxen(statsDisplay, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
        })
    );
}
