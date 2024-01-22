export default class Ship { 
    constructor(length, direction="vertical") {
      this.length = length;
      this.direction = direction; 
    }
  
    hits = 0;

    hit(){
      this.hits++;
    }
  
    isSunk(){
      return (this.hits>=this.length);
    }
  }
  
