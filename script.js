let bird;
let pipes = [];
let score = 0;
let lives = 5;
let scoreBoard;
let lifeboard;

function setup() {
    let canvas = createCanvas(600,600);
    canvas.parent("can");
    bird = new Bird();
    pipes.push(new Pipe);
    scoreBoard = document.getElementById("scoreBoard");
    lifeboard = document.getElementById("life");
    lifeboard.innerHTML = lives;
}

function draw() {
    background(28, 192, 217);
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
            console.log("hit");
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
            console.log(score);
        }
        pipes.shift();
    };

    if(lives <= 0) {
       reset();
    }
    
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

function reset() {
    pipes = [];
    bird = new Bird();
    score = 0;
    scoreBoard.innerHTML = score;
    lives = 5;
    lifeboard.innerHTML = lives;
}