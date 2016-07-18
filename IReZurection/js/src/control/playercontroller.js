"use strict";

var Rezurection = Rezurection || {};

Rezurection.PlayerController = function (playerSprite, weapon) {
    this.playerSprite = playerSprite;
    this.playerSprite.controller = this;
    this.playerData = new Rezurection.PlayerData();

    this.weapon = weapon;
}

Rezurection.PlayerController.prototype.setVelocity = function (velocity) {
    this.playerSprite.body.velocity.x = velocity.x;
    this.playerSprite.body.velocity.y = velocity.y;
};

Rezurection.PlayerController.prototype.control = function (sprite) {

}

Rezurection.PlayerController.prototype.fire = function (direction) {
    this.weapon.fire(this.playerSprite.position, direction);
};

Rezurection.PlayerController.prototype.getFireOrigin = function () {
    return this.playerSprite.position;
}