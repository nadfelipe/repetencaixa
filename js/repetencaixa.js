let rects = [];
let tilesX = 10;
let tilesY = 15;
let tileW, tileH, font;
let colorBg = "#FF6689";
let colorStroke = "#FCD422";
let colorRect = "#2ec2b3";
let colorRectAlt = "#332783";

function setup() {
  createCanvas(1000, 1000, document.getElementById("canvas-apresentacao"));
  stroke(color(colorStroke));
  tileW = int(width / tilesX);
  tileH = int(height / tilesY);
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      fill(color(colorBg));
      strokeWeight(3);
      rectMode(CORNER);
      rect(x * tileW, y * tileH, tileW, tileH);
    }
  }
}

function draw() {
  fill(color(colorRectAlt));
  rectMode(CENTER);
  rect(mouseX, mouseY, tileW, tileH)
  for (let i = 0; i < rects.length; i++){
    rects[i].display();
    if(mouseIsPressed){
      rects[i].movimentar()
    }
  }
}

function mouseClicked() {
  rects.push(new Quadrado(mouseX, mouseY, tileW * random(1, 1.2), tileH * random(1, 1.2)));
}

class Quadrado {
  constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  }
  
  display() {
    fill(color(colorRect));
    rect(this.x, this.y, this.w, this.h);
  }
  
  movimentar() {
    this.x = this.x + int(random(-1, 1) * 10);
    this.y = this.y + int(random(-1, 1) * 10);
  }
}