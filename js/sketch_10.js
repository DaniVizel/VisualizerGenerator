//9.1: Transformations Pt.1 (Translate, Rotate, Push/Pop) - p5.js Tutorial
//https://www.youtube.com/watch?v=o9sgjuh-CBM&ab_channel=TheCodingTrain

//11.1: Live Video and createCapture() - p5.js Tutorial
//https://www.youtube.com/watch?v=bkGf4fEHKak&ab_channel=TheCodingTrain

//CP2: Webcam Input – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=G3WxVV7aN4I&list=PLsGCUnpinsDmghIwGww77MRn1vvKjPVqV&index=1&ab_channel=JeffThompson

//CP2: Reading Video Pixels – Webcam Tracking in p5.js
//https://www.youtube.com/watch?v=VYg-YdGpW1o&ab_channel=JeffThompson

// https://p5js.org/reference/#/p5/saveCanvas
//https://stackoverflow.com/questions/678434/how-to-retrieve-a-value-from-input-using-jquery



var sliderVal = 5;
$('.slider').on('change', function() {
    sliderVal = $(this).val();
    console.log(sliderVal);
});

var t = 0;
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

}
function draw(){
    // image(video, 0, 0);

t++;
frameRate(24);

$(".exportButton").click(function(){
    saveCanvas('myCanvas', 'png')
})

 background('rgba(26, 41, 107, 0.4)');    
//  image(video,-100,0, 800, 600); view webcam over canvas
 
//TEXT
var customText = $("#textInput").val();

if ($("#textInput").val() == ""){
    customText = ("I made this with my body and my voice")
}

fill(0, 0, 100);
noStroke();
textSize(70);
textLeading(70);
textFont('Barlow');
textStyle(BOLDITALIC);
text(customText, 300, 380, 550);


    var gridSize = 20;

    video.loadPixels();
    
    for (let y=0; y<video.height; y+=gridSize) {
        for (let x=0; x<video.width; x+=gridSize) {

            var index = (y * video.width + x) * 4;
            var red = video.pixels[index];
            var green = video.pixels[index+1];
            var blue = video.pixels[index+2];

            let angle = map(red, 0, 255, 360, 0);
            let Hue = map(blue, 0, 255, 0, 100);

            
            
            
            noFill();
            strokeWeight(1);
            stroke(Hue * sliderVal, 50, 100);
            push();
            translate(x + gridSize/3, y + gridSize/2);
            rotate(angle + cos(t*2)*100);
            rect(0 , 0 , gridSize*3, gridSize);

            pop();


            
            
        }
    }
    

    //MIC CIRCLES
    var micLevel = mic.getLevel();

if(micLevel > 0.03){
    createCircle(1); 
    console.log("made a circle with my voice")
}

    for(var i=0; i<circleArray.length; i++){
        noFill();
        stroke("rgb(26, 41, 107,)");
        strokeWeight(1+ micLevel*100);
        circle(circleArray[i].x, circleArray[i].y, 20 + 600*micLevel);
        circle(circleArray[i].x, circleArray[i].y, 50 + 600*micLevel);

        console.log("circle drawn");
    }
    // var updateCircle = 20;
    // for (var i=0; i< 200; i++){
    //     updateCircle = updateCircle + 1;
    // }


    // for(var i=0; i<circleArray.length; i++){
    //     noFill();
    //     stroke(0);
    //     strokeWeight(5);
    //     circle(circleArray[i].x, circleArray[i].y, 20);
    //     console.log("circle drawn");

    // }
    // var circleSize;
    // for(var i=0; i< 300; i++){
    //     circleSize = circleSize + 1;
    // }

    //FAST RANDOM BLACK CIRCLES
    // noFill();
    // stroke(0);
    // strokeWeight(micLevel*500);
    // console.log(micLevel*100);
    // var circleXPos = random(600);
    // var circleYPos = random(600);

    // circle(circleXPos, circleYPos, 50 + micLevel*900);
    // if(micLevel > 0.5){
    //     circle(circleXPos, circleYPos, 100 + micLevel*900);
    //     circle(circleXPos, circleYPos, 150 + micLevel*900);

    // }
    // if(micLevel > 1){
    //     circle(circleXPos, circleYPos, 200 + micLevel*900);

    // }
   
}
function mousePressed(){
    getAudioContext().resume();

    loadPixels();
    colourToMatch = get(mouseX, mouseY);

}
var circleArray = [];

    function createCircle(num){
        for(var i=0; i<num; i++){
            circleArray.push ({
                "x": random(600),
                "y": random(600),
            })
        }
    }
    // setInterval(function(){ 
    //     createCircle(1); 
    //     console.log("circle made");
    // }, 2000);
    

