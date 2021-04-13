let bird;
let pipes = [];
let score = 0;
let lives = 10;


function setup() {
    let canvas = createCanvas(600,600);
    canvas.parent("can");
    bird = new Bird();
    pipes.push(new Pipe);
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
        }
    });

    if(pipes[0] && pipes[0].offscreen()) {
        if(!pipes[0].hit) {
            score++;
            console.log(score);
        }
        pipes.shift();
    };
    
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
