"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to TouchScreenHandler -> Phaser.InputHandler
 * Arguments : a game, a parent
 */
Rezurection.TouchScreenHandler = function (game, parent) {
    Rezurection.InputHandler.call(this, game, parent);

    this.stick1 = game.plugins.add(
        Phaser.Plugin.VirtualJoystick,
        0,
        0,
        this.BASE_SIZE,
        this.STICK_SIZE,
        this.LIMIT,
        this.BASE_COLOR,
        this.STICK_COLOR
     );

    this.invertStick = false;

    game.scale.onSizeChange.add(this.resize, this);
};

Rezurection.TouchScreenHandler.prototype = Object.create(Rezurection.InputHandler.prototype);
Rezurection.TouchScreenHandler.prototype.constructor = Rezurection.TouchScreenHandler;

Rezurection.TouchScreenHandler.prototype.BASE_SIZE = 80;
Rezurection.TouchScreenHandler.prototype.STICK_SIZE = 70;
Rezurection.TouchScreenHandler.prototype.LIMIT = 50;
Rezurection.TouchScreenHandler.prototype.BASE_COLOR = 'rgba(128,128,128,0.5)';
Rezurection.TouchScreenHandler.prototype.STICK_COLOR = 'rgba(255,255,255,0.5)';
Rezurection.TouchScreenHandler.prototype.OFFSET = 150;
Rezurection.TouchScreenHandler.prototype.MIN_SPEED = 100;
Rezurection.TouchScreenHandler.prototype.MAX_SPEED = 300;

/**
 * Method to init TouchScreenHandler
 * Arguments : control, invertstick
 */
Rezurection.TouchScreenHandler.prototype.init = function (control, invertStick) {
    this.invertStick = !!invertStick;
    this.resize();

    this.stick1.start();
};

/**
 * Method to get stick right x
 * Return stick right x
 */
Rezurection.TouchScreenHandler.prototype.getStickRightX = function () {
    return this.game.scale.width - this.OFFSET;
};

/**
 * Method to get stick left x
 * Return stick left x
 */
Rezurection.TouchScreenHandler.prototype.getStickLeftX = function () {
    return this.OFFSET;
};

/**
 * Method to get stick y
 * Return stick y
 */
Rezurection.TouchScreenHandler.prototype.getSticksY = function () {
    return this.game.scale.height - this.OFFSET;
};

/**
 * Method to update
 */
Rezurection.TouchScreenHandler.prototype.update = function () {
    
    var force = this.stick1.getForce();

    if (force == 0) {
        this.setVelocity({ x: 0, y: 0 });
        this.setFireDestination(this.retrieveFireDestination(this.game.input.pointer1));
    }  else {
        var orientation = this.stick1.getOrientation();
        var speed = (this.MAX_SPEED - this.MIN_SPEED) * force + this.MIN_SPEED;
        this.setVelocity({ x: orientation.x * speed, y: orientation.y * speed });
        this.setFireDestination(this.retrieveFireDestination(this.game.input.pointer2));
    };
}

/**
 * Method to retrieve dire destination
 * Return null or new Phaser.Point
 */
Rezurection.TouchScreenHandler.prototype.retrieveFireDestination = function (pointer) {

    return pointer.isDown ? new Phaser.Point(pointer.worldX, pointer.worldY) : null;
};

/**
 * Method to resize
 */
Rezurection.TouchScreenHandler.prototype.resize = function () {
    if (this.invertStick) {
        this.stick1.setLocation(this.getStickRightX(), this.getSticksY());
    }
    else {
        this.stick1.setLocation(this.getStickLeftX(), this.getSticksY());
    }
};

/**
 * Method to destroy
 */
Rezurection.TouchScreenHandler.prototype.destroy = function () {
    this.game.scale.onSizeChange.remove(this.resize, this);
    this.game.plugins.remove(this.stick1);
};