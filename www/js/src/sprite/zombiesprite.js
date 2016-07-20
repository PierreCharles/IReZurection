"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor to ZombieSprite -> GenericSprite
* Arguments : Phaser.game game, Pisition x and y, a skin key and associate controller
*/
Rezurection.ZombieSprite = function (game, caseCoord, skinKey, controller) {
    if (Rezurection.DEBUG) {
        if (game==null || caseCoord==null || skinKey == null)
            throw new TypeError("Argument cannot be null.");
    }
    Rezurection.GenericSprite.call(this, game, false, caseCoord, skinKey, controller);

    this.scale.setTo(0.8, 0.8);
    this.body.setSize(32, 32, 0, 0);

    this.onDied = new Phaser.Signal();
    this.attacking = false;

    this.addAnimation('wait',
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);

    if (Math.floor(Math.random() * 2))
        this.walk = this.addAnimation('walk',
            [20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 20, true);
    else
        this.walk = this.addAnimation('walk',
            [40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);

    this.addAnimation('attack',
        [60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
        70, 71, 72, 73, 74, 75, 76, 77, 38, 79], 50, true);

    this.die = this.addAnimation('die',
        [80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
        90, 91, 92, 93, 94, 95, 96, 97, 98, 99], 50, false);

    this.die.onComplete.add(this.dispatchDeadSignal, this);
};

Rezurection.ZombieSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.ZombieSprite.prototype.constructor = Rezurection.PlayerSprite;

Rezurection.ZombieSprite.prototype.dispatchDeadSignal = function () {
    this.onDied.dispatch(this, this.killerSprite);
}

/**
* Update methode to Zombie
*/
Rezurection.ZombieSprite.prototype.update = function () {

    if (!this.alive) {
        return;
    }

    if (!this.body.velocity.isZero()) {
        this.animations.play('walk');
        this.rotation = this.game.math.angleBetweenPoints({ x: 0, y: 0 }, this.body.velocity);
        this.walk.speed = this.game.math.distance(0, 0, this.body.velocity.x, this.body.velocity.y) / 4;
    }
    else if (this.attacking)
        this.animations.play('attack');
    else
        this.animations.play('wait');
};

Rezurection.ZombieSprite.prototype.damage = function (amount, damagerSprite) {
    if (this.alive) {
        this.health -= amount;

        if (this.health <= 0) {
            this.kill(damagerSprite);
        }
    }

    return this;
}

Rezurection.ZombieSprite.prototype.kill = function (killerSprite) {
    this.animations.play('die');
    this.alive = false;
    this.body.enable = false;
    this.killerSprite = killerSprite;
}

Rezurection.ZombieSprite.prototype.attack = function () {
    this.attacking = true;
    this.body.velocity.setTo(0, 0);
}

Rezurection.ZombieSprite.prototype.stopAttack = function () {
    this.attacking = false;
}