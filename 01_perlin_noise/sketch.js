/// <reference path="./../p5.global-mode.d.ts" />

var inc = 0.009;
var iterations = 50;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1); // for HiDPI Displays

  const repeats = Math.floor(random(0, 50));
  console.log(`Repeat: ${repeats}`);

  for (let n = 0; n < repeats; n++) {
    loadPixels();
    var yr_off = 1000;
    var yg_off = 300;
    var yb_off = 0;
    var ya_off = 6000;
    for (let x = 0; x < width; x++) {
      // reset xoff for every x-row in p-array
      var xr_off = 2000;
      var xg_off = 400;
      var xb_off = 700;
      var xa_off = 0;
      for (let y = 0; y < height; y++) {
        var index = (x + y * width) * 4;
        var r = noise(xr_off, yr_off) * 255;
        var g = noise(xg_off, yg_off) * 255;
        var b = noise(xb_off, yb_off) * 255;
        var a = noise(xa_off, ya_off) * 255;
        pixels[index] = r;
        pixels[index + 1] = g;
        pixels[index + 2] = b;
        pixels[index + 3] = a;
        xr_off += inc;
        xg_off += inc;
        xb_off += inc;
        xa_off += inc;
      }
      yr_off += inc;
      yg_off += inc;
      yb_off += inc;
      ya_off += inc;
    }
    updatePixels();
  }

}

function draw() {
  // not needed
}