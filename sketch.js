var dog,happyDog,database,foodS,foodStock
var dog_img,happyDog_img;
var milk,milk_img;
var x = 500;
var bgImage;
var g;
var sleepingDog_img;






function preload()
{
dog_img=loadImage("dogImg.png");
  happyDog_img=loadImage("dogImg1.png");
  milk_img=loadImage("milk.png");
  bgImage = loadImage("bg.jpg");

}







function setup() {
  database=firebase.database();
  //fetching stock from DB
  foodStock=database.ref("Food");
  foodStock.on("value",readStock,showError);
  //console.log(foodStock)
 

  createCanvas(500,500);
  dog=createSprite(250,420);
  dog.addImage(dog_img);
  dog.scale=0.2;

  
  milk=createSprite(180,470);
  milk.addImage(milk_img);
  milk.scale=0.09 ;
  milk.visible=false;
  
fill("green");
  g = createSprite(250,450,500,100);
  g.shapeColor = rgb(0,204,0);

dog.depth = g.depth;
dog.depth = dog.depth + 1;
milk.depth = g.depth;
milk.depth = dog.depth + 1;
}







function draw() {  

 // background(bgImage);
background(153,204,255);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
    happyDog_img.scale = 0.1;
     milk.visible=true;
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dog_img);
    milk.visible=false;
  }
  
    drawSprites();
  

  strokeWeight(2);
fill("navy");
  textSize(24);
  text("Food Remaining : "+foodS,140,100);
  x = x-2;
 
  fill("navy");
  text("Long Press the up arrow key to feed the pet ",x,20);
  fill("navy");
 if(keyDown("UP_ARROW"))
 {
    textSize(24);
    text("Great! Oscar is Happy",130,160);
  }
else
  {
     textSize(24);
     text("Feed the pet it is hungry!!",130,160);
   }
 

    textSize(24);
    text("Pet Name : Oscar",150,130);
  

 
  
  if(foodS===undefined)
  {
    textSize(25);
    text("Loading..........",170,250);
  }


  if(foodS===0)
  {
foodS = 10;
  }}









function readStock(data)
{ 
  foodS=data.val();
}



function writeStock(x)
{
  
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').set(
    {
      Food:x
    }
  )

}



function showError()
{
  text("Server is not working, Try again later!",200,200);
}



