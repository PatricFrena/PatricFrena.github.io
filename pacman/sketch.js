//Abertura
//Variaveis Gerais
let xTamanho = 0;
let yTamanho = 0;
let xPacMan1 = 300;
let xFantasma21 = -8; 
let larguraTela = 600;
let alturaTela = 400;
let imgFantasma1;
let imgFantasma2;
let imgFantasma3;
let imgFantasma4;
let imgPacman;
let imgLoad;
let xPacMan = -20;
let yPacMan = 220;
let xPacman = 300;
let yPacman = 100;
let velocidadePacMan = 2;
let velocidadeFantasma = 1.3;
let xFantasma1 = 120;
let yFantasma1 = 200;
let xFantasma2 = 240;
let yFantasma2 = 200;
let xFantasma3 = 360;
let yFantasma3 = 200;
let xFantasma4 = 500;
let yFantasma4 = 200;
let xFantasma5 = 240;
let yFantasma5 = 200;
let alturaPacMan = 25;
let larguraPacMan = 25;
let larguraFantasma1 = 23;
let alturaFantasma1 = 23;
let larguraFantasma2 = 30;
let alturaFantasma2 = 30;
let larguraFantasma3 = 20;
let alturaFantasma3 = 20;
let larguraFantasma4 = 23;
let alturaFantasma4 = 23;

let velocidadeXFantasma1 = 1.5;
let velocidadeYFantasma1 = 1.5;
let velocidadeXFantasma2 = 1;
let velocidadeYFantasma2 = 1;
let velocidadeXFantasma3 = 1;
let velocidadeYFantasma3 = 1;
let velocidadeXFantasma4 = 1;
let velocidadeYFantasma4 = 1;


//Game

var brickImg;
var bricks = [];
var platform;
var foods = [];
var pacman;
var ghostRed;
var ghostPurple;
var ghostPink;
var ghostGreen;
var ghostRedImg;
var ghostPurpleImg;
var ghostPinkImg;
var ghostGreenImg;
var weakGhost;
var ghosts = [];
var activeGhosts = [];
var powerUps = [];
var powerUpImg;
var points = 0;
var fimDeJogo = false;
var startShow = false;

function preload(){
  brickImg = loadImage("images/roca.png");
  foodImg = loadImage("images/food.png");
  pacmanImg = loadImage("images/pac.png");
  ghostRedImg = loadImage("images/red.png");
  ghostPurpleImg = loadImage("images/purple.png");
  ghostPinkImg = loadImage("images/pink.png");
  ghostGreenImg = loadImage("images/green.png");
  powerUpImg = loadImage("images/grape.png");
  weakGhost = loadImage("images/weak.png");
  imgBackground = loadImage("images/background.jpg");
  imgPacman = loadImage("images/pacman.gif");
  imgFantasma = loadImage("images/fantasma1.gif");
  imgFantasma2 = loadImage("images/fantasma2.gif");
  gameOver = loadImage("images/gameover.png");
  win = loadImage("images/win.png")
}

function setup(){
  canvas = createCanvas(800,672);
  canvas.position();
  platform = new Platform(21,25);
  for(var i = 0; i < platform.getRows(); i++)
      for(var j = 0; j < platform.getColumns(); j++){
          if(platform.getElement(i,j) === '*')
              bricks.push(new Brick(j*32,i*32));
          else if(platform.getElement(i,j) === '-')
              foods.push(new Food(j*32,i*32));
          else if(platform.getElement(i,j) === 'p')
              pacman = new Pacman(j*32,i*32);
          else if(platform.getElement(i,j) === 'r')
              ghosts.push(new Ghost(j*32,i*32,ghostRedImg));
          else if(platform.getElement(i,j) === 'i')
              ghosts.push(new Ghost(j*32,i*32,ghostPinkImg));
          else if(platform.getElement(i,j) === 'g')
              ghosts.push(new Ghost(j*32,i*32,ghostGreenImg));
          else if(platform.getElement(i,j) === 'u')
              ghosts.push(new Ghost(j*32,i*32,ghostPurpleImg));
          else if(platform.getElement(i,j) === 'o')
              powerUps.push(new Powerup(j*32,i*32));
      }
      activateGhosts();

}

function draw(){
  if(frameCount < 400){
    
     telaInicial();
  }else{
    if(fimDeJogo){
      telaFinal();
    }else{
  pac();}
  
  }       
}

function activateGhosts(){
    if(ghosts.length > 0){
      activeGhosts.push(ghosts[ghosts.length - 1])
      ghosts.splice(ghosts.length - 1, 1)
      activeGhosts[activeGhosts.length - 1].outOfBox(platform);
    }
    setTimeout(activateGhosts,7000);
}

