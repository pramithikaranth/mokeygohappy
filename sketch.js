//Global Variables
var monkey,monkey_runnng;
var banana,bananaImage;
var jungle,jungleImage;
var stone,stoneImage;

var bananaGroup;

var ground, invisibleGround, groundImage;


var score;

var prevFrame;

var obst,obstImage;

function preload(){
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  
  groundImage = loadImage("ground.jpg");
  
  obstImage = loadImage("stone.png");
   
}


function setup() {
  createCanvas(600,300);
  
  ground = createSprite(200,500,40,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -5;
  
  
  monkey =  createSprite(50,180,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
  score = 0; 
  
  prevFrame = 0;
  
  
  bananaGroup = new Group();
  
  obstGroup = new Group();
  
  
}


function draw(){
    background(255); 
    text("Score: "+ score, 500,50);
  
    if(monkey.isTouching(bananaGroup)){
  
        if(prevFrame === 0){
            prevFrame = frameCount;
            score = score+1;
            monkey.scale = monkey.scale*1.01;
         }
         else{
             if((frameCount-prevFrame)>=20){
                prevFrame = 0;
             }
         }
    }
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
  
    if(keyDown("space")) {
        monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(invisibleGround);
  
  
  if(monkey.isTouching(obstGroup)){
  
        if(prevFrame === 0){
            prevFrame = frameCount;
            score = score-1;
          monkey.scale = monkey.scale*0.95;
         }
         else{
             if((frameCount-prevFrame)>=70){
                prevFrame = 0;
             }
         }
    }
 
    spawnbanana();
    spawnObst();

    drawSprites();
}

 function spawnbanana(){
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(50,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
    banana.scale = 0.03;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    //banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
   
}

function spawnObst()
{
  if(frameCount % 200==0){
    var obst = createSprite(600,300,20,50);
    obst.addImage(obstImage);
    
    obst.lifeTime = 200;    
    
    obst.scale = 0.2;
    
    obst.velocityX  = -3;
    
    obstGroup.add(obst);
  }
  
  
}
  

  
  
  
  
