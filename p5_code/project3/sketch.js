var qobj,aobj;
var btn1,btn2,btn3,btn4;
var head;
var p1;
var counter = 0;

let gridarr1 ;


 
let font1;
let images =[];

let currentPage = 0;
let boardImage;
let titleBackgroundImage;
let bouncingShapes = [];
let lastColorChange = 0;
let currentColorIndex = 0;
let pieChartRotation = 0;
let page2Shapes = [];
const shapeColors = [
  [255, 153, 193],
  [137, 177, 95],
  [255, 170, 0],
  [238, 238, 153],
  [207, 177, 255],
  [146, 180, 255]
];

function preload()  {
       console.log("Preload started");
       qobj = loadJSON("questions_converted.json", function(data) {
         console.log("JSON loaded successfully:", data);
       }, function(error) {
         console.error("Error loading JSON:", error);
       });
       titleBackgroundImage = loadImage("../../images/p3_2.jpg");
  }

function setup() {
     console.log("Setup called");
     createCanvas(1200, 850);
 
     background(0);
     fill(100);
     textAlign(LEFT);
     if (font1) {
       textFont(font1);
     }
     console.log("Canvas created, qobj:", qobj);
     
     if (canvas && canvas.elt) {
       canvas.elt.setAttribute('tabindex', '0');
       canvas.elt.style.outline = 'none';
       canvas.elt.focus();
     }
     
     window.addEventListener('keydown', handleGlobalKey);
}


function draw() {
    background(255, 184, 212);
    
    if (!qobj) {
      fill(101, 67, 33);
      textSize(20);
      textAlign(CENTER);
      text("Loading data... Press any key to test", width/2, height/2);
      fill(101, 67, 33);
      textSize(16);
      text("Current page: " + currentPage, width/2, height/2 + 30);
      return;
    }
    
    if (currentPage == 0) {
          if (titleBackgroundImage) {
            tint(255, 255, 255, 128);
            image(titleBackgroundImage, 0, 0, width, height);
            noTint();
          } else {
            fill(255, 184, 212);
            rect(0, 0, width, height);
          }
      push();
        translate(60,100);
        fill(101, 67, 33);
        textSize(40);
        text ('Name: ' + qobj.group_member + " \n Group: " + qobj.group_name,0 ,0,800 );
        textSize(35);
        translate(740,0);
        fill(101, 67, 33);
        text ("My group's members \n were Aryel A, \n Ariana M, \n and Puck ",0 ,0, 800 );
      

        pop();



    } else if (currentPage == 1) {
      noTint();
      if (boardImage) {
        image(boardImage,10,10,width-20,height-20);
      } else {
        fill(255, 184, 212);
        rect(10, 10, width-20, height-20);
      }
     

      push();
      translate(100,30);
      fill(101, 67, 33);
      textSize(18);
      let t = "Page 1: Original Mapped Group \n";
      t+=  "Group questions and how the group responded on the question board. ";
      text(t,0,0,400);
      pop();

      push();
      translate(100,130);
      drawGroupData();
      pop();
 

    } else if (currentPage == 2) {
      background(255, 184, 212);

      if (page2Shapes.length == 0) {
        initializePage2Shapes();
      }
      
      updatePage2Shapes();
      
      pieChartRotation += 0.005;

      push();
      translate(50, 50);
      fill(101, 67, 33);
      textSize(20);
      text("Page 2: Solo Mapped Questions", 0, 0);
      textSize(16);
      text("All 6 questions visualized with individual solo responses.", 0, 35, 1000);
      pop();

      push();
      translate(100,130);
      drawSoloData();
      pop();
 
    } else if (currentPage == 3) {
      background(255, 184, 212);
      
      let qarr = qobj.Qset;
      let agarr = qobj.Agset;
      let asarr = qobj.Asoloset;
      
      let selectedQ = 0;
      let q = qarr[selectedQ];
      let at = q.Qanswertype;
      let ad = q.answerdata;
      let qc = q.qcolor;
      
      if (bouncingShapes.length == 0) {
        initializeBouncingShapes(qarr, agarr, asarr, selectedQ, at, ad);
        lastColorChange = millis();
      }
      
      if (millis() - lastColorChange > 1000) {
        currentColorIndex = (currentColorIndex + 1) % shapeColors.length;
        lastColorChange = millis();
      }
      
      updateBouncingShapes();
      drawBouncingShapes(q, at, ad);
      
      push();
      translate(50, 50);
      fill(101, 67, 33);
      textSize(20);
      text("Page 3: Remapped Visualization", 0, 0);
      textSize(16);
      text("Question: " + q.Question, 0, 35, 1000);
      pop();



    } 

      
    


}


