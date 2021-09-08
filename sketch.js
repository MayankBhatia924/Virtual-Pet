var dog, dogHappy;
var database, foodStock;
var  foodS="20";
function preload(){
    dogImg = loadImage("Dog.png");
    dogImg2 = loadImage("happydog.png");
}
function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 350, 10, 10);
  dog.scale = 0.2
  dog.addImage(dogImg);

foodStock = database.ref('Food');
foodStock.on("value", readStock);
}
function draw() {  
  background(140, 210, 144);

  if(keyWentDown(UP_ARROW)){
    foodS=foodS-1
    dog.addImage(dogImg2);
  }

  if(foodS===0){
    textSize(20);
    text("NO MORE FOOD IS LEFT",200,250)
  }
  if(foodS<0){
    foodS=0;
  }

  drawSprites();
  textSize(20);
  text("Remaining Food : "+ foodS, 150, 150);
  textSize(15);
  text("PRESS THE UP ARROW TO FEED MILK TO 'FUDGE'", 50, 30)
} 
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
  x = 0
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}