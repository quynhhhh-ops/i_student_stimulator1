let sceneManager;
let entranceSound, errorSound, clickSound;
let logoImg, startingImg, graduationCapImg;
let currentTab = 'todo';
let tabs = ['todo', 'finances', 'holds', 'messages', 'payment', 'enrollment'];
let tabRects = [];
let classNumberInput = '';

const TAB_NAMES = {
  'todo': 'To Do List',
  'finances': 'Finances',
  'holds': 'Holds',
  'messages': 'View My Messages',
  'payment': 'Make a Payment',
  'enrollment': 'Academics:\nEnrollment'
};
let showHoldError = false;
let inputFocused = false;
let jobRejectionMessage = '';
let classesSignedUp = false;
let holdRejectionMessage = '';
let enrollmentStartTime = null;

function preload() {
  soundFormats('mp3', 'ogg');
  entranceSound = loadSound('assets/entrance.mp3');
  errorSound = loadSound('assets/error.mp3');
  clickSound = loadSound('assets/mouse_click.mp3');
  
  logoImg = loadImage('assets/logo.png');
  startingImg = loadImage('assets/starting.png');
  graduationCapImg = loadImage('assets/graduation-cap.png');
}

function setup() {
  createCanvas(1200, 800);
  
  sceneManager = new SceneManager(null);
  sceneManager.addScene(SceneIntro);
  sceneManager.addScene(SceneHelp);
  sceneManager.addScene(SceneMain);
  sceneManager.addScene(SceneScholarships);
  sceneManager.addScene(SceneRejected);
  sceneManager.addScene(SceneJobRejected);
  sceneManager.wire();
  sceneManager.showScene(SceneIntro);
  
  setupTabRects();
}

function setupTabRects() {
  let startY = 150;
  let tabHeight = 60;
  let spacing = 10;
  
  for (let i = 0; i < tabs.length; i++) {
    tabRects.push({
      name: tabs[i],
      x: 20,
      y: startY + i * (tabHeight + spacing),
      w: 220,
      h: tabHeight
    });
  }
}

function stopAllSounds() {
  if (entranceSound && entranceSound.isPlaying()) {
    entranceSound.stop();
  }
  if (clickSound && clickSound.isPlaying()) {
    clickSound.stop();
  }
  if (errorSound && errorSound.isPlaying()) {
    errorSound.stop();
  }
}

function drawHeaderWithLogo() {
  fill(0, 33, 66);
  rect(0, 0, width, 60);
  
  let headerX = 20;
  let headerY = 10;
  let headerW = 300;
  let headerH = 40;
  
  if (logoImg) {
    let headerHover = (mouseX >= headerX && mouseX <= headerX + headerW &&
                       mouseY >= headerY && mouseY <= headerY + headerH);
    
    if (headerHover) {
      cursor(HAND);
      tint(255, 200, 0);
    } else {
      cursor(ARROW);
      noTint();
    }
    image(logoImg, headerX, headerY, headerW, headerH);
    noTint();
  }
}

function drawTabs() {
  fill(224, 224, 224);
  rect(0, 60, 260, height - 60);
  
  fill(176, 176, 176);
  for (let i = 0; i < tabRects.length; i++) {
    let tab = tabRects[i];
    if (tab.name === currentTab) {
      fill(176, 176, 176);
      noStroke();
    } else {
      fill(208, 208, 208);
      noStroke();
    }
    rect(tab.x, tab.y, tab.w, tab.h);
    
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(14);
    noStroke();
    
    if (tab.name === 'enrollment') {
      let lines = TAB_NAMES[tab.name].split('\n');
      text(lines[0], tab.x + 50, tab.y + tab.h/2 - 8);
      text(lines[1], tab.x + 50, tab.y + tab.h/2 + 8);
    } else {
      text(TAB_NAMES[tab.name], tab.x + 50, tab.y + tab.h/2);
    }
    
    if (graduationCapImg) {
      image(graduationCapImg, tab.x + 10, tab.y + 10, 30, 30);
    }
  }
}

function SceneIntro(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
    stopAllSounds();
    if (entranceSound) {
      entranceSound.play();
    }
  }
  
  this.draw = function() {
    if (startingImg) {
      let imgAspect = startingImg.width / startingImg.height;
      let canvasAspect = width / height;
      let imgW, imgH, imgX, imgY;
      
      if (imgAspect > canvasAspect) {
        imgW = width;
        imgH = width / imgAspect;
        imgX = 0;
        imgY = (height - imgH) / 2;
      } else {
        imgW = height * imgAspect;
        imgH = height;
        imgX = (width - imgW) / 2;
        imgY = 0;
      }
      
      background(0, 33, 66);
      image(startingImg, imgX, imgY, imgW, imgH);
    } else {
      background(0, 33, 66);
    }
    
    fill(255, 200, 0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text('Click anywhere or press SPACE to continue', width/2, height - 100);
    text('Press H for Help', width/2, height - 70);
  }
  
  this.mousePressed = function() {
    if (entranceSound && !entranceSound.isPlaying()) {
      this.sceneManager.showScene(SceneMain);
    }
  }
  
  this.keyPressed = function() {
    if (key === ' ' || key === 'Enter') {
      this.sceneManager.showScene(SceneMain);
    } else if (key === 'h' || key === 'H') {
      this.sceneManager.showScene(SceneHelp);
    }
  }
}

