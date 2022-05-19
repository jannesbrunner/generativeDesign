/// <reference path="./../p5.global-mode.d.ts" />

let angle = 0.1;

let cloud1Pos = -50;
let cloud2Pos = -100;

// misc
const dotSpace = 9;

// the clock points
const seconds9 = [];
const seconds5 = [];
const minutes9 = [];
const minutes5 = [];
const hours9 = [];
const hours2 = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    seconds9.push(
        { x: -15, y: -8 },
        { x: -15, y: -8 - 1 * dotSpace },
        { x: -15, y: -8 - 2 * dotSpace },
        { x: -15, y: -8 - 3 * dotSpace },
        { x: -15, y: -8 - 4 * dotSpace },
        { x: -15, y: -8 - 5 * dotSpace },
        { x: -15, y: -8 - 6 * dotSpace },
        { x: -15, y: -8 - 7 * dotSpace },
        { x: -15, y: -8 - 8 * dotSpace },
        { x: -15, y: -8 - 9 * dotSpace },
    )

    seconds5.push(
        { x: -15, y: -8 - 11 * dotSpace },
        { x: -15, y: -8 - 12 * dotSpace },
        { x: -15, y: -8 - 13 * dotSpace },
        { x: -15, y: -8 - 14 * dotSpace },
        { x: -15, y: -8 - 15 * dotSpace },
    )

    minutes9.push(

        { x: -15, y: -8 - 19 * dotSpace },
        { x: -15, y: -8 - 20 * dotSpace },
        { x: -15, y: -8 - 21 * dotSpace },
        { x: -15, y: -8 - 22 * dotSpace },
        { x: -15, y: -8 - 23 * dotSpace },
        { x: -15, y: -8 - 24 * dotSpace },
        { x: -15, y: -8 - 25 * dotSpace },
        { x: -15, y: -8 - 26 * dotSpace },
        { x: -15, y: -8 - 27 * dotSpace },
    )

    minutes5.push(
        { x: -15, y: -8 - 29 * dotSpace },
        { x: -15, y: -8 - 30 * dotSpace },
        { x: -15, y: -8 - 31 * dotSpace },
        { x: -15, y: -8 - 32 * dotSpace },
        { x: -15, y: -8 - 33 * dotSpace },
    )

    hours9.push(
        { x: -15, y: -8 - 37 * dotSpace },
        { x: -15, y: -8 - 38 * dotSpace },
        { x: -15, y: -8 - 39 * dotSpace },
        { x: -15, y: -8 - 40 * dotSpace },
        { x: -15, y: -8 - 41 * dotSpace },
        { x: -15, y: -8 - 42 * dotSpace },
        { x: -15, y: -8 - 43 * dotSpace },
        { x: -15, y: -8 - 44 * dotSpace },
        { x: -15, y: -8 - 45 * dotSpace },
    )

    hours2.push(
        { x: -15, y: -8 - 47 * dotSpace },
        { x: -15, y: -8 - 48 * dotSpace }
    )


}

const scaling = () => {
    if (windowWidth <= 900) return 0.8
    if (windowWidth <= 1920) return 1.3
    if (windowWidth <= 2560) return 2.8
}

function draw() {


    let hr = hour();
    let min = minute();
    let sec = second();

    background(255);

    //Paint sun
    paintSun();

    ellipse(cloud1Pos, height / 4, 200, 50 * sin(angle - 0.01));
    ellipse(cloud2Pos - 50, height / 5, 250 * sin(angle), 80);


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
    paintClock();

    cloud1Pos += 1;
    cloud2Pos += 1.1;
    angle += 1;
    if (cloud1Pos > width) cloud1Pos = -50;
    if (cloud2Pos > width) cloud2Pos = -100;

}

function paintClock() {

    let hr = hour();
    let min = minute();
    let sec = second();


    // Points
    push();
    
    translate(width / 2, 0.88 * height);
    scale(0.9);
    strokeWeight(7);
    stroke('black');
    seconds9.forEach( (p) => point(p.x, p.y));
    seconds5.forEach( (p) => point(p.x, p.y));
    minutes9.forEach( (p) => point(p.x, p.y));
    minutes5.forEach( (p) => point(p.x, p.y));
    hours9.forEach( (p) => point(p.x, p.y));
    hours2.forEach( (p) => point(p.x, p.y));
    stroke('white');
    // seconds 9
    for (let index = 0; index < sec % 10; index++) {
        point(seconds9[index].x, seconds9[index].y);
    }
    // seconds 5
    for (let index = 0; index < Math.floor(sec / 10); index++) {
        point(seconds5[index].x, seconds5[index].y);
    }
    // minutes 9
    for (let index = 0; index < min % 10; index++) {
        point(minutes9[index].x, minutes9[index].y);
    }
    // minutes 5
    for (let index = 0; index < Math.floor(min / 10); index++) {
        point(minutes5[index].x, minutes5[index].y);
    }
    // hours 9
    for (let index = 0; index <  hr % 10; index++) {
        point(hours9[index].x, hours9[index].y);
    }
    // hours 2
    for (let index = 0; index < Math.floor(hr / 10); index++) {
        point(hours2[index].x, hours2[index].y);
    }

    let color = sec % 2 == 0 ? 'red' : 'black';
    stroke(color);
    point(-35, -8 - 17 * dotSpace);
    point(10, -8 - 17 * dotSpace);
    point(-35, -8 - 35 * dotSpace);
    point(10, -8 - 35 * dotSpace);
    pop();
}

function paintSun() {
    let hr = hour();
    let hrAngle = map(hr, 0, 23, -90, 260);
    push();
    rectMode(CENTER);
    fill(255, 244, 25, 150);
    translate(width / 2, height / 1.5);
    rotate(hrAngle);
    ellipse(-320, 0, 100);
    pop();
}

function paintTower() {
    push();
    translate(width / 2, 0.88 * height);
    fill(48, 48, 48, 255); 
    beginShape();
    vertex(-55, 0)
    vertex(-50, -400)
    vertex(-75, -450)
    vertex(-25, -450)
    vertex(-15, -500)
    vertex(0, -450)
    vertex(50, -450)
    vertex(25, -400)
    vertex(30, 0)
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