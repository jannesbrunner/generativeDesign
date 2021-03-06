class Vehicle {

    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 6;
        this.vColor = color(255, 204, 0);
        this.maxSpeed = 10;
        this.maxForce = 0.8;
    }

    set radius(r) {
        this.r = r;
    }

    set color(c) {
        this.vColor = c;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc)
        this.acc.mult(0);
    }

    show() {
        stroke(this.vColor);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    behaviors() {
        const arrive = this.arrive(this.target);
        const flee = this.flee(createVector(mouseX, mouseY));
        const windMic = this.windMic(this.target);
        // power order the forces
        flee.mult(4);
        arrive.mult(0.5);
        windMic.mult(1);
        if (useWind) this.applyForce(windMic);
        if (useMouse) this.applyForce(flee);
        this.applyForce(arrive);
    }

    arrive(target) {
        const desired = p5.Vector.sub(target, this.pos);
        const d = desired.mag();
        let speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed)
        }
        desired.setMag(speed);
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) {
        const desired = p5.Vector.sub(target, this.pos);
        const d = desired.mag();
        if (d < 50 && !powerMouse) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        } else if (powerMouse) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
        else {
            return createVector(0, 0);
        }
    }

    seek(target) {
        const desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;

    }

    windMic() {


        //const x = noise(map(spectrum.slice(60, 175).reduce((a, b) => a + b), 0, 28750, 0.1, 10), this.pos.y) 
        //const y = noise(map(spectrum.slice(176, 350).reduce((a, b) => a + b), 0, 28750, -0.5, 0.5), this.pos.y, 24) -0.5
        //const desired = createVector(x, y)

        const desired = createVector(noise(this.pos.x, this.pos.y), noise(this.pos.x, this.pos.y, 24) - 0.5);
        desired.setMag(micForceLevel);
        desired.limit(this.maxForce);
        return desired;
    }

}