function mousePressed() {
  if (canvas && canvas.elt) {
    canvas.elt.focus();
  }
}

function handleGlobalKey(event) {
  let keyValue = event.key;
  let keyCodeValue = event.keyCode || event.which;
  
  console.log("Global key handler - key:", keyValue, "keyCode:", keyCodeValue);
  
  if (keyValue === '1' || keyCodeValue === 49 || keyCodeValue === 97) {
    console.log("Global: Setting page to 1");
    currentPage = 1;
    event.preventDefault();
    if (canvas && canvas.elt) {
      canvas.elt.focus();
    }
  } else if (keyValue === '2' || keyCodeValue === 50 || keyCodeValue === 98) {
    console.log("Global: Setting page to 2");
    currentPage = 2;
    event.preventDefault();
    if (canvas && canvas.elt) {
      canvas.elt.focus();
    }
  } else if (keyValue === '3' || keyCodeValue === 51 || keyCodeValue === 99) {
    console.log("Global: Setting page to 3");
    currentPage = 3;
    event.preventDefault();
    if (canvas && canvas.elt) {
      canvas.elt.focus();
    }
  } else {
    console.log("Global: Setting page to 0");
    currentPage = 0;
    event.preventDefault();
    if (canvas && canvas.elt) {
      canvas.elt.focus();
    }
  }
}

function keyPressed() {
    console.log("p5 keyPressed - key:", key, "keyCode:", keyCode, "currentPage:", currentPage);
    
    if (canvas && canvas.elt) {
      canvas.elt.focus();
    }
    
    if (key === '1' || keyCode === 49 || keyCode === 97) {
      console.log("Setting page to 1");
      currentPage = 1;
    } else if (key === '2' || keyCode === 50 || keyCode === 98) {
      console.log("Setting page to 2");
      currentPage = 2;
    } else if (key === '3' || keyCode === 51 || keyCode === 99) {
      console.log("Setting page to 3");
      currentPage = 3;
    } else {
      console.log("Setting page to 0");
      currentPage = 0;
    }
    
    console.log("New currentPage:", currentPage);
    
    if (currentPage != 3) {
      bouncingShapes = [];
      lastColorChange = 0;
      currentColorIndex = 0;
    }
    
    if (currentPage != 2) {
      page2Shapes = [];
    }
    
    return false;
}

function initializeBouncingShapes(qarr, agarr, asarr, selectedQ, at, ad) {
  bouncingShapes = [];
  
  if (at == "boolean") {
    let groupAns = agarr[selectedQ];
    bouncingShapes.push({
      x: 200,
      y: 170,
      speedx: random(2, 4),
      speedy: 0,
      shape: groupAns == 0 ? "circle" : "square",
      size: 80,
      soloAns: groupAns,
      isGroup: true
    });
  } else if (at == "scale") {
    let groupAns = agarr[selectedQ];
    bouncingShapes.push({
      x: 200,
      y: 170,
      speedx: random(2, 4),
      speedy: 0,
      shape: "bar",
      size: groupAns * 15,
      soloAns: groupAns,
      isGroup: true
    });
  } else if (at == "multi") {
    let groupAns = agarr[selectedQ];
    bouncingShapes.push({
      x: 200,
      y: 170,
      speedx: random(2, 4),
      speedy: 0,
      shape: "circle",
      size: 80,
      soloAns: groupAns,
      isGroup: true
    });
  }
  
  let individualBoxMinX = 100;
  let individualBoxMaxX = width - 100;
  let individualBoxMinY = 300;
  let individualBoxMaxY = height - 50;
  
  for (let i = 0; i < asarr.length && i < 15; i++) {
    let soloAns = asarr[i][selectedQ];
    let startX = random(individualBoxMinX + 50, individualBoxMaxX - 50);
    let startY = random(individualBoxMinY + 50, individualBoxMaxY - 50);
    
    if (at == "boolean") {
      bouncingShapes.push({
        x: startX,
        y: startY,
        speedx: random(-2, 2),
        speedy: random(-2, 2),
        shape: soloAns == 0 ? "circle" : "square",
        size: 40,
        soloAns: soloAns,
        isGroup: false,
        boxMinX: individualBoxMinX,
        boxMaxX: individualBoxMaxX,
        boxMinY: individualBoxMinY,
        boxMaxY: individualBoxMaxY
      });
    } else if (at == "scale") {
      bouncingShapes.push({
        x: startX,
        y: startY,
        speedx: random(-2, 2),
        speedy: random(-2, 2),
        shape: "bar",
        size: soloAns * 4,
        soloAns: soloAns,
        isGroup: false,
        boxMinX: individualBoxMinX,
        boxMaxX: individualBoxMaxX,
        boxMinY: individualBoxMinY,
        boxMaxY: individualBoxMaxY
      });
    } else if (at == "multi") {
      bouncingShapes.push({
        x: startX,
        y: startY,
        speedx: random(-2, 2),
        speedy: random(-2, 2),
        shape: "circle",
        size: 35,
        soloAns: soloAns,
        isGroup: false,
        boxMinX: individualBoxMinX,
        boxMaxX: individualBoxMaxX,
        boxMinY: individualBoxMinY,
        boxMaxY: individualBoxMaxY
      });
    }
  }
}