function SceneHelp(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
    if (clickSound) {
      if (entranceSound && entranceSound.isPlaying()) {
        entranceSound.stop();
      }
      if (clickSound.isPlaying()) {
        clickSound.stop();
      }
      if (errorSound && errorSound.isPlaying()) {
        errorSound.stop();
      }
      clickSound.play();
    }
  }
  
  this.draw = function() {
    background(240, 240, 240);
    
    fill(0, 33, 66);
    rect(0, 0, width, 60);
    
    fill(255);
    textAlign(LEFT);
    textSize(24);
    text('Help / About', 20, 40);
    
    fill(0);
    textAlign(LEFT);
    textSize(18);
    let y = 100;
    let lineHeight = 24;
    let sectionGap = lineHeight * 1.8;
    
    text('HOW TO INTERACT:', 50, y);
    y += lineHeight;
    
    text('• Click grey tabs to open To Do, Finances, Holds, Messages, Payment, Enrollment', 50, y);
    y += lineHeight;
    text('• Use the mouse to click buttons and forms; press Enter only in input boxes', 50, y);
    y += lineHeight;
    text('• Press H to open Help from any page', 50, y);
    y += lineHeight;
    text('• Press ESC to return to the main portal', 50, y);
    y += sectionGap;
    
    text('KEY BINDINGS:', 50, y);
    y += lineHeight;
    
    text('H - Open Help/About screen', 50, y);
    y += lineHeight;
    text('ESC - Return to Main Portal', 50, y);
    y += lineHeight;
    text('SPACE or Click - Continue from intro screen', 50, y);
    y += lineHeight;
    text('ENTER - Confirm text in input fields (e.g., Enrollment form)', 50, y);
    y += sectionGap;
    
    text('SOUND FEEDBACK:', 50, y);
    y += lineHeight;
    
    text('• Entrance sound plays when entering the portal', 50, y);
    y += lineHeight;
    text('• Click sound plays on navigation and form focus', 50, y);
    y += lineHeight;
    text('• Error sound plays when an action is blocked (e.g., holds, scholarship/job denied)', 50, y);
    y += sectionGap;
    
    text('TABS AVAILABLE:', 50, y);
    y += lineHeight;
    
    text('1. To Do List - View pending tasks and reminders', 50, y);
    y += lineHeight;
    text('2. Finances - Check balances and open scholarship/job search links', 50, y);
    y += lineHeight;
    text('3. Holds - See holds; click to read why actions are blocked', 50, y);
    y += lineHeight;
    text('4. View My Messages - Read inbox items and reminders', 50, y);
    y += lineHeight;
    text('5. Make a Payment - Payment center summary', 50, y);
    y += lineHeight;
    text('6. Academics: Enrollment - Enter class number; wait for confirm button', 50, y);
    
    fill(0, 33, 66);
    rect(width - 200, height - 60, 180, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Click to Return', width - 110, height - 40);
  }
  
  this.mousePressed = function() {
    if (mouseX > width - 200 && mouseX < width - 20 &&
        mouseY > height - 60 && mouseY < height - 20) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneMain);
    }
  }
  
  this.keyPressed = function() {
    if (key === 'Escape') {
      this.sceneManager.showScene(SceneMain);
    }
  }
}

