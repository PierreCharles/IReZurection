"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
* Constructor to Door -> GenereicSprite
* Arguments : Phaser.game game, Pisition x and y, associate controller
*/
Rezurection.DoorSprite = function (game, caseCoord, controller) {
    Rezurection.GenericSprite.call(this, game, false, caseCoord, 'door', controller);
    this.animations.add('door', [0, 1, 2, 3, 4,5,6,7,8], 25, true);
    this.animations.play('door');
    this.body.immovable = true;
    this.body.setSize(10, 10, 0, 0);
};

Rezurection.DoorSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.DoorSprite.prototype.constructor = Rezurection.DoorSprite;