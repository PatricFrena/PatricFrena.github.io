let atropelaVaca = false;
let atropelaTouro = false;

function atropelamento(){
  //Teste carro a carro
  for(let i=0; i<imgCarro.length; i++){
    
    atropelaVaca = collideRectRect( xVaca, yVaca, 28, 28, xCarro[i], yCarro[i], 50, 30);
    if(atropelaVaca){
      //Vaca Atropelada
      yVaca = 368;
      if(PlacarVaca > 0)
        PlacarVaca -= 1;
      atropelou.play();
    }
    atropelaTouro = collideRectRect( xTouro, yTouro, 28, 28, xCarro[i], yCarro[i], 50, 30);
    if(atropelaTouro){
      //Touro Atropelado
      yTouro = 368;
       if(PlacarTouro > 0)
        PlacarTouro -= 1;
      atropelou.play();
      
    }
  }//For
}//atropelamento