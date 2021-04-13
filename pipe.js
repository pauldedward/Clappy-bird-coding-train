function Pipe() {

    this.spacing = random(60, height / 2);
    this.center = random(this.spacing / 2, height - (this.spacing / 2));
    this.top = this.center - (this.spacing / 2);
    this.bottom = height - (this.center + (this.spacing / 2));
    this.x = width;
    this.w = 20;
    this.speed = -2;
    this.highlight = false;
    this.alive = true;
    this.hit = false;

    this.show = function() {
        fill(255);
        noStroke();
        if(this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x,  height-this.bottom, this.w, this.bottom);
        
    }

    this.update = function() {
        this.x += this.speed;
    }

    this.offscreen = function() {
        if(this.x < -this.w) {
            return true;
        }
        return false;
    }

    this.hits = function(bird) {
        if(bird.x > this.x && bird.x < this.x + this.w  ) {
            if(bird.y < this.top || bird.y > height - this.bottom) {
                this.highlight = true;
                this.hit = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }
}