function makeGhostStrong(){
  for(var i = 0; i < activeGhosts.length; i++)
      activeGhosts[i].isWeak = true;
}

function checkWin(){
  print(foods.length);
  if(foods.length === 0){
    alert("Você Venceu");
    window.location.reload();
  }
}


function keyPressed(){
  if(keyCode === RIGHT_ARROW){
      if(platform.getElement(pacman.y/32,pacman.x/32 + 1) !== '*')
        pacman.move(0);
      for(var i = 0; i < foods.length; i++)
        if(pacman.eats(foods[i])){
            foods.splice(i,1)
          points=points+1;
        }
    }
    if(keyCode === DOWN_ARROW){
        if(platform.getElement(pacman.y/32 + 1,pacman.x/32) !== '*')
          pacman.move(1);
        for(var i = 0; i < foods.length; i++)
          if(pacman.eats(foods[i])){
              foods.splice(i,1)
            points=points+1;
          }
      }
      if(keyCode === LEFT_ARROW){
          if(platform.getElement(pacman.y/32,pacman.x/32 - 1) !== '*')
            pacman.move(2);
          for(var i = 0; i < foods.length; i++)
            if(pacman.eats(foods[i])){
                foods.splice(i,1)
              points=points+1;
            }
        }
        if(keyCode === UP_ARROW){
            if(platform.getElement(pacman.y/32 - 1,pacman.x/32) !== '*')
              pacman.move(3);
            for(var i = 0; i < foods.length; i++)
              if(pacman.eats(foods[i])){
                  foods.splice(i,1)
                points=points+1;
          }
        }

}
function telaInicial(){
  background(0);
    textAlign(CENTER);
  textSize(34);
  fill("Purple");
  text("Pac Man AIPR 2019", 400, 200);
     textAlign(CENTER);
  textSize(24);
  fill("Purple");
  text("Feito por Patric, Yago, Moises e David", 400, 400);
  fill("Purple");
  text("Profº Tarcnux", 400, 450);
  image(imgFantasma2,xFantasma2, 333, 30, 30);
     xFantasma2 += 1;
  
  image(imgPacman, xPacMan, 333, 25, 25);
       xPacMan += 2;
  if(xPacMan > xFantasma2)
    xFantasma2 = 900;
  
  }
function pac(){
   background(4, 223, 249);
  frameRate(30);
  for(var i = 0; i < bricks.length; i++)
      bricks[i].show();
  for(var i = 0; i < foods.length; i++)
      foods[i].show();
  for(var i = 0; i < ghosts.length; i++)
      ghosts[i].show();
  for(var i = 0; i < powerUps.length; i++){
      powerUps[i].show();
      if(pacman.power(powerUps[i])){
        powerUps.splice(i,1);
        for(var i = 0; i < activeGhosts.length; i++){
            activeGhosts[i].isWeak = true;
          }
      }
  }
  pacman.show();
    textFont("Comic Sans MS");
    textSize(25);
    fill(255,244,244)
    text("Points: " + points, 30, 25);
    frameRate(5);
  for(var i = 0; i < activeGhosts.length; i++){
      activeGhosts[i].move(bricks);
      activeGhosts[i].show();
      if(pacman.collision(activeGhosts[i])){
        if(activeGhosts[i].isWeak === true){
          ghosts.push(new Ghost(32*12,32*10,activeGhosts[i].img));
          activeGhosts.splice(i,1);
          makeGhostStrong();
        }
        else{
            fimDeJogo = true;

        }
      }
  }
  checkWin();
 
}
function telaFinal(){
  frameRate(120);
  background(0);
  image(imgPacman, xPacMan1, 333, 30, 30)
  image(imgFantasma, xFantasma21, 333, 40,40);
  xFantasma21 += 2;
  xPacMan1 += 1;
  if(xFantasma21 > xPacMan1){
    xPacMan1 = 900;
    startShow = true;}
  if(startShow){
    image(gameOver, 150, -200, xTamanho, yTamanho)
    xTamanho += 1;
    yTamanho += 2;
  } if(xTamanho >= 500 && yTamanho >= 400){
    window.location.reload();
  }
}
function telaVencedor(){
    frameRate(120);
  background(0);
  image(imgFantasma, xFantasma21, 333, 30, 30)
  image(imgPacMan, xPacMan1, 333, 40,40);
  xFantasma21 += 1;
  xPacMan1 += 2;
  if(xPacMa1 > xFantasma21){
    xFantasma21 = 900;
    startShow = true;}
  if(startShow){
    image(win, 150, -200, xTamanho, yTamanho)
    xTamanho += 1;
    yTamanho += 2;
  } if(xTamanho >= 500 && yTamanho >= 400){
    window.location.reload();
  }
}
