class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.top = this.walls[0];
    this.right = this.walls[1];
    this.bottom = this.walls[2];
    this.left = this.walls[3];
    this.col = 'lime';
    this.visited = false;
    this.neighbours = [];
  }
  display() {
    let x = this.x * scaling,
      y = this.y * scaling;
    noStroke();
    // if(this.visited){
    //   this.col = 'lime';
    // }
    fill(this.col);
    rect(this.x * scaling, this.y * scaling, scaling, scaling);
    stroke(0);
    if (this.top) {
      line(x, y, x + scaling, y); //Top
    }
    if (this.right) {
      line(x + scaling, y, x + scaling, y + scaling); //Right
    }
    if (this.bottom) {
      line(x, y + scaling, x + scaling, y + scaling); //Bottom
    }
    if (this.left) {
      line(x, y, x, y + scaling); //Left
    }
  }
  update() {
    this.top = this.walls[0];
    this.right = this.walls[1];
    this.bottom = this.walls[2];
    this.left = this.walls[3];
  }
  highlight() {
    this.col = "red";
  }
  fetchNext() {
    
    let top = this.y!==0, 
        right = this.x!==(span-1), 
        bottom = this.y!==(span-1), 
        left = this.x!==0;   
    this.neighbours = [];
    if(top && !cells[this.y-1][this.x].visited){
      this.neighbours.push(cells[this.y-1][this.x]);
    }
    if(right && !(cells[this.y][this.x+1]).visited){
      this.neighbours.push(cells[this.y][this.x+1]);
    }
    if(bottom && !cells[this.y+1][this.x].visited){
      this.neighbours.push(cells[this.y+1][this.x]);
    }
    if(left && !cells[this.y][this.x-1].visited){
      this.neighbours.push(cells[this.y][this.x-1]);
    }
    return this.neighbours;
  }
}