//9.1: Transformations Pt.1 (Translate, Rotate, Push/Pop) - p5.js Tutorial
//https://www.youtube.com/watch?v=o9sgjuh-CBM&ab_channel=TheCodingTrain

//11.1: Live Video and createCapture() - p5.js Tutorial
//https://www.youtube.com/watch?v=bkGf4fEHKak&ab_channel=TheCodingTrain

//CP2: Webcam Input – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=G3WxVV7aN4I&list=PLsGCUnpinsDmghIwGww77MRn1vvKjPVqV&index=1&ab_channel=JeffThompson

//CP2: Reading Video Pixels – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=VYg-YdGpW1o&ab_channel=JeffThompson

let video;
let mic;

function setup(){
    createCanvas(600, 600);
    angleMode(DEGREES);
    rectMode(CENTER);


    video = createCapture(VIDEO);
    video.size(600,600);
    video.hide();

    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9,256); // creates smoothing effects
    fft.setInput(mic);
    mic.start();


}
function draw(){
    background(0);
    // image(video,-100,0, 800, 600);
    var gridSize = 40;

    video.loadPixels();
    for (let y=0; y<video.height; y+=gridSize) {
        for (let x=0; x<video.width; x+=gridSize) {

            var index = (y * video.width + x) * 4;
            var red = video.pixels[index];
            // let diameter = map(red, 0, 255, gridSize, 1)
            let angle = map(red, 0, 255, 360, 0)


            fill(255);
            noStroke();
            push();
            translate(x + gridSize/2, y + gridSize/2);
            rotate(angle);
            rect(0, 0, gridSize, 2);
            pop();

            
            
        }
    }
    // var spectrum = fft.analyze();
    // let sumHigh = 0;
    // let sumMid = 0;
    // let sumLow = 0;

    // for (var i = 0; 0 < i < 85; i++){
    //     sumLow += spectrum[i];
    // }
    // for (var i = 0; 86 < i < 170; i++){
    //     sumMid += spectrum[i];
    // }
    // for (var i = 0; 171 < i < 256; i++){
    //     sumHigh += spectrum[i];
    // }

    noFill();
    stroke(255, 100, 255);
    strokeWeight(2)
    var micLevel = mic.getLevel();

    // circle(300, 300, 50 + sumLow);
    // circle(300, 300, 100 + sumMid);
    // circle(300, 300, 150 + sumHigh);
    circle(300, 300, 50 + micLevel*900);
    circle(300, 300, 100 + micLevel*900);
    circle(300, 300, 150 + micLevel*900);

    // console.log(micLevel);

}
function mousePressed(){
    getAudioContext().resume();

}