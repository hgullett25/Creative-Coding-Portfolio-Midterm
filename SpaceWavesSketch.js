let starsX = [];
let starsY = [];
let starsSize = [];
let totalStars = 200;

class Wave {
  constructor(){
    this.xVals = [];
    this.yVals = [];
    this.numSegments = floor(random(100, 200));
    this.waveHeight = random(50, 100);
    this.speed = random(0.01, 0.02);  
    this.counter = 0;
    this.hOffset = random(0.5, 1.5);  

    for(let i = 0; i < this.numSegments; i++){
        this.xVals[i] = map(i, 0, this.numSegments-1, 0, width);
        this.yVals[i] = height - 50;
    }

    this.col1 = color(random(255), random(255), random(255));
    this.col2 = color(random(255), random(255), random(255));
    this.diameter = random(100, 150);
  }

  move(){
    for (let i = 0; i < this.numSegments; i++){
        this.yVals[i] = height - 50 - sin(this.counter + i*0.1) * this.waveHeight;
        this.xVals[i] = map(i, 0, this.numSegments-1, sin(this.counter*this.hOffset)*50 + 0, width + sin(this.counter*this.hOffset)*50);
    }
    this.counter += this.speed;
  }

  display(){
    for(let i = 0; i < this.numSegments; i++){
      let l = sin(map(i, 0, this.numSegments, 0, PI));
      let col = lerpColor(this.col1, this.col2, l);
      stroke(col);
      fill(0);
      let d = sin(map(i, 0, this.numSegments, 0, PI));
      ellipse(this.xVals[i], this.yVals[i], this.diameter * d);
    }
  }
}

let waves = []; 

function setup() {
  createCanvas(windowWidth, windowHeight - 50);

  for (let i = 0; i < totalStars; i++) {
    starsX[i] = random(width);
    starsY[i] = random(height);
    starsSize[i] = random(2, 9);
  }

  for (let i = 0; i < 3; i++) {
    waves.push(new Wave());
  }
}

function draw() {
  background(0, 10, 30);

  for (let i = 0; i < totalStars; i++) {
    let brightness = random(150, 255);
    noStroke();
    fill(brightness);
    circle(starsX[i], starsY[i], starsSize[i]);
  }

  for (let i = 0; i < waves.length; i++){
    waves[i].move();
    waves[i].display();
  }

  // SPACESHIP 
  let wave = waves[0];
  let shipSegment = floor(map(width/2, 0, width, 0, wave.numSegments-1));
  let shipX = wave.xVals[shipSegment];
  let shipY = wave.yVals[shipSegment] - 25;

  // main dome
  fill(150, 200, 255);
  stroke(0);
  strokeWeight(2);
  arc(shipX, shipY, 100, 100, PI, TWO_PI);

  // bottom saucer
  fill(200, 150, 220);
  ellipse(shipX, shipY + 10, 150, 30);

  // window
  fill(255, 255, 255, 200);
  ellipse(shipX, shipY - 25, 25, 25);
}