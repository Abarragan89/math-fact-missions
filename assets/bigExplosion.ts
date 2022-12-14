class BigExplosion {
    ctx:CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    velX: number;
    velY: number;
    r: number;
    g: number;
    b: number;
    alpha: number;
    isFire: string
    constructor(ctx:CanvasRenderingContext2D, x: number, y: number, radius: number, isFire: string) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * radius + 1);
        this.velX = Math.floor(Math.random() * 12) - 6
        this.velY = Math.floor(Math.random() * 12) - 6

        //Random colors
        this.r = Math.round(Math.random())*255;
        this.g = Math.round(Math.random())*255;
        this.b = Math.round(Math.random())*255;
        this.alpha = 1
        this.isFire = isFire;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if(this.isFire === 'yes') {
            this.ctx.fillStyle = Math.random() > .5 ? 'rgba(250,72,42, '+ this.alpha +')' : 'rgba(250,226,32, '+ this.alpha +')';
        } else {
            this.ctx.fillStyle = 'gray';
            this.ctx.strokeStyle = 'white';
            this.ctx.stroke();
        }
        this.ctx.fill();
        this.ctx.closePath();
    }
    moveParticle() {
        if(this.alpha > 0.2 && this.radius > .2) {
            this.draw();
            this.x += this.velX 
            this.y += this.velY 
            this.alpha -= .01
            this.radius -= .1
        }
    }

}

export default BigExplosion;