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
var mic;
var micLevel;
var micForceLevel;
var fft;
var spectrum;
var vehicles = [];

// settings //
var showFlowField = false;
var paintMode = true;
var isPlaying = true;
var fps = 60;
var showGui = true;
var showFPS = false;
var showSpec = false;
var useMic = true;
var circleColor = false;
var isFullscreen = false;

var bgColor;
var vColor;

var vRadius = 6;

// Parameters //
var fr; // current frame rate
var fl;
var flowfield;


function preload() {
  // Lemon Jelly by Billy Argel
  font = loadFont("./font.ttf");

}

function keyReleased() {
  if (key === " ") {
    isPlaying = !isPlaying;
    isPlaying ? loop() : noLoop();
    gui.panel.setValue("info", isPlaying ? "Play" : "Pause");
  }
  if (key === "f") {
    showFPS ? fr.hide() : fr.show();
    showFPS = !showFPS;
    gui.panel.setValue("info", showFPS ? "FPS on" : "FPS off");
  }
  if (key === "s") {
    showSpec = !showSpec;
    gui.panel.setValue("info", showSpec ? "Spectrum On" : "Spectrum Off");
  }
  if (key === "m") {
    useMic = !useMic;
    gui.panel.setValue("info", useMic ? "Mic on" : "Mic off");
  }
}

function guiSetup() {
  // init guit
  gui = new Gui();
  gui.panel.addHTML("Info", `
  Play Pause:   <b>Space</b><br/>
  Toggle Gui:   <b>g</b><br/>
  Toggle FPS:   <b>f</b><br/>
  Toggle Spectrum: <b>s</b><br/>
  Toggle Mic:   <b>m</b><br/>
  `);
  gui.panel.addRange("FPS", 1, 60, fps, 1, (val) => fps = val);
  gui.panel.addRange("Radius", 0, 12, vRadius, 1, (val) => {
    vehicles.forEach(v => {
      v.radius = val;
    });
  })
  gui.panel.addProgressBar("Mic level", 1, 0, 0);
  gui.panel.addProgressBar("Mic FL", 1, 0, 0);
  gui.panel.addText("info", "");
  gui.panel.addBoolean("Fullscreen", fullscreen(), () => {
    fullscreen(!fullscreen());
    resizeCanvas(windowWidth, windowHeight);
  });  

  // Extra GUI since color picker in quicksettings is broken...

}

function randomColor() {
  return color(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  micLevel = 0;
  bgColor = createColorPicker(randomColor());
  vColor = createColorPicker(randomColor());

  guiSetup();
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  //text('CJDesign', canvasWidth/4, canvasHeight/2);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  var points = font.textToPoints('CJDesign', width / 4, height / 2, map(width, 1, 7680, 50, 1000));

  points.forEach((fontPoint) => {
    let vehicle = new Vehicle(fontPoint.x, fontPoint.y);
    vehicles.push(vehicle);
  })
  fr = createP('');
  fl = createP('');
  fr.hide();
 
}

function gate(level) {
  if (level < 0) return 0
  return level;
}

function draw() {
  if (useMic) {
    micLevel = mic.getLevel();
    micForceLevel = gate(1 + Math.log10((micLevel * 10)));
    spectrum = fft.analyze();
  }
  fl.html(micForceLevel);
  gui.panel.setValue("Mic level", micLevel);
  gui.panel.setValue("Mic FL", micForceLevel);

  frameRate(fps);
  background(bgColor.color());
  if (showSpec) { drawSpectrum(); }
  vehicles.forEach(v => {
    v.behaviors();
    v.update();
    v.color = vColor.color();
    v.show();
  });

  fr.html(floor(frameRate()));

}

function drawSpectrum() {
  push();
  beginShape();
  fill(bgColor.color());
  for (let i = 0; i < spectrum.length; i++) {
    vertex(map(i, 0, 1024, 0, width), map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
  pop();
}

