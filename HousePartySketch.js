// edit to make the house not dip below the grass
let starsX = [];
let starsY = [];
let starsSize = [];
let totalStars = 200;
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  stars()
}

function windowResized (){
  resizeCanvas(windowWidth, WindowHeight);
  stars
}
  function stars(){
    starsX = [];
    starsY = [];
    starsSize = [];
    for (let i = 0; i < totalStars; i++) {
     starsX[i] = random(width);
     starsY[i] = random(height);
     starsSize[i] = random(2, 5);
  }
}


function draw() {
  background(10, 20, 40);

  for (let i = 0; i < totalStars; i++) {
    let brightness = random(150, 255);
    noStroke();
    fill(brightness);
    circle(starsX[i], starsY[i], starsSize[i]);
  }

  // Animate house
  let scaleX = 1 + 0.2 * sin(counter); // horizontal smush/stretch
  let scaleY = 1 - 0.2 * sin(counter); // vertical smush/stretch
  let hop = 20 * sin(counter);         // vertical bounce

  let grassTop = height * 0.8;
  let houseBaseHeight = 300;
  let houseY = grassTop - houseBaseHeight;

  drawHouse(200, houseY - hop, scaleX, scaleY);

  counter += 0.05;
}

function drawHouse(x, y, scaleX = 1, scaleY = 1) {
  push();
  translate(x, y);
  scale(scaleX, scaleY);
  rectMode(CORNER);

  // House base
  fill(255, 160, 50);
  noStroke();
  rect(0, 0, 330, 300);

  // Roof 
  fill(255, 160, 50);
  triangle(165, -120, 330, 0, 0, 0); // 

  // Windows
  fill(255, 255, 0);
  stroke("magenta");
  strokeWeight(7);
  rect(50, 75, 65, 90);  // left window
  rect(215, 75, 65, 90); // right window

  // Top window
  fill(255, 255, 0);
  noStroke();
  circle(165, 50, 58);

  // Door
  fill(90, 0, 100);
  rect(130, 155, 70, 145);
  fill(0);
  noStroke();
  circle(190, 240, 8); // door handle

  // Roof lines
  stroke("magenta");
  strokeWeight(15);
  line(165, -120, 0, 0);   // left roof side
  line(165, -120, 330, 0); // right roof side

  // Window dividers
  strokeWeight(5);
  line(50 + 32.5, 75, 50 + 32.5, 165);   // left window divider
  line(215 + 32.5, 75, 215 + 32.5, 165); // right window divider

  pop();

  // Grass 
  fill(0, 110, 0);
  noStroke();
  rect(0, height * 0.8, width, height * 0.2);
}


// frame count sin x (sin * Pi)
// try sound library + pulse to bpm of music