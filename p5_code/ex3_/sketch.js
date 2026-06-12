function setup() {
  createCanvas(500,500);
  angleMode(DEGREES);
}

function draw() {
  background(20);

  // Draw characters
  toon1(color(100,100,40), 100,400);
  toon1(color(210,120,130), 100 ,420);
  toon1(color(200,120,200), 100 + 50,410);
  
  // Draw trees
  tree1(color(139,69,19), 300, 400); // Brown trunk
  tree1(color(34,139,34), 350, 380); // Green leaves
  tree1(color(160,82,45), 400, 420); // Saddle brown trunk
}






function genpart(lx,ly,rot,sc,drawer) {
  push();
  translate(lx,ly);
  rotate(rot);
  scale(sc);
  if (typeof drawer === 'function') {
    drawer();
  }
  pop();
}

function toon1(k,lx,ly) {
  genpart(lx, ly, random(10,12), 1, function() {
    body(k);
    head(k);
    arm(k,8,10);
    arm(k,35,10);
    arm(k,15,65);
    arm(k,35,65);
  });
}

function body(k){
  fill(k);
  rect(0,0,40,80, 15,15,25,25);
}

function head(c){
  fill(c);
  ellipse(20,-15,40,40);
  fill(255);
  ellipse(20,-20,10,10);
}

function arm(c,lx,ly){
  push();
  translate(lx,ly);
  rotate(45);
  fill(c);
  rect(0,0,60,15,10);
  pop();
}

// Tree generation system - simple trunk and leaves
function tree1(trunkColor, lx, ly) {
  genpart(lx, ly, 0, 1, function() {
    trunk(trunkColor);
    leaves(color(34,139,34), 0, -50, 40);
    leaves(color(0,100,0), 15, -45, 25);
    leaves(color(0,128,0), -15, -45, 30);
  });
}

function trunk(c) {
  fill(c);
  // Simple brown rectangle for trunk
  rect(-8, 0, 16, 80);
}


function leaves(c, lx, ly, size) {
  push();
  translate(lx, ly);
  fill(c);
  // Use green circles for leaves
  ellipse(0, 0, size, size);
  pop();
}