/// <reference path="./../p5.global-mode.d.ts" />

let edgeFieldBuffer;
let waterMask;
let normalMap;
let perlinNoiseMask;

// Ships
let ships = [];
const shipTypes = ["random", "motorboat", "sailboat", "rescueBoat"];
let currentShipType = "random";
let currentBoat = null;
let police = null;
let availableBoatNames;
let currentBoatNames = [];

const assets = {}

// settings
let settingsGui;
let gameGui;
let policeAccelerationGui = "";
let currentBoatAccelerationGui = "";
let currentPoliceBoatAcceleration = 0;
const settings = {
    isPlaying: true,
    showLabels: true,
    showEdgeField: false,
    scaryMouse: false,
    hasPolice: false,
    followPolice: false,
    perlinNoise: {
        xyfac: 100,
        zfac: 400,
    }
}


function preload() {
    assets.waterMap = loadImage("./assets/map.png",)
    assets.waterMapLabels = loadImage("./assets/map_labels.png",)
    assets.boatNames = loadStrings("./assets/boatNames.txt");
    assets.yacht = loadImage('./assets/ships/yacht.png');
    assets.sailboat = loadImage('./assets/ships/sailboat.png');
    assets.police = loadImage('./assets/ships/police.png');
    assets.rescueBoat = loadImage('./assets/ships/rescueBoat.png');
    waterMask = loadImage("./assets/map_sw_trim.png",)
    normalMap = loadImage("./assets/normalmap_kanal.png",)
    perlinNoiseMask = loadImage("./assets/map_pn_area.png",)
}

function setup() {
    createCanvas(3000, 2170);
    angleMode(DEGREES);
    availableBoatNames = [...assets.boatNames];
    guiSetup();

    // prepare water S/W pixels array
    waterMask.loadPixels();
    waterMask.pixels = waterMask.pixels.filter((_, i) => i % 4 == 0);

    perlinNoiseMask.loadPixels();
    perlinNoiseMask.pixels = perlinNoiseMask.pixels.filter((_, i) => i % 4 == 0);

    normalMap.loadPixels();
    drawEdgeField();

}

function draw() {
    image(assets.waterMap, 0, 0, assets.waterMap.width, assets.waterMap.height);
    if(settings.showLabels) { 
        push();
        image(assets.waterMapLabels, 0, 0, assets.waterMapLabels.width, assets.waterMapLabels.height); 
        pop();
    }
    
    if (settings.showEdgeField) {
        image(edgeFieldBuffer, 0, 0);
    }

    if (ships.length > 0) {
        ships.forEach(particle => {
            particle.follow();
            particle.update(ships);
            particle.show();
        });
    }
    if(settings.hasPolice && police) {
        controlPoliceBoat();
        police.update(ships);
        police.show();
    }
    currentBoatInfo();
    policeBoatInfo();

}

function checkWithinLake(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    return (perlinNoiseMask.pixels[x + y * width] !== 0 && x < width && y < height);
}


function checkWithinWater(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    return (waterMask.pixels[x + y * width] !== 0 && x < width && y < height);
}

















