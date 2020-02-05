class Dino{
    constructor(ctx,canvas,posX,posY,word,alive){
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.canvas = canvas;
        this.word = word
        this.alive = alive
        this.DinoImage = new Image();
        this.DinoImage.src = './dist/public/images/DinoSprite.png'
        this.srcX = 0;
        this.srcY = 0;
        this.moveX = 10;
        this.moveY = 0
        this.drawDino = this.drawDino.bind(this)
    }

    draw(){
        this.ctx.drawImage(this.DinoImage,
            this.srcX,this.srcY,
            250,125,
            this.posX,this.posY,
            130, 65
        )
    }
    
    MakeDinoMove(){
        this.posX+=this.moveX
        this.posY += this.moveY
        this.srcX += 255
        if(this.srcX >= 510){
            this.srcY+=130
            this.srcX = 0;
            if(this.srcY >=515){
                this.srcY = 0
                this.srcX = 0;
            }
        }
    }

    goToHunter(){
        if (this.posX > 150) {
            if (this.posY < this.canvas.height / 2) {
                this.moveY =5;
            } else if (this.posY > this.canvas.height / 2) {
                this.moveY =-5;
            } else {
                this.dy = 0;
            }
        }
    }

    showWord(){
        this.ctx.font = "15px Verdana";
        this.ctx.fillStyle = 'white';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.word, this.posX+100, this.posY-20);
        this.ctx.addHitRegion
    }
    
    drawDino(){
        this.MakeDinoMove()
        this.draw()
    }
}

export default Dino;