#!/usr/bin/env node

import { WordleGame } from './game/wordle-game.js';

try {
    const game = new WordleGame();
    await game.play();
} catch (err) {
    process.exit(1);
}

