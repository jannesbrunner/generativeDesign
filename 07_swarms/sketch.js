/// <reference path="./../p5.global-mode.d.ts" />

// settings
let isPlaying = true;

let tileMap;

var bg, ghostBlue, ghostGreen, ghostPink, ghostYellow, pacmanU, pacmanD, pacmanL, pacmanR;
let ghosts = [];

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

// the pacman
const pacman = {
    posX: 0,
    posY: 0,
    speed: 5,
    isEating: false,
}

// data
const flock = [];

function preload() {
    ghostBlue = loadImage('images/ghostblue.png');
    ghostGreen = loadImage('images/ghostgreen.png');
    ghostPink = loadImage('images/ghostpink.png');
    ghostYellow = loadImage('images/ghostyellow.png');
    
    pacmanU = loadImage('images/pacmanU.png');
    pacmanD = loadImage('images/pacmanD.png');
    pacmanL = loadImage('images/pacmanL.png');
    pacmanR = loadImage('images/pacmanR.png');
    bg = loadImage('images/background.png');
}

function keyReleased() {
    if (key === "p") {
        isPlaying = !isPlaying;
        isPlaying ? loop() : noLoop();
        gui.setValue("Log", isPlaying ? "⏵︎" : "⏸︎");
    }

    if(keyCode === 32) {
       pacman.isEating = false;
    }
}


function guiSetup() {
    gui = QuickSettings.create(width -200 , 20, "Settings");
    gui.setKey("g");
    gui.addHTML("Info", `
    Play Pause:   <b>P</b><br/>
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


    ghosts.push(ghostBlue, ghostGreen, ghostPink, ghostYellow);
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    guiSetup();
    tileMap = new TileMap();
    for (let i = 0; i < boidsAmount; i++) {
        flock.push(new Boid());
    }

    pacman.posX = width/2;
    pacman.posY = height/2;
    pacmanImg = pacmanR;
}

function adjustNoOfBoids(v) {
        boidsAmount = v;
        let diff = boidsAmount - flock.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                flock.push(new Boid())
            }
        } else if(diff < 0) {
            for (let i = 0; i < diff * -1; i++) {
                tileMap.deletePoint(flock.pop());
            }
        }
}



function draw() {
    //background(51);
    image(bg, 0, 0, width, height);
    push();
    fill('grey')
    translate(0, windowHeight, 0);
   
    pop();

    for(let boid of flock) {
        boid.edges();
        //boid.flock()
        boid.update();
        boid.show();
    }
    // let imgX = 40;
    // let imgY = 40;
    // let mAngle = atan2(mouseY - imgY, mouseX - imgX);
    // translate(imgX, imgY);
    // rotate(angle);
  
   
   
    
    push();
    if (keyIsDown(87))  { //W
       pacman.posY -= pacman.speed;
       pacmanImg = pacmanU;
      
    } 

    if (keyIsDown(65))  { //A
        pacman.posX -= pacman.speed;
        pacmanImg = pacmanL;
    } 

    if (keyIsDown(83))  { //S
        pacman.posY += pacman.speed;
        pacmanImg = pacmanD
    } 

    if (keyIsDown(68))  { //D
        pacman.posX += pacman.speed;
        pacmanImg = pacmanR;
    } 

    if (keyIsDown(32)) { // SPACE
        pacman.isEating = true;
    }
    
    
    
    image(pacmanImg, pacman.posX, pacman.posY, 60, 60); 

    pop();
}
