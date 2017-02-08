"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};
/**
 * Constructor to Zombie controller
 * Arguments : a zombirSprite
 */
Rezurection.ZombieController = function (zombieForce, life, world) {
    this.zombieForce = zombieForce || 1;
    this.life = life || 1;
    this.world = world;
    this.k = -1;

    this.moved = new Phaser.Signal();
    this.moved.dispatch(null, this.case);

    this.followingPath = false;
    this.attacking = false;
};

/**
 * Method to initialize a zombie controller
 * Arguments : a sprite
 */
Rezurection.ZombieController.prototype.init = function (zombieSprite) {
    this.case = Rezurection.Case.FromWorldPosition(zombieSprite.position);
    zombieSprite.health = this.life;
}

/**
 * Method to control sprite zombie
 * Arguments : a sprite
 */
Rezurection.ZombieController.prototype.control = function (sprite) {

    if (!sprite.alive) {
        this.moved.dispatch(this.case, null);
        delete sprite.controller;
        return;
    }

    if (this.followingPath) {
        var nextPoint = {
            x: Phaser.Math.catmullRomInterpolation(this.path.x, this.k),
            y: Phaser.Math.catmullRomInterpolation(this.path.y, this.k)
        };

        sprite.body.velocity.x = (nextPoint.x - sprite.position.x) << 1;
        sprite.body.velocity.y = (nextPoint.y - sprite.position.y) << 1;

        this.k += this.step;

        if (this.k > 1) {
            this.followingPath = false;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
        }
    } else if (this.attacking) {
        var targetDirection = Phaser.Point.subtract(this.targetSprite.position, sprite.position).normalize();

        if (sprite.game.math.distanceSq(this.targetSprite.position.x, this.targetSprite.position.y, sprite.position.x, sprite.position.y) > 2048) {
            sprite.body.velocity = targetDirection.multiply(100, 100);
            sprite.stopAttack();
           
        } else {
            sprite.rotation = sprite.game.math.angleBetween(0, 0, targetDirection.x, targetDirection.y);
            sprite.attack();
            this.world.changeFloorTint();
            Rezurection.SoundPlayer.getInstance(sprite.game).play("attack");
            this.targetSprite.damage(this.zombieForce);
        }
    } else
        sprite.body.velocity.setTo(0, 0);

    var newCase = Rezurection.Case.FromWorldPosition(sprite.position);

    if (this.case.x != newCase.x || this.case.y != newCase.y) {
        this.moved.dispatch(this.case, newCase);
        this.case = newCase;
    }
};

/**
 * Method to make a zombie following a path
 * Arguments : an array containing each point of the path.
 */
Rezurection.ZombieController.prototype.followPath = function (path) {
    if (path == null) {
        this.followingPath = false;
        return;
    }

    if (!(path instanceof Array))
        throw new TypeError('path has to be an array of points.');

    this.path = { x: [], y: [] };

    for (var i = 0; i < path.length; i++) {
        var worldPosition = new Rezurection.Case(path[i].x, path[i].y).toWorldPosition();
        this.path.x.push(worldPosition.x);
        this.path.y.push(worldPosition.y);
    }

    this.step = 0.04 / path.length;
    this.k = 0;
    this.followingPath = true;
    this.attacking = false;
};

/**
 * Method attack to zombie
 * Arguments : a target sprite
 */
Rezurection.ZombieController.prototype.attack = function (targetSprite) {
    if (Rezurection.DEBUG) {
        if (!(targetSprite instanceof Phaser.Sprite))
            throw new Error("Argument point has to be an instance of Phaser.Sprite.");
    }
    this.targetSprite = targetSprite;
    this.followingPath = false;
    this.attacking = true;
}