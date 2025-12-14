import chalk from 'chalk';
import { LETTER_STATUS } from '../constants.js';
import { getRandomWord } from '../wordList.js';
import {
    displayWelcomeScreen,
    displayBoard,
    displayWinMessage,
    displayLossMessage,
    displayGoodbyeMessage,
    showLoadingAnimation,
    showCheckingSpinner
} from '../ui/display.js';
import {
    getPlayerGuess,
    askPlayAgain
} from '../ui/prompts.js';

export class WordleGame {
    constructor(wordLength, maxAttempts) {
        this.wordLength = wordLength;
        this.maxAttempts = maxAttempts;
        this.word = null;
        this.attempts = [];
        this.gameOver = false;
        this.won = false;
    }

    async play() {
        displayWelcomeScreen();
        this.word = getRandomWord(this.wordLength);
        await showLoadingAnimation();
        displayBoard(this.attempts, this.maxAttempts, this.wordLength);
        await this.runGameLoop();
        this.displayGameResult();
        await this.handlePlayAgain();
    }

    async runGameLoop() {
        while (!this.gameOver) {
            const guess = await getPlayerGuess(this.wordLength);
            await this.processGuess(guess);
            await new Promise(resolve => setTimeout(resolve, 300));
            displayBoard(this.attempts, this.maxAttempts, this.wordLength);
        }
    }

    async processGuess(guess) {
        const checking = showCheckingSpinner();
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
        const used = new Array(this.wordLength).fill(false);

        this.markCorrectPositions(result, guessArray, wordArray, used);
        this.markPresentLetters(result, guessArray, wordArray, used);

        return result;
    }

    markCorrectPositions(result, guessArray, wordArray, used) {
        for (let i = 0; i < this.wordLength; i++) {
            if (guessArray[i] === wordArray[i]) {
                result[i] = LETTER_STATUS.CORRECT;
                used[i] = true;
            }
        }
    }

    markPresentLetters(result, guessArray, wordArray, used) {
        for (let i = 0; i < this.wordLength; i++) {
            if (result[i] !== LETTER_STATUS.CORRECT) {
                const foundIndex = this.findUnusedLetter(guessArray[i], wordArray, used);
                if (foundIndex === -1) {
                    result[i] = LETTER_STATUS.ABSENT;
                } else {
                    result[i] = LETTER_STATUS.PRESENT;
                    used[foundIndex] = true;
                }
            }
        }
    }

    findUnusedLetter(letter, wordArray, used) {
        for (let j = 0; j < this.wordLength; j++) {
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
        if (this.won) {
            displayWinMessage(this.attempts.length);
        } else {
            displayLossMessage(this.word);
        }
    }

    async handlePlayAgain() {
        const playAgain = await askPlayAgain();

        if (playAgain) {
            const newGame = new WordleGame(this.wordLength, this.maxAttempts);
            await newGame.play();
        } else {
            displayGoodbyeMessage();
            process.exit(0);
        }
    }
}

