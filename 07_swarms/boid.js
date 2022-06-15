class Boid {
    constructor( ) {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(0.5, 1))
        this.acc = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        } else if(this.pos.x < 0) {
            this.pos.x = width;
        }
        if(this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if(other != this && d < perceptionRadius) {
                steering.add(other.vel);
                total++;
            }
           
        }
        if(total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce)
           
        }
        
        return steering;

    }

    flock(boids) {
        let alignment = this.align(boids);
        this.acc = alignment;
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y)
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }
}