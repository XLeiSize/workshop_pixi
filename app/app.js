import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import Emitter from './lib/emitter';
import Audio from './lib/audio';
import Polygone from './lib/decagone';

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
        size : 180
    };

    this.scene = new Scene();
    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );


    this.emitter = new Emitter(this.scene);

    this.polygone = new Polygone(this.options);
    this.scene.addChild( this.polygone );

    // graphique des barres de fréquences
    this.graph = new Graphics();
    this.scene.addChild( this.graph );

    this.path = '/sounds/SpamMail.mp3';

    this.audio = new Audio(this.path);
    this.audio.loadSound(this.path);

    // Tableau des frequences repertoriées correspondant aux notes de "piano" destinés au polygone
    this.customFrequency = [19, 25, 26, 33, 22, 37, 50, 75, 112, 133, 150];


    this.addListeners();

    

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
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) );
    document.querySelector('body').addEventListener("click", this.playpause.bind(this));
  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    
    this.scene.renderer.backgroundColor = 0x000000;

    this.audio.analyser.getByteFrequencyData(this.audio.frequencyData);
    
    // SI MUSIQUE PAS EN PAUSE - UPDATE LES ANIMATIONS
    if(!this.paused) {

      this.DELTA_TIME = Date.now() - this.LAST_TIME;
      this.LAST_TIME = Date.now();
      this.emitter.update(this.DELTA_TIME);

      // UPDATE le DECAGONE
      for(var i = 0; i < this.polygone.lines.length; i++){
        for(var j = 0; j < this.customFrequency.length; j++){
          if(this.audio.frequencyData[i]>150){
            this.polygone.update(i,this.DELTA_TIME);
          }
        }      
      }

    } 

    // Création du graphique de visualisations du spectre sonore
    this.graph.clear();
    
    var barWidth = (window.innerWidth) / this.audio.frequencyData.length;
    var avgFrequencyData = [];
    var numberLines = 10;

    // TANT QU'IL Y A DU SON
    for(var i = 0; i<=this.audio.bufferLength; i++){

      let distance = barWidth*i*4;

      if(i == this.audio.bufferLength){
        var barHeight = 0;
      }else{
        var barHeight = Math.exp(this.audio.frequencyData[i] /50);
      }

      this.graph.beginFill(0x00D094, 0.3);
      this.graph.drawRect(distance, window.innerHeight / 2, barWidth, -barHeight);
      this.graph.drawRect(distance, window.innerHeight / 2, barWidth, barHeight);

        // TREBLE frequence
        if(this.audio.frequencyData[5]>240){
            this.emitter.onTreble(this.DELTA_TIME, 2);
        }

        // SNARE Frequence
        if(this.audio.frequencyData[10]>240){
            this.emitter.onSnare(this.DELTA_TIME, 3);
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
