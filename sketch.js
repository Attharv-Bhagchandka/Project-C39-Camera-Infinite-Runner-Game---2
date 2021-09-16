var Score = 0, Camera;
var Bow, Bowskin;
var Arrow, ArrowG, ArrowSkin, ArrowLoad;
var BalloonSpawn, Balloon, BalloonG, Blue, Red, Green, Pink;
var Background, BG;
var Select, Delay = 40;
var Gamestate = "Play";

function preload() {
  Bowskin = loadImage("bow0.png");
  ArrowSkin = loadImage("arrow0.png");
 
  Blue = loadImage("blue_balloon0.png");
  Red = loadImage("red_balloon0.png");
  Green = loadImage("green_balloon0.png");
  Pink = loadImage("pink_balloon0.png");

  BG = loadImage("background0.png");
}

function setup() {
  createCanvas(400, 400);
  //camera.position.x = 200;
  //camera.position.y = 200;

  Background = createSprite(0,0,400,400);
  Background.addImage("BG",BG);
  Background.velocityX = -5;
  Background.scale = 2.5
  
  Bow = createSprite(350,380,20,50);
  Bow.addImage("running", Bowskin);
  
  ArrowG = createGroup();
  BalloonG = createGroup();
  }

function ArrowLoad(){
  Arrow = createSprite(350,Bow.y,5,10);
  Arrow.addImage(ArrowSkin);
  Arrow.velocityX = -6;
  Arrow.scale = 0.3;
  Arrow.lifetime = 200;
  ArrowG.add(Arrow);
  return Arrow;
}
function BalloonSpawn( color, size){
  Balloon = createSprite(20, Math.round(random(25, 375)),40, 40);
  Balloon.addImage("Color",color);
  Balloon.velocityX = 3;
  Balloon.scale = size;
  Balloon.lifetime = 200;
  BalloonG.add(Balloon);
  }

function draw() {
  background(220);

  if(Gamestate == "Play"){
    textSize(20)
    text("Score: " + Score, 270, 30)

    if (Background.x < 0){
      Background.x = Background.width/2;
    }

    Bow.y = mouseY;
    Delayed();

    
    
    Select = Math.round(random(1,4));
    if (frameCount % 80 == 0){
      if (Select == 1){
        BalloonSpawn(Blue, 0.1);
      }

      if (Select == 2){
        BalloonSpawn(Red, 0.088);
      }
      if (Select == 3){
        BalloonSpawn(Green, 0.084);
      }
      if (Select == 4){
        BalloonSpawn(Pink, 1.15);
      }
    }
    
    if (keyDown("space") && Delay == 0){
      ArrowLoad();
      Arrow.y = Bow.y;
      Delay = 40;
    }
    
    if (ArrowG.isTouching(BalloonG)) {
      BalloonG.destroyEach();
      ArrowG.destroyEach();
      Score = Score + 1;
    }

    if(Score >= 20){
      Gamestate = "Win"
    }

    if(Balloon.position.x > Bow.position.x){
      Gamestate = "Loss"
    }
    
  }

  if (Gamestate = "Win"){
    textSize(20);
    text("You Win! All Balloons Hit.", 270, 30);
    Background.velocityX = 0;
  }

  if (Gamestate = "Loss"){
    textSize(20);
    text("Game Over! You missed a Balloon.", 270, 30);
    Background.velocityX = 0;
  }

  drawSprites();
  
}

function Delayed() {
  if (Delay >= 1){
    Delay = Delay - 1
  }
}

