/// <reference path="./../p5.global-mode.d.ts" />


const scl = 10;
let cols, rows;

let edgeField;
let edgeFieldBuffer;
let xDirection;
let yDirection;
let waterMask;

let currentBoat = null;
let availableBoatNames;
let currentBoatNames = [];

const assets = {}

// settings
let settingsGui;
let gameGui;
const settings = {
    isPlaying: true,
    showEdgeField: false,
}


function preload() {
    assets.waterMap = loadImage("./assets/mapRef.png",)
    assets.boatNames = loadStrings("./assets/boatNames.txt");
    assets.yacht = loadImage('./assets/ships/yacht.png');
    assets.sailboat = loadImage('./assets/ships/sailboat.png');
    xDirection = loadImage("./assets/xdirection.png",)
    yDirection = loadImage("./assets/ydirection.png",)
    waterMask = loadImage("./assets/waterBorders.png",)
}

let ships = [];



function keyReleased() {
    if (key === "p") {
        settings.isPlaying = !settings.isPlaying;
        settings.isPlaying ? loop() : noLoop();
        settingsGui.setValue("Log", settings.isPlaying ? "⏵︎" : "⏸︎");
    }
}

function currentBoatInfo () { 
    if (currentBoat) {
        gameGui.setValue("Info", `
        Name: <strong>${currentBoat.name}</strong><br/>
        Position X: ${currentBoat.pos.x.toFixed(2)} Y: ${currentBoat.pos.y.toFixed(2)}<br/>
        Velocity: ${currentBoat.vel.x.toFixed(2)}, ${currentBoat.vel.y.toFixed(2)}<br/>
        Acceleration: ${currentBoat.acc.x.toFixed(2)}, ${currentBoat.acc.y.toFixed(2)}<br/>
        `);
    }
}

function guiSetup() {
    settingsGui = QuickSettings.create(width, 20, "Settings");
    settingsGui.setKey("g");
    settingsGui.addHTML("Info", `
    Play Pause:   <b>p</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    settingsGui.addText("Log", "⏵︎");
    settingsGui.addBoolean("Show Edge Flow Field", settings.showEdgeField, () => {
        settings.showEdgeField = !settings.showEdgeField;
    });

    gameGui = QuickSettings.create(20, 600, "Ship Information System");
    gameGui.addProgressBar("No of Ships", assets.boatNames.length, assets.boatNames.length - availableBoatNames.length, "");
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
            if (xDirR < 0.005 && xDirR > -0.005 && yDirR < 0.005 && yDirR > -0.005) {
                xDirR = 0;
                yDirR = 0;
            }
            let v_edge = createVector(xDirR, yDirR);
            edgeField[index] = v_edge;


        }
    }
}

function checkWithinWater(x, y) {
    return (waterMask.pixels[x + y * width] !== 0 && x < width && y < height);
}



function setup() {
    createCanvas(1500, 1000);
    angleMode(DEGREES);

    availableBoatNames = [...assets.boatNames];

    guiSetup();

    // rastering the flowField
    cols = floor(width / scl);
    rows = floor(height / scl);

    // prepare water S/W pixels array
    waterMask.loadPixels();
    waterMask.pixels = waterMask.pixels.filter((v, i) => i % 4 == 0);

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
            particle.update(ships);
            particle.edges();
            particle.show();
        });
    }

    currentBoatInfo();


}



function mouseClicked() { // Spawn Ships in water
    if (mouseButton === LEFT && checkWithinWater(mouseX, mouseY) && availableBoatNames.length > 0) {
        ships.push(new Ship(mouseX, mouseY));
        updateGameGui();
    }
}

function updateGameGui(selected=null) {
    let currentBoats = [];
    if (selected) {
        ships.filter(s => s.name !== selected).forEach(s => currentBoats.push(s.name));
        currentBoats.unshift(selected);
    } else {
        ships.forEach(s => {
            currentBoats.unshift(s.name);
        })
    }
     // WORKAROUND
     if(ships.length >= 1)  {
        gameGui.removeControl("Info");
        gameGui.removeControl("Selected Boat")}
    // END WORKAROUND
    gameGui.addDropDown("Selected Boat", currentBoats, ({value}) => {
        newShip = ships.find(s => s.name === value);
        if(newShip) {
            currentBoat = newShip;
        }
    }); 
    gameGui.addHTML("Info", ``);
    gameGui.setValue("No of Ships", assets.boatNames.length - availableBoatNames.length);
}




