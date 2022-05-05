/// <reference path="./../p5.global-mode.d.ts" />
/**
 * @title Task 2: Spring Visualization (p5.js)
 * @authors cat & ggJayBizzle
 * @group CJdesign
 * @instution BHT Berlin
 */

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


// settings
var showFlowField = false;
var paintMode = false;
var isPlaying = true;

// screen buffers
var ffb; //flow field buffer
var ptb; //particle buffer
var icb; //inner canvas buffer
var bmb; //flying bee mouse buffer

// Parameters
var inc = 0.1;
var zinc = 0.01;
var scl = 20;
var cols, rows, innerCols, innerRows;
var zoff = 0; 
var fr;
var particles = [];
var flowfield;

// Pictures
var blossom1;

function guiSetup() {
  gui = new Gui();
  gui.panel.addButton("Toggle FlowField", () => {
    showFlowField = !showFlowField;
  }); 
  gui.panel.addButton("Toogle PaintMode", () => {
    paintMode = !paintMode;
  });
  gui.panel.addButton( "Play/Pause" , () => {
    isPlaying = !isPlaying;
    isPlaying? loop():noLoop();
  });
  gui.panel.addRange("inc", 0.001, 1, inc, 0.001, (val) => {
    inc = val;
  });
  gui.panel.addRange("zinc", 0.0001, 0.5, zinc, 0.001, (val) => {
    zinc = val;
  });
}

function preload() {
  blossom1 = loadImage('images/flower1.png');
  bee = loadImage('images/bee.png');
}

function setup() {
    createCanvas(canvaWidth, canvaHeight);
    pixelDensity(2);
    guiSetup();

    ffb = createGraphics(canvaWidth, canvaHeight);
    ptb = createGraphics(canvaWidth, canvaHeight);
    icb = createGraphics(innerFieldWidth, innerFieldHeight);
    bmb = createGraphics(canvaWidth, canvaHeight);
    
    
    cols = floor(canvaWidth / scl);
    rows = floor(canvaHeight / scl);
    innerCols = floor(flowfieldWidth/scl)
    innerRows = floor(flowfieldHeight/scl)
    fr = createP('');
    flowfield = new Array(cols * rows);
    for (let index = 0; index < 500; index++) {
        particles[index] = new Particle();
    } 
    background(255);
 
    
    
}
  
  function draw() {
    bmb.image(bee, mouseX, mouseY, 20, 20);
    image(bmb, 0, 0);
    bmb.clear();
    drawInner();
    drawOuterFlowers();
    
    
    

  
    if (paintMode) background(255);
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let v0 = createVector(cols/2, 0);
        let v1 = createVector(x - cols/2, y - rows/2);
        let angle = v0.angleBetween(v1);

        if (!inInnerFiled(x, y)){
          angle += noise(x * inc, y * inc, zoff) * TWO_PI + PI/2;
        }
        
        var v = p5.Vector.fromAngle(angle);
        v.setMag(0.4);
        flowfield[index] = v;
        if(showFlowField) {  
          drawFlowField(x, y, v);
        }

      }
    }
    zoff += zinc;
    fr.html(floor(frameRate()));

    particles.forEach(particle => {
      particle.follow(flowfield)
      particle.update();
      particle.edges();
      particle.show();  
    });

   

  }

  function drawInner() {
    icb.background(255,0);
    icb.textFont("Comic Sans MS");
    icb.textSize(40);
    icb.fill(128 + sin(frameCount*0.1) * 128, 60);
    icb.text('Spring', innerFieldWidth / 4, innerFieldHeight / 2);
    image(icb, innerFieldWidth / 2 , innerFieldHeight / 2);
    icb.clear();
  }

  function drawOuterFlowers() {
    // X row top
    image(blossom1, 20, 20, 50, 50);
    image(blossom1, 120, 25, 50, 50);
    image(blossom1, 230, 15, 50, 50);
    image(blossom1, 330, 15, 50, 50);

    // Y row left
    image(blossom1, 15, 120, 50, 50);
    image(blossom1, 25, 230, 50, 50);

    // Y row right
    image(blossom1, 330, 120, 50, 50);
    image(blossom1, 315, 230, 50, 50);

    // X row bottom
    image(blossom1, 15, 335, 50, 50);
    image(blossom1, 125, 330, 50, 50);
    image(blossom1, 235, 320, 50, 50); 
    image(blossom1, 300, 330, 50, 50);
  }

  function drawFlowField(x, y, v) {
        stroke("red");
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop();    
  }

function inInnerFiled(x, y){
  return (( innerFieldXoff/scl) < x && x < (innerFieldXoff/scl + innerFieldWidth/scl)) &&
         (innerFieldYoff/scl < y && y < (innerFieldYoff/scl + innerFieldHeight/scl))
}