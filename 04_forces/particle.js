/**
 * @title Task 2: Spring Visualization (p5.js)
 * @class Class representing a particle for visualization
 * @authors cat & ggJayBizzle
 * @group CJdesign
 * @instution BHT Berlin
 */ 
 class Particle {

    constructor(id, posX = random(width), posY = random(height)) {
        this.id = id;
        this.pos = createVector(posX,posY);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 4;
        this.color = color(random(0,255), random(0,255), random(0,255), 20);
        this.prevPos = this.pos.copy();
    }

    get getPos() {
        return `ID: ${this.id}. X: ${this.pos.x} Y: ${this.pos.y}`
    }

    update() {
        // const ranV = p5.Vector.random2D();
        // ranV.setMag(0);
        // this.applyForce(ranV);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.maxspeed);
        // this.acc.mult(0);
    }

    applyForce(force) {
        //this.acc.add(force)
        this.acc = force;
    }
    
    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        const index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    show() {
        //push();
        if (this.vel.x > 0){
            image(beeR, this.pos.x, this.pos.y, 25, 25);
            
        }else{
            image(beeL, this.pos.x, this.pos.y, 25, 25);
        }
        //pop();
        /* stroke(this.color);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); */
        this.updatePrev();
    } 

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            // this.vel = createVector(this.vel.x * -1, this.vel.y);
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > width) {
            this.pos.y = 0;
            // this.vel = createVector(this.vel.x, this.vel.y * -1);
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }
 }