class Particle {

    constructor(x, y, z, hu, firework) {
        this.pos = createVector(x, y, z)
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;
        if(this.firework) {
            this.vel = createVector(0, random(-12, -8), 0);
        } else {
            this.vel = p5.Vector.random3D();
            this.vel.mult(random(1, 6))
        }

        this.acc = createVector(0, 0, 0);
    }

    applyForce = f => this.acc.add(f); 

    done() {
        if(this.lifespan < 0) {
            return true;
        } return false;
    }

    update() {
        if(!this.firework) {
            this.vel.mult(0.85);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        if(!this.firework) {
            strokeWeight(2);
            stroke(this.hu, 255, 255, this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.hu, 255, 255)
        }
        point(this.pos.x, this.pos.y, this.pos.z);
    }

}