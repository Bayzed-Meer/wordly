#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen';
import ora from 'ora';
import figlet from 'figlet';
import gradient from 'gradient-string';

const wordList = [
    'APPLE', 'BADGE', 'CABIN', 'DANCE', 'EAGLE', 'FAITH', 'GRACE', 'HAPPY', 'IMAGE', 'JOKER',
    'KNIFE', 'LEMON', 'MAGIC', 'NOBLE', 'OCEAN', 'PEACE', 'QUEEN', 'RIVER', 'STONE', 'TIGER',
    'UNITY', 'VOICE', 'WHALE', 'XENON', 'YOUTH', 'ZEBRA', 'BEACH', 'CHARM', 'DREAM', 'FLAME',
    'GLOBE', 'HEART', 'IVORY', 'JEWEL', 'KARMA', 'LIGHT', 'MEDAL', 'NEXUS', 'OASIS', 'PEARL',
    'QUEST', 'ROYAL', 'SMILE', 'TRUST', 'URBAN', 'VITAL', 'WIELD', 'YIELD', 'ZONAL', 'AGILE',
    'BRAVE', 'CRAFT', 'DRIFT', 'EARTH', 'FROST', 'GIANT', 'HAVEN', 'INPUT', 'JOLLY', 'KNACK',
    'BLAZE', 'CRISP', 'DENSE', 'EMPTY', 'FRUIT', 'GRAND', 'HONOR', 'IDEAL', 'JOINT', 'LOCAL',
    'MINOR', 'NORTH', 'OUTER', 'PRIDE', 'QUICK', 'ROUND', 'SHARP', 'THICK', 'UNITY', 'VITAL'
];

class WordleGame {

    constructor() {
        this.wordLength = 5;
        this.maxAttempts = 6;
        this.word = this.selectRandomWord();
        this.attempts = [];
        this.gameOver = false;
        this.won = false;
        this.mode = 'default';
    }

    async play() {
        this.displayWelcomeScreen();
        await this.confirmReady();
        await this.getPlayerModeChoice();
        await this.initGameSettings();
        await this.showLoadingAnimation();
        this.displayBoard();
        await this.runGameLoop();
        this.displayGameResult();
        await this.handlePlayAgain();
    }

