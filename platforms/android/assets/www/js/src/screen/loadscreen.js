/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var LoadScreen = function () { };

/**
* Constructor to LoadScreen -> Phaser.State
* Load all ressource usefull for this game
*/
LoadScreen.prototype = {

    /**
    * Method to load all images
    */
    loadImages: function()
    {
        this.game.load.path = "assets/"
        this.game.load.image('wall', 'images/wall/wall.png');
        this.game.load.image('floor', 'images/floor/floor.png');
        this.game.load.image('gameover', 'images/menu/gameover.png');
        this.game.load.image('pause', 'images/menu/pauseButton.png');
        this.game.load.image('gun', 'images/menu/gun.png');
        this.game.load.image('shotgun', 'images/menu/shotgun.png');
        this.game.load.image('lazergun', 'images/menu/lazergun.png');
        this.game.load.image('buybomb', 'images/menu/bomb_button.png');
        this.game.load.image('life', 'images/menu/life_button.png');
        this.game.load.image('soundon', 'images/menu/sound_on.png');
        this.game.load.image('soundoff', 'images/menu/sound_off.png');
        this.game.load.image('keytouch', 'images/menu/keytouch.png');
        this.game.load.image('fullscreen', 'images/menu/fullScreen_32.png');
        this.game.load.image('windowed', 'images/menu/windowed_32.png');
    },

    /**
    * Method to load all sprites
    */
    loadSpritesSheet: function () {
        this.game.load.path = "assets/"
        this.game.load.spritesheet('player', 'images/player/dude_sheet.png', 50, 50);
        this.game.load.spritesheet('zombie', 'images/zombies/zombie_128.png', 128, 128);
        this.game.load.spritesheet('coin', 'images/bonus/coin.png', 32, 32);
        this.game.load.spritesheet('door', 'images/door/door.png', 128, 128);
        this.game.load.spritesheet('bomb', 'images/bonus/bomb.png', 64, 64);
        this.game.load.spritesheet('simple_bullet', 'images/bullets/simple_bullet.png', 32, 32);
        this.game.load.spritesheet('simple_bullet2', 'images/bullets/simple_bullet2.png', 32, 32);
    },

    /**
    * Method to load all sounds
    */
    loadSounds: function () {
        this.game.load.path = "assets/"
        this.game.load.audio('coin_sound', 'sounds/coin.mp3', 'sounds/coin.ogg');
        this.game.load.audio('bomb_sound', 'sounds/bomb.mp3', 'sounds/bomb.ogg');
        this.game.load.audio('shot_sound', 'sounds/shot.mp3', 'sounds/shot.ogg');
        this.game.load.audio('dead_sound', 'sounds/dead.mp3', 'sounds/dead.ogg');
        this.game.load.audio('attack_sound', 'sounds/attack.mp3', 'sounds/attack.ogg');
    },

    /**
    * Method to load all fonts
    */
    loadFonts: function () {
        this.game.load.path = "assets/"
        this.game.load.bitmapFont('font', 'fonts/font.png', 'fonts/font.fnt');
    },

    /**
    * Method to load all state screen
    */
    loadStates : function(){
        this.game.state.add('menu_screen', MenuScreen);
        this.game.state.add('game_screen', GameScreen);
        this.game.state.add('game_over_screen', GameOverScreen);
    },

    /**
    * Method to initialize loading
    */
    init: function()
    {
        this.progressBar = this.game.make.sprite(this.game.world.centerX - 900 / 2, this.game.world.centerY + 50, 'progress');
        this.progressBarBdr = this.game.make.sprite(this.game.world.centerX - 900 / 2, this.game.world.centerY + 50, 'progress_bdr');
        this.logo = this.game.make.sprite(this.game.world.centerX, this.game.world.centerY - 150, 'logo');
        this.status = this.game.make.text(this.game.world.centerX, this.game.world.centerY + 300, 'Loading...', { fill: 'white' });

        this.logo.anchor.setTo(0.5, 0.5);
        this.status.anchor.setTo(0.5, 0.5);
    },

    /**
    * Method to preload screen
    */
    preload: function ()
    {
        this.game.add.existing(this.logo);
        this.game.add.existing(this.progressBarBdr);
        this.game.add.existing(this.progressBar);
        this.game.add.existing(this.status);
        this.game.load.setPreloadSprite(this.progressBar);

        this.loadSounds();
        this.loadSpritesSheet();
        this.loadImages();
        this.loadFonts();
        this.loadStates();
    },

    /**
    * Method to creat screen
    */
    create: function () {
        this.status.setText('Loading... done');
        this.game.state.start('menu_screen');
    }
};