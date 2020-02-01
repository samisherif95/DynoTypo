// console.log("Webpack is working!");

import Game from './game'
import Hunter from './hunter'
import Dino from './dino'
import Dictionary from './dictionary'

document.addEventListener('DOMContentLoaded',()=>{
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');

    const input = document.getElementById('typing-input'); 
    const game = new Game(ctx,canvas,input)


    game.startGame()
    
})