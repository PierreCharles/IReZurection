"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
* Constructor to ZombieSprite -> GenericSprite
* Arguments : Phaser.game game, Pisition x and y, a skin key and associate controller
*/
Rezurection.ZombieSprite = function (game, caseCoord, skinKey, controller) {
    Rezurection.GenericSprite.call(this, game, false, caseCoord, skinKey, controller);

    this.walk = this.addAnimation('walk',
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 30, true);

    this.animations.frame = 12;
};

Rezurection.ZombieSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.ZombieSprite.prototype.constructor = Rezurection.PlayerSprite;

/**
* Update methode to Zombie
*/
Rezurection.ZombieSprite.prototype.update = function () {
    if (!this.body.velocity.isZero()) {
        this.animations.play('walk');
        this.rotation = game.math.angleBetweenPoints({ x: 0, y: 0 }, this.body.velocity) + Math.PI / 2;
        this.walk.speed = game.math.distance(0, 0, this.body.velocity.x, this.body.velocity.y);
    }
    else this.animations.frame = 12;
};