function updateBouncingShapes() {
  let margin = 60;
  let minX = margin;
  let maxX = width - margin;
  
  for (let i = 0; i < bouncingShapes.length; i++) {
    let s = bouncingShapes[i];
    let halfSize = s.size / 2;
    
    s.x += s.speedx;
    if (!s.isGroup) {
      s.y += s.speedy;
    }
    
    if (s.isGroup) {
      if (s.x - halfSize < minX || s.x + halfSize > maxX) {
        s.speedx = -s.speedx;
        s.x = constrain(s.x, minX + halfSize, maxX - halfSize);
      }
    } else {
      if (s.x - halfSize < s.boxMinX || s.x + halfSize > s.boxMaxX) {
        s.speedx = -s.speedx;
        s.x = constrain(s.x, s.boxMinX + halfSize, s.boxMaxX - halfSize);
      }
      if (s.y - halfSize < s.boxMinY || s.y + halfSize > s.boxMaxY) {
        s.speedy = -s.speedy;
        s.y = constrain(s.y, s.boxMinY + halfSize, s.boxMaxY - halfSize);
      }
    }
  }
}

function drawBouncingShapes(q, at, ad) {
  for (let i = 0; i < bouncingShapes.length; i++) {
    let s = bouncingShapes[i];
    let color = shapeColors[currentColorIndex];
    
    push();
    translate(s.x, s.y);
    
    noStroke();
    fill(color[0], color[1], color[2], 200);
    
    if (s.shape == "circle") {
      ellipse(0, 0, s.size, s.size);
    } else if (s.shape == "square") {
      rectMode(CENTER);
      rect(0, 0, s.size, s.size);
    } else if (s.shape == "bar") {
      rectMode(CORNER);
      rect(-s.size/2, -10, s.size, 20);
    }
    
    pop();
  }
  
  push();
  translate(50, 50);
  fill(101, 67, 33);
  textSize(14);
  text("Group Answer:", 0, 120);
  text("Individual Responses:", 0, 250);
  pop();
}

function initializePage2Shapes() {
  page2Shapes = [];
  let qarr = qobj.Qset;
  let aarr = qobj.Asoloset;
  
  for (let i = 0; i < qarr.length; i++) {
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let col = i % 2;
    let row = floor(i / 2);
    let xOffset = col * 550;
    let yOffset = row * 250;
    let baseX = 40 + xOffset;
    let baseY = 80 + yOffset;
    
    if (at == "boolean") {
      let ans_0 = 0, ans_1 = 0;
      for (let j = 0; j < aarr.length; j++) {
        if (aarr[j][i] == 0) ans_0++;
        else ans_1++;
      }
      
      for (let j = 0; j < ans_0; j++) {
        page2Shapes.push({
          x: baseX + random(0, 120),
          y: baseY + 40 + random(0, 60),
          vx: random(-0.3, 0.3),
          vy: random(-0.3, 0.3),
          size: random(15, 25),
          shape: i == 0 ? 'circle' : (random() > 0.5 ? 'circle' : 'square'),
          questionNum: i,
          answerType: 0,
          minX: baseX,
          maxX: baseX + 120,
          minY: baseY + 40,
          maxY: baseY + 100
        });
      }
      
      for (let j = 0; j < ans_1; j++) {
        page2Shapes.push({
          x: baseX + 150 + random(0, 120),
          y: baseY + 40 + random(0, 60),
          vx: random(-0.4, 0.4),
          vy: random(-0.4, 0.4),
          size: random(15, 25),
          shape: i == 0 ? 'square' : (random() > 0.5 ? 'circle' : 'square'),
          questionNum: i,
          answerType: 1,
          minX: baseX + 150,
          maxX: baseX + 270,
          minY: baseY + 40,
          maxY: baseY + 100
        });
      }
    } else if (at == "scale") {
      for (let j = 0; j < aarr.length; j++) {
        let a = aarr[j][i];
        let speedRange = i == 1 ? 0.2 : 0.25;
        page2Shapes.push({
          x: baseX + random(0, 200),
          y: baseY + 40 + random(0, 100),
          vx: random(-speedRange, speedRange),
          vy: random(-speedRange, speedRange),
          size: a * 4,
          barHeight: random(12, 18),
          shape: 'bar',
          questionNum: i,
          answerType: a,
          minX: baseX,
          maxX: baseX + 200,
          minY: baseY + 40,
          maxY: baseY + 140
        });
      }
    } else if (at == "multi") {
    }
  }
}

