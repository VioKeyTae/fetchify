var context = new AudioContext();
let svg;
let counter = 0;
// Here's where most of the work happens
function processAudio(e) {
  var buffer = e.inputBuffer.getChannelData(0);
  var out = e.outputBuffer.getChannelData(0);
  var amp = 0;
  svg = document.querySelector('#svg');
  // Iterate through buffer to get the max amplitude for this frame
  for (var i = 0; i < buffer.length; i++) {
    var loud = Math.abs(buffer[i]);
    if(loud > amp) {
      amp = loud;
    }
    // write input samples to output unchanged
    out[i] = buffer[i];
  }

  if(counter==0){
    svg.style.width = parseInt(80 + amp * 20) + "%";
    svg.style.height = parseInt(80 + amp * 20) + "%";
    counter ++;
  }
  else{
    counter = 0;
  }

  // set the svg circle's radius according to the audio's amplitude
  //circle.setAttribute('r',20 + (amp * 15));
  // set the circle's color according to the audio's amplitude
  /*var color = Math.round(amp * 255);
  color = 'rgb(' + color + ',' + 0 + ',' + color + ')';
  circle.setAttribute('fill',color);*/
}

  /*
  // Add an audio element
  var audio = new Audio();
  audio.src = 'http://www.mhat.com/phatdrumloops/audio/acm/mole_on_the_dole.wav';
  audio.controls = true;
  audio.preload = true;
  document.body.appendChild(audio);
*/
let node, processor;
function addAudioStuff(audio){
      audio.addEventListener('play',function() {
        node = context.createMediaElementSource(audio);
        processor = context.createScriptProcessor(2048, 1, 1);
        processor.onaudioprocess = processAudio;
        node.connect(processor);
        processor.connect(context.destination);
        audio.play();
      });

}
