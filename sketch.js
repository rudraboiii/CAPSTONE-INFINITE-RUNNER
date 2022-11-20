// variables

var PLAY = 1;
var END = 0;
var gameState = PLAY;               // PLAY AND END gamestates

var player, playerImg  // player
var playerdestroy, playerdestroyImg

var checkPointSound, dieSound // sounds

var asteroid1, asteroid2, asteroid3, asteroid4    // opponent
var asteroidsGroup

var space, spaceImg                 // bg

var gameOver, restart;
var gameOverImg, restartImg         // over and reset

var score;

function preload(){
    spaceImg = loadImage("8bit_space.png")            //Space (background)

    playerImg = loadImage("8bit_rocket.png")      //Rocket (player)
    playerdestroyImg = loadImage("8bit_download.png")

    asteroid1 = loadImage("8bit_asteroid1.png")  //Asteroid (opponent)
    asteroid2 = loadImage("8bit_asteroid2.png")//Asteroid2 (opponent 2)
    asteroid3 = loadImage("8bit_asteroid3.png")  //Asteroid3 (opponent 3)
    asteroid4 = loadImage("8bit_asteroid4.png")  //Asteroid4 (opponent 4)

   checkPointSound = loadSound("checkpoint.mp3") // checkpoint
   dieSound = loadSound("die.mp3")         // die

    gameOverImg = loadImage("gameOver.png")           // game over (end screen)
    restartImg= loadImage("restart.png")             // restart (reset)
}

function setup() {
    createCanvas(400, 400)  //Create Screen

    // player
    player = createSprite(200, 350,)
    player.addAnimation("rocket" ,playerImg)
    player.addAnimation("destroyed" , playerdestroyImg)

   player.scale=0.45;

   // background
   space = createSprite(200, 200)
   space.addImage("space ",spaceImg)
   space.y = space.width /2;
   space.velocityY = 5;
    
    // collision radius
    player.setCollider("rectangle",0,0,100,250);
    //player.debug = true

    // Game over
    gameOver = createSprite(200,150);
    gameOver.addImage(gameOverImg);

    // restart
    restart = createSprite(200,210);
  restart.addImage(restartImg);

  // OVER/ RESET RESIZE
  gameOver.scale = 0.5;
  restart.scale = 0.5;

// Group
    asteroidsGroup= createGroup();

    score = 0;

}

function draw() {

    //background
    background(0);

    //displaying score
  text("Score: "+ score, 360,50);

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    
    space.velocityY = -(4 + 3* score/100)

    score =  score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      checkPointSound.play() 
   }
   
   if (space.y < 0){
      space.y = space.width/2;
   }

   spawnAsteriods();

   if(asteroidsGroup.isTouching(player)){
        gameState = END;
        dieSound.play()

  }
}

else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
 
 //destroyed animation
  player.changeAnimation("destroyed", playerdestroyImg);

 
 
  space.velocityX = 0;
  player.velocityY = 0

  //asteroid stop velocity and stay
  asteroidsGroup.setLifetimeEach(-1);
  asteroidsGroup.setVelocityYEach(0);

  if(mousePressedOver(restart)) {
    reset();
  }
  
  //draw sprites
    drawSprites();
}
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  asteroidsGroup.destroyEach();
  
  player.changeAnimation("rocket" ,playerImg);
  score = 0;


}

function spawnAsteriods() {
  if(frameCount % 51 === 0 ){ // spawn asteroid every 51 frames

    var asteroid = createSprite(600,165,10,40);
    asteroid.velocityY = -(6 + score/100);

    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              break;
      case 2: asteroid.addImage(asteroid2);
              break;
      case 3: asteroid.addImage(asteroid3);
              break;
      case 4: asteroid.addImage(asteroid4);
              break;
            default: break;

  } 
  
     //scale and lifetime          
     asteroid.scale = 0.5;
     asteroid.lifetime = 350;

     asteroidsGroup.add(asteroid);

  
}
}