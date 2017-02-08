"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to InputHandler -> Phaser.Plugin
 * Arguments : a game, a parent
 */
Rezurection.InputHandler = function (game, parent) {

    Phaser.Plugin.call(this, game, parent);

    this.sprite = null;

    this.hasPreRender = false;
    this.hasRender = false;
    this.hasPostRender = false;
    this.hasPreUpdate = true;
    this.hasPostUpdate = false;
    this.visible = false;

    this.velocity = new Phaser.Point(0, 0);
    this.fireDestination = null;
};

Rezurection.InputHandler.prototype = Object.create(Phaser.Plugin.prototype);
Rezurection.InputHandler.prototype.constructor = Rezurection.InputHandler;

/**
 * Method to set velocity
 * Arguments : a velocity
 */
Rezurection.InputHandler.prototype.setVelocity = function (velocity) {
    this.velocity = new Phaser.Point(velocity.x, velocity.y);
};

/**
 * Methode to get velocity
 * return velocity
 */
Rezurection.InputHandler.prototype.getVelocity = function () {
    return this.velocity;
};

/**
 * Methode to set direction fire
 * Arguments : destination to fire
 */
Rezurection.InputHandler.prototype.setFireDestination = function (destination) {
    this.fireDestination = destination;
};

/**
 * Methode to get fire destination
 * return fire destination
 */
Rezurection.InputHandler.prototype.getFireDestination = function () {
    return this.fireDestination;
};