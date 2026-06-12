 function drawGroupData() {
    let qarr = qobj.Qset;
    let aarr = qobj.Agset;



    for (let i = 0; i < aarr.length; i++) {

    let q = qarr[i].Question;
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let qc = qarr[i].qcolor;
    let a = aarr[i];

  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;

   let co = color(qc[0],qc[1], qc[2]);
   fill(101, 67, 33);

  text(qarr[i].Question,200*i + 40, 50, 190);
  console.log(tempStr);

  if ( qarr[i].Qanswertype == "boolean") {
    console.log("boolean");
   drawgrpBooleanAns(ad,co,a,i);
  } else if (qarr[i].Qanswertype == "multi") {
     console.log("multi");
   drawgrpMultiAns(ad,co,a,i);
   } else if (qarr[i].Qanswertype == "scale") {
     console.log("scale");
   drawgrpScaleAns(ad,co,a,i);
   } else  {
 }
}

 }


function drawgrpBooleanAns(ad,c,a,num) {
   push();
   textSize(15);
   stroke(255, 170, 0);
   noFill();
   if ( a == 0) {
     rect(200*num+ 40,150,90,60);
     fill(101, 67, 33);
     text(ad[0],200*num + 40, 150, 150);
   } else {
     rect(200*num+ 70,150,90,60);
     fill(101, 67, 33);
     text(ad[1],200*num + 70, 150, 150);
   }
  
  pop();

 }

function drawgrpMultiAns(ad,c,a,num) {

  push();
   textSize(15);
   stroke(255, 170, 0);
   noFill();
  if ( a == 'a') {
  rect(200*num+ 70,150,90,60);
  fill(101, 67, 33);
  text(ad[0],200*num + 70, 150, 150);
  } else if ( a == 'b') {
  rect(200*num+ 70,150,90,60);
  fill(101, 67, 33);
  text(ad[1],200*num + 70, 150, 150);
  } else if ( a == 'c') {
  rect(200*num+ 70,150,90,60);
  fill(101, 67, 33);
  text(ad[2],200*num + 70, 150, 150);

  } else {
  rect(200*num+ 70,150,90,60);
  fill(101, 67, 33);
  text(ad[3],200*num + 70, 150, 150);
  }
  pop();

}

function drawgrpScaleAns(ad,c,a,num) {

  push(); 
   textSize(15);
   noStroke();
   fill(101, 67, 33);
   text(ad,200*num + 40, 150, 190); 

   fill(255, 153, 193);
   rect(200*num+ 50,340,60,-a*20);
   fill(101, 67, 33);
   rect(200*num+ 35,340,90,3);
   text(a,200*num + 80,300 - ((a*12)+20), 190); 
   rect(200*num+ 35,340 - (10*12),90,3);
   text(0,200*num + 15,340, 190); 
   text(10,200*num + 15,340 - (10*12), 190); 
   pop();

}

function drawSoloData() {
    let qarr = qobj.Qset;
    let aarr = qobj.Asoloset;

   for (let i = 0; i < qarr.length; i++) {
    let q = qarr[i].Question;
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let qc = qarr[i].qcolor;
    let a = aarr;

    let col = i % 2;
    let row = floor(i / 2);
    let xOffset = col * 550;
    let yOffset = row * 250;
    let baseX = 40 + xOffset;
    let baseY = 80 + yOffset;

    push();
    translate(baseX, baseY);

    let co = color(qc[0],qc[1], qc[2]);
    fill(101, 67, 33);
    textSize(12);
    text("Q" + (i+1) + ": " + q, 0, 0, 500);

    if (at == "boolean") {
      drawsoloBooleanAnsVaried(ad, co, a, i, baseX, baseY);
    } else if (at == "multi") {
      drawsoloMultiAnsVaried(ad, co, a, i, baseX, baseY);
    } else if (at == "scale") {
      drawsoloScaleAnsVaried(ad, co, a, i, baseX, baseY);
    }

    pop();
  }
}

