"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to Gun -> BulletWeapon
 * Arguments : world
 */
Rezurection.LazerGun = function (world) {
    var bullets = [];
    for (var i = 0; i < 200; i++) bullets.push(new Rezurection.SimpleBulletSprite(world.game, 'simple_bullet2'));
    world.objects.addMultiple(bullets);
    Rezurection.BulletWeapon.call(this, bullets, 5, 1000, 1, 30);
    this.world = world;
    this.lastDirection = { x: 0, y: 0 };
};

Rezurection.LazerGun.prototype = Object.create(Rezurection.BulletWeapon.prototype);
Rezurection.LazerGun.prototype.constructor = Rezurection.LazerGun;


/**
 * Method to get bullet velocity
 * Arguments : a direction
 */
Rezurection.LazerGun.prototype.bulletVelocity = function (direction) {

    var speedFactor = Math.random() + 1;

    return { x: direction.x * 1000 * speedFactor, y: direction.y * 1000 * speedFactor };
};