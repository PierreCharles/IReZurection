"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to KeyBoardMouseHandler -> Phaser.InputHandler
 * Arguments : a game, a parent
 */
Rezurection.KeyboardMouseHandler = function (game, parent) {
    Rezurection.InputHandler.call(this, game, parent);

    this.keyset = null;
};

Rezurection.KeyboardMouseHandler.prototype = Object.create(Rezurection.InputHandler.prototype);
Rezurection.KeyboardMouseHandler.prototype.constructor = Rezurection.KeyboardMouseHandler;

Rezurection.KeyboardMouseHandler.prototype.VELOCITY = 300;
Rezurection.KeyboardMouseHandler.prototype.DEFAULT_KEYSET = {
    top:    Phaser.KeyCode.Z,
    down:   Phaser.KeyCode.S,
    left:   Phaser.KeyCode.Q,
    right:  Phaser.KeyCode.D
};

/**
 * Method to init keyboard
 * Arguments : a keyset
 */
Rezurection.KeyboardMouseHandler.prototype.init = function (keyset) {

    this.keyset = keyset || this.DEFAULT_KEYSET;
};

/**
 * Method to update
 */
Rezurection.KeyboardMouseHandler.prototype.update = function () {
    this.checkKeys();
    this.checkMouse();
}

/**
 * Method to check keys
 */
Rezurection.KeyboardMouseHandler.prototype.checkKeys = function () {

    var vx = 0, vy = 0;

    vx += this.game.input.keyboard.isDown(this.keyset.right) ? this.VELOCITY : 0;
    vx -= this.game.input.keyboard.isDown(this.keyset.left) ? this.VELOCITY : 0;
    vy += this.game.input.keyboard.isDown(this.keyset.down) ? this.VELOCITY : 0;
    vy -= this.game.input.keyboard.isDown(this.keyset.top) ? this.VELOCITY : 0;

    this.setVelocity(new Phaser.Point(vx, vy));
}

/**
 * Method to check mouse
 */
Rezurection.KeyboardMouseHandler.prototype.checkMouse = function () {
    this.setFireDestination( this.game.input.mousePointer.isDown ?
                new Phaser.Point(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY):null);
};

