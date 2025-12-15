import Conf from 'conf';

const schema = {
    stats: {
        type: 'object',
        properties: {
            gamesPlayed: {
                type: 'number',
                default: 0,
                description: 'Total number of games played'
            },
            gamesWon: {
                type: 'number',
                default: 0,
                description: 'Total number of games won'
            },
            currentStreak: {
                type: 'number',
                default: 0,
                description: 'Current winning streak'
            },
            maxStreak: {
                type: 'number',
                default: 0,
                description: 'Maximum winning streak achieved'
            },
            lastPlayed: {
                type: 'string',
                default: '',
                description: 'ISO timestamp of last game played'
            }
        }
    }
};

class Storage {
    constructor() {
        this.store = new Conf({
            projectName: 'wordle',
            schema,
            defaults: {
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    currentStreak: 0,
                    maxStreak: 0,
                    lastPlayed: ''
                }
            }
        });
    }

    getStats() {
        return this.store.get('stats');
    }

    updateStats(gameResult) {
        const stats = this.getStats();

        stats.gamesPlayed++;
        stats.lastPlayed = new Date().toISOString();

        if (!gameResult.won) {
            stats.currentStreak = 0;
            this.store.set('stats', stats);
            return;
        }

        stats.gamesWon++;
        stats.currentStreak++;

        if (stats.currentStreak > stats.maxStreak) {
            stats.maxStreak = stats.currentStreak;
        }

        this.store.set('stats', stats);
    }

    resetStats() {
        this.store.clear();
    }

    getConfigPath() {
        return this.store.path;
    }
}

export const storage = new Storage();
