class Boid {
    constructor(
        maxSpeed = 4, 
        alignForce = 0.5,
        cohesionForce = 0.5,
        separationForce = 0.3,
        alignPerceptionRadius = 100,
        cohesionPerceptionRadius = 100,
        separationPerceptionRadius = 100 
        ) {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(0.5, 1))
        this.acc = createVector();
        this.maxSpeed = maxSpeed;
        this.alignForce = alignForce,
        this.cohesionForce = cohesionForce,
        this.separationForce = separationForce,
        this.alignPerceptionRadius = alignPerceptionRadius,
        this.cohesionPerceptionRadius = cohesionPerceptionRadius,
        this.separationPerceptionRadius = separationPerceptionRadius
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
        let perceptionRadius = this.alignPerceptionRadius;
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
            steering.limit(this.alignForce)
           
        }
        
        return steering;

    }

    cohesion(boids) {
        let perceptionRadius = this.cohesionPerceptionRadius;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if(other != this && d < perceptionRadius) {
                steering.add(other.pos);
                total++;
            }
           
        }
        if(total > 0) {
            steering.div(total);
            steering.sub(this.pos)
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.cohesionForce)
           
        }
        
        return steering;

    }

    separation(boids) {
        let perceptionRadius = this.separationPerceptionRadius;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if(other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d);
                steering.add(diff);
                total++;
            }
           
        }
        if(total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.separationForce)
           
        }
        
        return steering;

    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y)
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
    }
}