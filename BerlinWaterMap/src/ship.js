class Ship {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);
        this.maxspeed = 0.2;
        const nameIndex = random(0, availableBoatNames.length).toFixed(0);
        this.name = availableBoatNames[nameIndex];
        // remove the name from the array so it can't be used again
        availableBoatNames.splice(nameIndex, 1);
    }

    respectWaterBoundaries() {
        let newPos = p5.Vector.add(this.pos, this.vel);
        let isStillInWater = checkWithinWater(newPos.x, newPos.y);
        //console.log(newPos.x, newPos.y);
        return isStillInWater;
    }

    update(ships) {

        this.acc.add(this.separation(ships));
        if(settings.scaryMouse) { this.acc.add(this.scaryMouse()) }
        this.vel.add(this.acc);
        if(this.respectWaterBoundaries()) {
            this.pos.add(this.vel);
        }
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    follow() {

        let x = Math.floor(this.pos.x);
        let y = Math.floor(this.pos.y);

        let force = getDirectionForce(x, y);
        force.mult(0.01);
        this.applyForce(force);
    }

    // Separate from other ships
    separation(ships) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        // For each ship in the system, check if it's too close
        // Can be optimized maybe with QuadTree
        for(let other of ships) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if(other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.normalize();
                diff.mult(1 / d); // weight by distance
                steering.add(diff);
                total++;
            }
           
        }

        if(settings.hasPolice && police) {
            let d = dist(this.pos.x, this.pos.y, police.pos.x, police.pos.y)
            if(d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, police.pos);
                diff.normalize();
                diff.mult(1 / d); // weight by distance
                steering.add(diff);
                total++;
            }
        }
        if(total > 0) {
            //steering.div(total);
            //steering.setMag(this.maxSpeed);
            //steering.sub(this.vel);
            //steering.limit(1)
        }
        
        return steering.mult(0.1);

    }

    scaryMouse() {
        let perceptionRadius = 100;
        let steering = createVector();
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y)
        if(d < perceptionRadius) {
            let diff = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
            diff.div(d);
            steering.add(diff);
        }
        return steering;
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
        push();
        if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 10) {
            currentBoat = this;
            updateGameGui(currentBoat.name);
        }
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER)
        rotate(this.vel.heading());
        image(assets.yacht, 0, 0, assets.yacht.width * 0.03, assets.yacht.height * 0.03);
        pop();

        if (currentBoat === this) {
            stroke(currentBoat === this ? "red" : "black");
            strokeWeight(10);
            point(this.pos.x, this.pos.y)
        }

    }
}

