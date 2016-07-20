"use strict";

/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

window.onload = function() {

    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

    window.onerror = function (message, script, line, column, error) {
        this.destroy();

        window.removeEventListener("resize", onResize, false);
        window.removeEventListener("fullscreenchange", onResize, false);

        var error = "Message :\n" + message + ", script : '" + script + "', line : " + line

        if (Rezurection.DEBUG) {
            document.getElementById("error").outerHTML = "<p>" + message + "</p>";
        } else {
            document.getElementById("reportLink").href =
                "mailto:prante@hotmail.fr?subject=Error report ReZurection&body=" + error;
            document.getElementById("error").style.display = "inline";
        }

        return true;
    }.bind(game);

    /**
   * Method to resize gmain screen
   */
   var onResize = function () {
        var height = window.innerHeight;
        var width = window.innerWidth;
        game.width = width;
        game.height = height;

        if (game.renderType === Phaser.WEBGL) {
            game.renderer.resize(width, height);
        }
   }

   onResize();
   window.addEventListener("resize", onResize, false);
   window.addEventListener("fullscreenchange", onResize, false);

   game.state.add('main_screen', MainScreen);
   game.state.start('main_screen');
};

