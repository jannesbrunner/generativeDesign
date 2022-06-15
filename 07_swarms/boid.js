class Boid {
    constructor( ) {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector();
        this.acc = createVector();
    }

    show() {
        strokeWeight(16);
        stroke(255);
        point(this.pos.x, this.pos.y)
    }
}