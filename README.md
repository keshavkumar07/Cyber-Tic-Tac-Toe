# 🎮 Cyber Tic-Tac-Toe

> A modern and interactive Tic-Tac-Toe game built using **HTML, CSS, and JavaScript**. Play against a friend or challenge an AI opponent in a stylish glassmorphism interface with animations, sound effects, and live score tracking.

---

## 📖 Table of Contents

- About the Project
- Features
- Tech Stack
- Project Structure
- Getting Started
- How to Play
- Game Modes
- AI Logic
- Future Improvements
- Learning Outcomes
- Author
- License

---

# 📌 About the Project

**Cyber Tic-Tac-Toe** is a browser-based game that offers two exciting gameplay modes:

- 👥 Two Player Mode (Local Multiplayer)
- 🤖 Play Against AI

The project features a modern cyber-themed interface with glassmorphism effects, smooth animations, live score tracking, sound effects, and a responsive layout that works on desktops, tablets, and mobile devices.

This project was built to practice JavaScript concepts like DOM manipulation, event handling, game logic, and implementing an AI using the Minimax Algorithm.

---

# ✨ Features

- 👥 Two Player (Local Multiplayer)
- 🤖 Play against AI
- 🧠 AI powered by the Minimax Algorithm
- 📊 Live scoreboard for wins and ties
- 🔄 Restart current game anytime
- 🗑️ Reset scoreboard
- 🎉 Confetti animation on winning
- 🔊 Built-in sound effects using the Web Audio API
- 🎨 Modern Glassmorphism UI
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure of the game |
| CSS3 | Styling, animations, and responsive design |
| JavaScript (ES6) | Game logic and interactivity |
| Web Audio API | Sound effects |
| Canvas API | Confetti celebration animation |
| Google Fonts | Typography |

---

# 📁 Project Structure

```text
Cyber-Tic-Tac-Toe/
│
├── index.html          # Main webpage
├── style.css           # Styling and animations
├── script.js           # Game logic and AI
└── README.md           # Project documentation
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/cyber-tic-tac-toe.git
```

Or download the ZIP file and extract it.

---

## 2️⃣ Open the Project

Navigate to the project folder.

```bash
cd cyber-tic-tac-toe
```

---

## 3️⃣ Run the Game

Simply open

```text
index.html
```

in your web browser.

You can also use **Live Server** in Visual Studio Code for a better development experience.

---

# 🎮 How to Play

1. Choose your preferred game mode:
   - 👥 Two Players
   - 🤖 Play vs AI

2. Player **X** always starts first.

3. Players take turns placing **X** and **O** on the board.

4. The first player to match **three symbols in a row, column, or diagonal** wins the game.

5. If all cells are filled and nobody wins, the game ends in a draw.

6. Use:
   - **Restart Game** to start a new match.
   - **Reset Scores** to clear the scoreboard.

---

# 🎯 Game Modes

## 👥 Two Player Mode

- Two players play on the same device.
- Players alternate turns until someone wins or the game ends in a draw.

---

## 🤖 AI Mode

Play against the computer.

The AI automatically calculates the best possible move after your turn, making it very difficult to beat.

---

# 🧠 AI Logic

The AI uses the **Minimax Algorithm**, a popular decision-making algorithm used in turn-based games.

### How it works

```
Player Move
      ↓
AI checks all possible moves
      ↓
Evaluates every game outcome
      ↓
Chooses the move with the highest score
      ↓
Makes the best possible move
```

Because of this strategy, the AI never makes random moves and always tries to win or force a draw.

---

# 🎨 User Interface Highlights

- Modern Cyber Theme
- Glassmorphism Design
- Responsive Layout
- Animated Game Board
- Winner Highlight Animation
- Confetti Celebration
- Interactive Buttons
- Live Status Banner
- Neon Glow Effects

---

# 📈 Future Improvements

Some features planned for future versions:

- 🌙 Dark / Light Mode
- 🎵 Background Music
- 🔊 Sound Toggle
- 🌐 Online Multiplayer
- 🏆 Leaderboard
- 💾 Save Scores using Local Storage
- 🎯 Multiple Difficulty Levels
- ⏱️ Turn Timer
- 📊 Game Statistics

---

# 📚 Learning Outcomes

While building this project, I learned:

- HTML page structure
- CSS Flexbox and Grid
- Responsive web design
- JavaScript DOM manipulation
- Event handling
- Game state management
- Win and draw detection logic
- AI implementation using the Minimax Algorithm
- Canvas animations
- Web Audio API
- Writing modular and organized JavaScript code

---

# 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile

---

# 📄 License

This project is open-source and available for learning and personal use.

---

⭐ If you like this project, consider giving it a **Star** on GitHub!
