/// <reference path="./../p5.global-mode.d.ts" />

// settings
let isPlaying = true;

let tileMap;

var ghostBlue, ghostGreen, ghostPink, ghostYellow, pacman;

let boidsAmount = 50;
let boidsConfig = {
    maxSpeed: 4,
    alignForce: 0.5,
    cohesionForce: 0.5,
    separationForce: 0.3,
    alignPerceptionRadius: 100,
    cohesionPerceptionRadius: 100,
    separationPerceptionRadius: 100
};

// data
const flock = [];

function preload() {
    ghostBlue = loadImage('images/ghostblue.png');
    ghostGreen = loadImage('images/ghostgreen.png');
    ghostPink = loadImage('images/ghostpink.png');
    ghostYellow = loadImage('images/ghostyellow.png');
    pacman = loadImage('images/pacman.png')
}

function keyReleased() {
    if (key === " ") {
        isPlaying = !isPlaying;
        isPlaying ? loop() : noLoop();
        gui.setValue("Log", isPlaying ? "⏵︎" : "⏸︎");
    }
}


function guiSetup() {
    gui = QuickSettings.create(width -200 , 20, "Settings");
    gui.setKey("g");
    gui.addHTML("Info", `
    Play Pause:   <b>Space</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "⏵︎");
    gui.addRange("Amount", 0, 1000, boidsAmount, 1, (v) => adjustNoOfBoids(v));
    gui.addRange("Max Speed", 0, 10, boidsConfig.maxSpeed, 0.1, (v) => updateBoids("maxSpeed", v));
    gui.addRange("Align Force", 0.1, 5, boidsConfig.alignForce, 0.1, v => updateBoids("alignForce", v));
    gui.addRange("Align Radius", 1, 500, boidsConfig.alignPerceptionRadius, 1, v => updateBoids("alignPerceptionRadius", v));
    gui.addRange("Cohesion Force", 0.1, 5, boidsConfig.cohesionForce, 0.1, v => updateBoids("cohesionForce", v));
    gui.addRange("Cohesion Radius", 1, 500, boidsConfig.cohesionPerceptionRadius, 1, v => updateBoids("cohesionPerceptionRadius", v));
    gui.addRange("Separation Force", 0.1, 5, boidsConfig.separationForce, 0.1, v => updateBoids("separationForce", v));
    gui.addRange("Separation Radius", 1, 500, boidsConfig.separationPerceptionRadius, 1, v => updateBoids("separationPerceptionRadius", v));
}

function updateBoids(key, value) {
    for(let boid of flock) {
        boid[key] = value;
    }
}

function setup() {



    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    guiSetup();
    tileMap = new TileMap();
    for (let i = 0; i < boidsAmount; i++) {
        flock.push(new Boid());
    }
}

function adjustNoOfBoids(v) {

        let diff = boidsAmount - flock.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                flock.push(new Boid())
            }
        } else {
            for (let i = 0; i < diff * -1; i++) {

                tileMap.deletePoint(flock.pop());
            }
        }
}



function draw() {
    //background(51);
    push();
    fill('grey')
    translate(0, windowHeight, 0);
    image(background, 0, 0, 2000, 2000);
    pop();

    for(let boid of flock) {
        boid.edges();
        boid.flock()
        boid.update();
        boid.show();
    }
    image(pacman, mouseX, mouseY, 60, 60); 

}
