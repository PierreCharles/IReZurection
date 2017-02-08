"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * A collision manager : manage group and sprite collision.
 */
Rezurection.ObjectContainer = function (game) {
    this.objects = [];
    this.objects["other"] = game.add.group();
    this.objects[Rezurection.PlayerSprite] = game.add.group();
    this.objects[Rezurection.ZombieSprite] = game.add.group();
    this.objects[Rezurection.WallSprite] = game.add.group();
    this.objects[Rezurection.CoinSprite] = game.add.group();
    this.objects[Rezurection.BulletSprite] = game.add.group();
    this.objects[Rezurection.BombSprite] = game.add.group();
    this.objects[Rezurection.DoorSprite] = game.add.group();
    this.game = game;
};

/**
 * Add an object to this container.
 * Arguments : Object object : instance of Phaser.DisplayObject
 */
Rezurection.ObjectContainer.prototype.add = function (object) {
    if (object instanceof Rezurection.WallSprite) this.objects[Rezurection.WallSprite].add(object);
    else if (object instanceof Rezurection.ZombieSprite) this.objects[Rezurection.ZombieSprite].add(object);
    else if (object instanceof Rezurection.CoinSprite) this.objects[Rezurection.CoinSprite].add(object);
    else if (object instanceof Rezurection.BulletSprite) this.objects[Rezurection.BulletSprite].add(object);
    else if (object instanceof Rezurection.PlayerSprite) this.objects[Rezurection.PlayerSprite].add(object);
    else if (object instanceof Rezurection.BombSprite) this.objects[Rezurection.BombSprite].add(object);
    else if (object instanceof Rezurection.DoorSprite) this.objects[Rezurection.DoorSprite].add(object);
    else this.objects["other"].add(object);
};

/**
 * Remove an object to this container.
 * Arguments : Object object : instance of Phaser.DisplayObject
 */
Rezurection.ObjectContainer.prototype.remove = function (object, destroy) {
    object.parent.remove(object, destroy);
};

/**
 * Add multiple object to this container.
 * Arguments : Object objects : many instance of Sprite
 */
Rezurection.ObjectContainer.prototype.addMultiple = function (objects) {
    for (var i = 0; i < objects.length; i++)
        this.add(objects[i]);
};

/**
 * Method to get players sprites
 * Return players sprites
 */
Rezurection.ObjectContainer.prototype.getPlayers = function () {
    return this.objects[Rezurection.PlayerSprite];

};

/**
 * Method to get zombies sprites
 * Return zombies sprites
 */
Rezurection.ObjectContainer.prototype.getZombies = function () {
    return this.objects[Rezurection.ZombieSprite];
};

/**
 * Method to get walls
 * Return walls sprites
 */
Rezurection.ObjectContainer.prototype.getWalls = function () {
    return this.objects[Rezurection.WallSprite];
};

/**
 * Method to get coins sprites
 * Return coins sprites
 */
Rezurection.ObjectContainer.prototype.getCoins = function () {
    return this.objects[Rezurection.CoinSprite];
};

/**
 * Method to get bombs sprites
 * Return bombs sprites
 */
Rezurection.ObjectContainer.prototype.getBombs = function () {
    return this.objects[Rezurection.BombSprite];
};

/**
 * Method to get bullets sprites
 * Return bullets sprites
 */
Rezurection.ObjectContainer.prototype.getBullets = function () {
    return this.objects[Rezurection.BulletSprite];
};

/**
 * Method to get doors sprites
 * Return doors sprites
 */
Rezurection.ObjectContainer.prototype.getDoors = function () {
    return this.objects[Rezurection.DoorSprite];
};

/**
 * Method to move to bottom
 * Argument : an object
 */
Rezurection.ObjectContainer.prototype.moveToBottom = function (object) {
    object.parent.remove(object);
    this.objects["other"].add(object);
};