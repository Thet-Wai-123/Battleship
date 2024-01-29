export default async function gamePhase(
  player,
  computer,
  playerGameBoard,
  computerGameBoard
) {
  const form = document.getElementById("shipsSetUpForm");
  form.classList.add("hidden");

  let winner = { is: "unknown" };
  while (!isGameOver(playerGameBoard, computerGameBoard, winner)) {
    await playerTurn(player, computerGameBoard);
    computerTurn(computer, playerGameBoard);
  }
  endScreen(winner);
}

function playerTurn(player, computerGameBoard) {
  return new Promise((turnOver) => {
    const computerGridUI = document.getElementById("computerGrid");
    const computerCellsUI = Array.from(computerGridUI.children);
    for (let i = 0; i < computerCellsUI.length; i++) {
      computerCellsUI[i].onclick = function () {
        const x = i % 10;
        const y = Math.floor(i / 10);
        const result  = player.attackEnemyBoard(computerGameBoard, x, y);
        //update UI
        computerCellsUI[i].classList.add(result);
        turnOver();
      };
    }
  });
}

function computerTurn(computer, playerGameBoard) {
  const playerGridUI = document.getElementById("playerGrid");
  const playerCellsUI = Array.from(playerGridUI.children);
  const { x, y } = computer.getNewRandomSpot();
  const result = computer.attackEnemyBoard(playerGameBoard, x, y);
  playerCellsUI[y * 10 + x].classList.add(result.target);
}

function isGameOver(playerGameBoard, computerGameBoard, winner) {
  if (playerGameBoard.areAllShipsSunk()) {
    winner.is = "player";
    return true;
  } else if (computerGameBoard.areAllShipsSunk()) {
    winner = "computer";
    return true;
  } else return false;
}

function endScreen(winner) {
  const body = document.querySelector("body");
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("gameOverScreen");
  const text = document.createElement("p");
  text.textContent = "Game Over: " + winner + " wins";
  const replayBtn = document.createElement("button");
  replayBtn.textContent = "Replay";
  replayBtn.addEventListener("click", () => {
    window.location.reload();
  });

  gameOverScreen.appendChild(text);
  gameOverScreen.appendChild(replayBtn);

  body.appendChild(gameOverScreen);
}
