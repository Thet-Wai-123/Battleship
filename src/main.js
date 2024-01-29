import initializeGame from "./initializeGame.js";
import setUpShipPhase from "./setUpShipPhase.js";
import gamePhase from "./gamePhase.js";;

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () => {
  main();
});


async function main() {
  const { player, computer, playerGameBoard, computerGameBoard } =
  initializeGame();
  await setUpShipPhase(playerGameBoard, computerGameBoard);
  gamePhase(player, computer, playerGameBoard, computerGameBoard);   
}
