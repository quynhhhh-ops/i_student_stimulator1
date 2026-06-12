let sceneManager;
let pianoImg, saxophoneImg;
let pianoSound, saxophoneSound, violinSound;
let bg1, bg2, bg3, bg4, bg5;
let gameScore = 0;
let currentRound = 0;
let maxRounds = 5;
let selectedInstrument = '';
let randomSound = '';
let gameStarted = false;

let bonusScore = 0;
let bonusRound = 0;
let bonusMaxRounds = 5;
let bonusSelectedInstrument = '';
let bonusRandomSound = '';
let violinImg;

function preload() {
  soundFormats('mp3', 'ogg');
  pianoSound = loadSound('assets/piano.mp3');
  saxophoneSound = loadSound('assets/saxophone.mp3');
  violinSound = loadSound('assets/violin.mp3');
  
  pianoImg = loadImage('assets/piano.jpg');
  saxophoneImg = loadImage('assets/saxophone.jpg');
  violinImg = loadImage('assets/violin.jpg');
  
  bg1 = loadImage('assets/background.jpg');
  bg2 = loadImage('assets/background.jpg');
  bg3 = loadImage('assets/background.jpg');
  bg4 = loadImage('assets/background.jpg');
  bg5 = loadImage('assets/background.jpg');
}

function setup() {
  console.log("Setup called");
  createCanvas(1200, 800);
  console.log("Canvas created");
  
  sceneManager = new SceneManager(null);
  sceneManager.addScene(SceneTitle);
  sceneManager.addScene(SceneInstructions);
  sceneManager.addScene(SceneGame);
  sceneManager.addScene(SceneScore);
  sceneManager.addScene(SceneQNDemo);
  sceneManager.wire();
  sceneManager.showScene(SceneTitle);
  console.log("SceneManager initialized");
}

function SceneTitle(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
  }
  
  this.draw = function() {
    if (bg1) {
      image(bg1, 0, 0, width, height);
    } else {
      background(255, 184, 212);
    }
    
    fill(101, 67, 33);
    textAlign(CENTER, CENTER);
    textSize(60);
    text('Sound Matching Game', width/2, height/2 - 100);
    
    textSize(24);
    text('Press 2 for Instructions', width/2, height/2);
    text('Press 3 to Start Game', width/2, height/2 + 40);
    text('Press 5 for Bonus Round', width/2, height/2 + 80);
    
    textSize(16);
    text('Navigation: Keys 1-5 to switch scenes', width/2, height - 50);
  }
  
  this.keyPressed = function() {
    if (key === '1') {
      this.sceneManager.showScene(SceneTitle);
    } else if (key === '2') {
      this.sceneManager.showScene(SceneInstructions);
    } else if (key === '3') {
      this.sceneManager.showScene(SceneGame);
    } else if (key === '5') {
      this.sceneManager.showScene(SceneQNDemo);
    }
  }
}

function SceneInstructions(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
  }
  
  this.draw = function() {
    if (bg2) {
      image(bg2, 0, 0, width, height);
      tint(255, 200);
      image(bg2, 0, 0, width, height);
      noTint();
    } else {
      background(255, 184, 212);
    }
    
    fill(101, 67, 33);
    textAlign(CENTER, CENTER);
    textSize(40);
    text('Instructions', width/2, 80);
    
    textSize(20);
    textAlign(LEFT);
    let instructions = [
      '1. Click on either the Piano or Saxophone image',
      '2. A random sound will play (Piano, Saxophone, or Violin)',
      '3. If the sound matches the image you clicked, you score!',
      '4. Game has 5 rounds',
      '5. Try to get the highest score!'
    ];
    
    let startY = 200;
    for (let i = 0; i < instructions.length; i++) {
      text(instructions[i], width/2 - 300, startY + i * 40);
    }
    
    textAlign(CENTER);
    textSize(18);
    text('Press 1: Title | Press 3: Start Game | Press 4: View Scores', width/2, height - 100);
    text('Click anywhere to go to Game', width/2, height - 50);
  }
  
  this.mousePressed = function() {
    this.sceneManager.showScene(SceneGame);
  }
  
  this.keyPressed = function() {
    if (key === '1') {
      this.sceneManager.showScene(SceneTitle);
    } else if (key === '3') {
      this.sceneManager.showScene(SceneGame);
    } else if (key === '4') {
      this.sceneManager.showScene(SceneScore);
    } else if (key === '5') {
      this.sceneManager.showScene(SceneQNDemo);
    }
  }
}