    async runGameLoop() {
        while (!this.gameOver) {
            const guess = await this.getPlayerGuess();
            await this.processGuess(guess);
            await new Promise(resolve => setTimeout(resolve, 300));
            this.displayBoard();
        }
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
            chalk.black.bgGreen(' X ') + chalk.gray(' = Correct position ') +
            chalk.black.bgYellow(' X ') + chalk.gray(' = Wrong position ') +
            chalk.white.bgGray(' X ') + chalk.gray(' = Not in word ');

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
                    message: '🚀  Ready to play? (y/n)',
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

    async showLoadingAnimation() {
        const spinner = ora({
            text: '🎲  Selecting a word...',
            spinner: 'dots'
        }).start();

        await new Promise(resolve => setTimeout(resolve, 1000));
        spinner.succeed('✨  Word selected! Good luck!');
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    selectRandomWord() {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    displayBoard() {
        process.stdout.write('\x1Bc');

        console.log(
            gradient(['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5']).multiline(
                figlet.textSync('WORDLE', {
                    font: 'Standard',
                    horizontalLayout: 'default'
                })
            )
        );

        console.log(chalk.dim('─'.repeat(this.wordLength * 10)) + '\n');

        for (let i = 0; i < this.maxAttempts; i++) {
            if (i < this.attempts.length) {
                const { guess, result } = this.attempts[i];
                console.log('  ' + this.formatGuess(guess, result));
            } else {
                const empty = (chalk.gray('[ _ ]') + ' ').repeat(this.wordLength).trim();
                console.log('  ' + empty);
            }
            console.log();
        }

        console.log(chalk.dim('─'.repeat(this.wordLength * 10)));
        console.log(chalk.cyan(`  📊  Attempts: ${this.attempts.length}/${this.maxAttempts}`));
        console.log();
    }

    formatGuess(guess, result) {
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

    async getPlayerGuess() {
        try {
            const response = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'guess',
                    message: '💭  Enter your guess:',
                    validate: (input) => {
                        const upperInput = input.trim().toUpperCase();

                        if (upperInput.length !== 5) return 'Guess must be exactly 5 letters';
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

    async processGuess(guess) {
        const checking = ora('Checking guess...').start();
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const result = this.checkGuess(guess);
            this.attempts.push({ guess, result });
            this.updateGameState(guess, checking);
        } catch (error) {
            checking.fail('Error checking guess!');
            console.log(chalk.red(`Error: ${error.message}\n`));
        }
    }

    checkGuess(guess) {
        const result = [];
        const wordArray = this.word.split('');
        const guessArray = guess.split('');
        const used = new Array(5).fill(false);

        this.markCorrectPositions(result, guessArray, wordArray, used);
        this.markPresentLetters(result, guessArray, wordArray, used);

        return result;
    }

    markCorrectPositions(result, guessArray, wordArray, used) {
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === wordArray[i]) {
                result[i] = 'correct';
                used[i] = true;
            }
        }
    }

    markPresentLetters(result, guessArray, wordArray, used) {
        for (let i = 0; i < 5; i++) {
            if (result[i] !== 'correct') {
                const foundIndex = this.findUnusedLetter(guessArray[i], wordArray, used);
                if (foundIndex === -1) {
                    result[i] = 'absent';
                } else {
                    result[i] = 'present';
                    used[foundIndex] = true;
                }
            }
        }
    }

    findUnusedLetter(letter, wordArray, used) {
        for (let j = 0; j < 5; j++) {
            if (!used[j] && letter === wordArray[j]) {
                return j;
            }
        }
        return -1;
    }

    updateGameState(guess, checking) {
        if (guess === this.word) {
            this.won = true;
            this.gameOver = true;
            checking.succeed('Perfect match!');
        } else if (this.attempts.length >= this.maxAttempts) {
            this.gameOver = true;
            checking.fail('No attempts left!');
        } else {
            checking.stop();
        }
    }

    displayGameResult() {
        console.log();
        if (this.won) {
            this.displayWinMessage();
        } else {
            this.displayLossMessage();
        }
    }

    displayWinMessage() {
        console.log(
            boxen(
                gradient(['red', 'orange', 'yellow', 'green', 'blue', 'purple'])(figlet.textSync('YOU WON!', { font: 'Standard' })) +
                '\n\n' +
                chalk.green.bold(`🎉  Congratulations! You guessed it in ${this.attempts.length} ${this.attempts.length === 1 ? 'attempt' : 'attempts'}!`),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'double',
                    borderColor: 'green'
                }
            )
        );
    }

    displayLossMessage() {
        console.log(
            boxen(
                chalk.red.bold('💔  GAME OVER\n\n') +
                chalk.yellow(`The word was: ${chalk.bold(this.word)}\n`) +
                chalk.gray('🔄  Better luck next time!'),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'double',
                    borderColor: 'red'
                }
            )
        );
    }

    async handlePlayAgain() {
        try {
            const response = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'playAgain',
                    message: 'Would you like to play again?',
                    default: true
                }
            ]);

            if (response.playAgain) {
                const newGame = new WordleGame();
                await newGame.play();
            } else {
                this.displayGoodbyeMessage();
                process.exit(0);
            }
        } catch (error) {
            console.log(chalk.yellow('\n\n👋  Thanks for playing!\n'));
            throw error;
        }
    }

    displayGoodbyeMessage() {
        console.log(
            boxen(
                chalk.cyan.bold('👋  Thanks for playing Wordle!\n') +
                chalk.gray('🌟  Come back soon!'),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'round',
                    borderColor: 'cyan'
                }
            )
        );
    }

    async getPlayerModeChoice() {
        try {
            const { mode } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'mode',
                    message: 'Choose your game mode:',
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

            this.mode = mode;
        } catch (error) {
            console.log(chalk.yellow('\n\n👋  Game cancelled. See you next time!\n'));
            throw error;
        }
    }

    async initGameSettings() {
        if (this.mode === 'default') {
            return;
        }

        try {
            const responses = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'wordLength',
                    message: chalk.bold.cyan('Enter word length (4-7):'),
                    validate(input) {
                        const num = Number.parseInt(input);

                        if (Number.isNaN(num)) {
                            return chalk.red('Please enter a valid number');
                        }
                        if (num < 4 || num > 7) {
                            return chalk.red('Word length must be between 4 and 7');
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
                    message: chalk.bold.cyan('Enter maximum attempts:'),
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

            this.wordLength = responses.wordLength;
            this.maxAttempts = responses.maxAttempts;

        } catch (error) {
            console.log(chalk.yellow('\n\n👋  Game cancelled. See you next time!\n'));
            throw error;
        }
    }
}

try {
    const game = new WordleGame();
    await game.play();
} catch (err) {
    process.exit(1);
}
