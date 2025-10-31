let level = 1;
let rows, cols;

let colorBlindMode = false;

let baseColor;
let oddColor;
let oddX, oddY;

function setup() {
  level = 1;
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noLoop();

  let storedLevel = sessionStorage.getItem("startLevel");

  if (storedLevel) {
    level = int(storedLevel);
  } else {
    level = 1;
  }

  setLevel(level);

  document.getElementById("toggleMode") .addEventListener("click", () => {
    colorBlindMode = !colorBlindMode;
    setLevel(level); //document.getElementById() is a method that allows you to access a specific HTML element within a web page by its unique id attribute//
    // .addEventListener() method in JavaScript is used to attach an event handler to a specified element in the Document Object Model (DOM). This method allows you to define a function that will be executed whenever a particular event occurs on that element.//
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    sessionStorage.removeItem("startLevel");
    level = 1;
    colorBlindMode = false;
    setLevel(level);
});
}
function draw() {
  background(0);
  noStroke();
  strokeWeight(0);
  drawGrid(rows, cols);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  setLevel();
}
function mousePressed(){
  let w = width / cols;
  let h = height / rows;

  let clickedX = floor(mouseX / w);
  let clickedY = floor(mouseY / h);

  if (clickedX === oddX && clickedY === oddY){
    level++;
    setLevel(level);
  }else {
    print("Wrong tile, try again");
  }
  }
  //if (correctTileChosen()){//
   // level++; //
    //setLevel(level);//
//}//
//}//

function setLevel(lev) {
  if (lev === 1) {rows = 2; cols = 2;} 
  else if (lev === 2) {rows = 3; cols = 3;} 
    //needed === compares two values for equality, returning true only if both the value and the data type are the same//
  else if (lev === 3) {rows = 4; cols = 4;} 
  else if (lev === 4){window.location.href = "HousePartySketch.html"; return;}
  else if (lev === 5){rows = 5; cols = 4;}
  else if (lev === 6){rows = 6; cols = 4;}
  else if (lev === 7){window.location.href = "PortalOpeningsSketch.html";return;}
  else if (lev === 8){rows = 8; cols = 6;}
  else if (lev === 9) {window.location.href = "SpaceWavesSketch.html";return;}
  else if (lev === 10){window.location.href = "index.html";return;}
    
baseColor = color(random(360),80, 80);
oddX = floor(random(cols));
oddY = floor(random(rows));

if (!colorBlindMode) {
  let hueChange = random( [-5,5]);
  oddColor = color((hue(baseColor)+ hueChange + 360) % 360, 80, 80, 80);
} 
else {
  let hueChange = random ([40, 60]);
  oddColor = color((hue(baseColor) + hueChange + 360) % 360, 80, 80, 80);
  }
  redraw();
}
function drawGrid (r, c){
  let w = width / c;
  let h = height / r;

  for (let x = 0; x < c; x++){
    for (let y = 0; y<r; y++) {
      if (x === oddX && y === oddY){fill (oddColor);}
      else fill (baseColor);
      rect(x * w, y * h, w, h);
    }
  }
}