function Bird() {
    this.y = height / 2;
    this.x = 40;
    
    this.gravity = .5;
    this.velocity = 0;
    this.lift = -15;

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, 20, 20);
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= .9;
        this.y += this.velocity;

        if(this.y > height - 10) {
            this.y = height - 10;
            this.velocity = 0;
        }

        if(this.y < 10) {
            this.y = 10;
            this.velocity = 0;
        }
    }

    this.up = function() {
        this.velocity += this.lift; 
    }

}