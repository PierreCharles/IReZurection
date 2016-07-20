/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var GameScreen = function () { };

/**
* Constructor to GameScreen -> Phaser.State
* Create a play a level
*/
var choiseLabel, coins, killed;

GameScreen.prototype = {

    /**
    * Method to initialize game screen
    * Argument : a current level and the player data information
    */
    init: function(level, playerData) {
        this.level = level;
        this.playerData = playerData;
    },

    /**
    * Method to create game screen
    */
    create: function () {
        this.game.scale.onSizeChange.add(this.resizeGame, this);
        this.inputHandlers = [];
        this.inputHandlers.push(this.game.plugins.add(Rezurection.KeyboardMouseHandler)); 
        if (this.game.device.touch) this.inputHandlers.push(this.game.plugins.add(Rezurection.TouchScreenHandler));
        this.world = new Rezurection.World(this.game, this.level, this.playerData, this.inputHandlers);
        this.displayGameControl = this.game.plugins.add(Rezurection.DisplayGameControl, this.playerData, this.world);
    },

    /**
    * Method to update game screen
    */
    update: function () {
        this.world.update();
    },

    /**
    * Method call on game paused
    */
    paused: function () {
        this.game.paused = true;
        choiseLabel = this.game.add.text(this.game.width / 2, 3 * this.game.height / 8, 'Click to continue', { font: "80px BadGrung", fill: "white" });
        coins = this.game.add.text(this.game.width / 2, this.game.height / 2, "Coins : " + this.playerData.wallet, { font: "70px BadGrung", fill: "white", align: "center" });
        killed = this.game.add.text(this.game.width / 2, 5 * this.game.height / 8, "Zombies killed : " + this.playerData.killedZombies, { font: "70px BadGrung", fill: "white", align: "center" });

        [coins, choiseLabel, killed].forEach(function (element) {
            this.game.stage.addChild(element);
            element.anchor.set(0.5);
        }, this);

        this.game.scale.onSizeChange.add(this.resizePauseGame, this);
        this.game.input.onDown.add(this.unpaused, this);
    },

    /**
    * Method to put the game on unpaused
    */
    unpaused: function (event) {
        if (this.game.paused) {
            [choiseLabel, coins, killed].forEach(function (element) {
                this.game.stage.removeChild(element);
                element.destroy();
            }, this);
            this.game.paused = false;
        }
    },

    /**
    * Method to resize game screen
    */
    resizeGame: function(){
        this.game.camera.setSize(this.game.width, this.game.height);
    },

    /**
    * Method to resize the game menu pause
    */
    resizePauseGame: function(){
        this.game.camera.setSize(this.game.width, this.game.height);
        choiseLabel.position = { x : this.game.width / 2 ,  y : 3 * this.game.height / 8 };
        coins.position = { x : this.game.width / 2,  y : this.game.height / 2 } ;
        killed.position = { x :this.game.width / 2 ,  y :  5 * this.game.height / 8} ;
    },

    /**
    * Method call on shutdown state
    */
    shutdown: function () {
        this.inputHandlers.forEach(function (handler) { this.game.plugins.remove(handler) }, this);
        this.game.plugins.remove(this.displayGameControl);
        this.game.scale.onSizeChange.remove(this.resizeGame, this);
    },
 };