function drawsoloBooleanAns(ad,c,arr,num) {
  
  push();

   textSize(15);
   stroke(c);

  let ans_0 = 0;
  let ans_1 = 0;

  for (let i = 0; i < arr.length; i++) { 
   console.log("hi" + arr[i][num])
   let a = arr[i][num];
 
   if ( a == 0) {
     fill(101, 67, 33);
     text(ad[0],200*num + 30, 100 + (20*i), 190);
     ans_0++;
   } else {
     fill(101, 67, 33);
     text(ad[1],200*num + 80, 100 + (20*i), 190);
     ans_1++;
   }

    }

     fill(101, 67, 33);
     text( "A. " + ans_0 + " B. " + ans_1 ,200*num + 20, 140 + (20*arr.length), 190);

      if (num == 0 ) {
      imggraphBool(images[0],ans_0,ans_1,num);
       } else if (num == 3 ) {
      imggraphBool(images[2],ans_0,ans_1,num);

      }

 
  
  pop();

}



function bargraphBool(a0,a1,num) {

  push();
  translate(num*200+40,600);
  rect(0,-5,20,-a0*5);
  rect(40,-5,20,-a1*5);
  pop();


}

function imggraphBool(img,a0,a1,num) {

  fill(255,0,0);
  noStroke();
  push();
  translate(num*200+40,600);
  image(img,0,-5,a0*7,a0*7);
  fill(255);
  text(a0,0,5,50);

  image(img,80,-5,a1*7,a1*7);
  fill(255);
  text(a1,75,5,50);

  pop();


}





function drawsoloMultiAns(ad,c,arr,num) {

  push();
   textSize(15);
   stroke(255, 170, 0);
   noFill();

  let ans_a = 0;
  let ans_b = 0;
  let ans_c = 0;

  for (let i = 0; i < arr.length; i++) { 
   console.log("multi " + arr[i][num])
   let a = arr[i][num];


  if ( a == 'a') {
  fill(101, 67, 33);
  text(ad[0],200*num + 20, 100 + (20*i), 190);
   ans_a++;
  } else if ( a == 'b') {
  fill(101, 67, 33);
  text(ad[1],200*num + 40, 100 + (20*i), 190);
  ans_b++;
  } else {
  fill(101, 67, 33);
  text(ad[2],200*num + 60, 100 + (20*i), 190);
  ans_c++;
  }

}
  fill(101, 67, 33);
  text( "A. " + ans_a + " B. " + ans_b + " C. " + ans_c,200*num + 20, 140 + (20*arr.length), 190);
 



  pop();

}

function drawsoloScaleAns(ad,c,arr,num) {

  push(); 
   textSize(15);
   noStroke();
   fill(c)

   for (let i = 0; i < arr.length; i++) { 
   console.log("scale " + arr[i][num])
   let a = arr[i][num];
   fill(101, 67, 33);
   text(ad,200*num + 40, 150, 190); 

   fill(255, 153, 193);
   rect(200*num+ 0,200+ (22*i),a*10,10); 

   }

   pop();

}

function drawsoloBooleanAnsVaried(ad, c, arr, num, baseX, baseY) {
  push();
  translate(0, 40);
  
  let ans_0 = 0;
  let ans_1 = 0;
  
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i][num];
    if (a == 0) ans_0++;
    else ans_1++;
  }
  
  if (num == 0) {
    fill(255, 153, 193, 200);
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num && s.answerType == 0) {
        push();
        translate(s.x - baseX, s.y - baseY);
        ellipse(0, 0, s.size, s.size);
        pop();
      }
    }
    fill(137, 177, 95, 200);
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num && s.answerType == 1) {
        push();
        translate(s.x - baseX, s.y - baseY);
        rect(-s.size/2, -s.size/2, s.size, s.size);
        pop();
      }
    }
    fill(101, 67, 33);
    textSize(10);
    text(ad[0] + ": " + ans_0, 0, 80);
    text(ad[1] + ": " + ans_1, 150, 80);
  } 
  else if (num == 2) {
    fill(255, 153, 193, 200);
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num && s.answerType == 0) {
        push();
        translate(s.x - baseX, s.y - baseY);
        if (s.shape == 'circle') {
          ellipse(0, 0, s.size, s.size);
        } else {
          rect(-s.size/2, -s.size/2, s.size, s.size);
        }
        pop();
      }
    }
    fill(137, 177, 95, 200);
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num && s.answerType == 1) {
        push();
        translate(s.x - baseX, s.y - baseY);
        if (s.shape == 'circle') {
          ellipse(0, 0, s.size, s.size);
        } else {
          rect(-s.size/2, -s.size/2, s.size, s.size);
        }
        pop();
      }
    }
    fill(101, 67, 33);
    textSize(10);
    text(ad[0] + ": " + ans_0, 0, 80);
    text(ad[1] + ": " + ans_1, 0, 100);
  }
  
  pop();
}

