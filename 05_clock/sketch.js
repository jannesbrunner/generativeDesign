/// <reference path="./../p5.global-mode.d.ts" />
let angle = 0.1;

let cloud1Pos;
let cloud2Pos;
let cloud3Pos;
let cloud4Pos;

let isPlaying = true;
let gui;
let currentTimeString;
let customTime = "12:00";
let useCustomTime = false;

// misc
const dotSpace = 9;
let theAngle;

// the clock points
const seconds9 = [];
const seconds5 = [];
const minutes9 = [];
const minutes5 = [];
const hours9 = [];
const hours2 = [];

function keyReleased() {
    if (key === " ") {
        isPlaying = !isPlaying;
        isPlaying ? loop() : noLoop();
        gui.setValue("Log", isPlaying ? "⏵︎" : "⏸︎");
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    cloud1Pos = random(-50, -300);
    cloud2Pos = random(-100, -400);
    cloud3Pos = random(-75, -250);
    cloud4Pos = random(-230, -330);

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
    )
    seconds5.push(
        { x: -15, y: -8 - 10 * dotSpace },
        { x: -15, y: -8 - 11 * dotSpace },
        { x: -15, y: -8 - 12 * dotSpace },
        { x: -15, y: -8 - 13 * dotSpace },
        { x: -15, y: -8 - 14 * dotSpace },
    )
    minutes9.push(
        { x: -15, y: -8 - 18 * dotSpace },
        { x: -15, y: -8 - 19 * dotSpace },
        { x: -15, y: -8 - 20 * dotSpace },
        { x: -15, y: -8 - 21 * dotSpace },
        { x: -15, y: -8 - 22 * dotSpace },
        { x: -15, y: -8 - 23 * dotSpace },
        { x: -15, y: -8 - 24 * dotSpace },
        { x: -15, y: -8 - 25 * dotSpace },
        { x: -15, y: -8 - 26 * dotSpace },
    )

    minutes5.push(
        { x: -15, y: -8 - 28 * dotSpace },
        { x: -15, y: -8 - 29 * dotSpace },
        { x: -15, y: -8 - 30 * dotSpace },
        { x: -15, y: -8 - 31 * dotSpace },
        { x: -15, y: -8 - 32 * dotSpace },
    )
    hours9.push(
        { x: -15, y: -8 - 36 * dotSpace },
        { x: -15, y: -8 - 37 * dotSpace },
        { x: -15, y: -8 - 38 * dotSpace },
        { x: -15, y: -8 - 39 * dotSpace },
        { x: -15, y: -8 - 40 * dotSpace },
        { x: -15, y: -8 - 41 * dotSpace },
        { x: -15, y: -8 - 42 * dotSpace },
        { x: -15, y: -8 - 43 * dotSpace },
        { x: -15, y: -8 - 44 * dotSpace },
    )
    hours2.push(
        { x: -15, y: -8 - 46 * dotSpace },
        { x: -15, y: -8 - 47 * dotSpace }
    )

    gui = QuickSettings.create(width - 300, 20, "Settings");
    gui.setKey("g");
    gui.addText("Current Time", currentTimeString);
    gui.addHTML("Info", `
    Play Pause:   <b>Space</b><br/>
    Toggle Gui:   <b>g</b><br/>
    `);
    gui.addText("Log", "");
    gui.addTime("Custom Offset", customTime, (val) => {
        customTime = val;
        console.log(customTime);
    });
    gui.addBoolean("Use Time Offset", useCustomTime, (val) => useCustomTime = val);
}

const scaling = () => {
    if (windowWidth <= 900) return 0.8
    if (windowWidth <= 1920) return 1.3
    if (windowWidth <= 2560) return 2.8
}

function getTime() {
    if (useCustomTime) {
        const hoursMinutes = customTime.split(":");
        const customHours = parseInt(hoursMinutes[0])
        const customMinutes = parseInt(hoursMinutes[1]);
        return {
            hr: Math.floor((hour() + customHours + customMinutes/60)%24),
            min: Math.floor(minute() + customMinutes),
            sec: second(),
        }

    } else {
        return {
            hr: hour(),
            min: minute(),
            sec: second(),
        }
    }
}

function getSunlightB(h) {
    switch (h) {
        case 7: return 20;
        case 8: return 40;
        case 9: return 45;
        case 10: return 50;
        case 11: return 55;
        case 12: return 60;
        case 13: return 60;
        case 14: return 60;
        case 15: return 55;
        case 16: return 45;
        case 17: return 40;
        case 18: return 35;
        case 19: return 20;
        default: return 10;
    }
}

function getMoonlightB(h) {
    switch (h) {
        case 0: return 55;
        case 1: return 60;
        case 2: return 55;
        case 3: return 50;
        case 4: return 45;
        case 5: return 40;
        case 6: return 35;
        case 20: return 10;
        case 21: return 20;
        case 22: return 30;
        case 23: return 40;
        case 24: return 55;
        default: return 10;
    }
}

