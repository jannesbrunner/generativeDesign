class Particle {

    constructor(x, y) {

        this.pos = createVector(random(20, 300), random(20, 300))
        this.vel = createVector(0, -10);
        this.acc = createVector(0, 0);
    }

    applyForce = f => this.acc.add(f); 

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        point(this.pos.x, this.pos.y);
    }

}