import Hunter from './hunter'
import Dictionary from './dictionary'
import Dino from './dino'

class Game{
    constructor(ctx,canvas,input){
        this.ctx = ctx;
        this.canvas = canvas;
        this.input = input;
        this.hunter = new Hunter(ctx,canvas);
        this.dict = new Dictionary();
        this.alive = true
        this.dinos = {}
        this.dinoCount = 0;
        this.timeCounter = 0
        this.then = Date.now();

        //game logic
        this.round = 1;
        this.counter = 0;

        this.restartGame = this.restartGame.bind(this)
        this.generateDinos = this.generateDinos.bind(this);
        this.dinoActions = this.dinoActions.bind(this);
        this.startGame = this.startGame.bind(this);
        this.render = this.render.bind(this)
        this.gameOver = this.gameOver.bind(this)
        
    }

    restartGame(){
        this.dinos={};
        this.hunter.lives = 5;
        this.hunter.killed = 0;
        this.alive = true;
        this.dinoCount = 0;
        this.round = 1
    }

    generateDinos(){
        let x = -100;
        let y = Math.floor(Math.random() * (this.canvas.height - 150)) + 50;
        let randomSpawn = Math.floor(Math.random() * 2.5) + (250 - this.round);
        if (this.counter % randomSpawn < this.round) {
            console.log('dino being born')
            this.dinos[`dino${this.dinoCount}`] = new Dino(this.ctx, this.canvas, x, y, this.dict.generateRandomWords(), this.alive);
            this.dinoCount += 1;
        }1
    }

    dinoActions(e){
        let value = this.input.value.trim();
        for (let dino in this.dinos) {
            if (value === this.dinos[dino].word) {
                this.hunter.shooting = true;
                this.hunter.killed += 1;
                this.dinos[dino].word = null;
                this.dinos[dino].alive = false;
                break;
            }
        }
        this.input.value = ""; 
        this.hunter.shooting = false
    }

    startGame(){
        this.restartGame();
        requestAnimationFrame(this.render);
        this.input.focus();
    }

    render(){
        let start = requestAnimationFrame(this.render)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.addEventListener('click', this.input.focus())
        this.input.addEventListener('keydown', this.dinoActions);

        let fps = 1;
        let interval = 1000 / fps;
        let now = Date.now();
        let delta = now - this.then;

        setInterval(() => {
            this.counter += 10
        }, 1)

        if (this.counter % 15000 === 0) {
            this.round += 0.5
        }

        if ((this.hunter.killed*60)/this.timeCounter) {
            this.hunter.wpm = ((this.hunter.killed*60)/this.timeCounter).toFixed(2);
        } else {
            this.hunter.wpm = 0;
        }

        this.generateDinos()
        this.hunter.WPM();
        this.hunter.KillCount()

        for(let dino in this.dinos){
            if(this.dinos[dino].alive){
                if (this.dinos[dino].posX < this.canvas.width - 200){
                    console.log('draw dino')
                    this.dinos[dino].drawDino();
                    this.dinos[dino].goToHunter();

                    if (delta > interval) {
                        this.then = now - (delta % interval);
                        this.dinos[dino].MakeDinoMove();
                    }else{
                        this.hunter.lives-=1
                        this.dinos[dino].alive = false
                    }   
                }
            }
        }

        for (let dino in this.dinos) {
            if (this.dinos[dino].alive) {
                this.dinos[dino].showWord()
            }
        }

        if (this.hunter.lives > 0) {
            this.hunter.getLives();
            this.hunter.draw();
        } else if (this.hunter.lives <= 0) {
            this.hunter.lives = 0;
            this.hunter.getLives();
            cancelAnimationFrame(start);
            this.gameOver();
        }
    }

    gameOver() {
        console.log('you lose');
        this.restartGame();
    }

    
}
export default Game