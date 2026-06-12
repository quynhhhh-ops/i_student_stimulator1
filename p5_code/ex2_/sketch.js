let pizza, mazeImg, chestImg, f;
let playerX, playerY;
let playerSize = 100;
let hitWall = false;

let chests = [];
let collected = [];
let chestSize = 50;

let redIsBetter = false;
let counterG = 0;
let counterR = 0;

// animation vars
let bgcounter = 0;
let counter = 0;
let value = 0;

function preload() {
  f = loadFont("assets/space_age.otf");
  pizza = loadImage("assets/pizza.png");
  mazeImg = loadImage("assets/maze.png");
  chestImg = loadImage("assets/chest.png");
}

function setup() {
  createCanvas(800, 800);
  textFont(f);
  textSize(40);
  textAlign(CENTER);
  noStroke();

  // start player in center
  playerX = width / 2;
  playerY = height / 2;

  // chest positions (percentages from old HTML)
  chests = [
    { x: width * 0.485, y: height * 0.24 },
    { x: width * 0.625, y: height * 0.5 },
    { x: width * 0.864, y: height * 0.411 },
    { x: width * 1.005, y: height * 0.58 }
  ];
  collected = [false, false, false, false];
}

function draw() {
  frameRate(10);

  if (hitWall) {
    background(255, 0, 0);
    fill(255);
    text("You've hit the wall! Move back!", width / 2, height / 2);
    return;
  }

  // maze background
  background(255);
  image(mazeImg, 0, 0, width, height);

  // 🔳 Animated grid rectangles (your effect)
  fill(255, 255, 255, 200);
  rect(400, counter, width, 30);
  fill(208, 173, 185, 200);
  rect(counter, 400, 35, height);

  if (counter > height) {
    bgcounter = min(bgcounter + 3, 255);
    counter = 0;
  } else {
    counter += 30;
  }

  // draw chests
  for (let i = 0; i < chests.length; i++) {
    if (!collected[i]) {
      image(chestImg, chests[i].x, chests[i].y, chestSize, chestSize);
    }
  }

  // draw player
  image(pizza, playerX, playerY, playerSize, playerSize);

  // toggle text
  if (redIsBetter) {
    textSize(counterR / 2.5);
    fill(255, 0, 0);
    text("Red is Betta", width / 2, counterR);
    counterR -= 0.75;
    if (counterR < -50) counterR = height;
  } else {
    textSize((counterG + 50) / 3);
    fill(0, 255, 0);
    text("Green is good", width / 2, counterG);
    counterG += 0.5;
    if (counterG > width) counterG = -50;
  }

  // extra circle + rect
  fill(0, 100, value);
  ellipse(700, 700, 150, 150);
  fill((value * 2) % 255, 255, 180);
  rect(700, 700, 90, 90);
}

function mouseMoved() {
  value = (value + 5) % 255;
}

function keyPressed() {
  let nextX = playerX;
  let nextY = playerY;

  if (key === "w") nextY -= playerSize;
  if (key === "s") nextY += playerSize;
  if (key === "a") nextX -= playerSize;
  if (key === "d") nextX += playerSize;

  // wall collision
  let pixel = mazeImg.get(nextX, nextY);
  let isBlack = pixel[0] < 50 && pixel[1] < 50 && pixel[2] < 50;

  if (isBlack) {
    hitWall = true;
    console.log("⚠️ Collision at X:" + nextX + " Y:" + nextY);
  } else {
    playerX = nextX;
    playerY = nextY;
    hitWall = false;
    console.log("✅ Player moved to X:" + playerX + " Y:" + playerY);
  }

  // open chest with O
  if (key === "o" || key === "O") {
    for (let i = 0; i < chests.length; i++) {
      if (
        !collected[i] &&
        dist(playerX, playerY, chests[i].x, chests[i].y) < playerSize / 2
      ) {
        collected[i] = true;
        console.log("🎁 Chest " + (i + 1) + " collected!");
      }
    }
  }

  // toggle red/green text
  if (key === "r") {
    redIsBetter = !redIsBetter;
    console.log("Red mode: " + redIsBetter);
  }
}
