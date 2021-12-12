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

function setup(){
    createCanvas($(window).width(), $(window).height());
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
    //console.log(sizeCha);

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
    
    // for (let y=0; y<video.height; y+=gridSize) {
    //     for (let x=0; x<video.width; x+=gridSize) {

    //         var index = (y * video.width + x) * 4;
    //         var red = video.pixels[index];
    //         var green = video.pixels[index+1];
    //         var blue = video.pixels[index+2];

    //         let angle = map(red, 0, 255, 360, 0);
    //         let Hue = map(blue, 0, 255, 0, 100);
            
            
    //         noFill();
    //         strokeWeight(1);
    //         stroke(Hue * sliderVal, 50, 100);
    //         push();
    //         translate(x + gridSize/3, y + gridSize/2);
    //         rotate(angle + cos(t*2)*100);
    //         rect(0 , 0 , gridSize*3, gridSize);

    //         pop();

            
            
    //     }
    // }
    

    //MIC CIRCLES
    var micLevel = mic.getLevel();

    if(micLevel > 0.04){
        createCircle(1); 
    }
    

    for(var i=0; i<circleArray.length; i++){
        noFill();
        stroke("rgba(255,255,255,"+ circleArray[i].a - circleArray[i].changea +"");
        strokeWeight(1+ micLevel*100);

        circle(circleArray[i].x, circleArray[i].y,  t - circleArray[i].birthday);
        circle(circleArray[i].x, circleArray[i].y, 30 + t - circleArray[i].birthday);
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
    colourToMatch = get(mouseX, mouseY);
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
// setInterval(function(){ 
//     createCircle(1); 
//     console.log("circle made");
// }, 2000);
    

