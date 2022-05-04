 class Particle {

    constructor(posX = random(width), posY = random(height)) {
        this.pos = createVector(posX,posY);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 4;
        this.color = color(random(0,255), random(0,255), random(0,255), 20);
        this.prevPos = this.pos.copy();
    }

    update() {
        // const ranV = p5.Vector.random2D();
        // ranV.setMag(0);
        // this.applyForce(ranV);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force)
    }

    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        const index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    show() {
        stroke(this.color);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    } 

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }
 }