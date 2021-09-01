m="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;

function preload(){
    m=loadSound("DJ Snake.mp3");
}

function setup(){
   canvas=createCanvas(600,500);
   canvas.center();
   
   video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video, modelLoaded);
   poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ffee00");
    stroke("#000000");

    if (rightWristScore > 0.2){

    circle(rightWristX, rightWristY, 40);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("SPEED").innerHTML="Speed: 0.5x";
        m.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("SPEED").innerHTML="Speed: 1x";
        m.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("SPEED").innerHTML="Speed: 1.5x";
        m.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("SPEED").innerHTML="Speed: 2x";
        m.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("SPEED").innerHTML="Speed: 2.5x";
        m.rate(2.5);
    }}

    if (leftWristScore > 0.2){
    circle(leftWristX, leftWristY, 40);
    inlwy=Number(leftWristY);
    remove_decimal=floor(inlwy);
    volume=remove_decimal/500;
    document.getElementById("VOLUME").innerHTML="Volume: "+volume;
    m.setVolume(volume);
    }
}

function play(){
    m.play();
    m.setVolume(1);
    m.rate(1);
}

function modelLoaded(){
    console.log("Model Is Loaded");
}

function gotPoses(result){
    if (result.length > 0) {
        rightWristScore=result[0].pose.keypoints[10].score;
        leftWristScore=result[0].pose.keypoints[9].score;
        console.log("leftWristScore = "+leftWristScore);
        console.log("rightWristScore = "+rightWristScore);

        console.log(result);

        leftWristX=result[0].pose.leftWrist.x;
        leftWristY=result[0].pose.leftWrist.y;
        console.log("LeftWristX: "+ leftWristX +" | LeftWristY: "+ leftWristY);

        rightWristX=result[0].pose.rightWrist.x;
        rightWristY=result[0].pose.rightWrist.y;
        console.log("RightWristX: "+rightWristX +" | RightWristY: "+ rightWristY);
    }
}