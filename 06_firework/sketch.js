/// <reference path="./../p5.global-mode.d.ts" />

var fireworks = [];
var gravity;

let isPlaying = true;

// assets
let backgroundIMG;

// camera pos
let cam;
let camX;
let camY;
let camZ;
let camCX;
let camCY;
let camCZ;

let inc = 100;

// sounds
let fireworkFly;
let fireworkExplode;

let fireworkAmount = 0.03; 

function preload() {
    soundFormats('mp3', 'ogg');
    backgroundIMG = loadImage('./background.jpeg');
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
    gui.addRange("Fireworks", 0.01, 1, fireworkAmount, 0.01, (val) => fireworkAmount = val);
    
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
    camY = -1000;
    camZ = 2000;
    camCX = 0;
    camCY = 0;
    camCZ = 0;
    
    cam = createCamera()
    cam.eyeX = camX;
    cam.eyeY = camY;
    cam.eyeZ = camZ;
    cam.setPosition(windowWidth / 2, windowHeight / 2, 1124);
    
    push();
    fill('grey')
    translate(200, windowHeight, 0);
    rotateX(90);
    image(backgroundIMG, -500, -500, 3000);
    pop();
   
}



function draw() {

    
    
    orbitControl();
    //cam.setPosition(windowWidth / 2, windowHeight / 2, -10);
    //console.log(cam.eyeZ);

    if (keyIsDown(UP_ARROW)) {
      cam.setPosition(cam.eyeX, cam.eyeY, cam.eyeZ - 10);
    }

    if
    (keyIsDown(LEFT_ARROW)) {
      cam.setPosition(cam.eyeX, cam.eyeY + 10, cam.eyeZ);
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      cam.setPosition(cam.eyeX, cam.eyeY - 10, cam.eyeZ);
    }

    if (keyIsDown(DOWN_ARROW)) {
      cam.setPosition(cam.eyeX, cam.eyeY, cam.eyeZ + 10);
    }
  
  
    

    colorMode(RGB)
    background(0, 0, 0, 25);

    push();
    fill('grey')
    translate(0, windowHeight, 0);
    rotateX(90);
    image(backgroundIMG, 0 ,0, 2000, 2000);
    pop();
    
    

    stroke(255);
    fill(255, 102, 94);
    rotateY(0.5);
    box(85, 85);
    if (random(1) < fireworkAmount) {
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
