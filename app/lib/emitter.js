import Particle from './particle'
class Emitter {
    
    constructor(scene){
        this.scene = scene;
        this.pool = [];
        this.particles = [];
        this.options = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            color: '0xFFFFFF'
        };
        this.currentTime = 0;

        this.createPool(30000,this.options);
        this.throw(200);
    }

    // Creer le Pool
    createPool(nb, options){

        for (let i = 0; i < nb; i++) {
            let p = new Particle(options);
            this.pool.push(p);
        }
    }

   // Recupere le premier particule du pool, puis l'enleve
    getParticleFromPool(){

    	let p = this.pool[0];
    	this.pool.splice(0,1);
    	return p;

    }
    // Remet la particule dans le pool
    returnParticleToPool(p){
    	p.reset();
    	this.pool.push(p);
    }

    // fonction throw qui affiche les particules
    throw(nb, pool){
        for (let i = 0; i < nb; i++) {
            let p = this.getParticleFromPool();
            if(pool == 1){
            	p.tint = 0x6019B2;
            }else if(pool == 2){
            	p.tint = 0xFFB54C;
            }
            this.particles.push(p);
			this.scene.addChild(p);
        }
    }

    update(dt){

        for(var i = 0; i < this.particles.length; i++) {
        	let p = this.particles[i];
 
            if(p.isDead){
            	this.returnParticleToPool(p);
            	this.particles.splice(i,1);
                this.scene.removeChild(p);	        
            }
            p.update(dt);
        }
    }

    // throw particules destinés à representer le "KICK"
    onTreble(dt, nb){
    	this.currentTime += dt;

    	if(this.currentTime > 1380){
    		this.currentTime = 0;
    		this.throw(nb, 1);
    	}
        this.scene.renderer.backgroundColor = 0x2B0F4C;
    }
     // throw particule destiné à representer le "SNARE"
    onSnare(dt, nb){
    	this.currentTime += dt;
    	if(this.currentTime > 1380){
    		this.currentTime = 0;
    		
    		this.throw(nb, 2);
            for(var i = 0; i < this.particles.length; i++) {
                let p = this.particles[i];

                p.pulse();
            }
    	}

    }
}
export default Emitter