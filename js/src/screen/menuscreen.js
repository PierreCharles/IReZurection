var MenuScreen = function () { };

MenuScreen.prototype = {

    create: function () {
        //show the space tile, repeated
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'floor');
        this.background.autoScroll(-20, 0);

        //start game text
        var text = this.game.add.text(this.game.width / 2, this.game.height / 2, "Touch or click to begin", { font: "96px BadGrung", fill: "#fff", align: "center" });
        text.anchor.set(0.5);

        this.stageManager = new Rezurection.StageManager(game.stage);

        this.stageManager.addElement({object: new Rezurection.CoinSprite(game, new Rezurection.Case(1, 1)), bottom: 10, horizontalyCentered: true});
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) this.game.state.start('game_screen', true, false, 1, new Rezurection.PlayerData("Player 1", 5));
    },

    shutdown: function() {
        this.stageManager.destroy();
    }
};