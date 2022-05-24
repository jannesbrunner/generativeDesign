/// <reference path="./../p5.global-mode.d.ts" />


function keyReleased() {
    if (key === " ") {
        isPlaying = !isPlaying;
        isPlaying ? loop() : noLoop();
        gui.setValue("Log", isPlaying ? "⏵︎" : "⏸︎");
    }
}

function guiSetup() {
    gui = QuickSettings.create(width - 300, 20, "Settings");
    gui.setKey("g");
    gui.addText("Current Time", currentTimeString);
    gui.addHTML("Info", `
    Play Pause:   <b>Space</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    guiSetup();
   
}



function draw() {

   

}