function SceneMain(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
  }
  
  this.draw = function() {
    background(245, 245, 245);
    
    drawHeaderWithLogo();
    
    fill(204, 0, 0);
    rect(width - 100, 10, 80, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('LOGOUT', width - 60, 30);
    
    drawTabs();
    
    fill(255);
    rect(260, 60, width - 260, height - 60);
    
    fill(0, 33, 66);
    rect(260, 60, width - 260, 50);
    fill(255);
    textAlign(LEFT);
    textSize(18);
    text('Student Center', 280, 90);
    
    fill(0);
    textAlign(LEFT);
    textSize(16);
    text('International Student', 280, 130);
    
    fill(240);
    rect(280, 170, width - 300, height - 190);
    
    fill(0);
    textAlign(LEFT);
    textSize(20);
    
    if (currentTab === 'finances') {
      fill(0, 33, 66);
      rect(280, 170, width - 300, 50);
      fill(255);
      textAlign(LEFT);
      textSize(16);
      text('Account Inquiry > Summary', 300, 200);
      
      fill(0);
      textSize(14);
      text('Due Now 0.00', 300, 240);
      text('Currency used is US Dollar.', 300, 260);
      
      if (classesSignedUp) {
        text('Future Due 10,174.00', 300, 280);
        fill(200, 0, 0);
        textSize(16);
        text('You owe 10,174.00. Not including Insurance Plan.', 300, 305);
        
        fill(0);
        textSize(16);
        text('What I Owe', 300, 340);
        
        let tableX = 300;
        let tableY = 365;
        let rowHeight = 30;
        let col1 = 280;
        let col2 = 120;
        let col3 = 150;
        let col4 = 120;
        
        let charges = [
          { charge: 'Document Fee', dueDate: 'right now', term: 'Current Term', amount: '20.00' },
          { charge: 'Facility Fee', dueDate: 'right now', term: 'Current Term', amount: '42.00' },
          { charge: 'Association Fee', dueDate: 'right now', term: 'Current Term', amount: '114.00' },
          { charge: 'Health Service Fee', dueDate: 'right now', term: 'Current Term', amount: '190.00' },
          { charge: 'Student Success Excel Tech Fee', dueDate: 'right now', term: 'Current Term', amount: '389.00' },
          { charge: 'Student Union Fee', dueDate: 'right now', term: 'Current Term', amount: '443.00' },
          { charge: 'Tuition Fee', dueDate: 'right now', term: 'Current Term', amount: '2,316.00' },
          { charge: 'Non-resident Tuition Fee', dueDate: 'right now', term: 'Current Term', amount: '6,660.00' }
        ];
        
        fill(100, 100, 100);
        rect(tableX, tableY, col1 + col2 + col3 + col4, rowHeight);
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(12);
        textStyle(BOLD);
        text('CHARGE', tableX + 5, tableY + rowHeight/2);
        text('DUE DATE', tableX + col1 + 5, tableY + rowHeight/2);
        text('TERM', tableX + col1 + col2 + 5, tableY + rowHeight/2);
        textAlign(RIGHT, CENTER);
        text('AMOUNT', tableX + col1 + col2 + col3 + col4 - 5, tableY + rowHeight/2);
        textStyle(NORMAL);
        
        for (let i = 0; i < charges.length; i++) {
          let y = tableY + rowHeight + (i * rowHeight);
          fill(255);
          rect(tableX, y, col1 + col2 + col3 + col4, rowHeight);
          
          stroke(200);
          line(tableX, y, tableX + col1 + col2 + col3 + col4, y);
          
          fill(0);
          textAlign(LEFT, CENTER);
          textSize(11);
          text(charges[i].charge, tableX + 5, y + rowHeight/2);
          text(charges[i].dueDate, tableX + col1 + 5, y + rowHeight/2);
          text(charges[i].term, tableX + col1 + col2 + 5, y + rowHeight/2);
          textAlign(RIGHT, CENTER);
          text(charges[i].amount, tableX + col1 + col2 + col3 + col4 - 5, y + rowHeight/2);
        }
        
        let totalY = tableY + rowHeight + (charges.length * rowHeight);
        fill(255);
        rect(tableX, totalY, col1 + col2 + col3 + col4, rowHeight);
        stroke(200);
        line(tableX, totalY, tableX + col1 + col2 + col3 + col4, totalY);
        
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(BOLD);
        text('Total due for this view', tableX + 5, totalY + rowHeight/2);
        textAlign(RIGHT, CENTER);
        text('10,174.00', tableX + col1 + col2 + col3 + col4 - 5, totalY + rowHeight/2);
        textStyle(NORMAL);
        
        let totalDueY = totalY + rowHeight;
        fill(255);
        rect(tableX, totalDueY, col1 + col2 + col3 + col4, rowHeight);
        stroke(200);
        line(tableX, totalDueY, tableX + col1 + col2 + col3 + col4, totalDueY);
        
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(BOLD);
        text('Total due', tableX + 5, totalDueY + rowHeight/2);
        textAlign(RIGHT, CENTER);
        text('10,174.00', tableX + col1 + col2 + col3 + col4 - 5, totalDueY + rowHeight/2);
        textStyle(NORMAL);
        
        noStroke();
        
        fill(100);
        textSize(9);
        let disclaimer = "* The CSU makes every effort to keep student costs to a minimum. Fees listed in published schedules or student accounts may need to be increased when public funding is inadequate. Therefore, CSU must reserve the right, even after fees are initially charged or initial fee payments are made, to increase or modify any listed fees. All listed fees, other than mandatory systemwide fees, are subject to change without notice, until the date when instruction for a particular semester or quarter has begun.";
        let disclaimerY = tableY + rowHeight + (charges.length * rowHeight) + (rowHeight * 2) + 20;
        text(disclaimer, tableX, disclaimerY, width - 350, 200);
      }
      
      fill(255, 204, 0);
      rect(width - 280, height - 80, 250, 40);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('can\'t afford? we know, click here for help', width - 155, height - 60);
    } else if (currentTab === 'enrollment') {
      fill(255);
      rect(280, 170, width - 300, height - 190);
      
      let progressBarY = 180;
      let progressBarHeight = 60;
      
      fill(240);
      rect(300, progressBarY, width - 340, progressBarHeight);
      
      let stepWidth = (width - 340) / 3;
      let step1X = 300;
      let step2X = 300 + stepWidth;
      let step3X = 300 + stepWidth * 2;
      
      fill(255, 204, 0);
      ellipse(step1X + stepWidth/2, progressBarY + progressBarHeight/2, 35, 35 );
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      textStyle(BOLD);
      text('1', step1X + stepWidth/2, progressBarY + progressBarHeight/2);
      textStyle(NORMAL);
      fill(255, 204, 0);
      text('SELECT', step1X + stepWidth/2, progressBarY + progressBarHeight/2 + 25);
      
      fill(200);
      ellipse(step2X + stepWidth/2, progressBarY + progressBarHeight/2, 35, 35);
      fill(255);
      text('2', step2X + stepWidth/2, progressBarY + progressBarHeight/2);
      fill(200);
      text('CONFIRM', step2X + stepWidth/2, progressBarY + progressBarHeight/2 + 25);
      
      fill(200);
      ellipse(step3X + stepWidth/2, progressBarY + progressBarHeight/2, 35, 35);
      fill(255);
      text('3', step3X + stepWidth/2, progressBarY + progressBarHeight/2);
      fill(200);
      text('FINISH', step3X + stepWidth/2, progressBarY + progressBarHeight/2 + 25);
      
      let leftPanelX = 300;
      let leftPanelY = progressBarY + progressBarHeight + 20;
      let leftPanelW = 400;
      let leftPanelH = height - leftPanelY - 20;
      
      fill(240);
      rect(leftPanelX, leftPanelY, leftPanelW, leftPanelH);
      
      fill(0);
      textAlign(LEFT);
      textSize(16);
      textStyle(BOLD);
      text('Add to Cart', leftPanelX + 20, leftPanelY + 30);
      textStyle(NORMAL);
      
      fill(0);
      textSize(14);
      text('Class Number', leftPanelX + 20, leftPanelY + 70);
      
      fill(255);
      stroke(200);
      strokeWeight(1);
      rect(leftPanelX + 20, leftPanelY + 80, 200, 30);
      noStroke();
      
      fill(0);
      textSize(12);
      textAlign(LEFT);
      if (classNumberInput.length > 0) {
        text(classNumberInput, leftPanelX + 30, leftPanelY + 100);
      } else if (!inputFocused) {
        fill(150);
        text('Enter Class Number', leftPanelX + 30, leftPanelY + 100);
      }
      
      if (showHoldError) {
        fill(200, 0, 0);
        textSize(12);
        textAlign(LEFT);
        text('You must clear your Holds first', leftPanelX + 20, leftPanelY + 120);
      }
      
      fill(0, 100, 200);
      rect(leftPanelX + 230, leftPanelY + 80, 80, 30);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('Enter', leftPanelX + 270, leftPanelY + 95);
      
      fill(0);
      textAlign(LEFT);
      textSize(14);
      text('Find Classes', leftPanelX + 20, leftPanelY + 140);
      
      fill(0);
      ellipse(leftPanelX + 30, leftPanelY + 165, 12, 12);
      fill(255);
      ellipse(leftPanelX + 30, leftPanelY + 165, 8, 8);
      text('Class Search', leftPanelX + 50, leftPanelY + 170);
      
      fill(200);
      ellipse(leftPanelX + 30, leftPanelY + 190, 12, 12);
      text('My Requirements', leftPanelX + 50, leftPanelY + 195);
      
      let rightPanelX = leftPanelX + leftPanelW + 20;
      let rightPanelW = width - rightPanelX - 20;
      
      fill(240);
      rect(rightPanelX, leftPanelY, rightPanelW, leftPanelH);
      
      fill(0);
      textAlign(LEFT);
      textSize(16);
      textStyle(BOLD);
      text('Current Term Shopping Cart', rightPanelX + 20, leftPanelY + 30);
      textStyle(NORMAL);
      
      fill(0, 100, 200);
      rect(rightPanelX + rightPanelW - 60, leftPanelY + 10, 40, 30);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(14);
      textStyle(BOLD);
      text('0', rightPanelX + rightPanelW - 40, leftPanelY + 25);
      textStyle(NORMAL);
      
      fill(100);
      textAlign(LEFT);
      textSize(14);
      text('Your enrollment shopping cart is empty.', rightPanelX + 20, leftPanelY + 60);
      
      if (enrollmentStartTime === null) {
        enrollmentStartTime = millis();
      }
      
      let elapsedTime = millis() - enrollmentStartTime;
      let timeRequired = 90000;
      
      if (elapsedTime >= timeRequired) {
        fill(255, 204, 0);
        rect(leftPanelX + 20, leftPanelY + 280, 350, 40);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(12);
        text('I somehow signed up for classes successfully', leftPanelX + 195, leftPanelY + 300);
      }
      
    } else {
      if (currentTab === 'holds') {
        fill(0);
        textAlign(LEFT);
        textSize(20);
        text('Holds', 300, 210);
        
        let holdY = 250;
        let holdHeight = 120;
        let holdWidth = width - 340;
        
        fill(255);
        stroke(200);
        strokeWeight(1);
        rect(300, holdY, holdWidth, holdHeight);
        noStroke();
        
        fill(0);
        textSize(14);
        textStyle(BOLD);
        text('Enroll in Health insurance.', 310, holdY + 25);
        textStyle(NORMAL);
        
        fill(100);
        textSize(12);
        text('Provider: You Don\'t Get To Choose', 310, holdY + 45);
        text('Term: Every Term', 310, holdY + 60);
        text('Amount: $1,000.00', 310, holdY + 75);
        text('Description: Every International Student Must Enroll in a Health Insurance Plan. We know there are cheaper options and better ones, we know.', 310, holdY + 90, holdWidth - 20, 30);
      } else {
        let content = {
          'todo': { title: 'To Do List', text: 'Sign up for Art 101, Art 1 and Art 2' },
          'messages': { title: 'View My Messages', text: 'From: School\nEnroll for your semester asap before spaces are filled up. Start enrolling at "Academics: Enrollment"\n\nFrom: International Student\nTo: Mom\nDon\'t worry mom, I\'m doing fine, I\'ll help pay tuitio...' },
          'payment': { title: 'Make a Payment', text: 'Payment Center\nCurrent Balance: $0.00\nNo payment required at this time.' }
        };
        
        if (content[currentTab]) {
          fill(0);
          textAlign(LEFT);
          textSize(20);
          text(content[currentTab].title, 300, 210);
          
          if (currentTab === 'messages') {
            let message1Y = 250;
            let message1H = 80;
            let message2Y = message1Y + message1H + 20;
            let message2H = 80;
            let messageW = width - 340;
            
            fill(240);
            stroke(200);
            strokeWeight(1);
            rect(300, message1Y, messageW, message1H);
            noStroke();
            
            fill(0);
            textAlign(LEFT);
            textSize(14);
            text('From: School', 320, message1Y + 25);
            fill(100);
            textSize(12);
            let textW = messageW - 40;
            text('Enroll for your semester asap before spaces are filled up', 320, message1Y + 35, textW, 30);
            text('Start enrolling at "Academics: Enrollment".', 320, message1Y + 60, textW, 20);
            
            fill(240);
            stroke(200);
            strokeWeight(1);
            rect(300, message2Y, messageW, message2H);
            noStroke();
            
            fill(0);
            textAlign(LEFT);
            textSize(14);
            text('From: International Student', 320, message2Y + 25);
            text('To: Mom', 320, message2Y + 42);
            fill(100);
            textSize(12);
            text('Don\'t worry mom, I\'m doing fine, I\'ll help pay tuitio...', 320, message2Y + 55, textW, 20);
          } else {
            textSize(14);
            fill(100);
            let lines = content[currentTab].text.split('\n');
            for (let i = 0; i < lines.length; i++) {
              text(lines[i], 300, 250 + i * 25);
            }
          }
        }
      }
    }
    
    fill(100);
    textAlign(LEFT);
    textSize(12);
    text('Press H for Help', 300, height - 30);
  }
  
  this.mousePressed = function() {
    let headerX = 20;
    let headerY = 10;
    let headerW = 300;
    let headerH = 40;
    
    if (mouseX >= headerX && mouseX <= headerX + headerW &&
        mouseY >= headerY && mouseY <= headerY + headerH) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneIntro);
      return;
    }
    
    for (let tab of tabRects) {
      if (mouseX >= tab.x && mouseX <= tab.x + tab.w &&
          mouseY >= tab.y && mouseY <= tab.y + tab.h) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        currentTab = tab.name;
        if (tab.name !== 'enrollment') {
          classNumberInput = '';
          showHoldError = false;
          inputFocused = false;
        }
        return;
      }
    }
    
    if (mouseX > width - 100 && mouseX < width - 20 &&
        mouseY > 10 && mouseY < 50) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneIntro);
      return;
    }
    
    if (mouseX > width - 200 && mouseX < width - 20 &&
        mouseY > 120 && mouseY < 150) {
      if (errorSound) {
        if (entranceSound && entranceSound.isPlaying()) {
          entranceSound.stop();
        }
        if (clickSound && clickSound.isPlaying()) {
          clickSound.stop();
        }
        if (errorSound.isPlaying()) {
          errorSound.stop();
        }
        errorSound.play();
      }
    }
    
    if (currentTab === 'enrollment') {
      let progressBarY = 180;
      let progressBarHeight = 60;
      let leftPanelX = 300;
      let leftPanelY = progressBarY + progressBarHeight + 20;
      let inputFieldX = leftPanelX + 20;
      let inputFieldY = leftPanelY + 80;
      let inputFieldW = 200;
      let inputFieldH = 30;
      let enterButtonX = leftPanelX + 230;
      let enterButtonY = inputFieldY;
      let enterButtonW = 80;
      let enterButtonH = 30;
      
      if (mouseX >= inputFieldX && mouseX <= inputFieldX + inputFieldW &&
          mouseY >= inputFieldY && mouseY <= inputFieldY + inputFieldH) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        classNumberInput = '';
        showHoldError = false;
        inputFocused = true;
        return;
      }
      
      if (mouseX >= enterButtonX && mouseX <= enterButtonX + enterButtonW &&
          mouseY >= enterButtonY && mouseY <= enterButtonY + enterButtonH) {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        showHoldError = true;
        return;
      }
      
      if (enrollmentStartTime === null) {
        enrollmentStartTime = millis();
      }
      
      let elapsedTime = millis() - enrollmentStartTime;
      let timeRequired = 90000;
      
      if (elapsedTime >= timeRequired) {
        let signUpButtonX = leftPanelX + 20;
        let signUpButtonY = leftPanelY + 280;
        let signUpButtonW = 350;
        let signUpButtonH = 40;
        
        if (mouseX >= signUpButtonX && mouseX <= signUpButtonX + signUpButtonW &&
            mouseY >= signUpButtonY && mouseY <= signUpButtonY + signUpButtonH) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        classesSignedUp = true;
        currentTab = 'finances';
        return;
        }
      }
      
      inputFocused = false;
    }
    
    if (currentTab === 'holds') {
      let holdY = 250;
      let holdHeight = 120;
      let holdWidth = width - 340;
      
      if (mouseX >= 300 && mouseX <= 300 + holdWidth &&
          mouseY >= holdY && mouseY <= holdY + holdHeight) {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        holdRejectionMessage = 'You don\'t have enough money';
        this.sceneManager.showScene(SceneRejected);
        return;
      }
    }
    
    if (currentTab === 'finances') {
      if (mouseX > width - 280 && mouseX < width - 30 &&
          mouseY > height - 80 && mouseY < height - 40) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        this.sceneManager.showScene(SceneScholarships);
      }
    }
  }
  
  this.keyPressed = function() {
    if (key === 'h' || key === 'H') {
      this.sceneManager.showScene(SceneHelp);
    }
    
    if (currentTab === 'enrollment' && inputFocused) {
      if (key === 'Backspace') {
        classNumberInput = classNumberInput.slice(0, -1);
      } else if (key === 'Enter') {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        showHoldError = true;
      } else if (key.length === 1 && key !== 'Enter') {
        classNumberInput += key;
      }
    }
  }
}

