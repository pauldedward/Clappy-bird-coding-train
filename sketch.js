// const playerName = prompt("p for pause\nc for continue\nEnter your name");

// if(playerName) {
//     console.log(playerName);
// }

let bird;
let pipes = [];
let score = 0;
let lives = 5;
let scoreBoard;
let lifeboard;
let mic;
let sliderTop;
let sliderBottom;
let clapping;

function setup() {
    getAudioContext().suspend();

    let canvas = createCanvas(500,600);
    canvas.parent("can");

    bird = new Bird();
    pipes.push(new Pipe);
    
    scoreBoard = document.getElementById("scoreBoard");
    lifeboard = document.getElementById("life");
    lifeboard.innerHTML = lives;

    mic = new p5.AudioIn();
    mic.start();
    sliderTop = createSlider(0, 1, 0.3, 0.01);
    sliderBottom = createSlider(0, 1, 0.1, 0.01);

    clapping = false;
}

function draw() {
    
    background(28, 192, 217);
 
    let vol = mic.getLevel();

    bird.show();
    bird.update();

    if(frameCount % 80 == 0) {
        if(random(0,10) < 8)
            pipes.push(new Pipe);
    }
    
    pipes.forEach(pipe => {
        pipe.show();
        pipe.update();

        if(pipe.hits(bird)) {
            // console.log("hit");
            if(pipe.alive) {
                lives--;
                lifeboard.innerHTML = lives;
                pipe.alive = false;
            }
        }
    });

    if(pipes[0] && pipes[0].offscreen()) {
        if(!pipes[0].hit) {
            score++;
            scoreBoard.innerHTML = score;
            // console.log(score);
        }
        pipes.shift();
    };

    fill(112, 255, 222);
    noStroke();
    let volumey = map(vol, 0, 1,height, 0);
    rect(width - 40, volumey, 40, volumey);

    let thresholdTop = sliderTop.value();
    let thresholdBottom = sliderBottom.value();
    let thresholdTopY = map(thresholdTop, 0, 1, height, 0);
    let thresholdBottomY = map(thresholdBottom, 0, 1, height, 0)
    stroke(61, 51, 171);
    strokeWeight(3);
    line(width - 40, thresholdTopY, width, thresholdTopY);
    stroke(5, 148, 153);
    line(width - 40, thresholdBottomY, width, thresholdBottomY);

    if(lives <= 0) {
       reset();
    }
    if(vol > thresholdTop && !clapping) {
        bird.up();
        clapping = true;
    }
    if(vol < thresholdBottom) {
        clapping = false;
    }
    // console.log(vol);
}

function keyPressed() {
    if(key == ' ') {
        bird.up();
    }
    if(key == "p") {
        noLoop();
    }
    if(key == "c") {
        loop();
    }
}

function mousePressed() {
    userStartAudio();
}

function reset() {
    pipes = [];
    bird = new Bird();
    score = 0;
    scoreBoard.innerHTML = score;
    lives = 5;
    lifeboard.innerHTML = lives;
}