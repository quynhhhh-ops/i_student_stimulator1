let balls = [];
let lastSpawnTime = 0;
let baskets = [];
let creatures = [];
const fruits = [
    { name: 'orange', rgb: [255, 189, 146], emoji: '🍊' },
    { name: 'blueberry', rgb: [146, 180, 255], emoji: '🫐' },
    { name: 'apple', rgb: [137, 177, 95], emoji: '🍎' },
    { name: 'strawberry', rgb: [255, 153, 193], emoji: '🍓' },
    { name: 'lemon', rgb: [254, 255, 153], emoji: '🍋' },
    { name: 'grape', rgb: [207, 177, 255], emoji: '🍇' }
];

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

    for (let i = 0; i < 14; i++) {
        const cx = random(60, width - 60);
        const cy = random(height * 0.45, height - 50);
        const angle = random(-0.6, 0.6);
        const scaleV = random(0.75, 1.2);
        const doSpin = random() < 0.45;
        const doWiggle = random() < 0.55;
        const spinSpeed = doSpin ? random(-0.03, 0.04) : 0;
        const wiggleAmp = doWiggle ? random(2, 6) : 0;
        const wiggleSpeed = doWiggle ? random(1.0, 3.0) : 0;
        const wigglePhase = random(TWO_PI);
        const variant = {
            bodyWidth: random(44, 58),
            bodyHeight: random(34, 46),
            headSize: random(28, 38),
            eyeColor: color(255, random(20, 80), random(20, 80)),
            pupilSize: random(3, 4.5),
            mouthWidth: random(18, 26),
            mouthHeight: random(6, 10),
            armLen: random(16, 24),
            legLen: random(12, 18),
            spikeCount: floor(random(2, 5)),
            altComposition: random() < 0.45
        };
        creatures.push({ x: cx, y: cy, angle: angle, scale: scaleV, v: variant, spinSpeed, wiggleAmp, wiggleSpeed, wigglePhase });
    }
}

function draw() {
    background(190, 207, 145);
    push();
    textAlign(CENTER, CENTER);
    textSize(width/15);
    fill(60, 80);
  translate(width / 2, height / 2);
  rotate(radians(-25));
  text('FRUIT vs FRUIT MONSTER', 0, 0);
    pop();
    
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

    const t = millis() / 1000.0;
    for (let i = 0; i < creatures.length; i++) {
        const c = creatures[i];
        const extraAngle = (c.spinSpeed || 0) * t * TWO_PI;
        const wiggle = c.wiggleAmp ? c.wiggleAmp : 0;
        const wSpeed = c.wiggleSpeed ? c.wiggleSpeed : 0;
        const phase = c.wigglePhase ? c.wigglePhase : 0;
        const dx = wiggle * Math.sin(t * wSpeed + phase);
        const dy = 0.6 * wiggle * Math.cos(t * (wSpeed * 0.8) + phase * 1.3);
        sdPlaceBrownMonster(c.x + dx, c.y + dy, c.angle + extraAngle, c.scale, c.v);
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


