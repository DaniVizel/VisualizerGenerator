// reference
//https://medium.com/@himanikumawat303/creative-coding-with-sound-input-3e3616463950
//https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
//https://youtu.be/q2IDNkUws-A

var w = 800;
var h = 800;
var i=0;

function setup()
{
    createCanvas(w, h);
    background(0);
    mic = new p5.AudioIn();
    mic.start();

}

function mousePressed(){
    getAudioContext().resume();

}

function draw()
{

  var micLevel = mic.getLevel();   //detect the sound level
  console.log(micLevel);         //to check the microphone
  var sd = micLevel*800;          //multiply a number between 100-300 accroding to the microphone sensitivity and the sound volume

  fill(255,0,100);
  noStroke();

    ellipse(0 + i, height/2 - sd, 3, 3);
    ellipse(0 + i, height/2 + sd, 3, 3);


    if (i< width) {
        i = i + 0.5;
    };
}

//TO LEARN

