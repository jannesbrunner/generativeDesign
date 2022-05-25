/// <reference path="./../p5.global-mode.d.ts" />

var fireworks = [];
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
    gui.addText("Log", "⏵︎");
}

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    guiSetup();

    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, 0.2);

    colorMode(HSB);
   
   
}



function draw() {

    colorMode(RGB)
    background(0, 0, 0, 25);
    if (random(1) < 0.03) {
        fireworks.push(new Firework());
    }
    
    for (let i = fireworks.length-1; i > 0; i--) {
        const element = fireworks[i];
        element.update();
        element.show();
        if(element.done()) {
            fireworks.splice(i, 1);
        }
        
    }
   

}
