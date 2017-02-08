"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};


/**
* Constructor to Wall -> GenereicSprite
* Arguments : Phaser.game game, Pisition x and y, height and width to wall.
*/
Rezurection.WallSprite = function (game, x, y, width, height) {

    if (Rezurection.DEBUG) {        
        if (game==null || x==null || y==null || width == null || height == null)
            throw new TypeError("Argument cannot be null.");
        if (!(game instanceof Phaser.Game))
            throw new TypeError("Argument game has to be an instance of Phaser.game");

        if (! (typeof x == "number" && typeof y == "number" && typeof width == "number" && typeof height == "number"))
            throw new TypeError("Argument x, y, width height have to be numbers");
    }

    Phaser.TileSprite.call(this, game, x, y, width, height, 'wall');
    game.physics.enable(this, Phaser.ARCADE);
    this.body.immovable = true;

    this.autoCull = true;
};


Rezurection.WallSprite.prototype = Object.create(Phaser.TileSprite.prototype);
Rezurection.WallSprite.prototype.constructor = Rezurection.Wall;