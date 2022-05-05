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

// settings
var showFlowField = false;
var paintMode = false;

// screen buffers
var ffb; //flow field buffer
var ptb; //particle buffer

// Parameters
var inc = 0.1;
var zinc = 0.01;
var scl = 20;
var cols, rows, innerCols, innerRows;
var zoff = 0; 
var fr;
var particles = [];
var flowfield;


function guiSetup() {
  gui = new Gui();
  gui.panel.addButton("Toggle FlowField", () => {
    showFlowField = !showFlowField;
  }); 
  gui.panel.addButton("Toogle PaintMode", () => {
    paintMode = !paintMode;
  });
  gui.panel.addRange("inc", 0.01, 1, "", 0.01, (val) => {
    inc = val;
  });
  gui.panel.addRange("zinc", 0.01, 1, "", 0.01, (val) => {
    zinc = val;
  });
}

function setup() {
    createCanvas(canvaWidth, canvaHeight);
    pixelDensity(2);
    guiSetup();

    ffb = createGraphics(canvaWidth, canvaHeight);
    ptb = createGraphics(canvaWidth, canvaHeight);
    
    
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
    
    if (!paintMode) background(255);
    var yoff = 0;
    for(let y = 0; y < rows; y++) {
      var xoff = 0;
      for(let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle;
        if (((x < innerCols/2) || (x > cols - (innerCols/2))) || ((y < innerRows/2) || (y > rows - (innerRows/2)))) {
          angle = noise(xoff, yoff, zoff) * TWO_PI;

          let v0 = createVector(cols/2, 0);
          let v1 = createVector(x - cols/2, y - rows/2);
          
          angle = v0.angleBetween(v1) + angle + PI/2
        } else {
          let v0 = createVector(cols/2, 0);
          let v1 = createVector(x - cols/2, y - rows/2);
          angle = v0.angleBetween(v1);
        }
        var v = p5.Vector.fromAngle(angle);
        v.setMag(0.2);
        flowfield[index] = v;
        xoff += inc;
        
        
        if(showFlowField) {  
          drawFlowField(x, y, v);
        }
        image(ptb, 0,0);
      }
      yoff += inc;
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