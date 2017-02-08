"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor to SimpleBulletSprite -> GenereicSprite
* Arguments : game, associate controller
*/
Rezurection.SimpleBulletSprite = function (game, bulletAssetKey, controller) {
    if (Rezurection.DEBUG) {
        if (game==null)
            throw new TypeError("Argument cannot be null.");
    }
    Rezurection.BulletSprite.call(this, game, bulletAssetKey || 'simple_bullet', controller);

    this.addAnimation('explode', [1, 2, 3, 4, 5], 30, false);
    this.game = game;
};

Rezurection.SimpleBulletSprite.prototype = Object.create(Rezurection.BulletSprite.prototype);
Rezurection.SimpleBulletSprite.prototype.constructor = Rezurection.SimpleBulletSprite;

/**
* Method explode for explode a bullet
*/
Rezurection.SimpleBulletSprite.prototype.explode = function () {
    this.body.velocity.setTo(0, 0);
    this.animations.play('explode', null, false, true);
    this.exploding = true;
};

/**
* Methode reset to reset a bullet
* Arguments : x, y, vx, vy
*/
Rezurection.SimpleBulletSprite.prototype.reset = function (x, y, vx, vy) {
    this.animations.stop();
    this.animations.frame = 0;

    this.rotation = this.game.math.angleBetweenPoints({ x: 0, y: 0 }, { x: vx, y: vy });
    this.body.setSize(10, 10, 10 * Math.cos(this.rotation), 10 * Math.sin(this.rotation));

    Phaser.Sprite.prototype.reset.call(this, x, y);

    this.body.velocity.x = vx;
    this.body.velocity.y = vy;

    this.exploding = false;
};