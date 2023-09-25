let palavras = [];
let tilesX = 20;
let tilesY = 1;
let tileW, tileH, font;
let larguraLinhaRect = '2';
const palavraWidths = {};
const wordImages = {};
let frase = "R E P E T E ⮕ E ⮕ E N C A II X A";

function preload() {
  font = loadFont("../assets/Sk-Modernist-Regular.otf");
}

function setup() {
  createCanvas(1440, 40, document.getElementById('canvas-footer'));
  tileW = int(width / tilesX);
  tileH = int(height / tilesY);
  drawGrid();
  displayFrase(frase);
}

function draw() {
    
  background(`#332783`);
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].display();
    // movimentaPalavra(palavras[i]);
  }
}

function movimentaPalavra(palavra) {
    palavra.direita();
}

function drawGrid() {
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      fill(0, 255, 0);
      strokeWeight(2);
      rectMode(CORNER);
      rect(x * tileW, y * tileH, tileW, tileH);
    }
  }
}

class Palavra {
    constructor(x, y, w, h, texto) {
        this.x = x;
        this.y = y;
        this.texto = texto;
        this.w = w;
        this.h = h;
        this.wordWidth = 1;
        this.pg = null;
        this.corTexto = `#FFFCEE`;
        this.createPG();
    }
  
    createPG() {
        if (this.w < 1){
            this.w = 1
            this.wordWidth = 1
        }

        this.pg = createGraphics(tileW * 1, tileH * 1);
        this.pg.fill(`#FF3333`);
        this.pg.stroke(`#FF6689`);
        this.pg.strokeWeight(larguraLinhaRect);
        this.pg.rect(0, 0, tileW * 1, tileH * 1);
        this.pg.noStroke();
        this.pg.textFont(font);
        this.pg.fill(this.corTexto);
        this.pg.textSize(tileH);
        this.pg.textAlign(LEFT, CENTER);
        this.pg.text(this.texto, 23, tileH / 2 - 6);
    }
  
    display() {
        let col = this.x % tilesX;
        let row = this.y % tilesY;
        let imgX = col * tileW;
        let imgY = row * tileH;

        if (this.w < 1)
        this.w = 1

        image(this.pg, imgX, imgY, tileW * 1, tileH * this.h);
    }
  
    direita() {
        this.x = this.x + 0.1;

        if (this.x >= tilesX) this.x = 0;
    }
  }
  
  function calculateWordWidths() {
    const palavrasFrase = frase.split(" ");
    for (let i = 0; i < palavrasFrase.length; i++) {
      const palavra = palavrasFrase[i].toUpperCase();
      palavraWidths[palavra] = Math.round(int(textWidth(palavra)) / 10);
    }
  }

  function displayFrase(frase) {
    let col = 0;
    let row = 0;
    calculateWordWidths();
    const palavrasFrase = frase.split(" ");
  
    for (let i = 0; i < palavrasFrase.length; i++) {
      const larguraPalavra = palavraWidths[palavrasFrase[i].toUpperCase()];
  
      if (col + larguraPalavra <= tilesX) {
        palavras.push(
          new Palavra(
            col,
            row,
            larguraPalavra,
            1,
            `${palavrasFrase[i].toUpperCase()}`
          )
        );
        col += larguraPalavra;
      } else {
        col = 0;
        row++;
        if (row >= tilesY) {
          break;
        }
        palavras.push(
          new Palavra(
            col,
            row,
            larguraPalavra,
            1,
            `${palavrasFrase[i].toUpperCase()}`
          )
        );
        col += larguraPalavra;
      }
    }
  }