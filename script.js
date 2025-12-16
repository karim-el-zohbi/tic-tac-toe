const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");

let currentPlayer = "X";
let board = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      combo.forEach((i) => cells[i].classList.add("win"));
      updateScore(board[a]);
      statusEl.textContent = `${board[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes(null)) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `${currentPlayer}'s turn`;
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    scoreXEl.textContent = scoreX;
  } else {
    scoreO++;
    scoreOEl.textContent = scoreO;
  }
}

function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = "X";
  statusEl.textContent = "X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreXEl.textContent = 0;
  scoreOEl.textContent = 0;
  restartGame();
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScore);

statusEl.textContent = "X's turn";
