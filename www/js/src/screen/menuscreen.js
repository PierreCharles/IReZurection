/**
 * Auhtor : Devloots
 */

var MenuScreen = function () { };

/**
* Constructor to MenuScreen -> Phaser.State
* Display a menu to launch a game
*/
MenuScreen.prototype = {

    /**
    * Method to creat screen
    */
    create: function () {
        
        this.game.scale.onSizeChange.add(this.resizeGame, this);
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'floor');
        this.background.autoScroll(-20, 0);

        // Temp text to get the future text size
        this.text = this.game.make.text(0, 0, "Touch to begin", { font: "50px BadGrung", fill: "#fff", align: "center" });
        this.generatedText = this.game.make.text((this.game.width/2)-(this.text.width/2),(this.game.height/2)-(this.text.height/2),"Touch to begin", { font: "50px BadGrung", fill: "#fff", align: "center" } );

        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.startGame, this);

        this.game.stage.addChild(this.generatedText);
    },

    /**
    * Method to resize elements screen game
    */
    resizeGame: function(){
        this.background.width = this.game.width;
        this.background.height = this.game.height;
        this.generatedText.position = { x: (this.game.width/2)-(this.generatedText.width/2), y: (this.game.height/2)-(this.generatedText.height/2) };
    },

    /**
    * Method to start the next screen state game
    */
    startGame: function () {
        this.game.stage.removeChild(this.generatedText);
        this.game.state.start('game_screen', true, false, 1, new Rezurection.PlayerData("Player", 200));
    }
};