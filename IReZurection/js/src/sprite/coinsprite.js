"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
* Constructor to Coin -> GenereicSprite
* Arguments : Phaser.game game, Pisition x and y, associate controller
*/
Rezurection.CoinSprite = function (game, caseCoord, controller) {
    Rezurection.GenericSprite.call(this, game, false, caseCoord, 'coin', controller);
    this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], Math.random() * 2 + 12, true);
    setTimeout(function (self) { self.animations.play('spin') }, 500 * Math.random(), this);
    this.body.immovable = true;
};

Rezurection.CoinSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.CoinSprite.prototype.constructor = Rezurection.CoinSprite;