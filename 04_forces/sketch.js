/// <reference path="./../p5.global-mode.d.ts" />
/**
 * @title Task 2: Spring Visualization (p5.js)
 * @authors cat & ggJayBizzle
 * @group CJdesign
 * @instution BHT Berlin
 */
"use strict";

var gui;
var font;

// Global Variables //
var canvasWidth = 800;
var canvasHeight = 400;

var vehicles = [];


// settings //
var showFlowField = false;
var paintMode = true;
var isPlaying = true;
var fps = 60;
var showGui = true;
var showFPS = false;
var circleColor = false;

var bgColor;
var vColor;

var bgR, bgG, bgB, bgA;
var vRadius = 6;



// Parameters //
var fr; // current frame rate
var flowfield;


function preload() { 
  // Lemon Jelly by Billy Argel
  font = loadFont("./font.ttf");
 
}

function keyReleased() {
  if(key === " ") {
    showGui ? gui.panel.hide() : gui.panel.show();
    showGui = !showGui;
  }
  if(key === "f") {
    showFPS ? fr.hide() : fr.show();
    showFPS = !showFPS;
  }
}

function guiSetup() {
   // init guit
  gui = new Gui();
  gui.panel.addButton("Play/Pause", () => {
    isPlaying = !isPlaying;
    isPlaying ? loop() : noLoop();
  });
  gui.panel.addRange("FPS", 1, 60, fps, 1, (val) => fps = val);
  gui.panel.addRange("Radius", 0, 12, vRadius, 1, (val) => {
    vehicles.forEach(v => {
      v.radius = val;
    });
  })
  // Extra GUI since color picker in quicksettings is broken...

}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(2);

  bgColor = createColorPicker(random(0, 255), random(0, 255), random(0, 255));
  vColor = createColorPicker(random(0, 255), random(0, 255), random(0, 255));


  
  guiSetup();
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  //text('CJDesign', canvasWidth/4, canvasHeight/2);

  var points = font.textToPoints('CJDesign', canvasWidth/8, canvasHeight/2, 192);

  points.forEach((fontPoint) => {
    let vehicle = new Vehicle(fontPoint.x, fontPoint.y);
    vehicles.push(vehicle);
  })
  fr = createP('');
  fr.hide();
}

function draw() {
  frameRate(fps);  
  background(bgColor.color());
  vehicles.forEach(v => {
    v.behaviors();
    v.update();
    v.show();
  });



  fr.html(floor(frameRate()));
}


