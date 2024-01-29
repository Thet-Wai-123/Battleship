import getRandomInt from "../functions/Randomizer.js";

export class Player {
  constructor() {}

  attackEnemyBoard(gameBoard, x, y) {
    return gameBoard.receiveAttack(x, y);
  }
}

export class AI extends Player {
  //need to implement putting random boat
  attemptedShots = [];

  getNewRandomSpot() {
    let randomSpot;
    let x;
    let y;
    do {
      x = getRandomInt(10);
      y = getRandomInt(10);
      randomSpot = { x, y };
    } while (this.attemptedShots.find((spot) => spot === randomSpot));
    this.attemptedShots.push(randomSpot);
    return { x, y };
  }
}
