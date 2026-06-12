let balls = [];
let lastSpawnTime = 0;
let baskets = [];
let mgMonsters = [];
const fruits = [
    { name: 'orange', rgb: [255, 189, 146], emoji: '🍊' },
    { name: 'blueberry', rgb: [146, 180, 255], emoji: '🫐' },
    { name: 'apple', rgb: [137, 177, 95], emoji: '🍎' },
    { name: 'strawberry', rgb: [255, 153, 193], emoji: '🍓' },
    { name: 'lemon', rgb: [254, 255, 153], emoji: '🍋' },
    { name: 'grape', rgb: [207, 177, 255], emoji: '🍇' }
];

class QNMonster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.angle = random(-0.6, 0.6);
        this.scale = random(0.75, 1.2);
        
        this.bodyWidth = random(44, 58);
        this.bodyHeight = random(34, 46);
        this.headSize = random(28, 38);
        this.eyeColor = color(255, random(20, 80), random(20, 80));
        this.pupilSize = random(3, 4.5);
        this.mouthWidth = random(18, 26);
        this.mouthHeight = random(6, 10);
        this.armLen = random(16, 24);
        this.legLen = random(12, 18);
        this.spikeCount = floor(random(2, 5));
        this.altComposition = random() < 0.45;
        
        this.spinSpeed = random() < 0.45 ? random(-0.03, 0.04) : 0;
        this.wiggleAmp = random() < 0.55 ? random(2, 6) : 0;
        this.wiggleSpeed = random() < 0.55 ? random(1.0, 3.0) : 0;
        this.wigglePhase = random(TWO_PI);
        
        this.isSelected = false;
        this.pulseScale = 1.0;
        this.energy = 100;
        this.bodyColor = color(80, 40, 20);
        this.headColor = color(100, 60, 30);
    }
    
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        scale(this.scale * this.pulseScale);
        
        this.drawShadow();
        
        this.drawBody();
        this.drawHead();
        this.drawEyes();
        this.drawMouth();
        this.drawArms();
        this.drawLegs();
        
        if (this.altComposition) {
            this.drawAntennae();
        } else {
            this.drawSpikes();
        }
        
        
        pop();
    }
    
    drawShadow() {
        push();
        noStroke();
        fill(0, 40);
        ellipse(0, 18, 40, 10);
        pop();
    }
    
    drawBody() {
        noStroke();
        fill(this.bodyColor);
        rectMode(CENTER);
        rect(0, 5, this.bodyWidth, this.bodyHeight, 8);
    }
    
    drawHead() {
        fill(this.headColor);
        ellipse(0, -15, this.headSize, this.headSize);
    }
    
    drawEyes() {
        fill(this.eyeColor);
        ellipse(-8, -20, 8, 8);
        ellipse(8, -20, 8, 8);
        fill(255);
        ellipse(-8, -20, this.pupilSize, this.pupilSize);
        ellipse(8, -20, this.pupilSize, this.pupilSize);
    }
    
    drawMouth() {
        fill(0);
        rect(0, -8, this.mouthWidth, this.mouthHeight, 2);
    }
    
    drawArms() {
        fill(80, 40, 20);
        rect(-25, 0, 8, this.armLen, 4);
        rect(25, 0, 8, this.armLen, 4);
    }
    
    drawLegs() {
        fill(80, 40, 20);
        rect(-12, 25, 8, this.legLen, 3);
        rect(12, 25, 8, this.legLen, 3);
    }
    
    drawSpikes() {
        fill(60, 30, 10);
        const count = max(0, this.spikeCount);
        for (let i = 0; i < count; i++) {
            const dx = map(i, 0, count - 1, -8, 8);
            rect(dx, -30 - (i === 0 ? 2 : 0), 4, 6 + (i === 1 ? 2 : 0), 1);
        }
    }
    
    drawAntennae() {
        stroke(60, 30, 10);
        strokeWeight(2);
        noFill();
        bezier(-6, -30, -10, -42, -2, -48, -2, -54);
        bezier(6, -30, 10, -42, 2, -48, 2, -54);
        noStroke();
        fill(60, 30, 10);
        ellipse(-2, -54, 5, 5);
        ellipse(2, -54, 5, 5);
    }
    
    drawSelectionRing() {
        push();
        noFill();
        stroke(255, 255, 0);
        strokeWeight(3);
        ellipse(0, 0, 60, 60);
        pop();
    }
    
    changeColor() {
        const randomFruit = fruits[floor(random(fruits.length))];
        const fruitColor = randomFruit.rgb;
        
        this.bodyColor = color(fruitColor[0], fruitColor[1], fruitColor[2]);
        this.headColor = color(
            constrain(fruitColor[0] - 20, 0, 255),
            constrain(fruitColor[1] - 20, 0, 255),
            constrain(fruitColor[2] - 20, 0, 255)
        );
        
        this.pulseScale = 1.3;
        console.log("Monster color changed to: " + randomFruit.name);
    }
    
    changeEnergy(amount) {
        this.energy = constrain(this.energy + amount, 0, 100);
        this.scale = map(this.energy, 0, 100, 0.5, 1.5);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 30 || this.x > width - 30) {
            this.vx = -this.vx;
            this.x = constrain(this.x, 30, width - 30);
        }
        if (this.y < 30 || this.y > height - 30) {
            this.vy = -this.vy;
            this.y = constrain(this.y, 30, height - 30);
        }
        
        const t = millis() / 1000.0;
        this.angle += this.spinSpeed;
        
        if (this.wiggleAmp > 0) {
            const dx = this.wiggleAmp * Math.sin(t * this.wiggleSpeed + this.wigglePhase);
            const dy = 0.6 * this.wiggleAmp * Math.cos(t * (this.wiggleSpeed * 0.8) + this.wigglePhase * 1.3);
            this.x += dx * 0.1;
            this.y += dy * 0.1;
        }
        
        if (this.pulseScale > 1.0) {
            this.pulseScale = lerp(this.pulseScale, 1.0, 0.1);
        }
    }
}

