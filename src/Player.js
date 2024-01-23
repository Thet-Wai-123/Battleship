export class Player {
  constructor() {}

  attackEnemy(gameBoard, x, y) {
    gameBoard.receiveAttack(x, y);
  }
}

export class AI extends Player {
  //need to implement putting random boat
  attemptedShots = [];

  computerTurn(gameBoard) {
    let coordinate = this.getNewRandomSpot();
    this.attackEnemy(gameBoard, coordinate["x"], coordinate["y"]);
  }

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
  placeShipsRandomly(){
    
  }
  
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
