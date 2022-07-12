class Police {

    constructor() {
        this.pos = createVector(1382, 436);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.steering = createVector(0, 0);
        this.maxspeed = 1;
        this.name = "Police Boat";
        this.head = createVector(0, 0);
    }

    accelerate(x, y) {
        this.acc.add(x, y);
        this.head = createVector(x, y);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.vel.mult(0);
        this.acc.mult(0);
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER)
        rotate(this.head.heading() + 90);
        image(assets.police, 0, 0, assets.police.width * 0.03, assets.police.height * 0.03);
        pop();
    }
     

}