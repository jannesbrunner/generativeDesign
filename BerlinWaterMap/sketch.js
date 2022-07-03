/// <reference path="./../p5.global-mode.d.ts" />


const scl = 3;
let cols, rows;

let flowField;
let xDirection;
let yDirection;

// settings
let gui;
const settings = {
    isPlaying: true,
    showFlowField: true,
}

const assets = {}
function preload() {
   assets.waterMap = loadImage("./assets/map.PNG",)
   xDirection = loadImage("./assets/xdirection.png",)
   yDirection = loadImage("./assets/ydirection.png",)
}



function keyReleased() {
    if (key === "p") {
        settings.isPlaying = !settings.isPlaying;
        settings.isPlaying ? loop() : noLoop();
        gui.setValue("Log", settings.isPlaying ? "⏵︎" : "⏸︎");
    }
}


function guiSetup() {
    gui = QuickSettings.create(width, 20, "Settings");
    gui.setKey("g");
    gui.addHTML("Info", `
    Play Pause:   <b>p</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "⏵︎");
}


function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    guiSetup();

    // rastering the flowField
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowField = new Array(cols * rows);


    // load x and y direction edge detection image
    xDirection.loadPixels();
    yDirection.loadPixels();

    let xDpixels = xDirection.pixels.filter( (v, i) => i % 4 == 0);
    let yDpixels = yDirection.pixels.filter( (v, i) => i % 4 == 0);




    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
          let index = x + y * cols;
          
          
          // y*scl*width + x*scl

          // Edge detection
          let xDirR = xDpixels[y*scl*width + x*scl] / 255 - 0.5;
          let yDirR = yDpixels[y*scl*width + x*scl] / 255 - 0.5;

          let angle = 90;
          // let v = p5.Vector.fromAngle(angle);
          //v.setMag(1);
          let v_edge = createVector(xDirR, yDirR);
          flowField[index] = v_edge;
        }
      }

    
}

// shows the flowField if desired
function drawFlowField() {

    flowField.forEach((v, i) => {
        stroke("red");
        push();
        let x = i % cols * scl;
        let y = floor(i / cols) * scl;
        translate(x , y);
        //rotate(v.heading());
        strokeWeight(1);
        line(0, 0, v.x*10, v.y*10);
        stroke("blue")
        point(v.x*10, v.y*10);
        pop();
    })

  }


function draw() {
    noLoop();
    mainScreen();
    image(xDirection,0, 0, xDirection.width , xDirection.height);
    if (settings.showFlowField) {
        drawFlowField();
      }
}

// Screens
function mainScreen() {
    textSize(32);
    textAlign(CENTER);
    background(0);
    /* push();
    imageMode(CENTER)
    image(assets.waterMap, width/2, height/2, assets.waterMap.width , assets.waterMap.height); // TODO: make this responsive
    pop(); */
}


