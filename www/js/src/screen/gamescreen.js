var GameScreen = function () { };

GameScreen.prototype = {

    init: function(level, playerData) {
        this.level = level;
        this.playerData = playerData;
    },

    preload: function () {},

    create: function () {

        this.world = new Rezurection.World(game, this.level, this.playerData);

        var bullets = [];

        for (var i = 0; i < 10; i++) {
            bullets.push(new Rezurection.SimpleBulletSprite(game));
        }

        this.world.objects.addMultiple(bullets);

        var weapon = new Rezurection.Gun(game, bullets);

        var playerControl = new Rezurection.PlayerController(new Rezurection.PlayerSprite(game, new Rezurection.Case(1, 1)), weapon);

        game.camera.follow(playerControl.playerSprite);

        this.world.objects.add(playerControl.playerSprite);

        this.controller1 = game.plugins.add(Rezurection.KeyboardMouseHandler, playerControl);

        this.controller2;

        if (game.device.touch) {
            this.controller2 = game.plugins.add(Rezurection.TouchScreenHandler, playerControl);
        }
    },

    update: function () {
        this.world.update();
    },

    shutdown: function () {
        game.plugins.remove(this.controller1);
        if(this.controller2){
            game.plugins.remove(this.controller2);
        }
    }
 };

