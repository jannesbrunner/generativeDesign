class RescueBoat extends Ship {
    constructor(posX, posY) {
        super(posX, posY);
        this.texture = assets.rescueBoat;
        this.maxspeed = 0.3;
        this.scaling = 0.05;
        this.mass = 1.2;
    }


    applyForce(force) {
        this.acc.add(force);
    }

    follow() {
        let x = Math.floor(this.pos.x);
        let y = Math.floor(this.pos.y);
        let force = getDirectionForce(x, y);
        force.mult(0.01);
        super.applyForce(force);
    }

    driveRandom() {
        let steering = createVector();
        if(checkWithinLake(this.pos.x, this.pos.y)) {
            steering.add(getPerlinNoiseForce(this.pos.x, this.pos.y));
            steering.mult(0.01);
            return steering
        } return steering;
    }



}

