"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
 * Constructor to SongPlayer
 * Add all song to the game
 * Arguments : game
 */

Rezurection.SoundPlayer = function (game) {
    this.soundCoin = game.add.audio('coin_sound');
    this.soundBomb = game.add.audio('bomb_sound');
};

Rezurection.SoundPlayer.instance = null;

Rezurection.SoundPlayer.getInstance = function (game) {
    if (this.instance == null)
        this.instance = new Rezurection.SoundPlayer(game);
    return this.instance;
}

/**
* methode to play associate song sprite
* Arguments : sprite Sprite 
*/
Rezurection.SoundPlayer.prototype.play = function (sprite) {
    if (!(sprite instanceof Phaser.Sprite) || sprite==null) throw new Error('Argument hase to be an instance of Phaser.Sprite');
    else if (sprite instanceof Rezurection.CoinSprite) this.soundCoin.play();
    else if (sprite instanceof  Rezurection.BombSprite) this.soundBomb.play();
};
