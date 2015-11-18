import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import Emitter from './lib/emitter';
import Audio from './lib/audio';

let angle = 0;


class App {

  constructor() {

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new Scene();

    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );

    this.ball = new Graphics();
    this.ball.beginFill( 0xFF0000 );
    this.ball.drawCircle( 0, 0, 50 );
    this.ball.y = window.innerHeight / 2;
    // this.scene.addChild( this.ball );

    this.emitter = new Emitter(this.scene);

    // graphique des barres de fréquences
    this.graph = new Graphics();
    this.scene.addChild( this.graph );

    this.path = '/sounds/SpamMail.mp3';

    this.audio = new Audio(this.path);
    console.log(this.audio);
    this.audio.loadSound(this.path);
    console.log(this.audio.frequencyData);
    this.addListeners();

  }

  /**
   * addListeners
   */
  addListeners() {

    window.addEventListener( 'resize', this.onResize.bind(this) );
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) )

  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();
    
    this.emitter.update(this.DELTA_TIME);

    this.audio.analyser.getByteFrequencyData(this.audio.frequencyData);

    this.graph.clear();

    var barWidth = (window.innerWidth) / this.audio.frequencyData.length;
    var avgFrequencyData = [];
    var numberLines = 10;

    for(var i = 0; i<=this.audio.bufferLength; i++){
      let distance = barWidth*i*4;
      this.graph.beginFill(0x00D094, 0.3);
      // this.graph.drawRect(barWidth*i, window.innerHeight , barWidth, frequencyData[i]);
      this.graph.drawRect(distance, window.innerHeight /2, barWidth, -Math.exp(this.audio.frequencyData[i] /50));
      this.graph.drawRect(distance, window.innerHeight /2, barWidth, Math.exp(this.audio.frequencyData[i] /50));

      // let numberSamples = p.round(256 / numberLines);
      // const specCopy = [...spectrum];
      // let average = specCopy.splice(numberSamples * i, numberSamples).reduce((a, b) => a + b) / numberSamples;
      
        if(this.audio.frequencyData[5]>240){
            this.emitter.onTreble(this.DELTA_TIME);
        }
        if(this.audio.frequencyData[10]>240){
            this.emitter.onSnare(this.DELTA_TIME);
        }
    };


    this.scene.render();

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
