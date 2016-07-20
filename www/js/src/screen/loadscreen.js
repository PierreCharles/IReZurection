var LoadScreen = function () {};

LoadScreen.prototype = {

    loadImages: function()
    {
        game.load.path = "assets/"

        game.load.spritesheet('player', 'images/player/dude_sheet.png', 50, 50);
        game.load.spritesheet('zombie', 'images/zombies/zombie4.png', 45, 45);
        game.load.spritesheet('coin', 'images/bonus/coin.png', 32, 32);
        game.load.spritesheet('door', 'images/door/door.png', 128, 128);
        game.load.spritesheet('bomb', 'images/bonus/bomb.png', 64, 64);
        game.load.spritesheet('bullet1', 'images/bullets/bullet3.png', 32, 32);
        game.load.image('wall', 'images/wall/wall.png');
        game.load.image('floor', 'images/floor/floor.png');
        game.load.image('pause_button', 'images/menu/pauseButton.png');
    },

    loadSounds: function () {
        game.load.path = "assets/"
        game.load.audio('coin_sound', 'sounds/coin.mp3', 'sounds/coin.ogg');
        game.load.audio('bomb_sound', 'sounds/bomb.mp3', 'sounds/bomb.ogg');
    },

    loadFonts: function () {
        game.load.path = "assets/"
        game.load.bitmapFont('font', 'fonts/font.png', 'fonts/font.fnt');
    },

    loadStates : function(){
        game.state.add('menu_screen', MenuScreen);
        game.state.add('game_screen', GameScreen);
    },

    init: function()
    {
        this.progressBar = game.make.sprite(game.world.centerX - 900 / 2, game.world.centerY + 50, 'progress');
        this.progressBarBdr = game.make.sprite(game.world.centerX - 900 / 2, game.world.centerY + 50, 'progress_bdr');
        this.logo = game.make.sprite(game.world.centerX, game.world.centerY - 150, 'logo');
        this.status = game.make.text(game.world.centerX, game.world.centerY + 300, 'Loading...', { fill: 'white' });

        this.logo.anchor.setTo(0.5, 0.5);
        this.status.anchor.setTo(0.5, 0.5);
    },

    preload: function ()
    {
        game.add.existing(this.logo);
        game.add.existing(this.progressBarBdr);
        game.add.existing(this.progressBar);
        game.add.existing(this.status);
        game.load.setPreloadSprite(this.progressBar);

        this.loadSounds();
        this.loadImages();
        this.loadFonts();
        this.loadStates();
    },

    create: function () {
        this.status.setText('Loading... done');
        game.state.start('menu_screen');
    }
};