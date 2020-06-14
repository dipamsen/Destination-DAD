let cells = [];
let span = 20;
let scaling;
let stack = [];
let current;
let player;
let gifts = [];
let health = 2000;

function preload(){
  heart = loadImage('heart pixel art 254x254.png');
}

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  print(height);
  scaling = 40;
  span = round(width/scaling);
  // scaling = width / span;
  
  // print(span, scaling);
  for (let rows = 0; rows < span; rows++) {
    cells[rows] = [];
    for (let cel = 0; cel < span; cel++) {
      cells[rows][cel] = new Cell(cel, rows);
    }
  }

  for (let row of cells) {
    for (let cell of row) {
      cell.fetchNext();
    }
  }
  // cells[5][5].highlight();
  current = cells[0][0];
  current.visited = true;
  backtrack(current);
  cells[span-1][span-1].highlight();
  player = new Player(0, 0);
  lol = map(height, 200, 560, 3, 8);
  for (let i = 0; i < (lol); i++){
    gifts[i] = new Gift(floor(random(span-1)), floor(random(1, span)))
  }
}

function draw() {
  background(255);
  for (let row of cells) {
    for (let cell of row) {
      cell.display();
      cell.update();
    }
  }
  hi = map(width, 700, 560, 3, 5);
  health -= hi;
  for (let g in gifts) {
    let gift = gifts[g]
    gift.display();
    if(gift.x == player.x && gift.y == player.y){
      health = 2000;
      gifts.splice(g, 1);
    }
  }
  // print(health);
  player.display();
  textSize(16);
  textAlign(CENTER, CENTER);
  text('DAD', cells[span-1][span-1].x*scaling+scaling/2, cells[span-1][span-1].y*scaling+scaling/2);
  
  rect(width*6.2/8, height/100, width/5, height/50);
  push();
  fill(255, 0, 0);
  let w = map(health, 0, 2000, 0, width/5-2);
  rect(width*6.2/8+1, height/100+1, w, height/50-2);
  pop();
  
  if (player.x == span - 1 && player.y == span - 1) {
    background(0);
    textSize(30);
    fill(255);
    text("YOU WIN", width/2, height/2);
    noLoop();
  }
  if(health<=0){
    background(0);
    textSize(30);
    fill(255);
    text("YOU LOSE", width/2, height/2);
    noLoop();
  }
}

function backtrack(curr) {
  curr.visited = true;

  if (curr.neighbours.length > 0) {
    let n = floor(random(curr.neighbours.length));
    stack.push(curr);
    let next = curr.neighbours[n];
    removeWalls(curr, next);
    refresh();
    backtrack(next);
  } else if (stack.length !== 0) {
    backtrack(stack.pop());
  }
}

function removeWalls(a, b) {
  var x = a.x - b.x;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.y - b.y;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function refresh() {
  for (let row of cells) {
    for (let cell of row) {
      cell.fetchNext();
    }
  }
}

function unvisited() {
  let un = 0
  for (let row of cells) {
    for (let cell of row) {
      if (!cell.visited) {
        un++
      }
    }
  }
  return un;
}

function visitAll() {
  for (let row of cells) {
    for (let cell of row) {
      cell.visited = true;
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW && !cells[player.y][player.x].top) {
    player.y--;
    // print(player);
  }
  if (keyCode == RIGHT_ARROW && !cells[player.y][player.x].right) {
    player.x++;
  }
  if (keyCode == DOWN_ARROW && !cells[player.y][player.x].bottom) {
    player.y++;
  }
  if (keyCode == LEFT_ARROW && !cells[player.y][player.x].left) {
    player.x--;
  }
  // print(cells[player.x][player.y]);
}