function setup() {
    createCanvas(600, 500);
    
    balls.push({
        x: width / 2,
        y: height / 2,
        speedx: random(-5, 5),
        speedy: random(-5, 5),
        fruitIndex: floor(random(fruits.length))
    });

    const margin = 60;
    baskets.push({ x: margin, y: margin, angle: 0, angVel: 0.02, scale: 1.0, mouthOffsetY: -10, mouthRadius: 20 });
    baskets.push({ x: width - margin, y: height - margin, angle: 0, angVel: -0.025, scale: 1.1, mouthOffsetY: -12, mouthRadius: 22 });

    for (let i = 0; i < 18; i++) {
        const cx = random(60, width - 60);
        const cy = random(60, height - 60);
        mgMonsters.push(new QNMonster(cx, cy));
    }
    
    console.log("Created " + mgMonsters.length + " QNMonster objects");
}

function draw() {
    background(190, 207, 145);
    push();
    textAlign(CENTER, CENTER);
    textSize(width/15);
    fill(60, 80);
    translate(width / 2, height / 2);
    rotate(radians(-25));
    text('FRUIT vs FRUIT MONSTER 2.0', 0, 0);
    pop();
    
    textAlign(LEFT, TOP);
    textSize(12);
    fill(255, 255, 0);
    text("Monsters: " + mgMonsters.length + " | Balloons: " + balls.length, 10, 10);
    
    for (let k = 0; k < baskets.length; k++) {
        const bk = baskets[k];
        bk.angle += bk.angVel;
        drawBasket(bk);
    }

    for (let i = balls.length - 1; i >= 0; i--) {
        let b = balls[i];
        
        if (b.x < 0) {
            b.speedx = -b.speedx;
            b.x = 0;
            b.speedy += random(-1, 1);
            changeFruit(b);
            if (millis() - lastSpawnTime > 500) {
                createNewBall(b.x, b.y);
                lastSpawnTime = millis();
            }
        }
        if (b.x > width) {
            b.speedx = -b.speedx;
            b.x = width;
            b.speedy += random(-1, 1);
            changeFruit(b);
            if (millis() - lastSpawnTime > 500) {
                createNewBall(b.x, b.y);
                lastSpawnTime = millis();
            }
        }
        if (b.y < 0) {
            b.speedy = -b.speedy;
            b.y = 0;
            b.speedx += random(-1, 1);
            changeFruit(b);
            if (millis() - lastSpawnTime > 5000) {
                createNewBall(b.x, b.y);
                lastSpawnTime = millis();
            }
        }
        if (b.y > height) {
            b.speedy = -b.speedy;
            b.y = height;
            b.speedx += random(-1, 1);
            changeFruit(b);
            if (millis() - lastSpawnTime > 5000) {
                createNewBall(b.x, b.y);
                lastSpawnTime = millis();
            }
        }

        b.x += b.speedx;
        b.y += b.speedy;
        
        let removed = false;
        for (let k = 0; k < baskets.length; k++) {
            const bk = baskets[k];
            const mouth = basketMouthWorld(bk);
            const mr = bk.mouthRadius * (bk.scale || 1);
            const dx = b.x - mouth.x;
            const dy = b.y - mouth.y;
            if (dx * dx + dy * dy <= mr * mr) {
                balls.splice(i, 1);
                removed = true;
                break;
            }
        }
        if (removed) continue;

        ball(b.x, b.y, b.fruitIndex);
    }

    for (let i = 0; i < mgMonsters.length; i++) {
        mgMonsters[i].update();
        mgMonsters[i].display();
    }
}

