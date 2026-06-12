
  // all the data drawing (vis) is kept in this file for portability.
  // detail tba

 function drawGroupData() {
 // background(0);
    let qarr = qobj.Qset;
    let aarr = qobj.Agset;



    for (let i = 0; i < aarr.length; i++) {

    let q = qarr[i].Question;
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let qc = qarr[i].qcolor;
    let a = aarr[i];

  // this is how you can concatanate the rgb for css into a string.
  // rgba(0-255,0-255,0-255,0-1)
  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;

   let co = color(qc[0],qc[1], qc[2]);
   fill(co );

  text(qarr[i].Question,150*i + 40, 50, 145);
  console.log(tempStr);

  if ( qarr[i].Qanswertype == "boolean") {
    console.log("boolean");
    // ad,qc,a,i
   drawgrpBooleanAns(ad,co,a,i);
  } else if (qarr[i].Qanswertype == "multi") {
     console.log("multi");
   drawgrpMultiAns(ad,co,a,i);
   } else if (qarr[i].Qanswertype == "scale") {
     console.log("scale");
   drawgrpScaleAns(ad,co,a,i);
   } else  {  // some other thing?
   // draw your data here 
 }
}

 }


  // answerdata,qc,a,i
function drawgrpBooleanAns(ad,c,a,num) {
   push();
  //  translate();
  //  rotate(radians());
  //  scale();
   textSize(15);
   stroke(c);
   noFill();
   if ( a == 0) { // first choice
     rect(150*num+ 40,150,90,60);
     fill(c)
     text(ad[0],150*num + 40, 150, 150);
   } else { // second choice
     rect(150*num+ 70,150,90,60);
     fill(c)
     text(ad[1],150*num + 70, 150, 150);
   }
  
  pop();

}

 // ad,qc,a,i
function drawgrpMultiAns(ad,c,a,num) {

  push();
   // translate();
   // rotate(radians());
   // scale();
   textSize(15);
   stroke(c);
   noFill();
  if ( a == 'a') { // first choice
  rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[0],150*num + 70, 150, 150);
  } else if ( a == 'b') { // second choice
  rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[1],150*num + 70, 150, 150);
  } else if ( a == 'c') { // third choice
  rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[2],150*num + 70, 150, 150);

  } else {  // otherwise it d
  rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[3],150*num + 70, 150, 150);
  }
  pop();

}

// ad,qc,a,i
function drawgrpScaleAns(ad,c,a,num) {

  push(); 
   //translate();
   //rotate(radians());
   //scale();
   textSize(15);
   noStroke();
   fill(c)
   text(ad,150*num + 40, 150, 145); 

   //rect(150*num+ 50,300,60,-a*10);

   rect(150*num+ 50,340,60,-a*20);
   rect(150*num+ 35,340,90,3);  // baseline
   text(a,150*num + 80,300 - ((a*12)+20), 145); 
   rect(150*num+ 35,340 - (10*12),90,3);  // baseline
   text(0,150*num + 15,340, 145); 
   text(10,150*num + 15,340 - (10*12), 145); 
   pop();

}

    // draws the solor 
function drawSoloData() {
     background(0);
    let qarr = qobj.Qset;
    let aarr = qobj.Asoloset;

   for (let i = 0; i < qarr.length; i++) {

    let q = qarr[i].Question;
    let at = qarr[i].Qanswertype;
    let ad = qarr[i].answerdata;
    let qc = qarr[i].qcolor;
    let a = aarr;

  // this is how you can concatanate the rgb for css into a string.
  // rgba(0-255,0-255,0-255,0-1)
  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;

  let co = color(qc[0],qc[1], qc[2]);
  fill(co);

  text(qarr[i].Question,150*i + 40, 50, 145);
  console.log(tempStr);

  if ( qarr[i].Qanswertype == "boolean") {
    console.log("boolean");
    // ad,qc,a,i
   drawsoloBooleanAns(ad,co,a,i);
  } else if (qarr[i].Qanswertype == "multi") {
     console.log("multi");
   drawsoloMultiAns(ad,co,a,i);
   } else if (qarr[i].Qanswertype == "scale") {
     console.log("scale");
   drawsoloScaleAns(ad,co,a,i);
   } else  {  // some other thing?
   // draw your data here 
 }

}

}

  // answerdata,qc,a,i
