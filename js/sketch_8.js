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
    colorMode(HSB);


    video = createCapture(VIDEO);
    video.size(600,600);
    video.hide();

    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9,256); // creates smoothing effects
    fft.setInput(mic);
    mic.start();

    // background(0, [0.9]);
}
function draw(){
 background('rgba(0,0,0, 0.2)');    
 // image(video,-100,0, 800, 600);
    var gridSize = 20;

    video.loadPixels();
    for (let y=0; y<video.height; y+=gridSize) {
        for (let x=0; x<video.width; x+=gridSize) {

            var index = (y * video.width + x) * 4;
            var indexBlue = (y * video.width + x) * 5;
            var blue = video.pixels[indexBlue];
            var red = video.pixels[index];
            // let diameter = map(red, 0, 255, gridSize, 1)
            let angle = map(red, 0, 255, 360, 0)
            // let RectWidth = map(blue, 0, 255, 1, 15)
            let Hue = map(blue, 0, 255, 0, 100)


            // fill(255);
            // noStroke();
            noFill();
            strokeWeight(1);
            stroke(Hue*3+50, 50, 100);
            push();
            translate(x + gridSize/3, y + gridSize/2);
            rotate(angle*2);
            rect(0, 0, gridSize*3, gridSize);
            pop();


            
            
        }
    }
    //TEXT
    var customText = $("#textInput").val();

    if ($("#textInput").val() == ""){
        customText = ("I made this with my body and my voice")
    }

    console.log(customText);

    fill(0, 0, 100);
    textSize(70);
    textLeading(70);
    textStyle(BOLDITALIC);
    text(customText, 300, 300, 550);

    //MIC CIRCLES
    noFill();
    stroke(255, 100, 255);
    strokeWeight(2)
    var micLevel = mic.getLevel();

    // circle(300, 300, 50 + sumLow);
    // circle(300, 300, 100 + sumMid);
    // circle(300, 300, 150 + sumHigh);
    // circle(300, 300, 50 + micLevel*900);
    // circle(300, 300, 100 + micLevel*900);
    // circle(300, 300, 150 + micLevel*900);

    // var circleA = [];

    // console.log(micLevel);
    // if (micLevel > 0.05){
        
    // }

}
function mousePressed(){
    getAudioContext().resume();

}
