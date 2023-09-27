let palavras = [];
let tilesX = 10;
let tilesY = 10;
let tileW, tileH, font;
let larguraLinhaRect = "2";
let modoMovimento;
let movimentoEscolhido;
const movimentos = [
  "direita",
  "esquerda",
  "subir",
  "descer",
  "sobeEsq",
  "desceEsq",
  "sobeDir",
  "desceDir",
];
const palavraWidths = {};
const wordImages = {};
let frase = "Um pequeno jabuti xereta viu dez cegonhas felizes.";

function preload() {
  font = loadFont("../assets/Sk-Modernist-Regular.otf");
}

function setup() {
  createCanvas(1080, 1080, document.getElementById("gerador-layout"));
  tileW = int(width / tilesX);
  tileH = int(height / tilesY);
  background(`${document.getElementById("cor-bg").value}`);
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

function setMovimento(palavra) {
  switch (modoMovimento) {
    case "treme":
      movimentaPalavra(palavra, true);
      break;
    case "direcao":
      movimentaPalavra(palavra);
      break;
    default:
      palavra.subir;
      palavra.descer;
      break;
  }
}

function movimentaPalavra(palavra, aleatorio) {
  if (aleatorio) movimentoEscolhido = random(movimentos);

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

  if (modoMovimento == "direcao") {
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
  background(`${document.getElementById("cor-bg").value}`);
  limparPalavras();
  frase = `${document.querySelector("#frase").value}`;
  displayFrase(frase);
  verificaCheckbox();
}

function limparPalavras() {
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].pg.remove();
  }
  palavras = [];
}

function resetInputs() {
  resetRadio("modoMovimento");
  resetRadio("direcao");
  document.getElementById("cor-bg").value = "#332783";
  document.getElementById("cor-texto").value = "#FFFCEE";
  document.getElementById("cor-rect").value = "#FF3333";
  document.getElementById("cor-stroke").value = "#FF6689";
  document.getElementById("frase").value = "Um pequeno jabuti xereta viu dez cegonhas felizes.";
}

function resetRadio(name) {
  let radioInputs = document.querySelectorAll(`input[type="radio"][name="${name}"]`);

  radioInputs[0].checked = true;

  radioInputs.forEach(function(input, index) {
    let label = document.querySelector('label[for="' + input.id + '"]');
    if (index === 0) {
      input.checked = true;
      label.classList.remove('radio-unchecked-style');
    } else {
      input.checked = false;
      label.classList.add('radio-unchecked-style');
    }
  });
}

function resetCanvas() {
  resetInputs();
  limparPalavras();
  frase = "Um pequeno jabuti xereta viu dez cegonhas felizes.";
  displayFrase(frase);
  background(`${document.getElementById("cor-bg").value}`);
}

function salvarLayout() {
  save("layout.png");
}

function drawGrid() {
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      stroke(`${document.getElementById("cor-stroke").value}`);
      strokeWeight(2);
      rectMode(CORNER);
      fill(`${document.getElementById("cor-bg").value}`);
      rect(x * tileW, y * tileH, tileW, tileH);
    }
  }
}

function verificaCheckbox() {
  var checkbox = document.getElementById("grid");
  if (checkbox.checked) {
    drawGrid();
  }
}
