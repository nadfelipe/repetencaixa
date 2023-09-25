let palavras = [];
let tilesX = 10;
let tilesY = 10;
let tileW, tileH, font;
let larguraLinhaRect = '2';
let modoMovimento;
let movimentoEscolhido;
const movimentos = ["direita", "esquerda", "subir", "descer", "sobeEsq", "desceEsq", "sobeDir", "desceDir"];
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
    setMovimento(palavras[i]);
  }

  setModoMovimento();
}

function setMovimento(palavra){
  switch (modoMovimento) {
    case "treme":
      movimentaPalavra(palavra, true);
      break;
    case "direcao":
      movimentaPalavra(palavra)
      break;
    default:
      palavra.subir;
      palavra.descer
      break;
  }
}

function movimentaPalavra(palavra, aleatorio) {
  if (aleatorio)
    movimentoEscolhido = random(movimentos);
  
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
    case "sobeEsq":
      palavra.subir();
      palavra.esquerda();
      break;
    case "desceEsq":
      palavra.descer();
      palavra.esquerda();
      break;
    case "sobeDir":
      palavra.subir();
      palavra.direita();
      break;
    case "desceDir":
      palavra.descer();
      palavra.direita();
      break;
  }
}

function setModoMovimento() {
  let radioButtons = document.getElementsByName("modoMovimento");
  
  for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
          modoMovimento = radioButtons[i].value;
          break;
      }
  }

  if (modoMovimento == 'direcao') {
    let radioButtonsDirecao = document.getElementsByName("direcao");

    for (let i = 0; i < radioButtonsDirecao.length; i++) {
      if (radioButtonsDirecao[i].checked) {
          movimentoEscolhido = radioButtonsDirecao[i].value;
          break;
      }
  }
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
  frase = "Um pequeno jabuti xereta viu dez cegonhas felizes.";
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
