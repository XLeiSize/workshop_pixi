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
		    let from = this.x + this.size * Math.cos(i * 2 * Math.PI / numberOfSides);
		    let to =  this.y + this.size * Math.sin(i * 2 * Math.PI / numberOfSides);
		    this.lines.push({x:from, y:to});
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
		this.clear();
		console.log(this.lines.length);
		this.update1(1);
		this.drawDecagone();
		// this.reset(1);
		
	}

	update1(i){
		this.lines[i].x *=1;
		this.lines[i].y *=1.1;
		this.lines[i+1].x *=1;
		this.lines[i+1].y *=1.1;

		console.log(this.lines[i].y);

	}	

	reset(i){
		let x1 = this.lines[i].x;
		let	y1 = this.lines[i].y;
		let	x2 = this.lines[i+1].x;
		let	y2 = this.lines[i+1].y;

		x1 -= 10;
		y1 -= 10;
		x2 -= 10;
		y2 -= 10;
		this.lines.splice(i,0,{x:x1, y:y1});
		this.lines.splice(i+1,0,{x:x2, y:y2});

	}





	reset(dt){
		this.tint = 0xFFFFFF;
		this.size -=1;
	}


}

export default Decagone;