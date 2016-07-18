"use strict";

var game;


window.onload = function() {

    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WEBGL);

    game.state.add('main_screen',  MainScreen);
    game.state.start('main_screen');
};

window.onerror = function (message, script, line, column, error) {
    game.destroy();

    var error = "Message :\n" + message + ", script : '" + script + "', line : " + line

    if (Rezurection.DEBUG){
	document.getElementById("error").outerHTML = "<p>"+message+"</p>";
    }else{
	document.getElementById("reportLink").href =
	    "mailto:prante@hotmail.fr?subject=Error report ReZurection&body="+error;
	document.getElementById("error").style.display = "inline";
    }

    return true;
};

