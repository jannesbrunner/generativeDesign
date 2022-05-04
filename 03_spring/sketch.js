/// <reference path="./../p5.global-mode.d.ts" />

var inc = 0.1;
var scl = 20;
var cols, rows;

var zoff = 0; 

var fr;

var particles = [];

var flowfield;


function setup() {
    createCanvas(800, 800);
    pixelDensity(2);
    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');

    flowfield = new Array(cols * rows);

    for (let index = 0; index < 500; index++) {
        particles[index] = new Particle();
    }
    background(255);

    
}
  
  function draw() {
    
    var yoff = 0;
    for(let y = 0; y < rows; y++) {
      var xoff = 0;
      for(let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(0.2);
        flowfield[index] = v;
        xoff += inc;
        stroke(0, 50);
        /* push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop(); */
      }
      yoff += inc;
    }
    zoff += 0.001;
    fr.html(floor(frameRate()));

    particles.forEach(particle => {
      particle.follow(flowfield)
      particle.update();
      particle.edges();
      particle.show();  
    });
  }