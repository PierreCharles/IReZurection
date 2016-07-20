/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

 var MainScreen = function () { };

/**
* Constructor to MainScreen -> Phaser.State
* First State launcher in oppen game
*/
 MainScreen.prototype = {

    /**
    * Method to initialize main state screen
    */
    init : function(){
        this.game.load.onFileError.add(this.onLoadFailure, this);
    },

    /**
    * Method to preload
    */
    preload: function ()
    {
        this.game.load.image('logo', 'assets/images/logo.png');
        this.game.load.image('progress', 'assets/images/progress_bar/progress_bar.png');
        this.game.load.image('progress_bdr', 'assets/images/progress_bar/progress_bar_bdr.png');
    },

    /**
    * Method to creat a main state screen
    */
    create: function ()
    {
        if (Rezurection.DEBUG)
            this.game.add.plugin(Phaser.Plugin.Debug);

        this.game.state.add('load_screen', LoadScreen);
        this.game.state.start('load_screen');
    },

    /**
    * Method called on failure
    */
    onLoadFailure: function(key, file){
        throw new Error("Error while loading file '" + file.url + "', the game cannot start.\nError message : \""+ file.errorMessage+"\"");
    }
};
