leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
Song1 = "";
Song2 = "";
StatusSong1 = "";
StatusSong2 = "";

function preload()
{
    Song1 = loadSound("music.mp3");
    Song2 = loadSound("KGF Theme.mp3");
}

function setup()
{
    canvas = createCanvas(600, 450);
    canvas.position(500,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 450);
    StatusSong1 = Song1.isPlaying();
    StatusSong2 = Song2.isPlaying();
    fill("#00FF00");
    stroke("#00FF00");
    if(scoreRightWrist > 0.2)
    { 
        circle(rightWristX, rightWristY, 20);
        Song2.stop();

    if(StatusSong1 == false)
    {
        Song1.play();
        document.getElementById("song").innerHTML= "Harry Potter Theme song is playing";
    }
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        Song1.stop();
    
    if(StatusSong2 == false)
    {
        Song2.play();
        document.getElementById("song").innerHTML= "KGF theme song is playing";
    }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("poseNet is Initialized");                  
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist =" + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}