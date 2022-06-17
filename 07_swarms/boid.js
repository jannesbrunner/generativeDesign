class Boid {
    constructor(
        maxSpeed = 4, 
        alignForce = 0.5,
        cohesionForce = 0.5,
        separationForce = 0.3,
        alignPerceptionRadius = 100,
        cohesionPerceptionRadius = 100,
        separationPerceptionRadius = 100,
        ) {
        this.ghost = ghosts[Math.floor(random(0, 4))];    
        this.lastPos = createVector();     
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
        this.id = + new Date();

        this.dead = false;

        tileMap.updatePoint(this);
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

    kill() {
        let perceptionRadius = 50;
        if(pacman.isEating) {
            let d = dist(pacman.posX, pacman.posY, this.pos.x, this.pos.y)
            if(d < perceptionRadius) {
                const index = flock.findIndex( boid => boid.id === this.id);
                if(index != -1) {
                    tileMap.deletePoint(flock[index]);
                    const boid = flock.splice(index, 1)
                    boidsAmount -= 1;
                    gui.setValue("Amount", boidsAmount);
                    adjustNoOfBoids(flock.length)
                }
            }
        }
    }

    shark() {
        let perceptionRadius = 100;
        let steering = createVector();
        let d = dist(pacman.posX, pacman.posY, this.pos.x, this.pos.y)
        if(d < perceptionRadius) {
            let diff = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
            diff.div(d);
            steering.add(diff);
        }

        return steering;
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


    
    flock() {
        this.kill();
        let tile = tileMap.getTile(this);
        let alignment = this.align(tile);
        let cohesion = this.cohesion(tile);
        let separation = this.separation(tile);
        let shark = this.shark();
        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
        this.acc.add(shark);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        image(this.ghost, this.pos.x, this.pos.y, 10, 10);
        //point(this.pos.x, this.pos.y)
    }

    update() {
        
        this.lastPos = this.pos;
        this.flock();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);  
        tileMap.updatePoint(this)       
    }
}