// reference
//https://medium.com/@himanikumawat303/creative-coding-with-sound-input-3e3616463950
//https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
//https://youtu.be/q2IDNkUws-A

function setup()
{
    createCanvas(600, 600);
    background(0);
    mic = new p5.AudioIn();
    mic.start();

}

function keyPressed(){
    getAudioContext().resume();

}

function draw()
{
    background(0, 0, 0, 10);

    // if (keyIsDown(32))
    // {
    //     mic.start();
    //     console.log("mic started");
    // }
    // else {
    //     mic.stop();
    //     console.log("mic stopped");
    // }

  var micLevel = mic.getLevel();   //detect the sound level
  console.log(micLevel);         //to check the microphone
  var sd = micLevel*500;          //multiply a number between 100-300 accroding to the microphone sensitivity and the sound volume
  fill(255,0,100);
  ellipse(300, 300, sd + 10, sd + 10)


}

//TO LEARN