function SceneGame(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
    gameScore = 0;
    currentRound = 0;
    gameStarted = true;
    selectedInstrument = '';
    randomSound = '';
  }
  
  this.draw = function() {
    if (bg3) {
      image(bg3, 0, 0, width, height);
      tint(255, 220);
      image(bg3, 0, 0, width, height);
      noTint();
    } else {
      background(255, 184, 212);
    }
    
    fill(101, 67, 33);
    textAlign(CENTER);
    textSize(32);
    text('Round: ' + (currentRound + 1) + ' / ' + maxRounds, width/2, 50);
    text('Score: ' + gameScore, width/2, 100);
    
    if (currentRound >= maxRounds) {
      textSize(24);
      text('Game Over!', width/2, height/2 - 50);
      text('Press 4 to see your final score', width/2, height/2);
      return;
    }
    
    textSize(20);
    text('Click on an instrument to play a sound!', width/2, 150);
    
    let imgSize = 300;
    let spacing = 100;
    let totalWidth = imgSize * 2 + spacing;
    let startX = (width - totalWidth) / 2;
    let imgY = height/2;
    
    if (pianoImg) {
      image(pianoImg, startX, imgY - imgSize/2, imgSize, imgSize);
    }
    
    if (saxophoneImg) {
      image(saxophoneImg, startX + imgSize + spacing, imgY - imgSize/2, imgSize, imgSize);
    }
    
    if (selectedInstrument !== '') {
      textSize(18);
      fill(101, 67, 33);
      text('You selected: ' + selectedInstrument, width/2, imgY + imgSize/2 + 40);
      if (randomSound !== '') {
        if (selectedInstrument === randomSound) {
          fill(0, 200, 0);
          text('Match! +1 Point', width/2, imgY + imgSize/2 + 70);
        } else {
          fill(200, 0, 0);
          text('No match. Sound was: ' + randomSound, width/2, imgY + imgSize/2 + 70);
        }
      }
    }
    
    textSize(16);
    fill(101, 67, 33);
    text('Press 1: Title | Press 2: Instructions | Press 4: Scores', width/2, height - 30);
  }
  
  this.mousePressed = function() {
    if (currentRound >= maxRounds) {
      return;
    }
    
    let imgSize = 300;
    let spacing = 100;
    let totalWidth = imgSize * 2 + spacing;
    let startX = (width - totalWidth) / 2;
    let imgY = height/2;
    
    let pianoX = startX;
    let pianoY = imgY - imgSize/2;
    let saxX = startX + imgSize + spacing;
    let saxY = imgY - imgSize/2;
    
    if (mouseX >= pianoX && mouseX <= pianoX + imgSize &&
        mouseY >= pianoY && mouseY <= pianoY + imgSize) {
      selectedInstrument = 'piano';
      playRandomSound();
    } else if (mouseX >= saxX && mouseX <= saxX + imgSize &&
               mouseY >= saxY && mouseY <= saxY + imgSize) {
      selectedInstrument = 'saxophone';
      playRandomSound();
    }
  }
  
  this.keyPressed = function() {
    if (key === '1') {
      this.sceneManager.showScene(SceneTitle);
    } else if (key === '2') {
      this.sceneManager.showScene(SceneInstructions);
    } else if (key === '4') {
      this.sceneManager.showScene(SceneScore);
    } else if (key === '5') {
      this.sceneManager.showScene(SceneQNDemo);
    }
  }
}

function playRandomSound() {
  let sounds = ['piano', 'saxophone', 'violin'];
  randomSound = random(sounds);
  
  if (pianoSound.isPlaying()) {
    pianoSound.stop();
  }
  if (saxophoneSound.isPlaying()) {
    saxophoneSound.stop();
  }
  if (violinSound.isPlaying()) {
    violinSound.stop();
  }
  
  if (randomSound === 'piano') {
    pianoSound.play();
  } else if (randomSound === 'saxophone') {
    saxophoneSound.play();
  } else if (randomSound === 'violin') {
    violinSound.play();
    setTimeout(() => {
      if (violinSound.isPlaying()) {
        violinSound.stop();
      }
    }, 1000);
  }
  
  if (selectedInstrument === randomSound) {
    gameScore++;
  }
  
  currentRound++;
  
  if (currentRound >= maxRounds) {
    setTimeout(() => {
      sceneManager.showScene(SceneScore);
    }, 2000);
  }
}

