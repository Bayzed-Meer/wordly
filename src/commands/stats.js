import { storage } from '../utils/storage.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { displayStats } from '../ui/display.js';

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

async function handleReset() {
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

export default {
    name: 'stats',
    description: 'View game statistics',
    options: [
        {
            flags: '-r, --reset',
            description: 'reset all statistics'
        }
    ],
    action: statsCommand
};
