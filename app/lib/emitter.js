import Particle from './particle'
class Emitter {
    constructor(scene){
        this.scene = scene;
        this.pool = [];
        this.pool2 = [];
        this.pool3 = [];
        this.particles = [];
        this.options = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            color: '0xFFFFFF'
        };
        this.currentTime = 0;
        this.createPool(14000,this.options);
        console.log(this.pool);
        this.throw(100);
    }
    createPool(nb, options){

        for (let i = 0; i < nb; i++) {
            let p = new Particle(options);
            this.pool.push(p);
            // this.scene.addChild(p);
        }
    }
   
    getParticleFromPool(){

    	let p = this.pool[0];
    	this.pool.splice(0,1);
    	return p;

    }

    returnParticleToPool(p){
    	p.reset();
    	this.pool.push(p);
    }

    throw(nb, pool){
        for (let i = 0; i < nb; i++) {
            let p = this.getParticleFromPool();
            if(pool == 1){
            	p.tint = 0xe74c3c;
            }else if(pool == 2){
            	p.tint = 0x00D094;
            }
            this.particles.push(p);
			this.scene.addChild(p);
        }
    }
    update(dt){
    	// this.currentTime += dt;

    	// if(this.currentTime > 1380){
    	// 	this.currentTime = 0;
    	// 	this.throw(200);
    	// }

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

    onTreble(dt){
    	this.currentTime += dt;

    	if(this.currentTime > 1380){
    		this.currentTime = 0;
    		this.throw(3, 1);
            for(var i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
 
            p.pulse();
            p.update(dt);
        }
    	}
    }

    onSnare(dt){
    	this.currentTime += dt;
    	if(this.currentTime > 1380){
    		this.currentTime = 0;
    		
    		this.throw(3, 2);
    	}

    }
}
export default Emitter