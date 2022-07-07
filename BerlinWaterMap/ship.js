class Ship {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.vel = createVector(random(-1, 1),random(-1, 1));
        this.acc = createVector(0,0);
        this.maxspeed = 0.5;
        const nameIndex = random(0, availableBoatNames.length).toFixed(0);
        this.name = availableBoatNames[nameIndex];
        // remove the name from the array so it can't be used again
        availableBoatNames.splice(nameIndex, 1);
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
        push();
        if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 10) {
            currentBoat = this;
            updateGameGui(currentBoat.name);
        }
       
        stroke(currentBoat === this? "red" : "black");

       
        strokeWeight(10);
        point(this.pos.x, this.pos.y)
        pop();
       
    } 
}

