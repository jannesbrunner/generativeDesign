/// <reference path="./../p5.global-mode.d.ts" />

// settings
let gui;
const settings = {
    isPlaying: true,
}

const assets = {}
function preload() {
   assets.waterMap = loadImage("./assets/berlinWater.svg",)
}

function keyReleased() {
    if (key === "p") {
        settings.isPlaying = !settings.isPlaying;
        settings.isPlaying ? loop() : noLoop();
        gui.setValue("Log", settings.isPlaying ? "⏵︎" : "⏸︎");
    }
}


function guiSetup() {
    gui = QuickSettings.create(width -200 , 20, "Settings");
    gui.setKey("g");
    gui.addHTML("Info", `
    Play Pause:   <b>p</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "⏵︎");
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    guiSetup();
}



function draw() {
    background(0);
    mainScreen();
}

// Screens
function mainScreen() {
    textSize(32);
    textAlign(CENTER);
    fill(255);
    push();
    imageMode(CENTER)
    image(assets.waterMap, width/2, height/2, assets.waterMap.width * 0.6, assets.waterMap.height *0.6); // TODO: make this responsive
    pop();
    waterMapHover();
}

// Components
function waterMapHover() {
    push();
    
    rect(0, 0, 300, 200)
    //triangle(30,200, 60, 200, 40, 220) ;
    triangle(mouseX, mouseY, mouseX + 60, mouseY + 200, mouseX + 40, mouseY + 220) ;
    fill("red");
    pop();
}
