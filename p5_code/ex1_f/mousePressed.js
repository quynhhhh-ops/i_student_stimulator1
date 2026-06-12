function mousePressed() {
  console.log("mousePressed called", mouseX, mouseY);
  if (dist(mouseX, mouseY, 141, 255) < 60) {
    leftEarring = true;
    console.log("Left earring triggered");
  }
  if (dist(mouseX, mouseY, 255, 275) < 60) {
    lowerRightEarring = true;
    console.log("Lower right earring triggered");
  }
  if (dist(mouseX, mouseY, 256, 255) < 60) {
    upperRightEarring = true;
    console.log("Upper right earring triggered");
  }
}
