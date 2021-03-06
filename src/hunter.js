class Hunter{
    constructor(ctx,canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.posX = this.canvas.width - 150
        this.posY = this.canvas.height / 2
        this.lives = 10;
        this.wpm = 0;
        this.killed = 0;
        this.shooting = false;
        this.hunterImage = new Image();
        this.hunterImage.src = './dist/public/images/hunter.png'
        this.draw = this.draw.bind(this)
    }

    draw(){
        if(!this.shooting){
            this.ctx.drawImage(this.hunterImage,
                300,250,
                70, 80,
                this.canvas.width-150,this.canvas.height/2,
                70, 80
            )
        }else{
            this.ctx.drawImage(this.hunterImage,
                220, 250,
                70, 80,
                this.posX, this.posY,
                70, 80
            )
        }
    }

    LifeCount(){
        this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.font = 'bold 18px';
            this.ctx.fillText("Lives: ", this.canvas.width - 100, 50)
            this.ctx.fill();
        this.ctx.closePath();
    }

    getLives(){
        this.ctx.beginPath();
            this.LifeCount();
            if (this.lives > 4) {
                this.ctx.fillStyle = "blue";
            } else {
                this.ctx.fillStyle = "red";
            }
            this.ctx.font = 'bold 18px';
            this.ctx.fillText(Math.floor(this.lives).toString(), this.canvas.width - 60, 50);
            this.ctx.fill();
        this.ctx.closePath();
    }

    WPM(){
        this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.font = 'bold 18px';
            this.ctx.fillText(`WPM: ${this.wpm}`, this.canvas.width - 320, 50)
            this.ctx.fill();
        this.ctx.closePath();
    }

    KillCount(){
        this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.font = 'bold 18px';
            this.ctx.fillText(`KillCount: ${this.killed}`, this.canvas.width - 200, 50)
            this.ctx.fill();
        this.ctx.closePath();
    }
}
export default Hunter