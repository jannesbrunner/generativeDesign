/// <reference path="./../p5.global-mode.d.ts" />


const scl = 10;
let cols, rows;

let edgeField;
let edgeFieldBuffer;
let waterMask;
let normalMap;

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
    assets.waterMap = loadImage("./assets/map.png",)
    assets.boatNames = loadStrings("./assets/boatNames.txt");
    assets.yacht = loadImage('./assets/ships/yacht.png');
    assets.sailboat = loadImage('./assets/ships/sailboat.png');
    waterMask = loadImage("./assets/map_sw_trim.png",)
    normalMap = loadImage("./assets/normalmap.png",)
}

let ships = [];



function keyReleased() {
    if (key === "p") {
        settings.isPlaying = !settings.isPlaying;
        settings.isPlaying ? loop() : noLoop();
        settingsGui.setValue("Log", settings.isPlaying ? "⏵︎" : "⏸︎");
    }
}

function currentBoatInfo() {
    if (currentBoat) {
        gameGui.setValue("Info", `
        Name: <strong>${currentBoat.name}</strong><br/>
        Position X: ${currentBoat.pos.x.toFixed(0)} Y: ${currentBoat.pos.y.toFixed(0)}<br/>
        Course: ${currentBoat.vel.heading().toFixed(2)} °<br/>
        Speed: ${currentBoat.vel.mag().toFixed(2)}<br/>
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

function getDirectionForce(x, y) {
    // get the index of the current pixel in p5.Image 
    let index = (x + y * width) * 4;
    // get the vector of the current pixel
    let r = normalMap.pixels[index]; // red channel of the pixel
    let g = normalMap.pixels[index + 1]; // green channel of the pixel

    let force_x = map(r, 0, 255, -1, 1);
    let force_y = map(g, 0, 255, -1, 1);

    if (force_x < 0.005 && force_x > -0.005 && force_y < 0.005 && force_y > -0.005) {
        force_x = 0;
        force_y = 0;
    }

    return createVector(force_x, force_y);
}

function checkWithinWater(x, y) {
    return (waterMask.pixels[x + y * width] !== 0 && x < width && y < height);
}



function setup() {
    createCanvas(3000, 2170);
    angleMode(DEGREES);

    availableBoatNames = [...assets.boatNames];

    guiSetup();

    // rastering the flowField
    cols = floor(width / scl);
    rows = floor(height / scl);

    // prepare water S/W pixels array
    waterMask.loadPixels();
    waterMask.pixels = waterMask.pixels.filter((v, i) => i % 4 == 0);

    normalMap.loadPixels();

    drawEdgeField();




}

// shows the Edge flowField if desired
function drawEdgeField() {

    edgeFieldBuffer = createGraphics(width, height);

    for (let y = 0; y < height; y=y+5) {
        for (let x = 0; x < width; x=x+5) {
            edgeFieldBuffer.stroke("red");
            edgeFieldBuffer.push();
            edgeFieldBuffer.translate(x, y);
            edgeFieldBuffer.strokeWeight(1);
            let force = getDirectionForce(x, y);
            edgeFieldBuffer.line(0, 0, force.x * 10, force.y * 10);
            edgeFieldBuffer.stroke("blue")
            edgeFieldBuffer.point(force.x * 10, force.y * 10);
            edgeFieldBuffer.pop();
        }
    }


    /* edgeField.forEach((v, i) => {
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
    }) */

}


function draw() {

    image(assets.waterMap, 0, 0, assets.waterMap.width, assets.waterMap.height);
    if (settings.showEdgeField) {
        image(edgeFieldBuffer, 0, 0);
    }

    if (ships.length > 0) {
        ships.forEach(particle => {
            particle.follow();
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

function updateGameGui(selected = null) {
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
    if (ships.length >= 1) {
        gameGui.removeControl("Info");
        gameGui.removeControl("Selected Boat")
    }
    // END WORKAROUND
    gameGui.addDropDown("Selected Boat", currentBoats, ({ value }) => {
        newShip = ships.find(s => s.name === value);
        if (newShip) {
            currentBoat = newShip;
        }
    });
    gameGui.addHTML("Info", ``);
    gameGui.setValue("No of Ships", assets.boatNames.length - availableBoatNames.length);
}




