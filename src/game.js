import Hunter from './hunter'
import Dictionary from './dictionary'
import Dino from './dino'

class Game{
    constructor(ctx,canvas,input,gameLayout){
        this.gameLayout = gameLayout
        this.ctx = ctx; 
        this.canvas = canvas;
        this.input = input;
        this.hunter = new Hunter(ctx,canvas);
        this.dict = new Dictionary();
        this.alive = true
        this.dinos = []
        this.dinoCount = 0;
        this.timeCounter = 0
        this.typingTimer = 0
        this.shootingCounter = 0;
        this.then = Date.now();
        this.audio = new Audio()
        this.audio.src = './dist/public/audio/DynoTypoMusic.mp3'
        this.round = 1;
        this.counter = 0;
        this.ToggleVolume = this.ToggleVolume.bind(this);
        this.restartGame = this.restartGame.bind(this)
        this.generateDinos = this.generateDinos.bind(this);
        this.dinoActions = this.dinoActions.bind(this);
        this.startGame = this.startGame.bind(this);
        this.render = this.render.bind(this)
        this.gameOver = this.gameOver.bind(this)
        this.startTimer = this.startTimer.bind(this)
    }


    startTimer(e) {
        if(this.typingTimer === 0){
            this.typingTimer = Date.now();
        }
    }

    restartGame(){
        this.dinos=[];
        this.hunter.lives = 10;
        this.hunter.killed = 0;
        this.alive = true;
        this.dinoCount = 0;
        this.counter = 0 
        this.round = 1;
    }

    generateDinos(){
        let x = -100;
        let y = Math.floor(Math.random() * (this.canvas.height - 150)) + 50;
        let randomSpawn = Math.floor(Math.random() * 2) + (250 - this.round);
        if (this.counter % randomSpawn < this.round) {
            this.dinos.push(new Dino(this.ctx, this.canvas, x, y, this.dict.generateRandomWords(), this.alive));
            this.dinoCount += 1;
        }1
    }
    dinoActions(e){
        if (e.keyCode === 32 || e.keyCode === 13){
            let value = this.input.value;
            for (let i = 0; i < this.dinos.length; i++) {
                if (value === this.dinos[i].word) {
                    this.hunter.shooting = true;
                    this.shootingCounter = this.counter;
                    this.hunter.draw()
                    this.hunter.killed += 1;
                    this.dinos[i].word = null;
                    this.dinos[i].alive = false;
                    break;
                }
            }
            this.input.value = ""; 
            if (this.typingTimer > 0) {
                this.typeEnd = Date.now();
                this.timeCounter += (this.typeEnd - this.typingTimer) / 1000;
            }
            this.typingTimer = 0;
        }
        // this.hunter.shooting = false
    }

    ToggleVolume(){
        let togglevolume = document.getElementById('muteToggle')
        if(this.audio.volume > 0){
            this.audio.volume = 0
            togglevolume.classList.remove('fa-volume-up')
            togglevolume.classList.add('fa-volume-mute')
        }else if(this.audio.volume === 0){
            this.audio.volume = 0.8
            togglevolume.classList.remove('fa-volume-mute')
            togglevolume.classList.add('fa-volume-up')
        }
    }

    startGame(){
        this.restartGame();
        console.log(this.audio)
        this.audio.volume = 0.6;
        this.audio.play();
        let togglemute = document.getElementById('muteToggle')
        togglemute.addEventListener('click',this.ToggleVolume)
        this.canvas.removeEventListener('click', this.startGame);
        this.gameLayout.removeEventListener('keypress', this.startGame);
        requestAnimationFrame(this.render);
        this.input.focus();
    }

    render(){
        let start = requestAnimationFrame(this.render)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.addEventListener('click', this.input.focus())
        this.input.addEventListener('keypress', this.dinoActions);
        this.input.addEventListener('input', this.startTimer);

        let fps = 10;
        let interval = 1000 / fps;
        let now = Date.now();
        let delta = now - this.then;

        setInterval(() => {
            this.counter += 10
        }, 1)

        if (this.counter % 20000 === 0) {
            this.round += 0.35
        }
        if ((this.hunter.killed * 60)/this.timeCounter) {
            this.hunter.wpm = ((this.hunter.killed*60)/this.timeCounter).toFixed(2);
        } else {
            this.hunter.wpm = 0;
        }

        this.generateDinos()
        this.hunter.WPM();
        this.hunter.KillCount()
        for (let i = 0; i< this.dinos.length; i++) {
            if (this.dinos[i].alive === true) {
                if (this.dinos[i].posX < this.canvas.width - 250) {
                    this.dinos[i].draw()
                    this.dinos[i].goToHunter();

                    if (delta > interval) {
                        this.then = now - (delta % interval);
                        this.dinos[i].MakeDinoMove();
                    }
                } else if (delta > interval) {
                        this.then = now - (delta % interval);   
                        this.hunter.lives -= 1;
                        this.dinos = []
                }
            } else if (delta > interval) {
                this.then = now - (delta % interval);
                this.dinos[i].alive = false
            }
            
        }

        for (let i = 0; i < this.dinos.length; i++) {
            if (this.dinos[i].alive) {
                this.dinos[i].showWord()
            }
        }

        if (this.hunter.lives > 0) {
            this.hunter.getLives();
            this.hunter.draw();
            if (this.counter - this.shootingCounter > 10000) {
                this.hunter.shooting = false;
            }
        } else if (this.hunter.lives <= 0) {
            this.hunter.lives = 0;
            this.hunter.getLives();
            cancelAnimationFrame(start);
            this.gameOver();
        }
    }

    gameOver() {
        // console.log('you lose');
        this.restartGame();
        let togglemute = document.getElementById('muteToggle')
        togglemute.removeEventListener('click')
        this.canvas.addEventListener('click', this.startGame)
        this.gameLayout.addEventListener('keypress', this.startGame)
    }
} 
export default Game