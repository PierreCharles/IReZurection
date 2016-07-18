"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
* Constructor to GenericSprite -> Sprite
* Arguments : Phaser.game game, life state : dead, Pisition x and y, associate controller
*/
Rezurection.GenericSprite = function (game, dead, caseCoord, assetKey, controller) {

    if (Rezurection.DEBUG) {
        if (!game instanceof Phaser.Game)
            throw new TypeError("Argument game hase to be an instance of Phaser.Game .");

        if (typeof dead != "boolean")
            throw new TypeError("Argument dead has to be a boolean");

        if (!(caseCoord instanceof Rezurection.Case))
            throw new TypeError("Argument caseCoord has to be an instance of Rezurection.Case");

        if (typeof assetKey != "string")
            throw new TypeError("Argument assetKey has to be a string.");

        if (!game.cache.checkImageKey(assetKey)) {
            throw new Error("Image key named '" + assetKey + "' doesn't exists.");
        }
    }

    var position = caseCoord.toWorldPosition();

    Phaser.Sprite.call(
        this,
        game,
        position.x,
        position.y,
        assetKey
    );

    this.controller = controller;
    
    this.alive = !dead;

    this.anchor.setTo(0.5, 0.5);
    this.autoCull = true;

    game.physics.arcade.enable(this);
};

Rezurection.GenericSprite.prototype = Object.create(Phaser.Sprite.prototype);
Rezurection.GenericSprite.prototype.constructor = Rezurection.GenericSprite;


/**
* Pre-update : an execution controller
*/
Rezurection.GenericSprite.prototype.preUpdate = function () {
    if (this.controller)
        this.controller.control(this);

    Phaser.Sprite.prototype.preUpdate.call(this);
};

Rezurection.GenericSprite.prototype.setController = function (controller) {
    this.controller = controller;
};

Rezurection.GenericSprite.prototype.addAnimation = function (name, frames, frameRate, loop) {
    if (Rezurection.DEBUG) {
        if (typeof name != "string")
            throw new TypeError("Argument name has to be a string.");

        if (!Array.isArray(frames))
            throw new TypeError("Argument frames has to be an array of number.");

        if (frameRate)
            if (typeof frameRate != "number")
                throw new TypeError("Argument frameRate has to be a number");
        if (loop)
            if (typeof loop != "boolean")
                throw new TypeError("Argument loop has to be a boolean");

        var minIndex = Math.min(...frames);

        if (minIndex < 0)
            throw new Error("Frame indexes cannot be negative ! You specified an index of " + minIndex + ", please verify your call to this method.");

        if (typeof this.key == "string") {

            var nbFrames = this.game.cache.getFrameCount(this.key);
            var maxIndex = Math.max(...frames);

            if (nbFrames - 1 < maxIndex)
                throw new Error("This Sprite use the asset '" + this.key + "' which has " + nbFrames + " frames and you specified the index " + maxIndex + ". Please verify your call to this method.");
        }
    }

    return this.animations.add(name, frames, frameRate, loop, true);
};