var invisibleground, trex,trex_collided,trex_running,ground,groundImage,cloudImage,CloudsGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameOver,restart,gameOverImage,restartImage,ObstaclesGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count=0
    
function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
}
function setup() {
  createCanvas(400, 400);
  trex=createSprite(50,380,10,10)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
  ground=createSprite(50,380,10,10)
  ground.addImage(groundImage) 
  invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = false;
  CloudsGroup = new Group();
  ObstaclesGroup= new Group();
   gameOver = createSprite(200,300);
   restart = createSprite(200,340);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    //count = Math.round(World.frameCount/4);
    if (World.frameCount%5===0){
      count = count+1
    }
    if (count>0 && count%100 === 0){
     // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
     // playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.5;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   trex.changeAnimation("collided",trex_collided)
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();

  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(280,320);
    cloud.addImage(cloudImage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  } 
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand =Math.round(random(1,6)) 
    switch(rand) {
      case 1:obstacle.addImage(obstacle1);
      break
       case 2:obstacle.addImage(obstacle2);
      break
       case 3:obstacle.addImage(obstacle3);
      break
       case 4:obstacle.addImage(obstacle4);
      break
       case 5:obstacle.addImage(obstacle5);
      break
       case 6:obstacle.addImage(obstacle6);
      break
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
  function reset() {
 gameState = PLAY
 gameOver.visible= false 
 restart.visible= false
 ObstaclesGroup.destroyEach()
 CloudsGroup.destroyEach()
 trex.changeAnimation("running",trex_running)
 count=0
    
  }