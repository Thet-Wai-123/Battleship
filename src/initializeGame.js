import Gameboard from "./Gameboard.js";
import { Player, AI } from "./Player.js";

export default function initializeGame() {
  initializeGridUI();
  const player = new Player();
  const computer = new AI();
  const playerGameBoard = new Gameboard();
  const computerGameBoard = new Gameboard();

  return { player, computer, playerGameBoard, computerGameBoard };
}

//UI
function initializeGridUI() {
  const grid = document.getElementById("playerGrid");
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("index"+i);
    grid.appendChild(cell);
  }
  grid.parentElement.classList.remove("hidden");
  document.querySelector(".Menu").classList.add("hidden");
}
