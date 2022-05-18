function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200, 200);
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