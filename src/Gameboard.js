export default class Gameboard {
  constructor() {
    this.grid = Array.from(Array(10), () => Array(10).fill(false));
    this.attemptedAttacks = Array.from(Array(10), () =>
      new Array(10).fill("unknown")
    );
    this.ships = [];
  }

  placeShip(ship, x, y, direction) {
    let length = ship.length;
    if (direction === "horizontal") {
      //check it doensn't oveflow
      if ((x<0) || (y<0) || (x + length > 10) || (y>=10)) {
        throw new Error("invalid: doesn't fit into grid");
      }
      //check that the spots are not already taken
      for (let i = 0; i < length; i++) {
        if (Number.isInteger(this.grid[x + i][y])) {
          throw new Error("invalid: spot already taken");
        }
      }
      for (let i = 0; i < length; i++) {
        this.grid[x + i][y] = this.ships.length; //will later access specific ships using length in array.
      }
    } else if (direction === "vertical") {
      if ((x<0) || (y<0) || y + length > 10|| (x>=10)) {
        throw new Error("invalid: doesn't fit into grid");
      }
      for (let i = 0; i < length; i++) {
        if (Number.isInteger(this.grid[x][y + i])) {
          throw new Error("invalid: spot already taken");
        }
      }
      for (let i = 0; i < length; i++) {
        this.grid[x][y + i] = this.ships.length;
      }
    }
    this.ships.push(ship);
    return "success";
  }
  receiveAttack(x, y) {
    if (this.grid[x][y] === false) {
      this.attemptedAttacks[x][y] = "missed";
    } else {
      this.attemptedAttacks[x][y] = "hit";
      const shipAtTarget = this.ships[this.grid[x][y]];
      shipAtTarget.hit();
    }
  }

  areAllShipsSunk() {
    return !this.ships.some((ship) => !ship.isSunk());
  }
}
