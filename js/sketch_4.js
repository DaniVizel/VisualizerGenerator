
// Referenced from
// https://github.com/CodingTrain/website/tree/main/Tutorials/P5JS/p5.js_sound/17.11_FFT
//https://p5js.org/examples/sound-frequency-spectrum.html

var fft;
var button;

function mousePressed(){
  getAudioContext().resume();

}

function setup() {
  createCanvas(256, 256);
  colorMode(HSB);
  angleMode(DEGREES);
  mic = new p5.AudioIn();

  fft = new p5.FFT(0.9, 64);
  fft.setInput(mic);
  mic.start();

}

function draw() {
  var w = width / 64

  background(0);
  var spectrum = fft.analyze();
  stroke(255);
  // noStroke();
  // translate(width / 2, height / 2); // only needed for circle
  // beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    // var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    // var r = map(amp, 0, 256, 20, 100);
    fill(i, 255, 255);
    // var x = r * cos(angle);
    // var y = r * sin(angle);
    stroke(i, 255, 255);
    // line(0, 0, x, y);
    // vertex(x, y);
    var y = map(amp, 0, 256, height, 0);
    rect(i * w, y, w - 2, height - y);
  }
  endShape();
}