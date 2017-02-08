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
Rezurection.Gun = function (world) {
    var bullets = [];
    for (var i = 0; i < 10; i++) bullets.push(new Rezurection.SimpleBulletSprite(world.game));
    world.objects.addMultiple(bullets);
    Rezurection.BulletWeapon.call(this, bullets, 2);
};

Rezurection.Gun.prototype = Object.create(Rezurection.BulletWeapon.prototype);
Rezurection.Gun.prototype.constructor = Rezurection.Gun;