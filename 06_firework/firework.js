class Firework {

    constructor() {
        this.firework = new Particle(random(0, 2000), height, random(0, 2000) , this.hu, true);
        // this.fireworkHeart = new ParticleHeart(x, height, this.hu, true)
        this.exploded = false;
        this.particles = []
        this.hu = random(255);
    }

    done() {
        if(this.exploded && this.particles.length === 0) return true
        return false;
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update()
            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
                if(playSound) sound.play();
            }
        }

/*        if (!this.exploded) {
            this.fireworkHeart.applyForce(gravity);
            this.fireworkHeart.update()
            if (this.fireworkHeart.vel.y >= 0) {
                this.exploded = true;
                this.explode();
                sound.play();
            }
        }
*/

        for (let i = this.particles.length-1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if(this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (let i = 0; i < 100; i++) {
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, this.hu, false)
            this.particles.push(p);
//            let ph = new ParticleHeart(this.fireworkHeart.pos.x, this.fireworkHeart.pos.y, this.fireworkHeart.pos.z, this.hu, false)
//            this.particles.push(ph);
        }
        
    }

    show() {
        colorMode(HSB);
        if(!this.exploded) {
            this.firework.show();
//            this.fireworkHeart.show();
        } 
        for (let i = 0; i < this.particles.length; i++) {
            const element = this.particles[i];
            element.show();
        }
         
       
    }

}