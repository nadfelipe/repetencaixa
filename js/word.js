class Palavra {
    constructor(x, y, w, h, texto) {
      this.x = x;
      this.y = y;
      this.texto = texto;
      this.w = w;
      this.h = h;
      this.wordWidth = Math.round(int(textWidth(this.texto.toUpperCase())) / 10);
      this.pg = null;
      this.corTexto = `${document.getElementById('cor-texto').value}`;
      this.createPG();
    }
  
    createPG() {
      this.pg = createGraphics(tileW * this.w, tileH * this.h);
      this.pg.fill(`${document.getElementById('cor-rect').value}`);
      this.pg.stroke(`${document.getElementById('cor-stroke').value}`);
      this.pg.strokeWeight(larguraLinhaRect);
      this.pg.rect(0, 0, tileW * this.wordWidth, tileH * this.h);
      this.pg.noStroke();
      this.pg.textFont(font);
      this.pg.fill(this.corTexto);
      this.pg.textSize(tileH);
      this.pg.textAlign(LEFT, CENTER);
      this.pg.text(this.texto, 10, tileH / 2 - 13);
    }
  
    display() {
      let col = this.x % tilesX;
      let row = this.y % tilesY;
      let imgX = col * tileW;
      let imgY = row * tileH;
  
      image(this.pg, imgX, imgY, tileW * this.w, tileH * this.h);
    }
  
    subir() {
      this.y = this.y - 0.2;
  
      if (this.y <= 0) this.y = tilesY;
    }
  
    descer() {
      this.y = this.y + 0.2;
  
      if (this.y >= tilesY) this.y = 0;
    }
  
    direita() {
      this.x = this.x + 0.2;
  
      if (this.x >= tilesX) this.x = 0;
    }
  
    esquerda() {
      this.x = this.x - 0.2;
  
      if (this.x <= 0) this.x = tilesX;
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

    for (let i = 0; i < palavras.length; i++) {
        palavras[i].display();
    }
  }
  