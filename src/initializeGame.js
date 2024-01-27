import Gameboard from "./Gameboard.js";
import { Player, AI } from "./Player.js";
import createNewGridUI from "./createNewGrid.js";

export default function initializeGame() {
  createNewGridUI("player");
  createNewGridUI("computer")
  const player = new Player();
  const computer = new AI();
  const playerGameBoard = new Gameboard();
  const computerGameBoard = new Gameboard();

  return { player, computer, playerGameBoard, computerGameBoard };
}
