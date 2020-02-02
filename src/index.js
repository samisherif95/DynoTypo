import Game from './game'
import Welcome from './welcome'
document.addEventListener('DOMContentLoaded',()=>{
    var canvas = document.getElementById('game-canvas');
    var gameLayout = document.getElementById('gameLayout')
    var ctx = canvas.getContext('2d');

    const input = document.getElementById('typing-input'); 
    const game = new Game(ctx,canvas,input,gameLayout)
    const welcomepage = new Welcome(canvas, ctx)

    welcomepage.welcomePageDraw()
    canvas.addEventListener('click', game.startGame)
    gameLayout.addEventListener('keydown', game.startGame)
})