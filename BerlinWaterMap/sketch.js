/// <reference path="./../p5.global-mode.d.ts" />

let edgeFieldBuffer;
let waterMask;
let normalMap;

// Ships
let ships = [];
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

function setup() {
    createCanvas(3000, 2170);
    angleMode(DEGREES);
    availableBoatNames = [...assets.boatNames];
    guiSetup();

    // prepare water S/W pixels array
    waterMask.loadPixels();
    waterMask.pixels = waterMask.pixels.filter((v, i) => i % 4 == 0);

    normalMap.loadPixels();
    drawEdgeField();

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

















