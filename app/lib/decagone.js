import {Graphics} from 'pixi.js';

class Decagone extends Graphics{

	constructor(options){

		super();
		this.options = options;
		this.x = this.options.x;
		this.y = this.options.y;
		// this.beginFill(this.options.color);
		this.lineStyle(5,this.options.color);
		this.size = 150;
		this.lines = [];
		this.setDecagone();
		console.log(this.lines);
		
		
	}
	setDecagone(){
		var numberOfSides = 10;
		this.x = this.options.x/2;
		this.y = this.options.y/2;
	    this.moveTo(this.x +  this.size * Math.cos(0), this.y +  this.size *  Math.sin(0));
	    for (var i = 1; i <= numberOfSides ;i ++) {
		    let originX = this.x + this.size * Math.cos(i * 2 * Math.PI / numberOfSides);
		    let originY =  this.y + this.size * Math.sin(i * 2 * Math.PI / numberOfSides);
		    let angle = 0;
		    let radius = 100;
		    this.dx = this.x-originX;
			this.dy = this.y-originY;
		    this.lines.push({x:originX, y:originY});
		}
		console.log(this.lines);
	}

	drawDecagone(){
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


	update(){
		// 
		if(i == 0){

		}
		for(var i; i < this.lines.length; i+2){

			this.update1(i);
	
		}
		// this.reset(1);
		
	}

	update1(i){
		
		this.angle = Math.floor(Math.random() * 360);
		if(this.lines[i].x > this.x || this.lines[i].y > this.y){
			this.radius = 10;
			
		}else{
			this.radius = -10;
		}
		console.log(this.radius);
		this.lines[i].x += Math.sin(this.angle* Math.PI/180)*Math.floor(Math.random() * this.radius);
		this.lines[i].y += Math.cos(this.angle* Math.PI/180)*Math.floor(Math.random() * this.radius);
		this.drawDecagone();
		

	}	

	reset(){
		this.x = this.options.x;
		this.y = this.options.y;
		this.setDecagone();
		this.drawDecagone();
	}
}

export default Decagone;