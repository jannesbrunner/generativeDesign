function Vehicle(x, y)  {

        this.pos = createVector(random(canvasWidth), random(canvasHeight));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 6;
        this.maxSpeed = 10;
        this.maxForce = 0.8;
    
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc)
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(255,255,255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}

Vehicle.prototype.behaviors = function() {
    const arrive = this.arrive(this.target);
    const flee = this.flee(createVector(mouseX, mouseY));
    
    // power order the forces
    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
    
    
 
}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Vehicle.prototype.arrive = function(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    let speed = this.maxSpeed;
    if(d < 100) {
         speed = map(d, 0, 100, 0, this.maxSpeed)
    } 
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}

Vehicle.prototype.flee = function(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    if (d < 50) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    } else {
        return createVector(0,0);
    }

}

Vehicle.prototype.seek = function(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;

}