"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor to Bomb -> GenereicSprite
* Arguments : Phaser.game game, Pisition x and y, associate controller
*/
Rezurection.BombSprite = function (game, caseCoord, controller) {

    if (Rezurection.DEBUG) {
        if (game==null || caseCoord==null)
            throw new TypeError("Argument cannot be null.");
        }
    Rezurection.GenericSprite.call(this, game, false, caseCoord, 'bomb', controller);
    this.animations.add('bomb', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 20, true);
    this.animations.play('bomb');
    this.body.immovable = true;
};

Rezurection.BombSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.BombSprite.prototype.constructor = Rezurection.BombSprite;