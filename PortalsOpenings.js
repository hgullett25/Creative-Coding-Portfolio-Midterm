let numPortals = 10;
let numSegments = 50;
let portals = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  createPortals();
}

function draw() {
  background(0);

  for (let i = 0; i < numPortals; i++) {
    if (portals[i].counter === 0 && random(1) < 0.02) {
      portals[i].x = random(50, width - 50);
      portals[i].yVals.fill(height - 50);
      portals[i].counter = 0.01; 
    }
  }

  for (let i = 0; i < numPortals; i++) {
    let portal = portals[i];

    if (portal.counter > 0) {
      portal.counter += 0.08;
      let maxRise = 200;

      for (let j = 0; j < numSegments; j++) {
        let targetY = portal.y - maxRise * (j / numSegments);
        portal.yVals[j] = lerp(portal.yVals[j], targetY, 0.1);

        let alpha = map(j, 0, numSegments - 1, 50, 255);
        let size = map(j, 0, numSegments - 1, 16, 64);
        fill(250, 11, 222, alpha);
        stroke(1);
        ellipse(portal.x, portal.yVals[j], size, size);
      }

      fill(0);
      stroke(250, 11, 222);
      strokeWeight(2);
      ellipse(portal.x, portal.y, 60, 20);

      if (portal.yVals[numSegments - 1] <= portal.y - maxRise * 0.99) {
        portal.counter = 0; 
      }
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight - 50);
  createPortals();
}

function createPortals(){ for (let i = 0; i < numPortals; i++) {
    portals[i] = {
      x: 0,
      y: height - 50,
      yVals: Array(numSegments).fill(height - 50),
      counter: 0
    };
  }
}