function drawsoloBooleanAns(ad,c,arr,num) {
  
  push();

   //c = color(200,100);
  //  translate();
  //  rotate(radians());
  //  scale();
   textSize(15);
   stroke(c);


  // let tsa = "";

  let ans_0 = 0;
  let ans_1 = 0;

  for (let i = 0; i < arr.length; i++) { 
   console.log("hi" + arr[i][num])
   let a = arr[i][num];
   // text(arr[i][num],150*num + 40, 150, 150);
 
   if ( a == 0) { // first choice
     //rect(150*num+ 40,150,90,60);
     fill(c)
     text(ad[0],170*num + 30, 100 + (20*i), 150);
     ans_0++;
   } else { // second choice
    // rect(150*num+ 70,150,90,60);
     fill(c)
     text(ad[1],170*num + 80, 100 + (20*i), 150);
     ans_1++;
   }

    }

     // tabulation
     text( "A. " + ans_0 + " B. " + ans_1 ,150*num + 20, 140 + (20*arr.length), 150);

      // bargraphBool(ans_0,ans_1,num);

      if (num == 0 ) {
      imggraphBool(images[0],ans_0,ans_1,num);
       } else if (num == 3 ) {
      imggraphBool(images[2],ans_0,ans_1,num);

      }

 
  
  pop();

}



function bargraphBool(a0,a1,num) {

  push();
  translate(num*170+40,600);
 // text(a0,0,0,50);
  rect(0,-5,20,-a0*5);
 // text(a1,40,0,50);
  rect(40,-5,20,-a1*5);
  pop();


}

function imggraphBool(img,a0,a1,num) {

  fill(255,0,0);
  noStroke();
  push();
  translate(num*170+40,600);
  image(img,0,-5,a0*7,a0*7);
  fill(255);
  text(a0,0,5,50);

  image(img,80,-5,a1*7,a1*7);
  fill(255);
  text(a1,75,5,50);

  pop();


}







 // ad,qc,a,i
function drawsoloMultiAns(ad,c,arr,num) {

  push();
   // translate();
   // rotate(radians());
   // scale();
   textSize(15);
   stroke(c);
   noFill();

  let ans_a = 0;
  let ans_b = 0;
  let ans_c = 0;

  for (let i = 0; i < arr.length; i++) { 
   console.log("multi " + arr[i][num])
   let a = arr[i][num];


  if ( a == 'a') { // first choice
  //rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[0],170*num + 20, 100 + (20*i), 150);
   ans_a++;
  } else if ( a == 'b') { // second choice
  //rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[1],170*num + 40, 100 + (20*i), 150);
  ans_b++;
  } else {  // otherwise it c
 // rect(150*num+ 70,150,90,60);
  fill(c)
  text(ad[2],170*num + 60, 100 + (20*i), 150);
  ans_c++;
  }

}
  // tabulation
  text( "A. " + ans_a + " B. " + ans_b + " C. " + ans_c,150*num + 20, 140 + (20*arr.length), 150);
 



  pop();

}

// ad,qc,a,i
function drawsoloScaleAns(ad,c,arr,num) {

  push(); 
   //translate();
   //rotate(radians());
   //scale();
   textSize(15);
   noStroke();
   fill(c)

   for (let i = 0; i < arr.length; i++) { 
   console.log("scale " + arr[i][num])
   let a = arr[i][num];
   text(ad,150*num + 40, 150, 145); 

   //rect(150*num+ 50,300,60,-a*10);

   rect(170*num+ 0,200+ (22*i),a*10,10);

   
   //rect(170*num+ 35,340,90,3);  // baseline
   //text(a,170*num + 80,300 - ((a*12)+20), 145); 
   //rect(170*num+ 35,340 - (10*12),90,3);  // baseline
   //text(0,170*num + 15,340, 145); 
   //text(10,170*num + 15,340 - (10*12), 145); 

   }

   pop();

}


