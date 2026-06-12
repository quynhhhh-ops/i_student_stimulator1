
let sine1, sine2, sine3;
let hotdogImg;
let isPaused = false;
let recMode = false;
let can;

let particle_texture = null;
let ps = null;
let psA = null, psB = null, psC = null;
let currentAct = 1;

class sdSine {
  xcounter;
  ycounter;
  sincount;
  addcount;
  dir;
  freq;
  amp;

  constructor(lx,ly,ls,la,ld,lf,lamp) {
   this.xcounter = lx;
   this.ycounter = ly;
   this.sincount = ls;
   this.addcount = la;
   this.dir = ld;
   this.freq = lf;
   this.amp = lamp;
  }

  display() {
      push();
      translate(this.xcounter, this.sincount);
      if (random() < 0.5) {
       ellipse(0,0,80,60);
      } else {
       triangle(-30,30, 30,30, 0,-30);
      }
      pop();
  }

  displaySpiral() {
      push();
      let spiralRadius = this.xcounter * 0.2;
      let spiralAngle = this.xcounter * 0.1;
      let spiralX = this.xcounter + cos(spiralAngle) * spiralRadius;
      let spiralY = this.sincount + sin(spiralAngle) * spiralRadius;
      
      translate(spiralX, spiralY);
      if (random() < 0.5) {
       ellipse(0,0,80,60);
      } else {
       triangle(-30,30, 30,30, 0,-30);
      }
      pop();
  }

  update() {
      console.log( sin(this.ycounter));
      this.xcounter += 6;
      this.ycounter+= this.freq; 
      this.addcount += this.dir;
      this.sincount = sin(this.ycounter) * this.amp + 540 + this.addcount;
    
      if ( this.addcount < -50 ||  this.addcount > 50) {
      this.dir = -this.dir;
      }
  }

  getSine() {
    return  this.sincount;
  }

  setSineFreq(nf) {
   this.freq = nf;
  }
  }

function setup() {
 createCanvas(1920, 1080);
 frameRate(7);
 noLoop();
 
 if (hotdogImg) {
  image(hotdogImg, 0, 0, width, height);
 }
 
 sine1 = new sdSine(0, 0, 0, 0, random(-5,5), 0.1, 50);
 sine2 = new sdSine(0, 0, 0, 0, random(-3,3), 0.2, 30);
 sine3 = new sdSine(0, 0, 0, 0, random(-8,8), 0.05, 80);
 
 ps = new ParticleSystem(0, createVector(width - 100, height / 4), particle_texture);

 psA = new ParticleSystem(0, createVector(width * 0.15, height / 4), particle_texture);
 psB = new ParticleSystem(0, createVector(width * 0.50, height / 4), particle_texture);
 psC = new ParticleSystem(0, createVector(width * 0.85, height / 4), particle_texture);
 
}

function preload() {
 hotdogImg = loadImage("../../images/hotdog.png");
}

function draw() {
  if (isPaused) {
    return;
  }
  
  let currentFrame = frameCount % 900;
  
  if (currentFrame === 0) {
    background(0);
    if (hotdogImg) {
      image(hotdogImg, 0, 0, width, height);
    }
    sine1.xcounter = 0;
    sine2.xcounter = 0;
    sine3.xcounter = 0;
  }
  
  if (currentFrame < 300) {
    
    noStroke();
    fill(255, 153, 193, 200);
    sine1.setSineFreq(0.05);
    sine1.update();
    sine1.displaySpiral();
    
    noStroke();
    fill(254, 255, 153, 200);
    sine2.setSineFreq(0.15);
    sine2.update();
    sine2.display();
    
    noStroke();
    fill(137, 177, 95, 200);
    sine3.setSineFreq(0.25);
    sine3.update();
    sine3.display();
  }
  
  else if (currentFrame < 600) {
    background(0);
    
    if (hotdogImg) {
      image(hotdogImg, 0, 0, width, height);
    }
    
    let wind = createVector(-0.1, 0);
    
    ps.applyForce(wind);
    ps.run();
    for (let i = 0; i < 2; i++) {
      ps.addParticle();
    }
  }
  
  else if (currentFrame < 900) {

    let fade = constrain(map(currentFrame, 600, 720, 0, 255), 0, 255);
    noStroke();
    fill(0, fade);
    rect(0, 0, width, height);

    if (currentFrame === 600) {
      sine1.xcounter = 0; sine2.xcounter = 0; sine3.xcounter = 0;
    }
    
    noStroke();
    fill(255, 153, 193, 200);
    sine1.setSineFreq(0.05);
    sine1.update();
    sine1.sincount = sin(frameCount * 0.1) * height/2 + height/2;
    sine1.displaySpiral();
    
    noStroke();
    fill(254, 255, 153, 200);
    sine2.setSineFreq(0.15);
    sine2.update();
    sine2.sincount = sin(frameCount * 0.15) * height/2 + height/2;
    sine2.display();
    
    noStroke();
    fill(137, 177, 95, 200);
    sine3.setSineFreq(0.25);
    sine3.update();
    sine3.sincount = sin(frameCount * 0.2) * height/2 + height/2;
    sine3.display();
    
    let wind3 = createVector(-0.1, 0);
    psA.applyForce(wind3); psA.run(); for (let i = 0; i < 2; i++) { psA.addParticle(); }
    psB.applyForce(wind3); psB.run(); for (let i = 0; i < 2; i++) { psB.addParticle(); }
    psC.applyForce(wind3); psC.run(); for (let i = 0; i < 2; i++) { psC.addParticle(); }
  }
  
  recordit();
}

