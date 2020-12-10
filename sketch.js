var database;
var dog,dogImg;
var happydog,happydogImg;
var foodS,foodStock;

function preload()
{
  dogImg = loadImage("images/dog.png");
  happydogImg = loadImage("images/dog2.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(350,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  var foodStock = database.ref('food');
  foodStock.on("value",readStock);  
}


function draw() {  
  background(rgb(46,139,87))

  if(keyWentDown(UP_ARROW) && foodS >=1){
    writeStock(foodS);
    dog.addImage(happydogImg);
  }

  if(foodS == 0){
    foodS = 20;
  }

  drawSprites();

  stroke("black");
  text("Press Up Arrow To Feed Drago Milk!",150,100);
  text("Milk Remaining: " + foodS,200,200);
  

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x - 1 ;
  }
  database.ref('/').update({
    Food:x
  })
}