var noseX = 0;
var noseY = 0;

var rWX = 0;
var lWX = 0;

var difference;

function preload() {
    
}

function setup() {
    canv = createCanvas(400,400);
    cam = createCapture(VIDEO);
    cam.size(540,405);
    document.getElementById("canvHolder").append(cam.elt);
    document.getElementById("canvHolder").append(canv.elt);

    

    var poseNet = ml5.poseNet(cam,() =>{
        console.log('model loded');
    });

    poseNet.on('pose', result => {
        console.log(result);
        if (result.length > 0) {
            noseX = result[0].pose.nose.x;
            noseY = result[0].pose.nose.y

            rWX = result[0].pose.rightWrist.x;
            lWX = result[0].pose.leftWrist.x;

            difference = Math.round(lWX - rWX);

        }
    });
}



function draw() {
    background(170,170,170);

    stroke(0,0,0);
    fill(0,0,0);
    square(noseX,noseY,difference);

    document.getElementById('dimensionsS').innerHTML = `Width and Height of the square will be ${difference}px`;
}