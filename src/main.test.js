import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";
import { Player, AI } from "./Player.js";
import initializeGame from "./initializeGame.js";
import getRandomInt from "./Randomizer.js";

const numOfShips = 5;
const gridLength = 10;

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () => {
  startGame();
});

async function startGame() {
  const { player, computer, playerGameBoard, computerGameBoard } =
    initializeGame();
  await setUpShipPhase(playerGameBoard, computerGameBoard);
  console.log("finished setting up Ships");
  
}

function setUpShipPhase(playerGameBoard, computerGameBoard) {
  return new Promise((resolve) => {
    //player
    let playerIndex = 0;
    const playerShips = getStarterShips(); //get 5 ships with different lenghts
    const submitCoordinateBtn = document.getElementById("submitCoordinateBtn");
    submitCoordinateBtn.addEventListener("click", () => {
      const x = Number(document.getElementById("XcoordinateInput").value) - 1; //make grid start from 1 instead of 0
      const y = Number(document.getElementById("YcoordinateInput").value) - 1;
      const direction = document.getElementById("rotationInput").value;
      try {
        playerGameBoard.placeShip(playerShips[playerIndex], x, y, direction);
        playerIndex++;
        updateGridUI(playerGameBoard, computerGameBoard);
        resetField();
      } catch (error) {
        alert(error);
      }

      if (playerIndex === numOfShips - 1) {
        resolve();
      }
    });

    //computer
    let computerIndex = 0;
    const computerShips = getStarterShips();
    while (computerIndex < numOfShips) {
      const x = getRandomInt(10);
      const y = getRandomInt(10);
      const direction = getRandomInt(2) === 1 ? "horizontal" : "vertical";
      try {
        computerGameBoard.placeShip(
          computerShips[computerIndex],
          x,
          y,
          direction
        );
        computerIndex++;
      } catch (error) {}
    }
    console.log(computerGameBoard)
  });
}

function getStarterShips() {
  const shipsAvailable = [];
  for (let i = 1; i <= numOfShips; i++) {
    let newShip = new Ship(i);
    shipsAvailable.push(newShip);
  }
  return shipsAvailable;
}

function resetField() {
  const form = document.getElementById("shipsSetUpForm");
  form.reset();
}

function updateGridUI(playerGameBoard, computerGameBoard) {
  const playerGridUI = document.getElementById("playerGrid");
  for (let row = 0; row < gridLength; row++) {
    for (let column = 0; column < gridLength; column++) {
      if (Number.isInteger(playerGameBoard.grid[column][row])) {
        const cellNum = row * 10 + column;
        const targetdCell = playerGridUI.querySelector(
          ".playerIndex" + cellNum
        );
        targetdCell.classList.add("shipHere");
      }
    }
  }
}
