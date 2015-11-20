import {Graphics} from 'pixi.js';

class Polygone extends Graphics{

	constructor(options){

		super();
		this.options = options;
		this.x = this.options.x/2;
		this.y = this.options.y/2;
		this.lineStyle(5,this.options.color);
		this.size = this.options.size;
		this.alpha = 0.6;
		this.radius = Math.random()*30;
		this.lines = [];
		this.setPolygone();
	}

	// Setup les points du polygone
	setPolygone(){
		var numberOfSides = 30;
	    this.moveTo(this.x +  this.size * Math.cos(0), this.y +  this.size *  Math.sin(0));
	    for (var i = 1; i <= numberOfSides ;i ++) {
		    let originX = this.x + this.size * Math.cos(i * 2 * Math.PI / numberOfSides);
		    let originY =  this.y + this.size * Math.sin(i * 2 * Math.PI / numberOfSides);
		    this.lines.push({ox:originX,
		    				 oy:originY,
		    				 x:originX, 
		    				 y:originY,
		    				 angle:Math.random()*Math.PI*2,
		    				 radius:Math.random()*30
		    				});
		}
	}
	// Draw les points du polygone
	drawPolygone(){
		for(let i = 0; i < this.lines.length; i++ ){

			let x1 = this.lines[i].x;
			let	y1 = this.lines[i].y;

			if(this.lines[i+1]){
				let	x2 = this.lines[i+1].x;
				let	y2 = this.lines[i+1].y;
				this.moveTo(x1, y1);
				this.lineTo(x2, y2);
			}else{
				this.lineTo(this.lines[0].x, this.lines[0].y);
			}
	
		}
	}

	// Mise à jour des positions d'un point du polygone
	update(i, dt){
		this.currentTime += dt;

		let point = this.lines[i];

		this.clear();
		this.lineStyle(5,this.options.color);
		point.angle += 0.02;
		let toX = point.ox + Math.sin(point.angle)*point.radius;
		let toY = point.oy + Math.cos(point.angle)*point.radius;
		let easing = 0.3;
		point.x += ( toX - point.x ) * easing;
		point.y += ( toY - point.y ) * easing;

		this.drawPolygone();
					 
	}	
}

export default Polygone;