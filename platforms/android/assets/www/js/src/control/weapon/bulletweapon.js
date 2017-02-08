"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor of BulletWeapon
 * Arguments : bullets, fireRate, bulletsLifespan, bulletsPerShot
 */
Rezurection.BulletWeapon = function (bullets, fireRate, bulletsLifespan, bulletsPerShot, playerOffset) {
    for (var i = 0; i < bullets.length; i++) bullets[i].setController(this);
    this.bullets = bullets;
    this.timeBetweenShots = Math.floor(1000 / fireRate || 1);
    this.bulletsLifespan = bulletsLifespan || 500;
    this.bulletsPerShot = bulletsPerShot || 1;
    this.lastShotTime = 0;
    this.playerOffset = playerOffset || 20;
}

/**
 * Method to control bullet
 * Arguments : bullet
 */
Rezurection.BulletWeapon.prototype.control = function (bullet) {
};

/**
 * Method to know if bullet is dead or not
 * Arguments : bullet
 * Return true if bullet is dead, else return false
 */
Rezurection.BulletWeapon.prototype.bulletIsDead = function (bullet) {
    return !bullet.alive;
};

/**
 * Method to know if bullet is dead or not
 * Arguments : bullet
 * Return true if bullet is dead, else return false
 */
Rezurection.BulletWeapon.prototype.bulletIsAlive = function (bullet) {
    return bullet.alive;
};

/**
 * Method to know what bullet is dead
 * Return the first dead bullet
 */
Rezurection.BulletWeapon.prototype.getFirstDeadBullet = function () {
    return this.bullets.find(this.bulletIsDead);
}

/**
 * Give alives bullets.
 * Return the first dead bullet
 */
Rezurection.BulletWeapon.prototype.getAliveBullets = function () {
    return this.bullets.filter(this.bulletIsAlive);
}

/**
 * Method to count dead bullets
 * Return noumber dead bullets
 */
Rezurection.BulletWeapon.prototype.countDeadBullets = function () {
    return this.bullets.filter(this.bulletIsDead).length;
};

/**
 * kill a bullet
 * Arguments : bullet
 */
Rezurection.BulletWeapon.prototype.killBullet = function (bullet) {
    return bullet.kill();
};

/**
 * Method to know velocity to bullet
 * Argument : direction 
 * Return velocity
 */
Rezurection.BulletWeapon.prototype.bulletVelocity = function(direction){
    return { x: direction.x * 1000, y: direction.y * 1000 };
};

/**
 * Method to fire 
 * Argument : position, direction
 */
Rezurection.BulletWeapon.prototype.fire = function (position, direction, game) {
    var currentTime = Date.now();
    if (currentTime - this.lastShotTime < this.timeBetweenShots || this.countDeadBullets() < this.bulletsPerShot) return;
    Rezurection.SoundPlayer.getInstance(game).play("bullet");
    this.lastShotTime = currentTime;
    for (var i = 0; i < this.bulletsPerShot; i++) {
        var bullet = this.getFirstDeadBullet();
        var velocity = this.bulletVelocity(direction);
        bullet.lifespan = this.bulletsLifespan;
        bullet.reset(position.x + direction.x * this.playerOffset, position.y + direction.y * this.playerOffset, velocity.x, velocity.y);
    }
}