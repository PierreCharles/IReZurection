"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor to Coin -> GenereicSprite
* Arguments : Phaser.game game, Pisition x and y, associate controller
*/
Rezurection.CoinSprite = function (game, caseCoord, controller, targetSprite) {

    if (Rezurection.DEBUG) {
        if (game==null || caseCoord==null)
            throw new TypeError("Argument cannot be null.");
    }

    Rezurection.GenericSprite.call(this, game, false, caseCoord, 'coin', controller);
    this.rotation = Math.random() * game.math.PI2;
    this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 16, true);
    this.animations.play('spin');
    this.animations.next(Math.floor(Math.random() * 18));
    this.targetSprite = targetSprite;
    this.followingPlayer = false;
    this.updateIfVisible = false;
    this.body.velocity.setTo(Math.random() * 500 - 250, Math.random() * 500 - 250);
};

Rezurection.CoinSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.CoinSprite.prototype.constructor = Rezurection.CoinSprite;

Rezurection.CoinSprite.prototype.update = function () {
    if (this.body.velocity.getMagnitudeSq() > 1000 && !this.followingPlayer)
        this.body.velocity.multiply(0.95, 0.95);
    else if (this.targetSprite) {
        this.followingPlayer = true;
        this.body.velocity = Phaser.Point.subtract(this.targetSprite.position.clone(), this.position).normalize().multiply(500, 500);
    }
    else {
        this.body.velocity.setTo(0);
        delete this.update;
    }
};