class Ship {
    constructor() {
        this.pos = createVector(mouseX, mouseY);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 4;
    }
}