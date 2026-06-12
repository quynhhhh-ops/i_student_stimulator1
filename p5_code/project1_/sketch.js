

let currentkey = '1';

let bgc ;

let gkcount;

let hsvOn;
let sizeScalar;
const MIN_SIZE = 0.2;
const MAX_SIZE = 5;

let qnSpacing;
let qnResidual;

// Fixed palette in HSB (converted from provided hex/rgb)
// D0ADB9 (pink-ish) -> approx HSB(340, 21, 82)
// rgb(190,207,145) (light green) -> approx HSB(79, 30, 81)
// light brown -> approx HSB(30, 35, 70)
const QN_PALETTE = {
  pink: { h: 340, s: 21, b: 82 },
  green: { h: 79, s: 30, b: 81 },
  brown: { h: 30, s: 35, b: 70 }
};

function qnFillColor(name, bAdjust = 0, alpha = 100) {
  const c = QN_PALETTE[name];
  const b = constrain(c.b + bAdjust, 0, 100);
  fill(c.h, c.s, b, alpha);
}

function qnStrokeColor(name, bAdjust = 0, alpha = 100) {
  const c = QN_PALETTE[name];
  const b = constrain(c.b + bAdjust, 0, 100);
  stroke(c.h, c.s, b, alpha);
}

// Color cycle state
let qnColors = ['pink', 'green', 'brown'];
let qnColorIdx = 0;

function setup() {
    createCanvas(800, 600);
    colorMode(HSB, 360, 100, 100, 100);
    background(255);
    smooth();
    bgc = color(255);
    gkcount = 20;
    hsvOn = true;
    sizeScalar = 1;
    qnSpacing = 20;
    qnResidual = 0;
}

function draw() {
    // triggering the clear_print function
    if( keyIsPressed) {
    clear_print();
}
// triggering the newkeychoice
if(mouseIsPressed) {
  drawChoice();
}


}


function drawChoice() {
  // the key mapping if statemens that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of
  // graphic function


 // key global variable contains whatever key was last pressed
 let currentkey = key;

switch(currentkey) {
case 'l':
case 'L':
  console.log("l");  // black line
  drawline(color(0), mouseX, mouseY, pmouseX, pmouseY);
  break;
case 'e':
case 'E':
  console.log("e");  // erase with bg color
  eraser(bgc,mouseX, mouseY,25 * sizeScalar);
  break;
case 'o': // qnOrbitBrush
case 'O':
  qnOrbitBrush(hsvOn ? (frameCount % 360) : 0, 200 * sizeScalar, 8, 6);
  break;
case 'c': // qnCloudBrush
case 'C':
  qnCloudBrush(12, 8, 40, 60);
  break;
case 'b': // qnBurst
case 'B':
  qnBurst();
  break;
case '0': // cycle palette color
  qnColorIdx = (qnColorIdx + 1) % qnColors.length;
  break;
// size controls handled in keyPressed() for consistency

default:             // Default executes if the case labels
  console.log("None");   // don't match the switch parameter
  break;
}

}

function drawline( k,  lx, ly,  px, py) {
 // strokeWeight(1);
  stroke(k);
  line(lx, ly, px, py);
  console.log(mouseX);
  console.log(pmouseX);
}

function drawFatLine( k,  lx, ly,  px, py) {
  strokeWeight(10);
  stroke(k);
  line(lx, ly, px, py);
}

function steveRanBrush(kcount, lx, ly,  px, py) {

  strokeWeight(random(1,35));
  stroke(0,kcount,0);
  //image(b,lx,ly, 30,30);
  line(lx, ly, px, py);
}



function eraser( k, lx, ly, sz) {
  noStroke();
  fill(k);
  ellipse(lx, ly, sz,sz);
}


function clear_print() {

// these 2 options let you choose between clearing the background
// and saveing the current image as a file.
  if (key == 'x' || key == 'X') {
     background(255);
  } else if (key == 'p' || key == 'P') {
    // saveFrames('paintImage', 'png', 1, 25, data => {
    // print(data);
  //});
     //this will save the name as the intials and a random counting number.
     // it will always be larger in value then the last one.
     //delay(100);
  }


}

function keyPressed() {
  // Make size controls reliable regardless of mouse press or Shift state
  if (key === '=' || key === '+' || keyCode === 187) {
    sizeScalar = min(MAX_SIZE, sizeScalar + 0.2);
  } else if (key === '-' || key === '_' || keyCode === 189) {
    sizeScalar = max(MIN_SIZE, sizeScalar - 0.2);
  } else if (key === '0' || key === ')' || keyCode === 48) {
    qnColorIdx = (qnColorIdx + 1) % qnColors.length;
  }
}

// qnOrbitBrush(h, r, count, jitter): orbiting dots around the cursor with optional HSV hue
function qnOrbitBrush(h, r, count, jitter) {
  push();
  noStroke();
  const col = qnColors[qnColorIdx];
  for (let i = 0; i < count; i++) {
    const ang = (TWO_PI / count) * i + frameCount * 0.02;
    const jr = r + random(-jitter, jitter);
    const x = mouseX + cos(ang) * jr;
    const y = mouseY + sin(ang) * jr;
    qnFillColor(col, random(-10, 10));
    ellipse(x, y, 6 * sizeScalar, 6 * sizeScalar);
  }
  pop();
}

// qnCloudBrush(clumps, perClump, minSize, maxSize): clustered ellipses around the cursor
function qnCloudBrush(clumps, perClump, minSize, maxSize) {
  push();
  noStroke();
  const col = qnColors[qnColorIdx];
  for (let c = 0; c < clumps; c++) {
    const baseA = random(TWO_PI);
    const baseR = random(5, 35) * sizeScalar;
    const cx = mouseX + cos(baseA) * baseR;
    const cy = mouseY + sin(baseA) * baseR;
    for (let i = 0; i < perClump; i++) {
      const a = random(TWO_PI);
      const r = random(0, 20) * sizeScalar;
      const x = cx + cos(a) * r;
      const y = cy + sin(a) * r;
      const s = random(minSize, maxSize) * sizeScalar * random(0.5, 1.2);
      qnFillColor(col, random(-8, 8), 85); // ~15% more transparent
      ellipse(x, y, s * random(0.7, 1.4), s * random(0.7, 1.4));
    }
  }
  pop();
}

// qnBurst(): emits a trail of outlined circles at fixed spacing along the path
function qnBurst() {
  push();
  const ringSize = 30 * sizeScalar;
  const spacing = ringSize * (1/3); // ~2/3 overlap
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  const segLen = sqrt(dx * dx + dy * dy);
  const col = qnColors[qnColorIdx];
  if (segLen > 0) {
    const ux = dx / segLen;
    const uy = dy / segLen;
    let distAlong = qnResidual;
    while (distAlong <= segLen) {
      const x = pmouseX + ux * distAlong;
      const y = pmouseY + uy * distAlong;
      // fill uses current palette color; outline stays brown
      qnFillColor(col, random(-6, 6));
      qnStrokeColor('brown', -5, 80);
      strokeWeight(2);
      ellipse(x, y, ringSize, ringSize);
      distAlong += spacing;
    }
    qnResidual = distAlong - segLen;
  }
  pop();
}


//
// >20
// >>30
// 35
// 30
// 20
// 10
// 30
// 80
// 100
// 120
// 80