function SceneScholarships(p) {
  let currentPage = 1;
  
  this.setup = function() {
  }
  
  this.enter = function() {
    currentPage = 1;
  }
  
  this.draw = function() {
    background(245, 245, 245);
    
    drawHeaderWithLogo();
    drawTabs();
    
    fill(255);
    rect(260, 60, width - 260, height - 60);
    
    fill(0, 33, 66);
    rect(260, 60, width - 260, 50);
    fill(255);
    textAlign(LEFT);
    
    if (currentPage === 3) {
      textSize(18);
      text('Find a Job', 280, 90);
      
      fill(240);
      rect(280, 110, width - 300, height - 130);
      
      fill(0);
      textAlign(LEFT);
      textSize(16);
      text('Job Search', 300, 140);
      
      textSize(14);
      fill(0);
      text('You have 3 options,', 300, 170);
      text('Note: you still have to pay Federal Taxes though you are not a US Citizen, and this tax will not benefit you but only the US Citizens', 300, 190);
      
      let optionY = 220;
      let optionHeight = 80;
      let optionSpacing = 20;
      
      fill(255);
      stroke(200);
      strokeWeight(1);
      rect(300, optionY, width - 340, optionHeight);
      noStroke();
      fill(0);
      textSize(12);
      textStyle(BOLD);
      text('1. On Campus Job', 310, optionY + 20);
      textStyle(NORMAL);
      fill(100);
      textSize(11);
      text('Don\'t really relate to your major, have limited hours, low wage.', 310, optionY + 40, width - 360, 40);
      
      optionY += optionHeight + optionSpacing;
      fill(255);
      stroke(200);
      strokeWeight(1);
      rect(300, optionY, width - 340, optionHeight);
      noStroke();
      fill(0);
      textSize(12);
      textStyle(BOLD);
      text('2. Off Campus Job', 310, optionY + 20);
      textStyle(NORMAL);
      fill(100);
      textSize(11);
      text('Have to relate to your major (peak difficulty), if you get the job,', 310, optionY + 35, width - 360, 20);
      text('you have to take a class (and pay money for more units) to start working (for 1 semester max), and repeat if you want to continue working.', 310, optionY + 50, width - 360, 20);
      
      optionY += optionHeight + optionSpacing;
      fill(255);
      stroke(200);
      strokeWeight(1);
      rect(300, optionY, width - 340, optionHeight);
      noStroke();
      fill(0);
      textSize(12);
      textStyle(BOLD);
      text('3. Get Sponsored to Work', 310, optionY + 20);
      textStyle(NORMAL);
      fill(100);
      textSize(11);
      text('Company will pay government and you just for you to work (peak difficulty)', 310, optionY + 40, width - 360, 40);
    } else {
      textSize(18);
      text('Scholarships Available', 280, 90);
      
      fill(240);
      rect(280, 110, width - 300, height - 130);
      
      fill(0);
      textAlign(LEFT);
      textSize(16);
      text('Applying for Scholarships', 300, 140);
      
      textSize(12);
      fill(100);
      text('Below is a list of available scholarships:', 300, 165);
    }
    
    let scholarships = [
      { name: "Bright Futures Scholarship", req: "For US citizens only because apparently they are the only ones with bright futures." },
      { name: "Heritage and Diversity Scholarship", req: "Oh this one? Also for US citizens only. Irony fully intended." },
      { name: "Future Innovators Scholarship", req: "Nope, not you if you are international. US citizens only, because innovation has borders now." },
      { name: "Green Horizon Scholarship", req: "We love international students but not enough to actually fund you. US citizens only." },
      { name: "Leadership Excellence Scholarship", req: "For international students that magically qualify as US citizens. So basically not you." },
      { name: "Creative Arts Talent Scholarship", req: "For US citizens only, since creativity apparently stops at customs." },
      { name: "National Scholars in Education", req: "Yup, you guessed it, US citizens only. Education for all, but funding for some." },
      { name: "Pathway to Medicine Scholarship", req: "US citizens only because healing people requires the correct passport." },
      { name: "Veterans' Legacy Scholarship", req: "US citizens only. Legacy must be domestic since global contributions do not count today." },
      { name: "Global Citizenship Scholarship", req: "The name says global but the funding says US citizens only. Love the contradiction." },
      { name: "Women in STEM Scholarship", req: "Women in STEM... as long as they are US citizens. Everyone else can try manifesting tuition money." },
      { name: "Community Impact Scholarship", req: "For US citizens only. International students do not impact communities enough apparently." },
      { name: "Innovators of Tomorrow Scholarship", req: "US citizens only. Tomorrow does not include internationals I guess." },
      { name: "Dreamer's Pathway Scholarship", req: "US citizens only. Dreams must show proof of citizenship at the door." },
      { name: "Academic Excellence Scholarship", req: "For US citizens only because excellence is strictly a domestic import." },
      { name: "Diversity Leadership Scholarship", req: "We love diversity but only the passport kind. US citizens only." },
      { name: "Sustainability and Climate Change Scholarship", req: "US citizens only, even though the climate crisis is very much global. Make it make sense." },
      { name: "Tech Visionaries Scholarship", req: "US citizens only. Vision apparently does not cross national borders." },
      { name: "Entrepreneurial Spirit Scholarship", req: "For US citizens only. Even if your startup idea is better. Sorry not sorry." },
      { name: "Public Service Scholarship", req: "US citizens only. International students can serve the public emotionally, I guess, but not with financial support." }
    ];
    
    if (currentPage !== 3) {
      let y = 200;
      let itemHeight = 50;
      let startIdx = (currentPage - 1) * 10;
      let endIdx = min(startIdx + 10, scholarships.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        fill(255);
        rect(280, y - 5, width - 300, itemHeight);
        
        fill(0, 33, 66);
        textSize(12);
        text(scholarships[i].name, 290, y + 8);
        
        fill(100);
        textSize(10);
        text('Requirements: ' + scholarships[i].req, 290, y + 25, width - 320, 20);
        
        y += itemHeight + 5;
      }
    }
    
    if (currentPage === 1) {
      fill(255, 204, 0);
      rect(width - 280, height - 60, 120, 40);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text('More', width - 220, height - 40);
    } else if (currentPage === 2) {
      fill(255, 204, 0);
      rect(width - 280, height - 60, 120, 40);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text('More', width - 220, height - 40);
    }
    
    fill(0, 33, 66);
    rect(width - 200, height - 60, 180, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Back to Finances', width - 110, height - 40);
    
    fill(100);
    textAlign(LEFT);
    textSize(12);
    text('Press H for Help', 300, height - 30);
  }
  
  this.mousePressed = function() {
    for (let tab of tabRects) {
      if (mouseX >= tab.x && mouseX <= tab.x + tab.w &&
          mouseY >= tab.y && mouseY <= tab.y + tab.h) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        currentTab = tab.name;
        this.sceneManager.showScene(SceneMain);
        return;
      }
    }
    
    let headerX = 20;
    let headerY = 10;
    let headerW = 300;
    let headerH = 40;
    
    if (mouseX >= headerX && mouseX <= headerX + headerW &&
        mouseY >= headerY && mouseY <= headerY + headerH) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneIntro);
      return;
    }
    
    if (currentPage !== 3) {
      let scholarships = [
        { name: "Bright Futures Scholarship", req: "For US citizens only because apparently they are the only ones with bright futures." },
        { name: "Heritage and Diversity Scholarship", req: "Oh this one? Also for US citizens only. Irony fully intended." },
        { name: "Future Innovators Scholarship", req: "Nope, not you if you are international. US citizens only, because innovation has borders now." },
        { name: "Green Horizon Scholarship", req: "We love international students but not enough to actually fund you. US citizens only." },
        { name: "Leadership Excellence Scholarship", req: "For international students that magically qualify as US citizens. So basically not you." },
        { name: "Creative Arts Talent Scholarship", req: "For US citizens only, since creativity apparently stops at customs." },
        { name: "National Scholars in Education", req: "Yup, you guessed it, US citizens only. Education for all, but funding for some." },
        { name: "Pathway to Medicine Scholarship", req: "US citizens only because healing people requires the correct passport." },
        { name: "Veterans' Legacy Scholarship", req: "US citizens only. Legacy must be domestic since global contributions do not count today." },
        { name: "Global Citizenship Scholarship", req: "The name says global but the funding says US citizens only. Love the contradiction." },
        { name: "Women in STEM Scholarship", req: "Women in STEM... as long as they are US citizens. Everyone else can try manifesting tuition money." },
        { name: "Community Impact Scholarship", req: "For US citizens only. International students do not impact communities enough apparently." },
        { name: "Innovators of Tomorrow Scholarship", req: "US citizens only. Tomorrow does not include internationals I guess." },
        { name: "Dreamer's Pathway Scholarship", req: "US citizens only. Dreams must show proof of citizenship at the door." },
        { name: "Academic Excellence Scholarship", req: "For US citizens only because excellence is strictly a domestic import." },
        { name: "Diversity Leadership Scholarship", req: "We love diversity but only the passport kind. US citizens only." },
        { name: "Sustainability and Climate Change Scholarship", req: "US citizens only, even though the climate crisis is very much global. Make it make sense." },
        { name: "Tech Visionaries Scholarship", req: "US citizens only. Vision apparently does not cross national borders." },
        { name: "Entrepreneurial Spirit Scholarship", req: "For US citizens only. Even if your startup idea is better. Sorry not sorry." },
        { name: "Public Service Scholarship", req: "US citizens only. International students can serve the public emotionally, I guess, but not with financial support." }
      ];
      
      let startIdx = (currentPage - 1) * 10;
      let endIdx = min(startIdx + 10, scholarships.length);
      let y = 200;
      let itemHeight = 50;
      
      for (let i = startIdx; i < endIdx; i++) {
        let scholarshipRect = {
          x: 280,
          y: y - 5,
          w: width - 300,
          h: itemHeight
        };
        
        if (mouseX >= scholarshipRect.x && mouseX <= scholarshipRect.x + scholarshipRect.w &&
            mouseY >= scholarshipRect.y && mouseY <= scholarshipRect.y + scholarshipRect.h) {
          if (errorSound) {
            if (entranceSound && entranceSound.isPlaying()) {
              entranceSound.stop();
            }
            if (clickSound && clickSound.isPlaying()) {
              clickSound.stop();
            }
            if (errorSound.isPlaying()) {
              errorSound.stop();
            }
            errorSound.play();
          }
          this.sceneManager.showScene(SceneRejected);
          return;
        }
        
        y += itemHeight + 5;
      }
    }
    
    if (currentPage === 3) {
      let optionY = 200;
      let optionHeight = 80;
      let optionSpacing = 20;
      
      let option1Y = optionY;
      let option2Y = optionY + optionHeight + optionSpacing;
      let option3Y = optionY + (optionHeight + optionSpacing) * 2;
      
      if (mouseX >= 300 && mouseX <= width - 40 &&
          mouseY >= option1Y && mouseY <= option1Y + optionHeight) {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        jobRejectionMessage = 'Not enough money to afford school';
        this.sceneManager.showScene(SceneJobRejected);
        return;
      }
      
      if (mouseX >= 300 && mouseX <= width - 40 &&
          mouseY >= option2Y && mouseY <= option2Y + optionHeight) {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        jobRejectionMessage = 'Not enough money to take this class';
        this.sceneManager.showScene(SceneJobRejected);
        return;
      }
      
      if (mouseX >= 300 && mouseX <= width - 40 &&
          mouseY >= option3Y && mouseY <= option3Y + optionHeight) {
        stopAllSounds();
        if (errorSound) {
          errorSound.play();
        }
        jobRejectionMessage = 'Companies doesn\'t trust you to sponsor yet';
        this.sceneManager.showScene(SceneJobRejected);
        return;
      }
    }
    
    if (currentPage === 1 || currentPage === 2) {
      if (mouseX > width - 280 && mouseX < width - 160 &&
          mouseY > height - 60 && mouseY < height - 20) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        currentPage = currentPage + 1;
        return;
      }
    }
    
    if (mouseX > width - 200 && mouseX < width - 20 &&
        mouseY > height - 60 && mouseY < height - 20) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      currentTab = 'finances';
      this.sceneManager.showScene(SceneMain);
    }
  }
  
  this.keyPressed = function() {
    if (key === 'Escape' || key === 'h' || key === 'H') {
      currentTab = 'finances';
      this.sceneManager.showScene(SceneMain);
    }
  }
}

