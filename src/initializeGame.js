import Gameboard from "./classes/Gameboard.js";
import { Player, AI } from "./classes/Player.js";

export default function initializeGame() {
  //hide the menu
  const menu = document.querySelector(".Menu")
  const gameDiv = document.querySelector(".Game");
  menu.classList.add("hidden")
  gameDiv.classList.remove("hidden")

  createNewGridUI("player");
  createNewGridUI("computer");
  const player = new Player();
  const computer = new AI();
  const playerGameBoard = new Gameboard();
  const computerGameBoard = new Gameboard();

  return { player, computer, playerGameBoard, computerGameBoard };
}

function createNewGridUI(user) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  grid.id = user + "Grid";
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(user + "Index" + i);
    cell.addEventListener("mouseenter", () => {
      cell.classList.add("hover");
    });
    cell.addEventListener("mouseleave", () => {
      cell.classList.remove("hover");
    });

    grid.appendChild(cell);
  }

  document.querySelector(".Game").appendChild(grid);
}