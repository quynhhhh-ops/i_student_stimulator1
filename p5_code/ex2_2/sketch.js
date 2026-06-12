// --- GLOBAL VARIABLES ---
// Requirement: global vs local variables (1.2.1)
// These variables are global to be accessed across all functions (setup, draw, keyPressed, etc.).

let gameState = 'start'; // Keeps track of the game state (start, playing, win)
let maze; // 2D array to hold the maze structure
let playerPos; // p5.Vector to store player's grid coordinates
let goalPos; // p5.Vector for the goal's position

let gridSize = 40; // Size of each grid cell in pixels
let moves = 0; // Counts player moves
let showInstructions = false; // For toggle logic

// Asset variables
// Requirement: Complex data types (images and fonts) (1.2.4, 1.2.5)
let playerImg, wallImg, goalImg;
let gameFont;

// Color variables
// Requirement: The color class (object)
let bgColor, wallColor, pathColor, titleColor;

// --- PRELOAD ASSETS ---
// p5.js function that runs before setup()
function preload() {
  // Requirement: image class & font class (loadImage, loadFont)
  // NOTE: You must have these files in a 'data' folder for this to work!
  playerImg = loadImage('assets/extra_a.png');
  wallImg = loadImage('assets/maze.png');
  goalImg = loadImage('assets/chest.png');
  gameFont = loadFont('assets/space_age.otf');
}

// --- SETUP SKETCH ---
// Runs once at the beginning
function setup() {
  createCanvas(480, 480);
  
  // Define colors using the color() object
  bgColor = color(25, 25, 50); // Dark blue
  titleColor = color('#FFD700'); // Gold color using hex
  
  // Requirement: textFont()
  textFont(gameFont);
  
  // Requirement: Using global variable to keep track of states to reset (1.2.1, 1.2.2)
  resetGame();
  
  // Requirement: Concatenation and the use of console.log (1.1.1, 1.1.3, 1.1.4)
  console.log("Game setup complete. Current state: " + gameState);
}

// --- DRAW LOOP ---
// Runs continuously
function draw() {
  background(bgColor);
  
  // Requirement: The use of the switch statement (1.2.6)
  // This switch manages what is drawn based on the current gameState.
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
  
  // Requirement: Toggle logic with if statements and global vars (1.2.3)
  // This logic is independent of the game state and can be toggled anytime.
  if (showInstructions) {
    drawInstructions();
  }
}

// --- DRAWING FUNCTIONS ---

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  
  // Title
  textSize(40);
  fill(titleColor);
  text("MAZE RUNNER", width / 2, height / 3);
  
  // Instructions
  textSize(16);
  fill(255);
  
  // Requirement: Use of the modulo operator (%)
  // Creates a simple flashing effect for the text.
  if (frameCount % 60 < 30) {
    text("Click to Start", width / 2, height / 2);
  }
  
  text("Press 'H' for help", width / 2, height / 2 + 50);
}

function drawGame() {
  // Requirement: creating a grid based positioning system (1.2.6)
  // The nested loops draw the maze based on the 2D array.
  rectMode(CORNER);
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      let currentTile = maze[y][x];
      if (currentTile === 1) { // Wall
        image(wallImg, x * gridSize, y * gridSize, gridSize, gridSize);
      } else { // Path
        // Using modulo for a checkerboard floor pattern
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
  
  // Draw Goal and Player
  image(goalImg, goalPos.x * gridSize, goalPos.y * gridSize, gridSize, gridSize);
  image(playerImg, playerPos.x * gridSize, playerPos.y * gridSize, gridSize, gridSize);
  
  // Display moves counter
  // Requirement: Concatenation to display text
  textSize(16);
  fill(255);
  textAlign(LEFT, TOP);
  text("Moves: " + moves, 10, 10);
}

function drawWinScreen() {
  textAlign(CENTER, CENTER);
  
  // Requirement: colorMode to switch color systems to HSB
  colorMode(HSB, 360, 100, 100);
  // Using frameCount to cycle through hues for a rainbow effect
  let rainbowColor = color((frameCount * 2) % 360, 90, 100);
  fill(rainbowColor);
  
  textSize(60);
  text("YOU WIN!", width / 2, height / 3);
  
  // Switch back to RGB to not affect other parts of the code
  colorMode(RGB, 255, 255, 255);
  
  fill(255);
  textSize(20);
  text("Total Moves: " + moves, width / 2, height / 2);
  text("Press ENTER to play again", width / 2, height / 2 + 50);
}

function drawInstructions() {
    // A local variable, only used within this function
    let overlayColor = color(0, 0, 0, 200); // semi-transparent black
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


// --- EVENT HANDLERS ---

// Requirement: key events and properties: keyPressed(), keyCode, key
function keyPressed() {
  if (gameState === 'playing') {
    let nextPos = playerPos.copy();
    
    // Move based on key code
    if (keyCode === UP_ARROW || key === 'w') {
      nextPos.y -= 1;
    } else if (keyCode === DOWN_ARROW || key === 's') {
      nextPos.y += 1;
    } else if (keyCode === LEFT_ARROW || key === 'a') {
      nextPos.x -= 1;
    } else if (keyCode === RIGHT_ARROW || key === 'd') {
      nextPos.x += 1;
    }

    // --- Collision Detection ---
    // Requirement: The use of && (and)
    // Checks if the next position is BOTH within the maze boundaries AND not a wall.
    if (
      nextPos.x >= 0 && nextPos.x < maze[0].length &&
      nextPos.y >= 0 && nextPos.y < maze.length &&
      maze[nextPos.y][nextPos.x] !== 1
    ) {
      playerPos = nextPos;
      moves++; // Increment move counter
      console.log("Player moved to: " + playerPos.x + ", " + playerPos.y);
    }
    
    // --- Win Condition Check ---
    if (playerPos.equals(goalPos)) {
        gameState = 'win';
        console.log("Goal Reached! Changing state to: " + gameState);
    }

  } else if (gameState === 'win' && keyCode === ENTER) {
    resetGame();
  }
  
  // Toggle instructions on/off with 'h' key
  if (key === 'h' || key === 'H') {
      showInstructions = !showInstructions; // Toggles the boolean value
  }
}

// Requirement: Mouse event and properties: mousePressed(), mouseX, mouseY
function mousePressed() {
  // Use a simple click anywhere to start
  if (gameState === 'start') {
    gameState = 'playing';
  }
}

// --- HELPER FUNCTIONS ---

function resetGame() {
  // Define the maze layout
  // 0 = path, 1 = wall
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

  // Set initial player and goal positions
  playerPos = createVector(1, 1);
  goalPos = createVector(10, 10);
  
  // Reset game state variables
  moves = 0;
  gameState = 'start';
}

