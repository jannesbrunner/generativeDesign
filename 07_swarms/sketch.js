/// <reference path="./../p5.global-mode.d.ts" />

// settings
let isPlaying = true;


// data
const flock = [];

function preload() {

}

function keyReleased() {
    if (key === " ") {
        isPlaying = !isPlaying;
        isPlaying ? loop() : noLoop();
        gui.setValue("Log", isPlaying ? "⏵︎" : "⏸︎");
    }
}


function guiSetup() {
    gui = QuickSettings.create(width, 20, "Settings");
    gui.setKey("g");
    gui.addHTML("Info", `
    Play Pause:   <b>Space</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "⏵︎");
}

function setup() {

    createCanvas(640, 360);
    angleMode(DEGREES);
    guiSetup();
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid())
    }
   

}



function draw() {
    background(51);

    for(let boid of flock) {
        boid.edges();
        boid.flock(flock)
        boid.update();
        boid.show();
    }


}
