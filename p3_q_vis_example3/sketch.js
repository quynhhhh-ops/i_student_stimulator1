

var qobj,aobj;
var btn1,btn2,btn3,btn4;
var head;
var p1;
var counter = 0;

// optional gridvariable for grid displays

let gridarr1 ;


 
let font1;
let images =[];  // you can make a list of images and then call them in a for loop or test

let currentPage = 0;
let boardImage;

function preload()  {
       qobj = loadJSON("questions.json");
       font1 = loadFont('assets/oswald.ttf');
       images[0] = loadImage('assets/pizza.png');
       images[1] = loadImage('assets/pineapple.png');
       images[2] = loadImage('assets/tomato.png');
       images[3] = loadImage('assets/mushroom.png');
       boardImage = loadImage('assets/pizzaboard.jpg');

}

function setup() {
     createCanvas(1200, 850);
     // this is an option if you want to only use the Dom elements
     //noCanvas();
 
     background(0);
     fill(100);
     textAlign(LEFT);
     textFont(font1);
      
}


function draw() {
    background(100);

    if (currentPage == 0) {   // intro and title
          tint(255,0,0, 120);
        image(boardImage,10,10,width-20,height-20);
        push();
        translate(60,100);
        fill(0,0,80);
        textSize(40);
        text ('Name: ' + qobj.group_member + " \n Group: " + qobj.group_name,0 ,0,800 );
        textSize(35);
        translate(740,0);
        text ("My groups members \n were Stan R, \n Millis L, \n and Everett S ",0 ,0, 800 );
      

        pop();



    } else if (currentPage == 1) {
      //let c = color(0,1);
      noTint();
      image(boardImage,10,10,width-20,height-20);
     

      push();
      translate(100,30);
      fill(0,0,80);
      textSize(20);
      let t = "These are my questions applied to our question board \n";
      t+=  " with the answers in visual form. ";
      text(t,0,0,300);  // the 4th argument is the textWidth per line.
      pop();

      // This is the raw version of the group data from datavis.js
      push();
      translate(100,130);
      drawGroupData();
      pop();
 

    } else if (currentPage == 2) {
      
       /*
       create 1 a version of your solo data in
       the style of your choice. Just make sure you are sharing 
       some kind of visual language idea of showing the data.
       (i.e. bar graphs , counting circles, etc)
       Make sure its a different idea of visualizing from the previous group 1.
       */


     push();
     translate(40,50);
     fill(200);
     textSize(12);
     let t = "see the code for details on what should be done here."
     text(t,0,0,300);
     pop();

     // This is the raw version of the group data from datavis.js
      push();
      translate(100,130);
      drawSoloData();
      pop();
 
    } else if (currentPage == 3) {
      background(0);
        /*
       create 1 more version of your solo or group data in
       the style of your choice. Just make sure you are sharing 
       some kind of visual language idea of showing the data.
       (i.e. bar graphs , counting circles, etc)
       Make sure its a different idea of visualizing from the previous 2.
       */
       
        push();
        translate(40,50);
        fill(200);
        textSize(20);
        let t = "see the code for details on what should be done here."
        text(t,0,0,400);
        pop();

      push();
      translate(100,130);
      // draw solo or group
      pop();



    } 

      
    


}


function keyPressed() { 

  
    //console.log(key);
     // or 
    if ( key == '1' ) { 
      console.log("Page 1");
      currentPage = 1;

     } else if ( key == '2' ) { 
        console.log("Page 2");
        currentPage = 2;
        
     } else if ( key == '3' ) { 
        console.log("Page 3");
        currentPage = 3;   
     } else {
        currentPage = 0;

     }
  
    }

  // code from example 1 and 2  , use it as you need.

function createbuttons() {

       createElement('br');
  // create the button DOM element
  btn1 =  createButton('Show your Questions');

  // attach button listener
  btn1.mousePressed(btn1pressed);
  btn2 =  createButton('Show your Answers');
  // attach button listener
  btn2.mousePressed(btn2pressed);

  btn3 =  createButton('Display Group Data');
  // attach button listener
  btn3.mousePressed(btn3pressed);

  btn4 =  createButton('Display Solo Data');
  // attach button listener
  btn4.mousePressed(btn4pressed);

}

function btn1pressed(){
   // a simple way of seeing if the json file has been loaded already.
   // is it has it will return blob as true, therefore if (!false) it will be true..
   // otherwise it will be false and not reload.
  if (!qobj) {
    // asynch loading command, with a callback function that gets called when done
    qobj = loadJSON("questions.json", justQuestions);
    console.log("Questions");
   
  }
}

function btn2pressed(){
   if (qobj.Agset  && qobj.Asoloset  ) {
    // asynch loading command, with a callback function that gets called when done
    console.log("Answers");
    justAnswers();

  }
}

function btn3pressed(){
   if (qobj.Agset) {
    // asynch loading command, with a callback function that gets called when done
    console.log("Data");
    drawGroupData();
  }
}

function btn4pressed(){
   if (qobj.Asoloset) {
    // asynch loading command, with a callback function that gets called when done
    console.log("Google Form Data");
    drawSoloData();
  }
}



// this is the callback way of loading an external file
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

  // this is how you can concatanate the rgb for css into a string.
  // rgba(0-255,0-255,0-255,0-1)
  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;
  console.log(tempStr);
     //  head.style("background-color", tempStr);

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
    //let as = asarr[i];

  // this is how you can concatanate the rgb for css into a string.
  // rgba(0-255,0-255,0-255,0-1)
  var tempStr = "rgba(" + qc[0] + "," + qc[1] + "," + qc[2] + "," + "1)" ;
  console.log(tempStr);
     //  head.style("background-color", tempStr);
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

  // this shows the whole blob json data package
  console.log("answers " + aobj);


}

