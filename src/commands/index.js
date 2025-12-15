import playCommand from './play.js';
import aboutCommand from './about.js';
import statsCommand from './stats.js';

export const commands = [playCommand, aboutCommand, statsCommand];

export function registerCommands(program) {
    commands.forEach(command => {
        const cmd = program.command(command.name).description(command.description);

        if (command.options) {
            command.options.forEach(option => {
                cmd.option(option.flags, option.description, option.defaultValue);
            });
        }

        cmd.action(command.action);
    });
}