function SceneScore(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
  }
  
  this.draw = function() {
    if (bg4) {
      image(bg4, 0, 0, width, height);
      tint(255, 200);
      image(bg4, 0, 0, width, height);
      noTint();
    } else {
      background(255, 184, 212);
    }
    
    fill(101, 67, 33);
    textAlign(CENTER, CENTER);
    textSize(50);
    text('Final Score', width/2, height/2 - 100);
    
    textSize(80);
    fill(255, 170, 0);
    text(gameScore + ' / ' + maxRounds, width/2, height/2);
    
    textSize(24);
    fill(101, 67, 33);
    text('Press 3 to Play Again', width/2, height/2 + 100);
    text('Press 1 to Return to Title', width/2, height/2 + 140);
    
    textSize(16);
    text('Navigation: Keys 1-5 to switch scenes', width/2, height - 50);
  }
  
  this.keyPressed = function() {
    if (key === '1') {
      this.sceneManager.showScene(SceneTitle);
    } else if (key === '3') {
      this.sceneManager.showScene(SceneGame);
    } else if (key === '5') {
      this.sceneManager.showScene(SceneQNDemo);
    }
  }
  
  this.mousePressed = function() {
    this.sceneManager.showScene(SceneGame);
  }
}

function SceneQNDemo(p) {
  let sprites = [];
  let circles = [];
  
  this.setup = function() {
  }
  
  this.enter = function() {
    bonusScore = 0;
    bonusRound = 0;
    bonusSelectedInstrument = '';
    bonusRandomSound = '';
    
    sprites = [];
    circles = [];
    if (typeof Sprite !== 'undefined') {
      for (let i = 0; i < 15; i++) {
        let sprite = new Sprite(random(50, width-50), random(200, height-100), 30, 30);
        sprite.velocity.x = random(-2, 2);
        sprite.velocity.y = random(-2, 2);
        sprite.color = color(random(200, 255), random(200, 255), random(200, 255), 150);
        sprites.push(sprite);
      }
    } else {
      for (let i = 0; i < 15; i++) {
        circles.push({
          x: random(50, width-50),
          y: random(200, height-100),
          vx: random(-2, 2),
          vy: random(-2, 2),
          c: color(random(200, 255), random(200, 255), random(200, 255), 150)
        });
      }
    }
  }
  
  this.draw = function() {
    if (bg5) {
      image(bg5, 0, 0, width, height);
      tint(255, 200);
      image(bg5, 0, 0, width, height);
      noTint();
    } else {
      background(255, 184, 212);
    }
    
    if (typeof Sprite !== 'undefined' && sprites.length > 0) {
      for (let sprite of sprites) {
        if (sprite.x < 20 || sprite.x > width - 20) {
          sprite.velocity.x *= -1;
        }
        if (sprite.y < 200 || sprite.y > height - 20) {
          sprite.velocity.y *= -1;
        }
        sprite.x = constrain(sprite.x, 20, width - 20);
        sprite.y = constrain(sprite.y, 200, height - 20);
      }
    } else {
      for (let circle of circles) {
        circle.x += circle.vx;
        circle.y += circle.vy;
        
        if (circle.x < 20 || circle.x > width - 20) {
          circle.vx *= -1;
        }
        if (circle.y < 200 || circle.y > height - 20) {
          circle.vy *= -1;
        }
        circle.x = constrain(circle.x, 20, width - 20);
        circle.y = constrain(circle.y, 200, height - 20);
        
        fill(circle.c);
        noStroke();
        ellipse(circle.x, circle.y, 30, 30);
      }
    }
    
    fill(101, 67, 33);
    textAlign(CENTER);
    textSize(40);
    text('BONUS ROUND', width/2, 50);
    
    textSize(20);
    fill(255, 200, 0);
    text('p5.play Library: Animated background sprites', width/2, 85);
    
    fill(101, 67, 33);
    textSize(32);
    text('Round: ' + (bonusRound + 1) + ' / ' + bonusMaxRounds, width/2, 130);
    text('Score: ' + bonusScore, width/2, 170);
    
    if (bonusRound >= bonusMaxRounds) {
      textSize(24);
      text('Bonus Round Over!', width/2, height/2 - 50);
      text('Press 1 to return to Title', width/2, height/2);
      return;
    }
    
    textSize(20);
    text('Click on an instrument to play a sound!', width/2, 210);
    
    let imgSize = 250;
    let spacing = 50;
    let totalWidth = imgSize * 3 + spacing * 2;
    let startX = (width - totalWidth) / 2;
    let imgY = height/2 + 50;
    
    if (pianoImg) {
      image(pianoImg, startX, imgY - imgSize/2, imgSize, imgSize);
    }
    
    if (saxophoneImg) {
      image(saxophoneImg, startX + imgSize + spacing, imgY - imgSize/2, imgSize, imgSize);
    }
    
    if (violinImg) {
      image(violinImg, startX + (imgSize + spacing) * 2, imgY - imgSize/2, imgSize, imgSize);
    }
    
    if (bonusSelectedInstrument !== '') {
      textSize(18);
      fill(101, 67, 33);
      text('You selected: ' + bonusSelectedInstrument, width/2, imgY + imgSize/2 + 40);
      if (bonusRandomSound !== '') {
        if (bonusSelectedInstrument === bonusRandomSound) {
          fill(0, 200, 0);
          text('Match! +1 Point', width/2, imgY + imgSize/2 + 70);
        } else {
          fill(200, 0, 0);
          text('No match. Sound was: ' + bonusRandomSound, width/2, imgY + imgSize/2 + 70);
        }
      }
    }
    
    textSize(16);
    fill(101, 67, 33);
    text('Press 1: Title | Press 2: Instructions | Press 3: Main Game', width/2, height - 30);
  }
  
  this.mousePressed = function() {
    if (bonusRound >= bonusMaxRounds) {
      return;
    }
    
    let imgSize = 250;
    let spacing = 50;
    let totalWidth = imgSize * 3 + spacing * 2;
    let startX = (width - totalWidth) / 2;
    let imgY = height/2 + 50;
    
    let pianoX = startX;
    let pianoY = imgY - imgSize/2;
    let saxX = startX + imgSize + spacing;
    let saxY = imgY - imgSize/2;
    let violinX = startX + (imgSize + spacing) * 2;
    let violinY = imgY - imgSize/2;
    
    if (mouseX >= pianoX && mouseX <= pianoX + imgSize &&
        mouseY >= pianoY && mouseY <= pianoY + imgSize) {
      bonusSelectedInstrument = 'piano';
      playBonusRandomSound();
    } else if (mouseX >= saxX && mouseX <= saxX + imgSize &&
               mouseY >= saxY && mouseY <= saxY + imgSize) {
      bonusSelectedInstrument = 'saxophone';
      playBonusRandomSound();
    } else if (mouseX >= violinX && mouseX <= violinX + imgSize &&
               mouseY >= violinY && mouseY <= violinY + imgSize) {
      bonusSelectedInstrument = 'violin';
      playBonusRandomSound();
    }
  }
  
  this.keyPressed = function() {
    if (key === '1') {
      this.sceneManager.showScene(SceneTitle);
    } else if (key === '2') {
      this.sceneManager.showScene(SceneInstructions);
    } else if (key === '3') {
      this.sceneManager.showScene(SceneGame);
    } else if (key === '5') {
      this.sceneManager.showScene(SceneQNDemo);
    }
  }
}

function playBonusRandomSound() {
  let sounds = ['piano', 'saxophone', 'violin'];
  bonusRandomSound = random(sounds);
  
  if (pianoSound.isPlaying()) {
    pianoSound.stop();
  }
  if (saxophoneSound.isPlaying()) {
    saxophoneSound.stop();
  }
  if (violinSound.isPlaying()) {
    violinSound.stop();
  }
  
  if (bonusRandomSound === 'piano') {
    pianoSound.play();
  } else if (bonusRandomSound === 'saxophone') {
    saxophoneSound.play();
  } else if (bonusRandomSound === 'violin') {
    violinSound.play();
    setTimeout(() => {
      if (violinSound.isPlaying()) {
        violinSound.stop();
      }
    }, 1000);
  }
  
  if (bonusSelectedInstrument === bonusRandomSound) {
    bonusScore++;
  }
  
  bonusRound++;
  
  if (bonusRound >= bonusMaxRounds) {
    setTimeout(() => {
      sceneManager.showScene(SceneTitle);
    }, 2000);
  }
}

