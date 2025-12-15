import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const DEFAULT_WORD_LENGTH = 5;
export const DEFAULT_MAX_ATTEMPTS = 6;
export const MIN_WORD_LENGTH = 3;
export const MAX_WORD_LENGTH = 7;

export const LETTER_STATUS = {
    CORRECT: 'correct',
    PRESENT: 'present',
    ABSENT: 'absent'
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

export const APP_VERSION = packageJson.version;
export const APP_DESCRIPTION = packageJson.description;
export const APP_AUTHOR = packageJson.author;
