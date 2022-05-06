/// <reference path="./../p5.global-mode.d.ts" />
/**
 * @title Task 2: Spring Visualization (p5.js)
 * @authors cat & ggJayBizzle
 * @group CJdesign
 * @instution BHT Berlin
 */
"use strict";

var gui;

// Global Variables //
var canvaWidth = 400;
var canvaHeight = 400;

var flowfieldWidth = 200;
var flowfieldHeight = 200;

var innerFieldXoff = 100;
var innerFieldYoff = 100;
var innerFieldWidth = 200;
var innerFieldHeight = 200;

// settings //
var showFlowField = false;
var paintMode = true;
var isPlaying = true;
var fps = 60;

// Parameters //
var inc = 0.1; // incrementer for x,y (p-noise)
var zinc = 0.01; // incrementer for z (p-noise)
var scl = 20; // scale / "zoom" factor for flowField
var cols, rows, innerCols, innerRows; // dimensions for outer and inner flow field
var zoff = 0; // p-noise
var fr; // current frame rate
var particles = []; // particles or bees ;)
var flowfield;
const beeMax = 100; // max particles
var beeCount = 10; // current particles

// Pictures //
var flowers = [];
var beeR, beeL, popBackground, popKaboom, wateringCan, heading;



function preload() { 
  flowers.push(loadImage('images/Flower_Blue.png'));
  flowers.push(loadImage('images/Flower_Green.png'));
  flowers.push(loadImage('images/Flower_Pink.png'));
  flowers.push(loadImage('images/Flower_Yellow.png'));
  heading = loadImage('images/Spring_Font.png')
  beeR = loadImage('images/beeR.png');
  beeL = loadImage('images/beeL.png');
  popBackground = loadImage('images/Background.png');
  popKaboom = loadImage('images/kaboom.png');
  wateringCan = loadImage('images/Watering_Can.png');
}

function guiSetup() {
  gui = new Gui();
  gui.panel.addButton("Toggle FlowField", () => showFlowField = !showFlowField);
  gui.panel.addButton("Play/Pause", () => {
    isPlaying = !isPlaying;
    isPlaying ? loop() : noLoop();
  });
  gui.panel.addRange("Bees!", 0, beeMax, beeCount, 1, (val) => beeCount = val);
  gui.panel.addRange("inc", 0.001, 1, inc, 0.001, (val) => inc = val);
  gui.panel.addRange("zinc", 0.0001, 0.5, zinc, 0.001, (val) => zinc = val);
  gui.panel.addRange("FPS", 1, 60, fps, 1, (val) => fps = val);
}

function setup() {
  createCanvas(canvaWidth, canvaHeight);
  pixelDensity(2);
  guiSetup();

  // Define C/R for flow field grid
  cols = floor(canvaWidth / scl);
  rows = floor(canvaHeight / scl);
  // Define C/R for inner outgoing flow field grid
  innerCols = floor(flowfieldWidth / scl)
  innerRows = floor(flowfieldHeight / scl)
  // frame rate paragraph
  fr = createP('');
  
  // Create the flowfield
  flowfield = new Array(cols * rows);
  for (let index = 0; index < beeMax; index++) { // beeMax = max particles
    particles[index] = new Particle(index);
  }
 
  function shuffleArray(array) { // randomize flower order :) [Fisher-Yates]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  flowers = shuffleArray(flowers);
  noCursor();

}

function draw() {
  frameRate(fps);  
  image(popBackground, 0, 0, canvaWidth, canvaHeight);
  image(popKaboom,  innerFieldWidth / 4, innerFieldHeight / 2, (sin(frameCount/5) + 320), sin(frameCount/5) +220);
  image(heading, innerFieldWidth / 2, innerFieldHeight / 1.3,  200, 100);
  drawOuterFlowers();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let v0 = createVector(cols / 2, 0);
      let v1 = createVector(x - cols / 2, y - rows / 2);
      let angle = v0.angleBetween(v1);

      if (!inInnerFiled(x, y)) {
        let nangle = noise(x * inc, y * inc, zoff) * TWO_PI
        angle = angle + nangle + PI / 2
        //angle += noise(x * inc, y * inc, zoff) * TWO_PI + PI/2;
      }

      var v = p5.Vector.fromAngle(angle);
      v.setMag(noise(y)/2);
      // v.setMag(0.4);
      flowfield[index] = v;
      if (showFlowField) {
        drawFlowField(x, y, v);
      }
    }
  }
  zoff += zinc;
  fr.html(floor(frameRate()));

  for (var i = 0; i < beeCount; i++) {
    let particle = particles[i];
    particle.follow(flowfield)
    particle.update();
    particle.edges();
    particle.show();
  };

  
image(wateringCan, mouseX, mouseY, 60, 60); // let people water plants

 
 
}


function drawOuterFlowers() {

  // X row top
  image(flowers[0], sin(frameCount/12) + 20, cos(frameCount/12) + 20, 50, 50);
  image(flowers[1], cos(frameCount/10) + 120, sin(frameCount/12) + 25, 50, 50);
  image(flowers[2], sin(frameCount/17) + 230, cos(frameCount/11) + 15, 50, 50);
  image(flowers[3], sin(frameCount/10) + 330, cos(frameCount/18) + 15, 50, 50);

  // Y row left
  image(flowers[0], sin(frameCount/15) + 15, cos(frameCount/14) + 120, 50, 50);
  image(flowers[1], cos(frameCount/12) + 25, sin(frameCount/13) + 230, 50, 50);

  // Y row right
  image(flowers[2], sin(frameCount/17) + 330, cos(frameCount/14) + 120, 50, 50);
  image(flowers[3], cos(frameCount/13) + 315, sin(frameCount/12) + 230, 50, 50);

  // X row bottom
  image(flowers[0], sin(frameCount/15) +  cos(frameCount/14) + 15, 335, 50, 50);
  image(flowers[1], cos(frameCount/12)+ 125, cos(frameCount/10) + 330, 50, 50);
  image(flowers[2],  cos(frameCount/14) + 235, sin(frameCount/15) + 320, 50, 50);
  image(flowers[3], sin(frameCount/16) + 300, cos(frameCount/10) + 330, 50, 50);
}

// shows the flowField if desired
function drawFlowField(x, y, v) {
  stroke("red");
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());
  strokeWeight(1);
  line(0, 0, scl, 0);
  pop();
}

// determining if we're grid-wise in the inner or outer flow field
function inInnerFiled(x, y) {
  return ((innerFieldXoff / scl) < x && x < (innerFieldXoff / scl + innerFieldWidth / scl)) &&
    (innerFieldYoff / scl < y && y < (innerFieldYoff / scl + innerFieldHeight / scl))
}