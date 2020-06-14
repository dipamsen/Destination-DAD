class Gift{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  display(){
    fill(255);
    imageMode(CENTER);
    image(heart, this.x*scaling+scaling/2, this.y*scaling+scaling/2, 30, 30);
  }
}