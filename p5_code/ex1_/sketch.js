

 let lxo = 50;
 let lyo = 50;




function setup() {
  createCanvas(500,500);
  background(0, 50, 100);

  //noStroke();
}


function draw() {
 background(0, 50, 100,20);


 ellipse(mouseX,mouseY,30,30);


   for (let i = 30; i < 500; i += 20) {
    for (let j = 30; j < 500; j += 20) {
      rand = random(255);
      fill(rand);
      rect( i+5, j+5, 10, 10 );
      console.log("this has a greyscale value of" + rand);
    }
  }





if ( mouseIsPressed) {
  console.log("pressed");

if ( mouseX < 100) {
   console.log("X is less than 100");


  if ( mouseY < 100) {
     console.log("YYYY is less than 100");
    fill(255);
  ellipse(mouseX, mouseY, 60, 60);
  }

}


if ( mouseX > 400  && mouseY > 400 ) {

   lxo = mouseX - 300;
   lyo = mouseY - 300;


  // ----------------------- face start
  fill("orange");
  // anchor graphic
  rect(275 + lxo,100 + lyo,100,200,20);
  fill(255);
  ellipse(300 + lxo,150 + lyo,20,20);
  ellipse(350 + lxo,150 + lyo,20,20);
  ellipse(325 + lxo,220 + lyo,50,20);
   // x1,y1,x2,y2,x3,y3
   fill(200);
  triangle(325 + lxo,160 + lyo, 310 + lxo,200 + lyo, 340 + lxo,200 + lyo );
  // ------------------------face end
    
  ellipse(325+ lxo,300+ lyo,40,30);



   fill(200,0,100);
  rect(width/1.5, height/1.5, 80, 80,10);
  }


}

    fill(100);
    rect(201,201,100,100);
if ( mouseX > 200 &&  mouseX < 300 ) {
  if ( mouseY > 200 &&  mouseY < 300 ) {
    
     fill(255,0,0,90);
     triangle(200,240,240,180,270,240);
  }
}


 arc(50, 50, 80, 80, 0, PI + HALF_PI);

 



}   /// end of draw


