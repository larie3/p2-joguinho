class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      console.log("dentro do ifgameState")
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
        console.log("dentro do if de existencia count")
      } else {
        playerCount = 0;
      }
      form = new Form()
      form.display(playerCount);
    }
   // criar cenario!!
    player1 = createSprite(800,200);
    //player1.addImage("player1",player1_img);
    player2 = createSprite(500,200);
    //player2.addImage("player2",player2_img);
    players = [player1, player2,];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
     // background(rgb(198,135,103));
     // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the players
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        x = displayHeight - allPlayers[plr].distance;
        x = x + 200;
        //use data form the database to display the players in y direction
        y = displayHeight - allPlayers[plr].distance;//fazer pro x
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y//mudar x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    // fazer pra todos
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
      gameState=2;
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
  }
}