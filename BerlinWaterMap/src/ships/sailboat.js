class Sailboat extends Ship {
    constructor(posX, posY) {
        super(posX, posY);
        this.texture = assets.sailboat;
        this.mass = 1;
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

