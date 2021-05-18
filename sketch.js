//all variables
var forest, forestimg;
var gem, gemimg, gemcount=0;
var princess, princessimg;
var warriorimg;
var branches, branchesimg;
var gemGroup;
var ground;
var warriorGroup;
var gameOver;
var gaeoverimg;
var restartimg;
var restart;
var warrior


//initiate Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

warriorimg=loadImage("princess animations/warrior animation/warrior.png");

//loading gem gif
gemimg=loadAnimation("gem frames/frame0.gif","gem frames/frame1.gif","gem frames/frame2.gif","gem frames/frame3.gif","gem frames/frame4.gif","gem frames/frame5.gif","gem frames/frame6.gif","gem frames/frame7.gif");

//loading forest image
forestimg=loadImage("forest1.jpg");

//loading princess image
princessimg=loadAnimation("princess animations/princess1.png","princess animations/princess2.png","princess animations/princess3.png")

//loading restart image
restartimg=loadImage("reset button.png");

//loading gameover image
gameoverimg=loadImage("gameover.png");

}


function setup() {
  createCanvas(1600,400);

//create warrior group
warriorGroup = new Group();

//create gem group
gemGroup = new Group();


//ground sprite
ground=createSprite(800,400,1600,10);

//making ground invisible
ground.visible=false;

//background sprite
forest=createSprite(750,200,10,10);
forest.addImage(forestimg);

//place gameOver and restart icon on the screen
gameOver = createSprite(800,160);
restart = createSprite(800,280);

gameOver.addImage(gameoverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.2;

gameOver.visible = false;
restart.visible = false;


//princess sprite
princess=createSprite(150,350,10,10)
princess.addAnimation("princess1",princessimg);

//scale forest
forest.scale=2;

//scale princess
princess.scale=1;
 
// creating gem animation
 //gem.addAnimation("gem",gemimg);


}



function draw() {
background("white");

if(gameState===PLAY){


//move background
forest.velocityX=(-7);

if(forest.x<0){

forest.x= forest.width/2;
}

//Princess Jump
if(keyDown("space")&& princess.y> 300){
princess.velocityY=-20;
}
//gravity
princess.velocityY+=0.8;



spawnGems();

//gem score
if(gemGroup.isTouching(princess)){
gemcount++
  
gemGroup.destroyEach();
}
spawnWarrior();

//End the game when princess is touching the warrior
if(warriorGroup.isTouching(princess)){
  gameState = END;
  //playSound("die.mp3");
}

}

else if(gameState===END){
gameOver.visible=true;
restart.visible=true;

//stop objects
forest.velocityX=0;
princess.velocityY=0;
warriorGroup.setVelocityXEach(0);
gemGroup.setVelocityXEach(0);

}



//collide
princess.collide(ground);

drawSprites();

text("Gems Collected: "+gemcount,1000,50)

}


function spawnWarrior() {
  if(World.frameCount % 100 === 0) {
    warrior = createSprite(1600,340,50,100);
    warrior.setCollider("circle",0,0,27)
    warrior.velocityX = -7;
    warrior.addImage(warriorimg);
    //generate random obstacles
    console.log("hello");
    //warrior.setAnimation("warrior" + rand);
    
    //assign scale and lifetime to the obstacle           
    warrior.scale = 2;
    warrior.lifetime = 280;
    //add each obstacle to the group
    warriorGroup.add(warrior);
  
  }
}

function restart(){
  gameState = PLAY;
  gemGroup.destroyEach();
  warriorGroup.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  //princess.setAnimation("2");
  count=0;
   
  }

//spawn gems function
function spawnGems(){
  var r=Math.round(random(200,300));
  console.log(r);
  if(World.frameCount % r === 0){
    gem=createSprite(1600,300,10,10)
    gem.velocityX= (-5)
    gem.debug=true;

    //spawn gems at different heights
    gem.y= random (200,300)
    gem.addAnimation("gem",gemimg);
  //gem lifetime
    gem.lifetime = 320;
   //scale gem
    gem.scale= 0.1;

    gemGroup.add(gem);



  }

}