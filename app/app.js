import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import Emitter from './lib/emitter';
import Audio from './lib/audio';
import Decagone from './lib/decagone';

let angle = 0;


class App {

  constructor() {

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.options = {
        x: this.width / 2,
        y: this.height / 2,
        color: '0xFFFFFF',
        borderColor:'0xFFFFFF'
    };

    this.scene = new Scene();

    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );


    this.emitter = new Emitter(this.scene);

    // graphique des barres de fréquences
    this.graph = new Graphics();
    this.scene.addChild( this.graph );

    this.decagone = new Decagone(this.options);
    this.scene.addChild( this.decagone );
    console.log(this.decagone);

    this.path = '/sounds/SpamMail.mp3';

    this.audio = new Audio(this.path);
    this.audio.loadSound(this.path);
    this.addListeners();

     this.customFrequency = [19, 28, 37, 56, 112, 25, 37, 50, 75, 150, 17, 26, 33, 50, 22, 133];
    console.log(this.customFrequency);

  }

  playpause() {
      if(!this.paused) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.paused = !this.paused;
      console.log(this.paused);
  }

  /**
   * addListeners
   */
  addListeners() {

    window.addEventListener( 'resize', this.onResize.bind(this) );
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) )
    document.querySelector('body').addEventListener("click", this.playpause.bind(this));
  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();
    
    

    if(!this.paused) {
      this.emitter.update(this.DELTA_TIME);

    } 

    this.audio.analyser.getByteFrequencyData(this.audio.frequencyData);


    this.graph.clear();
    




      // if(this.audio.frequencyData[19]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[28]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      //  if(this.audio.frequencyData[37]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      //  if(this.audio.frequencyData[56]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[112]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLINGBLING');
      // }

      // // *********

      // if(this.audio.frequencyData[25]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[37]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[50]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }
      
      // if(this.audio.frequencyData[75]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }
      // if(this.audio.frequencyData[150]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLINGBLINGBLING');
      // }

      // // ********
      
      
      // if(this.audio.frequencyData[17]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[26]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // if(this.audio.frequencyData[33]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }
      // if(this.audio.frequencyData[50]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      // // *********

      // if(this.audio.frequencyData[22]>220){
      //     this.decagone.update(this.DELTA_TIME);
      //     console.log('BLING');
      // }

      if(this.audio.frequencyData[133]>220){
          this.decagone.update();
          console.log('BLINGBLINGBLI');
      }
  
     

    var barWidth = (window.innerWidth) / this.audio.frequencyData.length;
    var avgFrequencyData = [];
    var numberLines = 10;

    for(var i = 0; i<=this.audio.bufferLength; i++){
      let distance = barWidth*i*4;
      if(i == this.audio.bufferLength){
        var barHeight = 0;
      }else{
        var barHeight = Math.exp(this.audio.frequencyData[i] /50);
      }
      this.graph.beginFill(0x00D094, 0.3);
      this.graph.drawRect(distance, window.innerHeight /2, barWidth, -barHeight);
      this.graph.drawRect(distance, window.innerHeight /2, barWidth, barHeight);


        if(this.audio.frequencyData[5]>240){
            this.emitter.onTreble(this.DELTA_TIME,  2);

        }
        if(this.audio.frequencyData[10]>240){
            this.emitter.onSnare(this.DELTA_TIME,  3);
        }

    };

    this.scene.render();


  }



  /**
   * onResize
   * - Triggered when window is resized
   * @param  {obj} evt
   */
  onResize( evt ) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize( this.width, this.height );


  }


}

export default App;
