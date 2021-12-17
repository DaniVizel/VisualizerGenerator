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

var t = 0;
let video;
let mic;


var colourSliderVal = 5;
$('#colorSlider').on('input', function() {
    colourSliderVal = parseInt($(this).val());
});

$(".exportButton").click(function(){
    saveCanvas('myCanvas', 'png')
    // window.print()
})

var TextSizeSliderVal = 70;

$('#TextSizeSlider').on('input', function() {
    TextSizeSliderVal = parseInt($(this).val());
    // console.log(TextSizeSliderVal); // this is defined, and works
});
var TextPosSliderVal = 300;

$('#TextPositionSlider').on('input', function() {
    TextPosSliderVal = parseInt($(this).val());
    // console.log(TextSizeSliderVal); // this is defined, and works
});


function setup(){
    var canvas = createCanvas(700, 700);
    canvas.parent('#sketch-holder');
    angleMode(DEGREES);
    rectMode(CENTER);
    colorMode(HSB);

    colorPicker = createColorPicker('rgba(26, 41, 107, 0.4)');
    colorPicker.parent('#colPicker');



    video = createCapture(VIDEO);
    video.size(700,700);
    video.hide();

    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9,256); // creates smoothing effects
    fft.setInput(mic);
    mic.start();

}
function draw(){
    

    // image(video, 0, 0);

    frameRate(24);

    
    background(colorPicker.color());
    // background('rgba(26, 41, 107, 0.4)');    
    // image(video,-100,0, 800, 600); 
    // view webcam over canvas
 
//TEXT
    console.log(TextSizeSliderVal); /// why is this undefined

    var customText = $("#textInput").val();

    if ($("#textInput").val() == ""){
        customText = ("I made this with my body and my voice")
    }

    fill(0, 0, 100);
    noStroke();
    textSize(TextSizeSliderVal);
    textLeading(TextSizeSliderVal);
    // console.log(TextSizeSliderVal);
    textFont('Barlow');
    textStyle(BOLDITALIC);
    // text(customText, 300, 380, 550);
    text(customText, 380, TextPosSliderVal, width);



    var gridSize = 30;

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
            stroke(Hue * colourSliderVal, 50, 100);
            push();
            translate(x + gridSize/3, y + gridSize/2);
            // rotate(angle + cos(t*2)*100);
            rotate(angle + cos(t)*100);

            rect(0 , 0 , gridSize*2, gridSize);
            // ellipse(0+angle*0.3,0+angle*0.3, gridSize*2, gridSize*2);

            pop();

            
            
        }
    }
    

    //MIC CIRCLES
    var micLevel = mic.getLevel();

    if(micLevel > 0.06){
        createCircle(1); 
    }
    

    for(var i=0; i<circleArray.length; i++){
        noFill();
        stroke("rgba(255,255,255,"+ circleArray[i].a - circleArray[i].changea +"");
        strokeWeight(1+ micLevel*50);

        circle(circleArray[i].x, circleArray[i].y,  t - circleArray[i].birthday);
        circle(circleArray[i].x, circleArray[i].y, 30 + t - circleArray[i].birthday);
        circle(circleArray[i].x, circleArray[i].y, 60 + t - circleArray[i].birthday);

        // console.log(i+": "+ (parseInt(circleArray[i].birthday) ))
    }
    if (circleArray.length > 20){
        circleArray.splice(0, 1);

    }
   
    t++;
}

function mousePressed(){
    getAudioContext().resume();

    loadPixels();
}

var circleArray = [];

function createCircle(num){
    for(var i=0; i<num; i++){
        circleArray.push ({
            "x": random(width),
            "y": random(height),
            "a": 1,
            "changea": 0,
            "birthday":t
        })
    }
}

    

