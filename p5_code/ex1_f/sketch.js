function setup() {
  createCanvas(600, 600);
  background(255);
  fill(255);
  // The grid is now drawn in draw()
}
//<!--––––––––––––––––––––––BELOW_NEEDS_EDITING–––––––––––––––––––––-->

let r = 0;
let leftEarring = false;
let rightEarrings = false;
function draw() {




  if (frameCount % 5 === 0) { // every 30 frames (~0.5 sec at 60fps)
    r = random(100);
  }
  let m = mouseX;
  console.log(m + " " + r);
  // Fade background from pink to green as mouse moves right
  let pink = color('#d0adb9'); // custom pink
  let green = color(190, 207, 145); // custom green
  let amt = constrain(m / width, 0, 1);
  let bgCol = lerpColor(pink, green, amt);
  background(bgCol);


  // Draw green-pink checkered rectangles (semi-transparent)
  noStroke();
  for (let i = 0; i < height; i += 20) {
    fill(190, 207, 145, 100); // green with alpha
    rect(0, i, width, 10);
    fill(208, 173, 185, 100); // pink with alpha
    rect(i, 0, 10, height);
  }

  // Draw sparkling grid of small rectangles on top
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      let rr = random(255);
      let gg = random(255);
      let bb = random(255);
      fill(rr, gg, bb, 100); // colorful glitter with alpha for blending
      rect(i + 5, j + 5, 10, 10);
      // console.log("this has a greyscale value of" + rand);
    }
  }
  if (m < width / 2) {
    if (mouseY < height / 2) {
      ellipse(m, mouseY, r * 5, r * 2);
    } else {
      ellipse(m, mouseY, r * 3, r * 4);
    }
  } else {
    if (mouseY < height / 2) {
      ellipse(m, height / 2, r * 2, r * 5);
    } else {
      ellipse(m, height / 2, r * 4, r * 3);
    }
  }

  function face(x, y) {
    push();
    translate(x, y);
    // Hair - back
    fill(120, 20, 40);
    noStroke();
    beginShape();
    vertex(130, 130);
    bezierVertex(100, 200, 90, 320, 140, 380);
    bezierVertex(200, 370, 210, 420, 260, 380);
    bezierVertex(310, 300, 300, 200, 270, 130);
    endShape(CLOSE);

    // Face
    fill(255, 220, 180);
    ellipse(200, 200, 140, 160);

    // Hair bangs (front) - fuller
    fill(120, 20, 40);
    arc(200, 145, 140, 90, PI, 0, CHORD);
    ellipse(200, 160, 140, 60); // moved to middle!
    ellipse(240, 150, 40, 60);

    // Eyes (static whites)
    fill(255);
    ellipse(170, 230, 30, 30); // Left
    ellipse(230, 230, 30, 30); // Right

    if (mouseX > 150 && mouseX < 190) {
      // Eyes (inner)
      fill(0);
      ellipse(mouseX, 230, 10, 30); // Left
      ellipse(mouseX + 60, 230, 10, 30); // Right
    } else {
      fill(0)
      ellipse(150, 230, 10, 30); // Left
      ellipse(150 + 60, 230, 10, 30); // Right
    }
    // Nose
      noStroke();
      fill(100, 70, 50);
      ellipse(200, 240, 3, 3);

      // Mouth
      noFill();
      stroke(200, 50, 80);
      strokeWeight(2);
      arc(200, 255, 30, 15, 0, PI);
    pop();
  }
  face(250, 60);
  face(-60, 51);

  // // Hair - back
  // fill(120, 20, 40);
  // noStroke();
  // beginShape();
  // vertex(130, 130);
  // bezierVertex(100, 200, 90, 320, 140, 380);
  // bezierVertex(200, 370, 210, 420, 260, 380);
  // bezierVertex(310, 300, 300, 200, 270, 130);
  // endShape(CLOSE);

  // // Face
  // fill(255, 220, 180);
  // ellipse(200, 200, 140, 160);

  // // Hair bangs (front) - fuller
  // fill(120, 20, 40);
  // arc(200, 145, 140, 90, PI, 0, CHORD);
  // ellipse(200, 160, 140, 60); // moved to middle!
  // ellipse(240, 150, 40, 60);

  // // Eyes (static whites)
  // fill(255);
  // ellipse(170, 230, 30, 30); // Left
  // ellipse(230, 230, 30, 30); // Right

  // if (mouseX > 150 && mouseX < 190) {
  //   // Eyes (inner)
  //   fill(0);
  //   ellipse(mouseX, 230, 10, 30); // Left
  //   ellipse(mouseX + 60, 230, 10, 30); // Right
  // } else {
  //   fill(0)
  //   ellipse(150, 230, 10, 30); // Left
  //   ellipse(150 + 60, 230, 10, 30); // Right

  //   // Nose
  //   noStroke();
  //   fill(100, 70, 50);
  //   ellipse(200, 240, 3, 3);

  //   // Mouth
  //   noFill();
  //   stroke(200, 50, 80);
  //   strokeWeight(2);
  //   arc(200, 255, 30, 15, 0, PI);
  // }


  //<!--––––––––––––––––––––––BELOW_NEEDS_HELP_FIXING–––––––––––––––––––––-->

  // Persistent earrings using flags
  if (leftEarring) {
    fill(255, 221, 0);
    ellipse(141, 255, 10, 20); // Left
  }
  if (rightEarrings) {
    fill(255, 221, 0);
    ellipse(255, 275, 10, 20); // Lower right
    ellipse(256, 255, 3, 15); // Upper right
  }
  // Mouse click handler for persistent earrings
  function mousePressed() {
    // Left earring only
    if (dist(mouseX, mouseY, 141, 255) < 30) {
      leftEarring = true;
    }
    // Either right earring triggers both right earrings
    if (dist(mouseX, mouseY, 255, 275) < 30 || dist(mouseX, mouseY, 256, 255) < 30) {
      rightEarrings = true;
    }
  }

}


