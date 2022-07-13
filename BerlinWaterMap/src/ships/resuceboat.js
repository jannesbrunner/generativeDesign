class RescueBoat extends Ship {
    constructor(posX, posY) {
        super(posX, posY);
        this.texture = assets.rescueBoat;
        this.maxspeed = 0.1;
        this.scaling = 0.09;
        this.mass = 5;
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
}

