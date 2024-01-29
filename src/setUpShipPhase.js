import Ship from "./classes/Ship.js";
import getRandomInt from "./functions/Randomizer.js";

const numOfShips = 5;
const gridLength = 10;

export default function setUpShipPhase(playerGameBoard, computerGameBoard) {
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
        updateGridUI(playerGameBoard, "player");
        resetField();
      } catch (error) {
        alert(error);
      }

      if (playerIndex === numOfShips) {
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
    updateGridUI(computerGameBoard, "computer")
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

function updateGridUI(gameBoard, user) {
  const GridUI = document.getElementById( user + "Grid");
  for (let row = 0; row < gridLength; row++) {
    for (let column = 0; column < gridLength; column++) {
      if (Number.isInteger(gameBoard.grid[column][row])) {
        const cellNum = row * 10 + column;
        const targetdCell = GridUI.querySelector(
          "." + user + "Index" + cellNum
        );
        targetdCell.classList.add("shipHere");
      }
    }
  }
}
