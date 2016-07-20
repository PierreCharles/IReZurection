"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to SongPlayer -> Singleton
 * Add all song to the game
 * Arguments : game
 */
Rezurection.SoundPlayer = function (game) {
    this.soundCoin = game.add.audio('coin_sound');
    this.soundBomb = game.add.audio('bomb_sound');
    this.soundShot = game.add.audio('shot_sound');
    this.soundDead = game.add.audio('dead_sound');
    this.soundAttack = game.add.audio('attack_sound');

    this.soundOn = true;
};

Rezurection.SoundPlayer.instance = null;

/**
* methode to get soundplayer instance
* Arguments : game
* Return an instance
*/
Rezurection.SoundPlayer.getInstance = function (game) {
    if (this.instance == null)
        this.instance = new Rezurection.SoundPlayer(game);
    return this.instance;
}

/**
* methode to play associate song sprite
* Arguments : sprite Sprite 
*/
Rezurection.SoundPlayer.prototype.play = function (type) {
    if (this.soundOn) {
        if (type == "coin") this.soundCoin.play();
        else if (type == "bomb") this.soundBomb.play();
        else if (type == "bullet") this.soundShot.play();
        else if (type == "dead") this.soundDead.play();
        else if (type == "attack" && !this.soundAttack.isPlaying) this.soundAttack.play();
    }
};
