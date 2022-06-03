/// <reference path="./../p5.global-mode.d.ts" />

var fireworks = [];
var gravity;

let isPlaying = true;

// camera pos
let camX;
let camY;
let camZ;
let camCX;
let camCY;
let camCZ;

// sounds
let fireworkFly;
let fireworkExplode;

function preload() {
    soundFormats('mp3', 'ogg');
  }

  function mouseMoved(event) {
      camX += event.movementX;
      camY += event.movementY;
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
    gui.add
}

function setup() {
    
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    guiSetup();

    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, 0.2);

    colorMode(HSB);

    normalMaterial();

    camX = 0;
    camY = 0;
    camZ = 0;
    camCX = 0;
    camCY = 0;
    camCZ = 0;
   
   
}



function draw() {

    
    orbitControl();

    

    colorMode(RGB)
    background(0, 0, 0, 25);

    stroke(255);
    fill(255, 102, 94);
    rotateY(0.5);
    box(85, 85);
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
