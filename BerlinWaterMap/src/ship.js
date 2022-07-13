function newShip(posX, posY, type) {

    // shipTypes in sketch.js
    let shipProbabilities = []
    
    let generateArray = (number, size) => {
        let array = [];
        for (let i = 0; i < size; i++) {
            array.push(number);
        }
        return array;
    }
     

    shipProbabilities = shipProbabilities.concat(generateArray(1, 10))
    shipProbabilities = shipProbabilities.concat(generateArray(2, 10))
    shipProbabilities = shipProbabilities.concat(generateArray(3, 2))
   
    

    if (type == "random") {
        let index = shipProbabilities[Math.floor(Math.random() * shipProbabilities.length)];
        type = shipTypes[index];
    }

    switch (type) {
        case "motorboat":
            return new Motorboat(posX, posY);
        
        case "sailboat":
            return new Sailboat(posX, posY);

        case "rescueBoat":
            return new RescueBoat(posX, posY);
    
        default:
            console.error(`Ship type ${type} not found`);
            return;
    }

}


class Ship {
    constructor(posX, posY) {
        if(this.constructor == Ship){
            throw new Error(" Object of Abstract Class Ship cannot be created");
        }
        this.pos = createVector(posX, posY);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 0.2;
        const nameIndex = random(0, availableBoatNames.length).toFixed(0);
        this.name = availableBoatNames[nameIndex];
        // remove the name from the array so it can't be used again
        availableBoatNames.splice(nameIndex, 1);
        this.texture = null;
        this.scaling = 0.03;
        this.mass = 1;
    }

    respectWaterBoundaries() {
        let newPos = p5.Vector.add(this.pos, this.vel);
        let isStillInWater = checkWithinWater(newPos.x, newPos.y);
        //console.log(newPos.x, newPos.y);
        return isStillInWater;
    }

    update(ships) {

        let resistance = this.vel.copy();
        resistance.mult(-1)
        resistance.mult(WATER_RESISTANCE);

        this.vel.add(resistance);
        this.acc.add(this.separation(ships));
        if (settings.scaryMouse) { this.acc.add(this.scaryMouse()) }
        if (settings.followPolice) { this.acc.add(this.stickToPolice()) }
        this.acc.add(this.driveRandom());
        let velAngleBefore = this.vel.heading();
        this.vel.add(this.acc.div(this.mass));
        let velAngleAfter = this.vel.heading();
        if (this.respectWaterBoundaries()) {

            this.pos.add(this.vel);
        }
        
        this.vel.limit(this.maxspeed);
        if(currentBoat == this) {
            currentBoatAccelerationGui = this.getAccAsString();
        }
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    driveRandom() {
        let steering = createVector();
        if(checkWithinLake(this.pos.x, this.pos.y)) {
            steering.add(getPerlinNoiseForce(this.pos.x, this.pos.y));
            steering.mult(0.01);
            return steering
        } return steering;
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
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        // For each ship in the system, check if it's too close
        // Can be optimized maybe with QuadTree
        for (let other of ships) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.normalize();
                diff.mult(1 / d); // weight by distance
                steering.add(diff);
                total++;
            }

        }

        if (settings.hasPolice && police) {
            let d = dist(this.pos.x, this.pos.y, police.pos.x, police.pos.y)
            if (d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, police.pos);
                diff.normalize();
                diff.mult(1 / d); // weight by distance
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            //steering.div(total);
            //steering.setMag(this.maxSpeed);
            //steering.sub(this.vel);
            //steering.limit(1)
        }

        return steering.mult(0.1);
    }

    stickToPolice() {
        let perceptionRadius = 100;
        let steering = createVector(0, 0);

        let d = dist(this.pos.x, this.pos.y, police.pos.x, police.pos.y)
        if (d < perceptionRadius && d > 40) {

            steering.add(police.pos);
            steering.sub(this.pos)
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(1)

        }
        return steering.mult(0.1);
    }

    scaryMouse() {
        let perceptionRadius = 100;
        let steering = createVector();
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y)
        if (d < perceptionRadius) {
            let diff = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
            diff.div(d);
            steering.add(diff);
        }
        return steering.mult(0.04);;
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
        image(this.texture, 0, 0, this.texture.width * this.scaling, this.texture.height * this.scaling);
        pop();

        if (currentBoat === this) {
            stroke(currentBoat === this ? "red" : "black");
            strokeWeight(10);
            point(this.pos.x, this.pos.y)
        }

    }

    getAccAsString()  {
        return `${this.acc.mag().toFixed(5)}`;    }
}

