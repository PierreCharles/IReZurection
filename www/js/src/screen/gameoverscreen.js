/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var GameOverScreen = function () { };

/**
* Constructor to GameOverState -> Phaser.State
*  Display a game over state
*/
GameOverScreen.prototype = {

    /**
    * Method to initialize game screen
    * Argument : a current level and the player data information
    */
    init: function (level, playerData) {
        this.level = level;
        this.playerData = playerData;
    },

    /**
    * Method to create game screen
    */
    create: function () {
        this.game.scale.onSizeChange.add(this.resizeGame, this);
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'gameover');
        this.background.autoScroll(-20, 0);
        this.text = this.game.add.text(this.game.width / 2, 1*this.game.height / 4, "GAME OVER", { font: "96px BadGrung", fill:"red" ,align: "center" });
        this.score = this.game.add.text(this.game.width / 2, 3*this.game.height / 8, "Coins : " + this.playerData.wallet, { font: "70px BadGrung", fill: "white", align: "center" });
        this.killed = this.game.add.text(this.game.width / 2,  this.game.height / 2 , "Zombies killed : " + this.playerData.killedZombies, { font: "70px BadGrung", fill: "white", align: "center" });
        this.textLevel = this.game.add.text(this.game.width/2, 5*this.game.height/8 +20 , this.level, { font: "80px BadGrung", fill: "red", align: "center" });
        [this.text, this.score, this.killed, this.textLevel].forEach(function (element) {element.anchor.set(0.5); });
    },

    /**
    * Method to update game screen
    */
    update: function () {
        if (this.game.input.activePointer.justPressed()) this.game.state.start('menu_screen');

    },

    /**
    * Method to resize pause game
    */
    resizeGame: function () {
        this.background.width = this.game.width;
        this.background.height = this.game.height;
        this.text.position = { x: this.game.width / 2, y: 3 * this.game.height / 8 };
        this.score.position = { x: this.game.width / 2, y: this.game.height / 2 };
        this.killed.position = { x: this.game.width / 2, y: 5 * this.game.height / 8 };
        this.textLevel.position = { x: this.game.width / 2, y: 3 * this.game.height / 4+20 };
    },

    /**
    * Method call on shutdown state
    */
    shutdown: function () {
        [this.text, this.score, this.killed, this.textLevel].forEach(function (element) { element.destroy(); });
    }
};