function draw() {

    let { hr, min, sec } = getTime();
    let displayMin = min < 10 ? `0${min}` : min;
    gui.setValue("Current Time", `${hr}:${displayMin}:${sec}`);

    push();
    colorMode(HSB);
    background(198, 100, getSunlightB(hr) + 10);
    pop()

    //Paint moon
    paintMoon();


    //Paint sun
    paintSun();


    // Paint Clouds
    push();
    colorMode(HSB);
    fill(360, 0, getSunlightB(hr) + 20);
    makeCloud(cloud1Pos, 250);
    makeCloud(cloud2Pos + 100, 300)
    makeCloud(cloud3Pos, 250);
    makeCloud(cloud4Pos, 150);
    pop()




    // Paint surface
    push();
    translate(0, 0.75 * height);
    colorMode(HSB);
    //let hour = getTime(hr)
    // if(hour > 6 && hour < 20 ) {
    fill(134, 100, getSunlightB(hr));
    // }
    // else {
    //     fill(50, 50, getMoonlightB(hr));
    // }
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

    cloud1Pos += 0.1;
    cloud2Pos += 0.12;
    cloud3Pos += 0.13;
    cloud4Pos += 0.2;
    angle += 1;


    if (cloud1Pos > width) cloud1Pos = -50;
    if (cloud2Pos > width) cloud2Pos = -100;
    if (cloud3Pos > width) cloud3Pos = -75;
    if (cloud4Pos > width) cloud4Pos = -150;


}

function paintClock() {
    let { hr, min, sec } = getTime();
    // Points
    push();
    translate(width / 2, 0.82 * height);
    scale(0.9)
    strokeWeight(7);
    stroke(35);
    seconds9.forEach((p) => point(p.x, p.y));
    seconds5.forEach((p) => point(p.x, p.y));
    minutes9.forEach((p) => point(p.x, p.y));
    minutes5.forEach((p) => point(p.x, p.y));
    hours9.forEach((p) => point(p.x, p.y));
    hours2.forEach((p) => point(p.x, p.y));
    stroke('white');
    // seconds 9
    for (let i = 1; i <= sec % 10; i++) {
        point(seconds9[i - 1].x, seconds9[i - 1].y);
    }
    // seconds 5
    for (let i = 1; i <= Math.floor(sec / 10); i++) {
        point(seconds5[i - 1].x, seconds5[i - 1].y);
    }
    // minutes 9
    for (let i = 1; i <= min % 10; i++) {
        point(minutes9[i - 1].x, minutes9[i - 1].y);
    }
    // minutes 5
    for (let i = 1; i <= Math.floor(min / 10); i++) {
        point(minutes5[i - 1].x, minutes5[i - 1].y);
    }
    // hours 9
    for (let i = 1; i <= hr % 10; i++) {
        point(hours9[i - 1].x, hours9[i - 1].y);
    }
    // hours 2
    for (let i = 1; i <= Math.floor(hr / 10); i++) {
        point(hours2[i - 1].x, hours2[i - 1].y);
    }

    let color = sec % 2 == 0 ? 'red' : 'black';
    stroke(color);
    point(-35, -8 - 16 * dotSpace);
    point(10, -8 - 16 * dotSpace);
    point(-35, -8 - 34 * dotSpace);
    point(10, -8 - 34 * dotSpace);
    pop();
}

function paintSun() {
    let { hr } = getTime();
    let hrAngle = map(hr, 0, 23, -90, 260);
    push();
    rectMode(CENTER);
    colorMode(HSB)
    fill(getSunlightB(hr) < 40 ? 40 : getSunlightB(hr), 100, 100);
    translate(width / 2, height / 1.5);
    rotate(hrAngle);
    ellipse(-320, 0, 100);
    pop();


}

function paintMoon() {
    let { hr } = getTime();
    let hrAngle = 0

    if (hr == 22 || hr == 23 || (hr > 0 && hr < 6)) {
        push();
        rectMode(CENTER);
        translate(120, 80);
        fill(225, 225, 255, getSunlightB(hr) + 20);
        noStroke();
        ellipse(50, 80, 125, 125);
        colorMode(HSB);
        fill(198, 100, getSunlightB(hr) + 10);
        noStroke();
        ellipse(80, 80, 125, 125);

        pop();
    }



}

function paintTower() {
    push();
    translate(width / 2, 0.95 * height);
    fill(48, 48, 48, 255);
    beginShape();
    vertex(-50, 0) // 1
    vertex(-35, -500) // 2
    vertex(-75, -550)
    vertex(-25, -550)
    vertex(-15, -600)
    vertex(0, -550)
    vertex(50, -550)
    vertex(10, -500)
    vertex(25, 0)
    endShape();
    pop();
}

function makeCloud(cloudX, cloudY) {
    noStroke();
    ellipse(cloudX, cloudY, 70, 50);
    ellipse(cloudX + 10, cloudY + 10, 70, 50);
    ellipse(cloudX - 20, cloudY + 10, 70, 50);
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