function drawsoloMultiAnsVaried(ad, c, arr, num, baseX, baseY) {
  push();
  translate(0, 40);
  
  let ans_a = 0, ans_b = 0, ans_c = 0, ans_d = 0;
  
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i][num];
    if (a == 'a') ans_a++;
    else if (a == 'b') ans_b++;
    else if (a == 'c') ans_c++;
    else if (a == 'd') ans_d++;
  }
  
  if (num == 4) {
    let colors = [[255, 0, 0], [0, 0, 255], [0, 255, 0]];
    let counts = [ans_a, ans_b, ans_c];
    let total = ans_a + ans_b + ans_c;
    
    if (total > 0) {
      noStroke();
      push();
      translate(100, 50);
      rotate(pieChartRotation);
      
      let lastAngle = 0;
      for (let col = 0; col < 3; col++) {
        let angle = (counts[col] / total) * TWO_PI;
        fill(colors[col][0], colors[col][1], colors[col][2], 200);
        arc(0, 0, 100, 100, lastAngle, lastAngle + angle, PIE);
        lastAngle += angle;
      }
      
      pop();
      
      fill(101, 67, 33);
      textSize(9);
      textAlign(LEFT);
      for (let col = 0; col < 3; col++) {
        text(ad[col] + ": " + counts[col], 0, 120 + col * 15);
      }
    } else {
      fill(101, 67, 33);
      textSize(10);
      text("No responses", 50, 50);
    }
  } 
  else if (num == 5) {
    let colors = [[0, 255, 255], [255, 0, 255], [255, 255, 0], [0, 0, 0]];
    let counts = [ans_a, ans_b, ans_c, ans_d];
    let total = ans_a + ans_b + ans_c + ans_d;
    
    if (total > 0) {
      noStroke();
      push();
      translate(100, 50);
      rotate(pieChartRotation);
      
      let lastAngle = 0;
      for (let col = 0; col < 4; col++) {
        let angle = (counts[col] / total) * TWO_PI;
        fill(colors[col][0], colors[col][1], colors[col][2], 200);
        arc(0, 0, 100, 100, lastAngle, lastAngle + angle, PIE);
        lastAngle += angle;
      }
      
      pop();
      
      fill(101, 67, 33);
      textSize(9);
      textAlign(LEFT);
      for (let col = 0; col < 4; col++) {
        text(ad[col] + ": " + counts[col], 0, 120 + col * 15);
      }
    } else {
      fill(101, 67, 33);
      textSize(10);
      text("No responses", 50, 50);
    }
  }
  
  pop();
}

function drawsoloScaleAnsVaried(ad, c, arr, num, baseX, baseY) {
  push();
  translate(0, 40);
  
  if (num == 1) {
    noStroke();
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num) {
        push();
        translate(s.x - baseX, s.y - baseY);
        fill(255, 153, 193, 200);
        rect(-s.size/8, 0, s.size/4, s.answerType * 4);
        fill(101, 67, 33);
        textSize(8);
        text(s.answerType, s.size/8, s.answerType * 4 + 15);
        pop();
      }
    }
  } 
  else if (num == 3) {
    noStroke();
    for (let i = 0; i < page2Shapes.length; i++) {
      let s = page2Shapes[i];
      if (s.questionNum == num) {
        push();
        translate(s.x - baseX, s.y - baseY);
        fill(137, 177, 95, 200);
        rect(0, -s.barHeight/2, s.answerType * 4, s.barHeight);
        fill(101, 67, 33);
        textSize(8);
        text(s.answerType, s.answerType * 4 + 2, 0);
        pop();
      }
    }
  }
  
  pop();
}

