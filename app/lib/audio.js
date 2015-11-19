
class Audio {
	constructor(path){
        this.audioCtx = new AudioContext();
		this.analyser = this.audioCtx.createAnalyser();
		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.fftSize = 2048;
		this.bufferLength = this.analyser.frequencyBinCount;

		this.audioBuffer;
		this.audioSource;

		this.path = path;

    }
	


	loadSound(path) {
	  var request = new XMLHttpRequest();
	  request.open('GET', this.path, true);
	  request.responseType = 'arraybuffer';
	  console.log(this.audioCtx);

	  // Decode asynchronously
	  request.onload = function() {

	    this.audioCtx.decodeAudioData(request.response, function(buffer) {
	      // success callback
	      this.audioBuffer = buffer;

	      // Create sound from buffer
	      this.audioSource = this.audioCtx.createBufferSource();
	      this.audioSource.buffer = this.audioBuffer;

	      // connect the audio source to context's output
	      this.audioSource.connect( this.analyser );
	      this.analyser.connect( this.audioCtx.destination );

	      // play sound
	      this.audioSource.start();

	    }.bind(this), function(){

	      // error callback
	      //
	    });
	  }.bind(this);
	  request.send();
	}

	play() {
    	this.audioCtx.resume();
  	}

  	pause() {
   		this.audioCtx.suspend();
  	}

	
}
export default Audio;