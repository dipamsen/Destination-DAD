class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    fill('yellow');
    ellipse(this.x * scaling + scaling / 2, this.y * scaling + scaling / 2, scaling * 2 / 3);
    fill(0);
    noStroke();
    textStyle(BOLD);
    text('me', this.x * scaling + scaling / 2, this.y * scaling + scaling / 2);

  }
}