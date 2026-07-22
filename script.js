// State Management
let boardState = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'pvp'; // 'pvp' or 'ai'
let scores = { X: 0, O: 0, ties: 0 };

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusBanner = document.getElementById('statusBanner');
const restartBtn = document.getElementById('restartBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const pvpModeBtn = document.getElementById('pvpModeBtn');
const aiModeBtn = document.getElementById('aiModeBtn');
const playerOName = document.getElementById('playerOName');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTiesEl = document.getElementById('scoreTies');

// Native Audio Synthesizer (Zero External Dependencies)
const playSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'clickX') {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'clickO') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'draw') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Graceful fallback if Web Audio is disabled
  }
};

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', resetBoard);
resetScoreBtn.addEventListener('click', resetScores);
pvpModeBtn.addEventListener('click', () => switchMode('pvp'));
aiModeBtn.addEventListener('click', () => switchMode('ai'));

function switchMode(mode) {
  if (gameMode === mode) return;
  gameMode = mode;
  pvpModeBtn.classList.toggle('active', mode === 'pvp');
  aiModeBtn.classList.toggle('active', mode === 'ai');
  playerOName.textContent = mode === 'ai' ? 'Bot AI' : 'Player O';
  resetBoard();
}

function handleCellClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (boardState[index] !== '' || !isGameActive) return;

  makeMove(index, currentPlayer);

  if (isGameActive && gameMode === 'ai' && currentPlayer === 'O') {
    setTimeout(makeAIMove, 300);
  }
}

function makeMove(index, player) {
  boardState[index] = player;
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());

  playSound(player === 'X' ? 'clickX' : 'clickO');

  if (checkWin(boardState, player)) {
    handleWin(player);
  } else if (boardState.every(cell => cell !== '')) {
    handleDraw();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function makeAIMove() {
  if (!isGameActive) return;
  const bestMove = getBestMove();
  if (bestMove !== null && bestMove !== undefined) {
    makeMove(bestMove, 'O');
  }
}

// Minimax Algorithm for AI Strategy
function getBestMove() {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 9; i++) {
    if (boardState[i] === '') {
      boardState[i] = 'O';
      let score = minimax(boardState, 0, false);
      boardState[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  if (checkWin(board, 'O')) return 10 - depth;
  if (checkWin(board, 'X')) return depth - 10;
  if (board.every(cell => cell !== '')) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWin(board, player) {
  return WINNING_COMBOS.some(combo => combo.every(index => board[index] === player));
}

function handleWin(player) {
  isGameActive = false;
  scores[player]++;
  updateScores();
  playSound('win');
  triggerConfetti();

  const winningCombo = WINNING_COMBOS.find(combo => combo.every(idx => boardState[idx] === player));
  if (winningCombo) {
    winningCombo.forEach(idx => cells[idx].classList.add('winner'));
  }

  const winnerText = gameMode === 'ai' && player === 'O' ? '🤖 Bot AI Wins!' : `🎉 Player ${player} Wins!`;
  statusBanner.innerHTML = `<span class="turn-${player.toLowerCase()}">${winnerText}</span>`;
}

function handleDraw() {
  isGameActive = false;
  scores.ties++;
  updateScores();
  playSound('draw');
  statusBanner.innerHTML = `<span>🤝 Game Draw!</span>`;
}

function updateStatus() {
  const playerText = gameMode === 'ai' && currentPlayer === 'O' ? 'Bot AI (thinking...)' : `Player ${currentPlayer}`;
  statusBanner.innerHTML = `Turn: <span class="turn-${currentPlayer.toLowerCase()}">${playerText}</span>`;
}

function updateScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreTiesEl.textContent = scores.ties;
}

function resetBoard() {
  boardState = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  updateStatus();
}

function resetScores() {
  scores = { X: 0, O: 0, ties: 0 };
  updateScores();
  resetBoard();
}

// Celebration Confetti Effect
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    color: ['#00f2fe', '#ff007f', '#ffffff', '#ffd700'][Math.floor(Math.random() * 4)],
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 3 + 2,
    speedX: Math.random() * 2 - 1
  }));

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    if (particles.some(p => p.y < canvas.height)) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  render();
}