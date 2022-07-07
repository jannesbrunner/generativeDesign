/// <reference path="./../p5.global-mode.d.ts" />


const scl = 3;
let cols, rows;

let edgeField;
let edgeFieldBuffer;
let xDirection;
let yDirection;

// settings
let gui;
const settings = {
    isPlaying: true,
    showEdgeField: false,
}

const assets = {}
function preload() {
    assets.waterMap = loadImage("./assets/mapRef.png",)
    xDirection = loadImage("./assets/xdirection.png",)
    yDirection = loadImage("./assets/ydirection.png",)
}

let ships = [];



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
    gui.addBoolean("Show Edge Flow Field", settings.showEdgeField, () => {
        settings.showEdgeField = !settings.showEdgeField;
    });
}

function constructEdgeField() {
    edgeField = new Array(cols * rows);
    // load x and y direction edge detection image
    xDirection.loadPixels();
    yDirection.loadPixels();

    let xDpixels = xDirection.pixels.filter((v, i) => i % 4 == 0);
    let yDpixels = yDirection.pixels.filter((v, i) => i % 4 == 0);


    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;


            // y*scl*width + x*scl

            // Edge detection
            let xDirR = xDpixels[y * scl * width + x * scl] / 255 - 0.5;
            let yDirR = yDpixels[y * scl * width + x * scl] / 255 - 0.5;

            let angle = 90;
            // let v = p5.Vector.fromAngle(angle);
            //v.setMag(1);
            if(xDirR < 0.005 && xDirR > -0.005 && yDirR < 0.005 && yDirR > -0.005) {
                xDirR = 0;
                yDirR = 0;
            }
            let v_edge = createVector(xDirR, yDirR);
            edgeField[index] = v_edge;
        }
    }
}


function setup() {
    createCanvas(1500, 1000);
    angleMode(DEGREES);
    guiSetup();

    // rastering the flowField
    cols = floor(width / scl);
    rows = floor(height / scl);

    constructEdgeField();
    drawEdgeField();


}

// shows the Edge flowField if desired
function drawEdgeField() {

    edgeFieldBuffer = createGraphics(1500, 1000);

    edgeField.forEach((v, i) => {
        edgeFieldBuffer.stroke("red");
        edgeFieldBuffer.push();
        let x = i % cols * scl;
        let y = floor(i / cols) * scl;
        edgeFieldBuffer.translate(x, y);
        //rotate(v.heading());
        edgeFieldBuffer.strokeWeight(1);
        edgeFieldBuffer.line(0, 0, v.x * 10, v.y * 10);
        edgeFieldBuffer.stroke("blue")
        edgeFieldBuffer.point(v.x * 10, v.y * 10);
        edgeFieldBuffer.pop();
    })

}


function draw() {
   
    image(assets.waterMap, 0, 0, assets.waterMap.width, assets.waterMap.height);
    if (settings.showEdgeField) {
       image(edgeFieldBuffer, 0, 0);
    }

    if (ships.length > 0) {
        ships.forEach(particle => {
            particle.follow(edgeField)
            particle.update();
            particle.edges();
            particle.show();  
          });
    }
    
}

function mouseClicked() {
    ships.push(new Ship(mouseX, mouseY));
}



