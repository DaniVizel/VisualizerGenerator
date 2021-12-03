
//11.1: Live Video and createCapture() - p5.js Tutorial
//https://www.youtube.com/watch?v=bkGf4fEHKak&ab_channel=TheCodingTrain

//CP2: Webcam Input – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=G3WxVV7aN4I&list=PLsGCUnpinsDmghIwGww77MRn1vvKjPVqV&index=1&ab_channel=JeffThompson

//CP2: Reading Video Pixels – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=VYg-YdGpW1o&ab_channel=JeffThompson

let video;

function setup(){
    createCanvas(600, 600);

    video = createCapture(VIDEO);
    video.size(600,600);
    video.hide();
}
function draw(){
    background(0);
    // image(video,-100,0, 800, 600);

    var gridSize = 20;

    video.loadPixels();
    for (let y=0; y<video.height; y+=gridSize) {
        for (let x=0; x<video.width; x+=gridSize) {

            var index = (y * video.width + x) * 4;
            var red = video.pixels[index];
            let diameter = map(red, 0, 255, 2, gridSize)

            fill(255);
            noStroke();
            circle(x + gridSize/2, y + gridSize/2, diameter);
        }
    }

}