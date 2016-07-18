"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
* Constructor to PlayerSprite -> GenericSprite
* Arguments : Phaser.game game, Pisition x and y, associate controller
*/
Rezurection.PlayerSprite = function (game, caseCoord, controller) {
    Rezurection.GenericSprite.call(this, game, false, caseCoord, 'player', controller);
    this.walk = this.addAnimation('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 30, true);
    this.animations.frame = 12;

    Object.defineProperty(this, 'controller', { value: controller });
};



Rezurection.PlayerSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.PlayerSprite.prototype.constructor = Rezurection.PlayerSprite;

/**
* update methode player
*/
Rezurection.PlayerSprite.prototype.update = function () {
    if (!this.body.velocity.isZero()) {
        this.animations.play('walk');
        this.rotation = game.math.angleBetweenPoints({ x: 0, y: 0 }, this.body.velocity) + Math.PI / 2;
        this.walk.speed = game.math.distance(0, 0, this.body.velocity.x, this.body.velocity.y) >> 2;
    }
    else this.animations.frame = 12;
};