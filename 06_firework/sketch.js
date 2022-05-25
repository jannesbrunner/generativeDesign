/// <reference path="./../p5.global-mode.d.ts" />

var firework
var gravity;

let isPlaying = true;

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
    gui.addText("Log", "");
}

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    guiSetup();

    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, 0.2);
    firework = new Particle(200,150);
   
}



function draw() {

    background(51);
    firework.applyForce(gravity);
    firework.update();
    firework.show();
   

}
