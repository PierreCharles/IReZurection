"use strict";

var game;


window.onload = function() {

    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

    game.state.add('main_screen',  MainScreen);
    game.state.start('main_screen');
};


