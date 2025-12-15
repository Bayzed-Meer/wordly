import { storage } from '../utils/storage.js';
import { displayStats } from '../ui/display.js';
import { handleReset } from '../ui/prompts.js';

export async function statsCommand(options) {
    try {
        if (options.reset) {
            await handleReset();
            return;
        }

        const stats = storage.getStats();

        displayStats(stats);
    } catch (error) {
        process.exit(1);
    }
}

export default {
    name: 'stats',
    description: 'View game statistics (use --help for options: -r/--reset)',
    options: [
        {
            flags: '-r, --reset',
            description: 'reset all statistics'
        }
    ],
    action: statsCommand
};
