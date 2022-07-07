class Ship {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 4;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force)
    }

    show() {
        stroke(this.color);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    } 
}

