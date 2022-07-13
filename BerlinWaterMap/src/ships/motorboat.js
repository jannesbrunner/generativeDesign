class Motorboat extends Ship {
    constructor(posX, posY) {
        super(posX, posY);
        this.texture = assets.yacht;
        this.maxspeed = 0.4;
    }

    update(ships) {

        this.acc.add(this.separation(ships));
        if (settings.scaryMouse) { this.acc.add(this.scaryMouse()) }
        if (settings.followPolice) { this.acc.add(this.stickToPolice()) }
        
        this.vel.add(this.acc);
        if (this.respectWaterBoundaries()) {
            this.pos.add(this.vel);
        }
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
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

