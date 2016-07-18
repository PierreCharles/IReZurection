 var MainScreen = function () { };

 MainScreen.prototype = {

    init : function(){
        game.load.onFileError.add(this.onLoadFailure, this);
    },

    preload: function ()
    {
        game.load.image('logo', 'assets/images/logo.png');
        game.load.image('progress', 'assets/images/progress_bar/progress_bar.png');
        game.load.image('progress_bdr', 'assets/images/progress_bar/progress_bar_bdr.png');
    },

    create: function ()
    {
        window.addEventListener("resize", function () {
            var height = window.innerHeight;
            var width = window.innerWidth;
            game.width = width;
            game.height = height;
            game.world.width = width;
            if (game.renderType === Phaser.WEBGL) {
                game.renderer.resize(width, height);
            }
        }, false);

        game.state.add('load_screen', LoadScreen);
        game.state.start('load_screen');
    },

    onLoadFailure: function(key, file){
        throw new Error("Error while loading file '" + file.url + "', the game cannot start.\nError message : \""+ file.errorMessage+"\"");
    }
};