function createNewBall(x, y) {
    balls.push({
        x: x,
        y: y,
        speedx: random(-5, 5),
        speedy: random(-5, 5),
        fruitIndex: floor(random(fruits.length))
    });
}

  function ball(lx,ly, fruitIndex) {
    const f = fruits[fruitIndex] || fruits[0];
    const c = f.rgb;
    noStroke();
    fill(c[0], c[1], c[2]);
    ellipse(lx, ly, 28, 28);
    fill(255, 255, 255, 35);
    ellipse(lx - 6, ly - 6, 9, 9);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(255);
    text(f.emoji, lx, ly + 18);
  }

  function changeFruit(ballRef) {
    if (fruits.length <= 1) return;
    let nextIndex = floor(random(fruits.length));
    if (typeof ballRef.fruitIndex === 'number') {
        if (nextIndex === ballRef.fruitIndex) {
            nextIndex = (nextIndex + 1) % fruits.length;
        }
    }
    ballRef.fruitIndex = nextIndex;
  }

  function drawBasket(bk) {
    push();
    translate(bk.x, bk.y);
    rotate(bk.angle);
    scale(bk.scale || 1);
    noStroke();
    
    fill(80, 40, 20);
    rectMode(CENTER);
    rect(0, 5, 50, 40, 8);
    
    fill(100, 60, 30);
    ellipse(0, -15, 35, 35);
    
    fill(255, 0, 0);
    ellipse(-8, -20, 8, 8);
    ellipse(8, -20, 8, 8);
  fill(255);
    ellipse(-8, -20, 4, 4);
    ellipse(8, -20, 4, 4);
    
    fill(0);
    rect(0, -8, 20, 8, 2);
    
    fill(80, 40, 20);
    rect(-25, 0, 8, 20, 4);
    rect(25, 0, 8, 20, 4);
    
    rect(-12, 25, 8, 15, 3);
    rect(12, 25, 8, 15, 3);
    
    fill(60, 30, 10);
    rect(0, -32, 4, 8, 1);
    rect(-8, -30, 4, 6, 1);
    rect(8, -30, 4, 6, 1);
    
    fill(255, 0, 0, 50);
    ellipse(0, bk.mouthOffsetY || -8, (bk.mouthRadius || 20) * 2, (bk.mouthRadius || 20) * 1.1);
    pop();
  }

  function basketMouthWorld(bk) {
    const s = bk.scale || 1;
    const lx = 0 * s;
    const ly = (bk.mouthOffsetY || -10) * s;
    const ca = Math.cos(bk.angle);
    const sa = Math.sin(bk.angle);
    return {
        x: bk.x + (lx * ca - ly * sa),
        y: bk.y + (lx * sa + ly * ca)
    };
  }

  function sdMonsterBody(bodyW, bodyH, bodyColor) {
    noStroke();
    fill(bodyColor || color(80, 40, 20));
    rectMode(CENTER);
    rect(0, 5, bodyW, bodyH, 8);
  }

  function sdMonsterHead(headSize, headColor) {
    fill(headColor || color(100, 60, 30));
    ellipse(0, -15, headSize, headSize);
  }

  function sdMonsterEyes(eyeColor, pupilSize) {
    fill(eyeColor || color(255, 0, 0));
    ellipse(-8, -20, 8, 8);
    ellipse(8, -20, 8, 8);
    fill(255);
    ellipse(-8, -20, pupilSize || 4, pupilSize || 4);
    ellipse(8, -20, pupilSize || 4, pupilSize || 4);
  }

  function sdMonsterMouth(mw, mh) {
    fill(0);
    rect(0, -8, mw || 20, mh || 8, 2);
  }

  function sdMonsterArms(armLen) {
    fill(80, 40, 20);
    rect(-25, 0, 8, armLen || 20, 4);
    rect(25, 0, 8, armLen || 20, 4);
  }

  function sdMonsterLegs(legLen) {
    fill(80, 40, 20);
    rect(-12, 25, 8, legLen || 15, 3);
    rect(12, 25, 8, legLen || 15, 3);
  }

  function sdMonsterSpikes(spikeCount) {
    fill(60, 30, 10);
    const count = max(0, spikeCount || 3);
    for (let i = 0; i < count; i++) {
        const dx = map(i, 0, count - 1, -8, 8);
        rect(dx, -30 - (i === 0 ? 2 : 0), 4, 6 + (i === 1 ? 2 : 0), 1);
    }
  }

  function sdMonsterAntennae() {
    stroke(60, 30, 10);
    strokeWeight(2);
    noFill();
    bezier(-6, -30, -10, -42, -2, -48, -2, -54);
    bezier(6, -30, 10, -42, 2, -48, 2, -54);
    noStroke();
    fill(60, 30, 10);
    ellipse(-2, -54, 5, 5);
    ellipse(2, -54, 5, 5);
  }

  function sdBrownMonsterParent(variant) {
    push();
    sdShadow();
    const v = variant || {};
    sdMonsterBody(v.bodyWidth || 50, v.bodyHeight || 40, color(80, 40, 20));
    sdMonsterHead(v.headSize || 35, color(100, 60, 30));
    sdMonsterEyes(v.eyeColor || color(255, 0, 0), v.pupilSize || 4);
    if (v.altComposition) {
        sdMonsterMouth(v.mouthWidth || 20, v.mouthHeight || 8);
        sdMonsterAntennae();
        sdMonsterAntennae();
    } else {
        sdMonsterMouth(v.mouthWidth || 20, v.mouthHeight || 8);
        sdMonsterSpikes(v.spikeCount || 3);
        sdMonsterSpikes(v.spikeCount || 3);
    }
    sdMonsterArms(v.armLen || 20);
    sdMonsterLegs(v.legLen || 15);
    pop();
  }


  function sdPlaceBrownMonster(x, y, angleRad, scaleFactor, variant) {
    push();
    translate(x, y);
    rotate(angleRad || 0);
    scale(scaleFactor || 1);
    sdBrownMonsterParent(variant);
    pop();
  }


  

  function sdShadow() {
    push();
    noStroke();
    fill(0, 40);
    ellipse(0, 18, 40, 10);
    pop();
  }


