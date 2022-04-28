/// <reference path="./../p5.global-mode.d.ts" />

// global values
var inc = 0.009 // set incremental step size
var canvaWidth = 800;
var canvaHeight = 800;

// Pelin Noise offsets
var global_xoff = {
  r : 2000,
  g : 400,
  b : 700,
  a : 0,
}
var global_yoff = {
  r : 2000,
  g : 400,
  b : 700,
  a : 0
}

function setup() {

  createCanvas(canvaWidth, canvaHeight);
  pixelDensity(1); // for HiDPI Displays
  
  // set up GUI
  let guiX = createGui('Offset X');
  let guiY = createGui('Offset Y');
  let guiSettings = createGui('Settings');
  reload = createButton('Reload');

  // set positions 
  const setGuiPositions = () => {
    reload.position(canvaWidth + 220 , 0);
    guiX.setPosition(canvaWidth + 10, 200);
    guiY.setPosition(canvaWidth + 225, 200);
    guiSettings.setPosition(canvaWidth + 10, 0);
    reload.size(200, 200);
    reload.position(canvaWidth + 220 , 0);
  }
  setGuiPositions();
  
  // set offset sliders
  sliderRange(0, 10000, 100)
  guiX.addObject(global_xoff);
  guiY.addObject(global_yoff);

  // set inc slider
  sliderRange(0.0001, 0.15, 0.0001)
  guiSettings.addGlobals('inc');
  
  // set canva width sliders
  sliderRange(200, 2000, 100);
  guiSettings.addGlobals('canvaWidth', 'canvaHeight');

  // reload button
  reload.mousePressed( () => {
    resizeCanvas(canvaWidth, canvaHeight);
    setGuiPositions();
    drawPattern();
  }); 
  drawPattern();
  // we re-paint with reload button only
  noLoop();
}

function drawPattern() {
  loadPixels();
  const yoff = { ...global_yoff };
  for (let x = 0; x < width; x++) {
    // reset xoff for every x-row in p-array
    const xoff = { ...global_xoff };
    for (let y = 0; y < height; y++) {
      const index = (x + y * width) * 4;
      let r = noise(xoff.r, yoff.r) * 255;
      let g = noise(xoff.g, yoff.g) * 255;
      let b = noise(xoff.b, yoff.b) * 255;
      let a = noise(xoff.a, yoff.a) * 255;
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = a;
      for (let val in xoff) { xoff[val] += inc }
    }
    for (let val in yoff) { yoff[val] += inc }
  }
  updatePixels();
}


function draw() {
 // not needed
}

