const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editingPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const configOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const form = document.querySelector("form");
const errorsOutput = document.getElementById("config-errors");
const actvieGame = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");
const winnerName = document.getElementById("winner-name");

const editPlayer1Btn = document.getElementById("edit-player-1-btn");
const editPlayer2Btn = document.getElementById("edit-player-2-btn");
const cancelConfigBtn = document.getElementById("cancel-config-btn");
const startNewGameBtn = document.getElementById("start-game-btn");
// const gameFields = document.querySelectorAll("#game-board li");
const gameBoard = document.getElementById("game-board");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);

form.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);

// for (const gameField of gameFields) {
//   gameField.addEventListener("click", selectGameField);
// }
gameBoard.addEventListener("click", selectGameField);
