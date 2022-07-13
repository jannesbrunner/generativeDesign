class Police {

    constructor() {
        this.pos = createVector(1382, 436);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.steering = createVector(0, 0);
        this.maxspeed = 1;
        this.name = "Police Boat";
        this.headBefore = createVector(0, 0);
        this.head = createVector(0, 0);
        this.mass = 10;
        this.texture = assets.police;
    }

    accelerate(x, y) {
        this.headBefore = this.vel.copy();
        this.acc.add(x, y);
        this.head = this.vel.copy();
    }

    respectWaterBoundaries() {
        let newPos = p5.Vector.add(this.pos, this.vel);
        let isStillInWater = checkWithinWater(newPos.x, newPos.y);
        if(!isStillInWater) {
            this.vel.mult(0);
            this.acc.mult(0);
        }
        //console.log(newPos.x, newPos.y);
        return isStillInWater;
    }

    update() { 

        //this.vel.mult(0);
        //let resistance = p5.Vector.mult (this.vel.mult(this.vel).div(WATER_RESISTANCE).mult(-1)
        let resistance = this.vel.copy();
        resistance.mult(-1)
        resistance.mult(WATER_RESISTANCE);

        
        this.vel.add(resistance);
        this.vel.add(this.acc);
        if(this.respectWaterBoundaries()) {
            this.pos.add(this.vel);
        }
        this.acc.mult(0);
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER)
        //rotate(this.head.heading() + 90);
        rotate(p5.Vector.lerp(this.headBefore , this.head , 0.5).heading() + 90);
        image(this.texture, 0, 0, this.texture.width * 0.03, this.texture.height * 0.03);
        pop();
    }
     

}