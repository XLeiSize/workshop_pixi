import {Graphics} from 'pixi.js';

class Particle extends Graphics{

	constructor(options){

		super();
		this.options = options;
		this.x = this.options.x;
		this.y = this.options.y;
		this.vx = 2;
		this.vy = 2;
		this.angle =  Math.floor(Math.random() * 360)+1;
		this.variation = Math.floor(Math.random() *5);
		this.life = Math.random()*5000;
		this.beginFill(this.options.color);
		this.size =Math.random()*5;
		this.drawCircle(0, 0, this.size);
		this.isDead = false;
		
	}


	update(dt){
		this.x += Math.sin(this.angle * Math.PI/180) * this.vx;
		this.y += Math.cos(this.angle * Math.PI/180) * this.vy;
		this.angle +=  Math.floor(Math.random() * this.variation);
		if(this.life <= 1000){
			this.alpha =(this.life/1000);
		}
		if(this.life <= 0){
			this.isDead =  true;
		}
		this.life -= dt;
	}


	reset(){
		this.x = this.options.x;
		this.y = this.options.y;
		
		this.life = Math.random()*5000;
		this.isDead = false;
	}

	colorTo(color){
		this.beginFill(color);
	}

	pulse(){
		this.variation += Math.sin(this.angle);
	}

}

export default Particle;