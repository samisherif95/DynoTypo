class Welcome{
    constructor(canvas,ctx){
        this.canvas = canvas
        this.ctx = ctx
    }

    welcomePageDraw(){
        // console.log('hitting here')
        this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(140, 43, 43, 0.95)";
            this.ctx.font = 'bold 72px ';
            this.ctx.textAlign = "center";
            this.ctx.fillText("DynoTypo", (this.canvas.width / 2), -100);
            this.ctx.fill();
        this.ctx.closePath();
    }
}
export default Welcome;