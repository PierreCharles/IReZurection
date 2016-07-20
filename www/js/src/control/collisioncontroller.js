"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to CollisionController
 * Arguments : a collisionDetector, a game, a world
 */
Rezurection.CollisionController = function (collisionDetector, game, world) {
    collisionDetector.onPlayerOverlapCoin.add(this.playerOverlapedCoin, this);
    collisionDetector.onPlayerOverlapBomb.add(this.playerOverlapedBomb, this);
    collisionDetector.onBulletCollideZombie.add(this.bulletCollidedZombie, this);
    collisionDetector.onBulletCollideWall.add(this.bulletCollidedWall, this);
    collisionDetector.onPlayerOverlapDoor.add(this.playerOverlapedDoor, this);
    this.game=game;
    this.world = world;
    this.collisionDetector = collisionDetector;
}

/**
 * Method to controlle collision with a player and a coin
 * Arguments : a player and a coin
 */
Rezurection.CollisionController.prototype.playerOverlapedCoin = function (player, coin) {
    Rezurection.SoundPlayer.getInstance(this.game).play("coin");
    this.world.objects.remove(coin, true);
    this.world.playerData.addWallet(10);
};

/**
 * Method to controlle collision with a player and a bomb
 * Arguments : a player and a bomb
 */
Rezurection.CollisionController.prototype.playerOverlapedBomb = function (player, bomb) {
    Rezurection.SoundPlayer.getInstance(this.game).play("bomb");
    bomb.destroy();
    this.world.objects.getZombies().forEach(function (zombie) {
        zombie.kill(player);
        this.world.playerData.addKilledZombies(1);
    }, this, true);
};

/**
 * Method to controlle collision with a bullet and a zombie
 * Arguments : a bullet and a zombie
 */
Rezurection.CollisionController.prototype.bulletCollidedZombie = function (bullet, zombie) {
    if (!bullet.exploding) {
        zombie.damage(1, bullet.controller.owner);
        bullet.explode();
        if (!zombie.alive) {
            this.world.playerData.addKilledZombies(1);
            Rezurection.SoundPlayer.getInstance(this.game).play("dead");
        }
            
    }
};

/**
 * Method to controlle collision with a bullet and a wall
 * Arguments : a bullet and a wall
 */
Rezurection.CollisionController.prototype.bulletCollidedWall = function (bullet, wall) {
    bullet.explode();
};

/**
 * Method to controlle collision with a player and a door
 * Arguments : a player and a door
 */
Rezurection.CollisionController.prototype.playerOverlapedDoor = function (player, door) {
    this.game.state.restart(true, false, this.world.level + 1, this.world.playerData);
};

/**
 * Method to check collision
 */
Rezurection.CollisionController.prototype.check = function () {
    this.collisionDetector.check();
}