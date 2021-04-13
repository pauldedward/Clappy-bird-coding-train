let bird;
let pipes = [];

function setup() {
    createCanvas(600,600);
    bird = new Bird();
    pipes.push(new Pipe);
}

function draw() {
    background(0);
    bird.show();
    bird.update();

    if(frameCount % 100 == 0) {
        pipes.push(new Pipe);
    }
    pipes.forEach(pipe => {
        pipe.show();
        pipe.update();

        if(pipe.hits(bird)) {
            console.log("hit");
        }
    });

    if(pipes[0].offscreen()) {
        pipes.shift();
    };
    
}

function keyPressed() {
    if(key == ' ') {
        bird.up();
    }
}