function SceneRejected(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
    if (errorSound) {
      if (entranceSound && entranceSound.isPlaying()) {
        entranceSound.stop();
      }
      if (clickSound && clickSound.isPlaying()) {
        clickSound.stop();
      }
      if (errorSound.isPlaying()) {
        errorSound.stop();
      }
      errorSound.play();
    }
  }
  
  this.draw = function() {
    background(245, 245, 245);
    
    drawHeaderWithLogo();
    drawTabs();
    
    fill(255);
    rect(260, 60, width - 260, height - 60);
    
    fill(0, 33, 66);
    rect(260, 60, width - 260, 50);
    fill(255);
    textAlign(LEFT);
    textSize(18);
    if (holdRejectionMessage) {
      text('Health Insurance Enrollment', 280, 90);
    } else {
      text('Scholarship Application', 280, 90);
    }
    
    fill(240);
    rect(280, 110, width - 300, height - 130);
    
    fill(200, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    if (holdRejectionMessage) {
      text(holdRejectionMessage, width/2, height/2 - 50);
    } else {
      text('No, we know you\'re international student', width/2, height/2 - 50);
    }
    
    fill(100);
    textSize(16);
    if (holdRejectionMessage) {
      text('This action is not available for you.', width/2, height/2);
      text('View Finances tab for Finance Assistance', width/2, height/2 + 30);
    } else {
      text('This scholarship is not available for international students.', width/2, height/2);
    }
    
    fill(0, 33, 66);
    rect(width - 200, height - 60, 180, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    if (holdRejectionMessage) {
      text('Back to Holds', width - 110, height - 40);
    } else {
      text('Back to Scholarships', width - 110, height - 40);
    }
    
    fill(100);
    textAlign(LEFT);
    textSize(12);
    text('Press H for Help', 300, height - 30);
  }
  
  this.mousePressed = function() {
    for (let tab of tabRects) {
      if (mouseX >= tab.x && mouseX <= tab.x + tab.w &&
          mouseY >= tab.y && mouseY <= tab.y + tab.h) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        currentTab = tab.name;
        this.sceneManager.showScene(SceneMain);
        return;
      }
    }
    
    let headerX = 20;
    let headerY = 10;
    let headerW = 300;
    let headerH = 40;
    
    if (mouseX >= headerX && mouseX <= headerX + headerW &&
        mouseY >= headerY && mouseY <= headerY + headerH) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneIntro);
      return;
    }
    
    if (mouseX > width - 200 && mouseX < width - 20 &&
        mouseY > height - 60 && mouseY < height - 20) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      if (holdRejectionMessage) {
        holdRejectionMessage = '';
        this.sceneManager.showScene(SceneMain);
      } else {
        this.sceneManager.showScene(SceneScholarships);
      }
    }
  }
  
  this.keyPressed = function() {
    if (key === 'Escape') {
      if (holdRejectionMessage) {
        holdRejectionMessage = '';
        this.sceneManager.showScene(SceneMain);
      } else {
        this.sceneManager.showScene(SceneScholarships);
      }
    }
  }
}

