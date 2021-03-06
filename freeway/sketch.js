function setup() {
  createCanvas(600, 400);
  trilha.setVolume(0.3);
  trilha.loop();
}

function draw() {
  if(frameCount > 400){// + ou -* 8 segundos//
    if(PlacarVaca < 5 && PlacarTouro < 5)
    jogar();
    else
      verificaVencedor();
  }else{
    //TelaInicial
    telaInicial();
  }
}

function verificaVencedor(){
  if(PlacarVaca >= 5)
    vacaVencedora();
  else
    touroVencedor();
}

function vacaVencedora(){
  fill("Crimson");
  textStyle(BOLD);
  textAlign(CENTER);
  fill("Chartreuse");
  textSize(40);
  text("Vaca Venceu", 300, 90);
  image(imgVaca, 200, 100, 200, 200);
}


function touroVencedor(){
  fill("DarkOrchid");
  textStyle(BOLD);
  textAlign(CENTER);
  fill("DarkOrange");
  textSize(40);
  text("Touro Venceu", 300, 90);
  image(imgTouro, 200, 100, 200, 200);
}

function telaInicial(){
  fill("Chartreuse");
  background("silver");
  textStyle(BOLD);
  textAlign(CENTER);
  fill("Chocolate");
  textSize(40);
  text("Jogo da Av. 1º de Maio", 300, 200);
  textSize(25);
  text("Desenvolvido por Patric", 300, 230);
  image(imgDança, 250, 210, 150, 150);
}

function jogar(){
  background(imgEstrada);
  mostraCarros();
  mostraVaca();
  movimentaCarros();
  movimentaVaca();
  atropelamento();
  Placar();
}



