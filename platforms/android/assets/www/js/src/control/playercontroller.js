"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to PlayerController
 * Argument : world, inputHandlers
 */
Rezurection.PlayerController = function (world, weapons) {
    this.inputHandlers = world.inputHandlers;
    this.world = world;
    this.weapons = weapons;
}

/**
 * Constructor to initalize a player controller
 * Argument : a player sprite
 */
Rezurection.PlayerController.prototype.init = function (playerSprite) {
    this.playerSprite = playerSprite;
    this.playerSprite.health = this.world.playerData.startLife;
    for (var key in this.weapons) {
        if (this.weapons.hasOwnProperty(key))
            this.weapons[key].owner = playerSprite;
    }
};

/**
 * Method to control sprite player
 * Argument : sprite
 */
Rezurection.PlayerController.prototype.control = function (sprite) {

    var velocity = null;
    var fireDestination = null;

    for (var i = 0; i < this.inputHandlers.length; i++) {
        var tmpVelocity = this.inputHandlers[i].getVelocity();
        var tmpFireDestination = this.inputHandlers[i].getFireDestination();

        if (tmpVelocity.x != 0 || tmpVelocity.y != 0)
            velocity = tmpVelocity;

        if (tmpFireDestination != null)
            fireDestination = tmpFireDestination;
    }

    sprite.body.velocity = velocity != null ? velocity : new Phaser.Point(0, 0);

    if (fireDestination != null) {
        var dx = fireDestination.x - sprite.position.x;
        var dy = fireDestination.y - sprite.position.y;

        var norm = Math.sqrt(dx * dx + dy * dy);

        this.fire(new Phaser.Point(dx / norm, dy / norm));
    }

}

/**
 * Method to fire
 * Argument : direction
 */
Rezurection.PlayerController.prototype.fire = function (direction) {
    this.weapons[this.world.playerData.currentWeapon].fire(this.playerSprite.position, direction, this.world.game);
};