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
    }

    accelerate(x, y) {
        this.headBefore = this.head.copy();
        this.acc.add(x, y);
        this.head = createVector(x, y);
    }

    respectWaterBoundaries() {
        let newPos = p5.Vector.add(this.pos, this.vel);
        let isStillInWater = checkWithinWater(newPos.x, newPos.y);
        //console.log(newPos.x, newPos.y);
        return isStillInWater;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        if(this.respectWaterBoundaries()) {
            this.pos.add(this.vel);
        }
        this.vel.mult(0);
        this.acc.mult(0);
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER)
        //rotate(this.head.heading() + 90);
        rotate(p5.Vector.lerp(this.headBefore , this.head , 0.5).heading() + 90);
        image(assets.police, 0, 0, assets.police.width * 0.03, assets.police.height * 0.03);
        pop();
    }
     

}