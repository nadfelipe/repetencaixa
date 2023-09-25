let palavras = [];
let tilesX = 10;
let tilesY = 10;
let tileW, tileH, font;
let larguraLinhaRect = '2';
const palavraWidths = {};
const wordImages = {};
let frase = "Um pequeno jabuti xereta viu dez cegonhas felizes.";

function preload() {
  font = loadFont("../assets/Sk-Modernist-Regular.otf");
}

function setup() {
  createCanvas(1080, 1080, document.getElementById('gerador-layout'));
  tileW = int(width / tilesX);
  tileH = int(height / tilesY);
  background(`${document.getElementById('cor-bg').value}`);
  // drawGrid();
  displayFrase(frase);
}

function draw() {
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].display();
    movimentoAleatorio(palavras[i]);
  }
}

function movimentoAleatorio(palavra) {
  const movimentos = ["direita", "esquerda", "subir", "descer"];
  const movimentoEscolhido = random(movimentos);
  
  switch (movimentoEscolhido) {
    case "direita":
      palavra.direita();
      break;
    case "esquerda":
      palavra.esquerda();
      break;
    case "subir":
      palavra.subir();
      break;
    case "descer":
      palavra.descer();
      break;
    default:
      palavra.esquerda();
      palavra.subir();
      break;
  }
}

function detectaTecla(palavra) {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    palavra.esquerda();
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    palavra.direita();
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    palavra.subir();
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    palavra.descer();
  }
}

function atualizarConteudo() {
  background(`${document.getElementById('cor-bg').value}`);
  limparPalavras();
  frase = `${document.querySelector("#frase").value}`;
  displayFrase(frase);
}

function limparPalavras(){
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].pg.remove();
  }
  palavras = [];
}

function resetCanvas() {
  limparPalavras();
  clear();
  displayFrase(frase);
  background(`${document.getElementById('cor-bg').value}`);
}

function salvarLayout() {
  save('layout.png');
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