function SceneJobRejected(p) {
  this.setup = function() {
  }
  
  this.enter = function() {
    if (errorSound) {
      if (entranceSound && entranceSound.isPlaying()) {
        entranceSound.stop();
      }
      if (clickSound && clickSound.isPlaying()) {
        clickSound.stop();
      }
      if (errorSound.isPlaying()) {
        errorSound.stop();
      }
      errorSound.play();
    }
  }
  
  this.draw = function() {
    background(245, 245, 245);
    
    drawHeaderWithLogo();
    drawTabs();
    
    fill(255);
    rect(260, 60, width - 260, height - 60);
    
    fill(0, 33, 66);
    rect(260, 60, width - 260, 50);
    fill(255);
    textAlign(LEFT);
    textSize(18);
    text('Job Application', 280, 90);
    
    fill(240);
    rect(280, 110, width - 300, height - 130);
    
    fill(200, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(jobRejectionMessage, width/2, height/2 - 50);
    
    fill(100);
    textSize(16);
    text('This job option is not available for you.', width/2, height/2);
    
    fill(0, 33, 66);
    rect(width - 200, height - 60, 180, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Back to Job Search', width - 110, height - 40);
    
    fill(100);
    textAlign(LEFT);
    textSize(12);
    text('Press H for Help', 400, height - 30);
  }
  
  this.mousePressed = function() {
    for (let tab of tabRects) {
      if (mouseX >= tab.x && mouseX <= tab.x + tab.w &&
          mouseY >= tab.y && mouseY <= tab.y + tab.h) {
        if (clickSound) {
          if (entranceSound && entranceSound.isPlaying()) {
            entranceSound.stop();
          }
          if (clickSound.isPlaying()) {
            clickSound.stop();
          }
          if (errorSound && errorSound.isPlaying()) {
            errorSound.stop();
          }
          clickSound.play();
        }
        currentTab = tab.name;
        this.sceneManager.showScene(SceneMain);
        return;
      }
    }
    
    let headerX = 20;
    let headerY = 10;
    let headerW = 300;
    let headerH = 40;
    
    if (mouseX >= headerX && mouseX <= headerX + headerW &&
        mouseY >= headerY && mouseY <= headerY + headerH) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneIntro);
      return;
    }
    
    if (mouseX > width - 200 && mouseX < width - 20 &&
        mouseY > height - 60 && mouseY < height - 20) {
      stopAllSounds();
      if (clickSound) {
        clickSound.play();
      }
      this.sceneManager.showScene(SceneScholarships);
    }
  }
  
  this.keyPressed = function() {
    if (key === 'Escape') {
      this.sceneManager.showScene(SceneScholarships);
    }
  }
}

