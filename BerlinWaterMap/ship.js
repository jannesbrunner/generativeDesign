class Ship {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 0.5;
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

    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        const index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    show() {
        stroke("red");
        strokeWeight(10);
        point(this.pos.x, this.pos.y)
    } 
}

