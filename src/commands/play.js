import { WordleGame } from '../game/wordle-game.js';
import { DEFAULT_MAX_ATTEMPTS, DEFAULT_WORD_LENGTH, MIN_WORD_LENGTH, MAX_WORD_LENGTH } from '../constants.js';
import { displayInvalidSyntaxError, displayWordLengthError, displayAttemptsError } from '../ui/display.js';

export async function playCommand(options) {
    try {
        const { length, attempts } = options;

        validateFlagSyntax(length, attempts);
        validateLength(length);
        validateAttempts(attempts);

        const wordLength = length ? Number.parseInt(length, 10) : DEFAULT_WORD_LENGTH;
        const maxAttempts = attempts ? Number.parseInt(attempts, 10) : DEFAULT_MAX_ATTEMPTS;

        const game = new WordleGame(wordLength, maxAttempts);
        await game.play();
    } catch (error) {
        process.exit(1);
    }
}

function validateFlagSyntax(length, attempts) {
    if (length?.startsWith('=') || attempts?.startsWith('=')) {
        displayInvalidSyntaxError();
        process.exit(1);
    }
}

function validateLength(length) {
    if (length === undefined) return;

    const parsedLength = Number.parseInt(length, 10);

    if (Number.isNaN(parsedLength)) {
        displayWordLengthError(length, 'non-numeric');
        process.exit(1);
    }

    if (parsedLength < MIN_WORD_LENGTH) {
        displayWordLengthError(parsedLength, 'too-small');
        process.exit(1);
    }

    if (parsedLength > MAX_WORD_LENGTH) {
        displayWordLengthError(parsedLength, 'too-large');
        process.exit(1);
    }
}

function validateAttempts(attempts) {
    if (attempts === undefined) return;

    const parsedAttempts = Number.parseInt(attempts, 10);

    if (Number.isNaN(parsedAttempts)) {
        displayAttemptsError(attempts, 'non-numeric');
        process.exit(1);
    }

    if (parsedAttempts < 1) {
        displayAttemptsError(parsedAttempts, 'too-small');
        process.exit(1);
    }
}

export default {
    name: 'play',
    description: 'Start a new Wordle game',
    options: [
        {
            flags: '-l, --length <number>',
            description: `word length (${MIN_WORD_LENGTH}-${MAX_WORD_LENGTH}), default: ${DEFAULT_WORD_LENGTH}`
        },
        {
            flags: '-a, --attempts <number>',
            description: `max attempts, default: ${DEFAULT_MAX_ATTEMPTS}`
        }
    ],
    action: playCommand
};