function updatePage2Shapes() {
  for (let i = 0; i < page2Shapes.length; i++) {
    let s = page2Shapes[i];
    
    s.x += s.vx;
    s.y += s.vy;
    
    if (s.x - s.size/2 < s.minX || s.x + s.size/2 > s.maxX) {
      s.vx = -s.vx;
      s.x = constrain(s.x, s.minX + s.size/2, s.maxX - s.size/2);
    }
    if (s.y - s.size/2 < s.minY || s.y + s.size/2 > s.maxY) {
      s.vy = -s.vy;
      s.y = constrain(s.y, s.minY + s.size/2, s.maxY - s.size/2);
    }
  }
}

function createbuttons() {

       createElement('br');
  btn1 =  createButton('Show your Questions');

  btn1.mousePressed(btn1pressed);
  btn2 =  createButton('Show your Answers');
  btn2.mousePressed(btn2pressed);

  btn3 =  createButton('Display Group Data');
  btn3.mousePressed(btn3pressed);

  btn4 =  createButton('Display Solo Data');
  btn4.mousePressed(btn4pressed);

}

function btn1pressed(){
  if (!qobj) {
    qobj = loadJSON("questions_converted.json", justQuestions);
    console.log("Questions");
   
  }
}

function btn2pressed(){
   if (qobj.Agset  && qobj.Asoloset  ) {
    console.log("Answers");
    justAnswers();

  }
}

function btn3pressed(){
   if (qobj.Agset) {
    console.log("Data");
    drawGroupData();
  }
}

function btn4pressed(){
   if (qobj.Asoloset) {
    console.log("Google Form Data");
    drawSoloData();
  }
}



function justQuestions () {

  let title = createP('Name:' + qobj.group_member + " Group: " + qobj.group_name);
  title.style("font-family", "monospace");
  title.style("color", "#888");
  title.style("width", "800");
  title.style("font-size", "17pt");
  let qarr = qobj.Qset;

  
  for (let i = 0; i < qarr.length; i++) {

    let q = qarr[i].Question;
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let qc = qarr[i].qcolor;

  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;
  console.log(tempStr);

  p1 = createP((i+1) + "." + q  + "<br>" + at + "<br>" + ad + "<br>" );
  p1.style("font-family", "monospace");
  p1.style("color", tempStr);
  p1.style("width", "100" + (i * 20));
  p1.style("font-size", "14pt");

  }

}


  function justAnswers () {
  
    let qarr = qobj.Qset;
    let agarr = qobj.Agset;
    let asarr = qobj.Asoloset;
    let temp = createP("<br>" );

    for (let i = 0; i < agarr.length; i++) {
   
    let qc = qarr[i].qcolor;
    let ag = agarr[i];

  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;
  console.log(tempStr);
  p1 = createP((i+1) + "." + ag  + "<br>" );
  p1.style("font-family", "monospace");
  p1.style("color", tempStr);
  p1.style("width", "100" + (i * 20));
  p1.style("font-size", "14pt");

  let tsa = "";
  for (let j = 0; j < agarr.length; j++) { 
   console.log(asarr[j][i])
    tsa+= " " + asarr[j][i];

  }

  p1 = createP((i+1) + ". solo " + tsa  + "<br>" );
  p1.style("font-family", "monospace");
  p1.style("color", tempStr);
  p1.style("width", "100" + (i * 20));
  p1.style("font-size", "14pt");


  }

  console.log("answers " + aobj);


}