function keyPressed() {
  if (keyIsPressed === true) {
      let k = key;
      console.log("k is " + k);

      if (k == ' ') {
          console.log("Stopped Recording");
          recMode = false;
          noLoop();
      }

      if (k == 'r' || k == 'R') {
          console.log("Start Recording");
          recMode = true;
          loop();
      }

      if (k == 'x' || k == 'X') {
          console.log("Stopped Loop");
          noLoop();
      }

      if (k == 's' || k == 'S') {
          console.log("Start Loop");
          loop();
      }
      
    }
}

function recordit() {
  if (recMode == true) {
      let ext = nf(frameCount, 4);
      saveCanvas('frame-' + ext, 'jpg');
      console.log("rec " + ext);
  }
}

// Particle system classes
let ParticleSystem = function(num, v, img_) {
  this.particles = [];
  this.origin = v.copy();
  this.img = img_
  for(let i = 0; i < num; ++i){
    this.particles.push(new Particle(this.origin, this.img));
  }
};

ParticleSystem.prototype.run = function() {
  let len = this.particles.length;
  for (let i = len - 1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.run();
    if (particle.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}

ParticleSystem.prototype.applyForce = function(dir) {
  let len = this.particles.length;
  for(let i = 0; i < len; ++i){
    this.particles[i].applyForce(dir);
  }
}

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin, this.img));
}

let Particle = function (pos, img_) {
  this.loc = pos.copy();
  let vx = randomGaussian() * 0.3;
  let vy = randomGaussian() * 0.3 - 1.0;
  this.vel = createVector(vx, vy);
  this.acc = createVector();
  this.lifespan = 200.0;
  this.texture = img_;
}

Particle.prototype.run = function() {
  this.update();
  this.render();
}

Particle.prototype.render = function() {
  if (this.texture) {
    imageMode(CENTER);
    tint(255, this.lifespan * 0.7);
    image(this.texture, this.loc.x, this.loc.y);
  } else {
    noStroke();
    
    let currentFrame = frameCount % 900;
    if (currentFrame >= 600) {
      let colorCycle = (frameCount * 0.3) % 360;
      let r = map(sin(radians(colorCycle)), -1, 1, 100, 255);
      let g = map(sin(radians(colorCycle + 120)), -1, 1, 100, 255);
      let b = map(sin(radians(colorCycle + 240)), -1, 1, 100, 255);
      fill(r, g, b, this.lifespan * 0.5);
    } else {
      fill(255, 255, 255, this.lifespan * 0.4);
    }
    
    ellipse(this.loc.x, this.loc.y, 300, 300);
  }
}

Particle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Particle.prototype.isDead = function () {
  if (this.lifespan <= 0.0) {
    return true;
  } else {
      return false;
    }
}

Particle.prototype.update = function() {
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.lifespan -= 2.5;
  this.acc.mult(0);
}

function drawVector(v, loc, scale){
  push();
  let arrowsize = 4;
  translate(loc.x, loc.y);
  stroke(255);
  rotate(v.heading());
  let len = v.mag() * scale;
  line(0, 0, len,0);
  line(len, 0, len-arrowsize, +arrowsize / 2);
  line(len, 0, len-arrowsize, -arrowsize / 2);
  pop();
}
