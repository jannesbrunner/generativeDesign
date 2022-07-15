class Motorboat extends Ship {
    constructor(posX, posY) {
        super(posX, posY);
        this.texture = assets.yacht;
        this.maxspeed = 0.6;
        this.mass = 0.8;
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

