/// <reference path="./../p5.global-mode.d.ts" />

var inc = 0.01;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1); // for HiDPI Displays
  
  loadPixels();
  var yoff = 0;
  for (let x = 0; x < width; x++) {
    var xoff = 0; // reset xoff for every x-row in p-array
    for (let y = 0; y < height; y++) { 
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      pixels[index] = r;
      pixels[index+1] = r;
      pixels[index+2] = r;
      pixels[index+3] = 255;  
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}

function draw() {
// not needed
}