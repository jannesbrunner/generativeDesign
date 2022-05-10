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


// settings //
var showFlowField = false;
var paintMode = true;
var isPlaying = true;
var fps = 60;

// Parameters //
var fr; // current frame rate
var flowfield;


// Pictures //



function preload() { 
  // Lemon Jelly by Billy Argel
  font = loadFont("./font.ttf");
}

function guiSetup() {
  gui = new Gui();
  gui.panel.addButton("Play/Pause", () => {
    isPlaying = !isPlaying;
    isPlaying ? loop() : noLoop();
  });
  gui.panel.addRange("FPS", 1, 60, fps, 1, (val) => fps = val);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(2);
  guiSetup();
  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  //text('CJDesign', canvasWidth/4, canvasHeight/2);

  var points = font.textToPoints('CJDesign', canvasWidth/4, canvasHeight/2, 192);

  points.forEach((fontPoint) => {
    stroke(255,255,255);
    strokeWeight(8);
    point(fontPoint.x, fontPoint.y);

  })

  
  fr = createP('');
}

function draw() {
  frameRate(fps);  
 

  fr.html(floor(frameRate()));
}


