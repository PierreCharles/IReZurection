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
Rezurection.ShotGun = function (world) {
    var bullets = [];
    for (var i = 0; i < 30; i++) bullets.push(new Rezurection.SimpleBulletSprite(world.game));
    world.objects.addMultiple(bullets);
    Rezurection.BulletWeapon.call(this, bullets, 2, 250, 5);
};

Rezurection.ShotGun.prototype = Object.create(Rezurection.BulletWeapon.prototype);
Rezurection.ShotGun.prototype.constructor = Rezurection.ShotGun;

/**
 * Method to get bullet velocity
 * Arguments : a direction
 */
Rezurection.ShotGun.prototype.bulletVelocity = function (direction) {

    return { x: (direction.x + Math.random() * 0.5 - 0.25) * 1000, y: (direction.y + Math.random() * 0.5 - 0.25) * 1000 };
};

