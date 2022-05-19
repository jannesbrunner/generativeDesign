/// <reference path="./../p5.global-mode.d.ts" />

var angle = 0.1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

const scaling = () => {
    if(windowWidth <= 720) return 1
    if(windowWidth <= 1920) return 1.3
    if(windowWidth <= 2560) return 2.8
 }

function draw() {

    
    let hr = hour();
    let min = minute();
    let sec = second();

    background(255);


   
  
    angle += 1;

    // Paint surface
    push();
    translate(0, 0.75 * height);
    fill(51, 102, 0);
    beginShape();
    vertex(0, 0);
    vertex((width / 2), -20)
    vertex((width), 0)
    vertex(width, 0.25 * height)
    vertex(0, 0.25 * height)
    endShape();
    pop();
    // Paint Tower
    paintTower();

     let hrAngle = map(hr, 0, 23, 90, -90);    
     push();
     rectMode(CENTER);
     fill(255, 244, 25, 150);
     translate(width/2, height/2);
     scale(scaling());
     rotate(0);
     ellipse(100, -100, 100);
     pop();

     //width/2, height/1.3
     
     // 166 = Sonnen aufgang

}

function paintTower() {
    
    push();
    translate(width / 2, 0.75 * height);
    scale(scaling());
    beginShape();
    vertex(-50,0)
    vertex(-50, -250)
    vertex(-75, -280)
    vertex(-25, -280)
    vertex(-15, -350)
    vertex(0, -280)
    vertex(50, -280)
    vertex(25, -250)
    vertex(25,0)
    endShape();
    pop();

}

function oldWatch() {
    translate(width / 2, height / 2);
    rotate(-90);

    let hr = hour();
    let min = minute();
    let sec = second();

    strokeWeight(8);
    noFill();
    stroke(255, 100, 250);
    let secAngle = map(sec, 0, 60, 0, 360);
    arc(0, 0, 300, 300, 0, secAngle);

    push();
    rotate(secAngle);
    stroke(255, 100, 250, 150);
    line(0, 0, 100, 0);
    pop();


    stroke(255, 100, 180);
    let minAngle = map(min, 0, 60, 0, 360);
    arc(0, 0, 280, 280, 0, minAngle);

    push();
    rotate(minAngle);
    stroke(255, 100, 180);
    line(0, 0, 100, 0);
    pop();


    stroke(255, 100, 110);
    let hrAngle = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 260, 260, 0, hrAngle);

    push();
    rotate(hrAngle);
    stroke(255, 100, 110);
    line(0, 0, 70, 0);
    pop();

    stroke(255);
    point(0, 0);
}