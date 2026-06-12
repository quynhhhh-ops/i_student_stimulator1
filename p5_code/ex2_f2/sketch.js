
let gameState = 'start';
let maze;
let playerPos;
let goalPos;

let gridSize = 40;
let moves = 0;
let showInstructions = false;

let playerImg, wallImg, goalImg;
let gameFont;

let bgColor, wallColor, pathColor, titleColor;

function preload() {
  playerImg = loadImage('assets/images/chest.png');
  wallImg = loadImage('assets/images/maze.png');
  goalImg = loadImage('assets/images/chest.png');
  gameFont = loadFont('assets/space_age.otf');
}

function setup() {
  createCanvas(480, 480);
  
  bgColor = color(25, 25, 50);
  titleColor = color('#FFD700');
  
  textFont(gameFont);
  
  resetGame();
  
  console.log("Game setup complete. Current state: " + gameState);
}

function draw() {
  background(bgColor);
  
  switch (gameState) {
    case 'start':
      drawStartScreen();
      break;
    case 'playing':
      drawGame();
      break;
    case 'win':
      drawWinScreen();
      break;
  }
  
  if (showInstructions) {
    drawInstructions();
  }
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  
  textSize(40);
  fill(titleColor);
  text("MAZE RUNNER", width / 2, height / 3);
  
  textSize(16);
  fill(255);
  
  if (frameCount % 60 < 30) {
    text("Click to Start", width / 2, height / 2);
  }
  
  text("Press 'H' for help", width / 2, height / 2 + 50);
}

function drawGame() {
  rectMode(CORNER);
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      let currentTile = maze[y][x];
      if (currentTile === 1) {
        image(wallImg, x * gridSize, y * gridSize, gridSize, gridSize);
      } else {
        if ((x + y) % 2 === 0) {
           fill(50, 50, 80);
        } else {
           fill(60, 60, 90);
        }
        noStroke();
        rect(x * gridSize, y * gridSize, gridSize, gridSize);
      }
    }
  }
  
  image(goalImg, goalPos.x * gridSize, goalPos.y * gridSize, gridSize, gridSize);
  image(playerImg, playerPos.x * gridSize, playerPos.y * gridSize, gridSize, gridSize);
  
  textSize(16);
  fill(255);
  textAlign(LEFT, TOP);
  text("Moves: " + moves, 10, 10);
}

function drawWinScreen() {
  textAlign(CENTER, CENTER);
  
  colorMode(HSB, 360, 100, 100);
  let rainbowColor = color((frameCount * 2) % 360, 90, 100);
  fill(rainbowColor);
  
  textSize(60);
  text("YOU WIN!", width / 2, height / 3);
  
  colorMode(RGB);
  
  fill(255);
  textSize(20);
  text("Total Moves: " + moves, width / 2, height / 2);
  text("Press ENTER to play again", width / 2, height / 2 + 50);
}

function drawInstructions() {
    let overlayColor = color(0, 0, 0, 200);
    fill(overlayColor);
    rectMode(CORNER);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("How to Play", width / 2, 100);
    textSize(16);
    text("Use Arrow Keys or WASD to move.", width / 2, 180);
    text("Reach the glowing gem to win!", width / 2, 210);
    text("Press 'H' again to close this screen.", width / 2, 280);
}


function keyPressed() {
  if (gameState === 'playing') {
    let nextPos = playerPos.copy();
    
    if (keyCode === UP_ARROW || key === 'w') {
      nextPos.y -= 1;
    } else if (keyCode === DOWN_ARROW || key === 's') {
      nextPos.y += 1;
    } else if (keyCode === LEFT_ARROW || key === 'a') {
      nextPos.x -= 1;
    } else if (keyCode === RIGHT_ARROW || key === 'd') {
      nextPos.x += 1;
    }

    if (
      nextPos.x >= 0 && nextPos.x < maze[0].length &&
      nextPos.y >= 0 && nextPos.y < maze.length &&
      maze[nextPos.y][nextPos.x] !== 1
    ) {
      playerPos = nextPos;
      moves++;
      console.log("Player moved to: " + playerPos.x + ", " + playerPos.y);
    }
    
    if (playerPos.equals(goalPos)) {
        gameState = 'win';
        console.log("Goal Reached! Changing state to: " + gameState);
    }

  } else if (gameState === 'win' && keyCode === ENTER) {
    resetGame();
  }
  
  if (key === 'h' || key === 'H') {
      showInstructions = !showInstructions;
  }
}

function mousePressed() {
  if (gameState === 'start') {
    gameState = 'playing';
  }
}

function resetGame() {
  maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  playerPos = createVector(1, 1);
  goalPos = createVector(10, 10);
  
  moves = 0;
  gameState = 'start';
}

