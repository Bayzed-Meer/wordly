<div align="center">

# 🎮 Wordly

[![npm version](https://img.shields.io/npm/v/wordly.svg)](https://www.npmjs.com/package/wordly)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/wordly.svg)](https://www.npmjs.com/package/wordly)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.12.0-brightgreen)](https://nodejs.org)

**A modern CLI Wordle game that brings the popular word-guessing game right to your terminal!**

Guess the hidden word in limited attempts with colorful feedback and interactive gameplay.

[Installation](#-installation) • [Usage](#-usage) • [Features](#-features) • [Commands](#-commands)

</div>

---

## 📸 Screenshots

### Game Start & Welcome Screen

![Game Welcome Screen](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/welcome.png)

### Active Gameplay

![Wordly Gameplay](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/gameplay.png)

### Winning Game

![Game Win Screen](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/win.png)

### Losing Game

![Game Loss Screen](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/loss.png)

### Statistics View

![Game Statistics](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/stats.png)

### About Screen

![Help Screen](https://raw.githubusercontent.com/Bayzed-Meer/wordly/main/docs/screenshots/about.png)

---

## ✨ Features

- 🎯 **Classic Wordle gameplay** in your terminal
- 🔧 **Customizable difficulty** - Word length (3-7 letters) and attempt count
- 📊 **Persistent statistics** - Tracks games played, wins, losses, streaks, and more
- 🎨 **Beautiful UI** - Color-coded feedback, ASCII art, animations, and spinners
- 🔄 **Instant replay** - Play again without restarting the application
- 💾 **Auto-save progress** - Statistics are saved automatically
- ⚡ **Fast and lightweight** - No unnecessary dependencies

---

## 📋 Requirements

- **Node.js**: `>= 20.12.0`

---

## 📦 Installation

### Global Installation (Recommended)

Install globally via npm to use the `wordle` command anywhere:

```bash
npm install -g wordly
```

### Using npx (No Installation Required)

Run directly without installing:

```bash
npx wordly play
```

### From Source

Clone and run from the repository:

```bash
git clone https://github.com/Bayzed-Meer/wordly.git
cd wordly
npm install
npm start
```

---

## 🚀 Usage

### Quick Start

```bash
# Start a game with default settings (5-letter word, 6 attempts)
wordle play
```

### Custom Game Options

```bash
# Play with 6-letter words
wordle play -l 6
wordle play --length 6

# Play with 10 attempts
wordle play -a 10
wordle play --attempts 10

# Combine options for custom difficulty
wordle play -l 4 -a 8
wordle play --length 7 --attempts 12
```

### View Statistics

```bash
# Display your game statistics
wordle stats

# Reset all statistics
wordle stats -r
wordle stats --reset
```

### Help & Information

```bash
# Learn about the game
wordle about

# Show version
wordle -v
wordle --version

# Display help
wordle --help
```

---

## 🎯 How to Play

1. **Start the game** by running `wordle play`
2. **Enter your guess** - A word matching the required length
3. **Read the feedback**:
   - 🟩 **Green** — Correct letter in the correct position
   - 🟨 **Yellow** — Correct letter in the wrong position
   - ⬜ **Gray** — Letter not in the word
4. **Keep guessing** until you find the word or run out of attempts
5. **Win** by guessing the word within the attempt limit!

---

## 📖 Commands

| Command | Description |
|---------|-------------|
| `wordle play` | Start a new game with default settings |
| `wordle play -l <number>` | Set word length (3-7), default: 5 |
| `wordle play -a <number>` | Set max attempts (≥1), default: 6 |
| `wordle stats` | View your game statistics |
| `wordle stats -r` | Reset all statistics |
| `wordle about` | Display game information and quick start guide |
| `wordle -v, --version` | Show current version |
| `wordle --help` | Display help information |

---

## 🛠️ Tech Stack

Built with modern JavaScript and popular CLI libraries:

- **[Commander.js](https://github.com/tj/commander.js)** - Command-line interface framework
- **[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)** - Interactive command-line prompts
- **[Chalk](https://github.com/chalk/chalk)** - Terminal string styling
- **[Figlet](https://github.com/patorjk/figlet.js)** - ASCII art text generation
- **[Gradient String](https://github.com/bokub/gradient-string)** - Gradient colored text
- **[Boxen](https://github.com/sindresorhus/boxen)** - Terminal boxes
- **[Ora](https://github.com/sindresorhus/ora)** - Elegant terminal spinners
- **[Conf](https://github.com/sindresorhus/conf)** - Persistent configuration storage

---

## 📄 License

MIT © [Bayzed Meer](https://github.com/Bayzed-Meer)

---

## 🔗 Links

- **[npm Package](https://www.npmjs.com/package/wordly)** - View on npm registry
- **[GitHub Repository](https://github.com/Bayzed-Meer/wordly)** - Source code
- **[Report Issues](https://github.com/Bayzed-Meer/wordly/issues)** - Bug reports and feature requests

---

<div align="center">

**Enjoy playing Wordle in your terminal!** 🎉

Made with ❤️ by [Bayzed Meer](https://github.com/Bayzed-Meer)

</div>

