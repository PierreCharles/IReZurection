/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
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
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.startGame, this);
        this.text = this.game.make.text(this.game.width / 2, this.game.height / 4, "Touch or click to begin", { font: "80px BadGrung", fill: "#fff", align: "center" });
        this.keytouch = this.game.add.image(this.game.width / 2, this.game.height / 2, 'keytouch', null);
        this.text.anchor.set(0.5);
        this.keytouch.anchor.set(0.5);
        this.game.stage.addChild(this.text);
        this.game.stage.addChild(this.keytouch);
    },

    /**
    * Method to resize elements screen game
    */
    resizeGame: function(){
        this.background.width = this.game.width
        this.background.height = this.game.height;
        this.text.position = { x: this.game.width / 2, y: this.game.height / 4 };
        this.keytouch.position = { x: this.game.width / 2, y: this.game.height / 2 };
    },

    /**
    * Method to start the next screen state game
    */
    startGame: function () {
        this.game.stage.removeChild(this.keytouch);
        this.game.stage.removeChild(this.text);
        this.game.state.start('game_screen', true, false, 1, new Rezurection.PlayerData("Player", 200));
    }
};