function mousePressed() {
    for (let i = 0; i < mgMonsters.length; i++) {
        const monster = mgMonsters[i];
        const distance = dist(mouseX, mouseY, monster.x, monster.y);
        if (distance < 30) {
            monster.changeColor();
        }
    }
}

function keyPressed() {
    console.log("Key pressed: '" + key + "' (keyCode: " + keyCode + ")");
    
    if (keyCode === UP_ARROW) {
        console.log("INCREASING size");
        for (let i = 0; i < mgMonsters.length; i++) {
            mgMonsters[i].changeEnergy(10);
            console.log("Monster " + i + " energy increased to: " + mgMonsters[i].energy);
        }
    } else if (keyCode === DOWN_ARROW) {
        console.log("DECREASING size");
        for (let i = 0; i < mgMonsters.length; i++) {
            mgMonsters[i].changeEnergy(-10);
            console.log("Monster " + i + " energy decreased to: " + mgMonsters[i].energy);
        }
    } else if (key === 'r' || key === 'R') {
        for (let i = 0; i < mgMonsters.length; i++) {
            mgMonsters[i].pulseScale = 1.0;
            mgMonsters[i].energy = 100;
            mgMonsters[i].scale = map(mgMonsters[i].energy, 0, 100, 0.5, 1.5);
            mgMonsters[i].bodyColor = color(80, 40, 20);
            mgMonsters[i].headColor = color(100, 60, 30);
        }
        console.log("All monsters reset");
    } else if (key === 'm' || key === 'M') {
        mgMonsters.push(new QNMonster(mouseX, mouseY));
        console.log("New monster created. Total monsters: " + mgMonsters.length);
    } else if (key === 'b' || key === 'B') {
        balls.push({
            x: mouseX,
            y: mouseY,
            speedx: random(-5, 5),
            speedy: random(-5, 5),
            fruitIndex: floor(random(fruits.length))
        });
        console.log("New balloon created. Total balloons: " + balls.length);
    }
}