"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to CollisionDetector
 * Arguments : a game, a objectContaienr
 */
Rezurection.CollisionDetector = function (game, objectContainer) {
    this.objects = objectContainer;
    this.game = game;
    this.onPlayerCollideZombie = new Phaser.Signal();
    this.onPlayerOverlapCoin = new Phaser.Signal();
    this.onBulletCollideWall = new Phaser.Signal();
    this.onBulletCollideZombie = new Phaser.Signal();
    this.onPlayerOverlapBomb = new Phaser.Signal();
    this.onPlayerOverlapDoor = new Phaser.Signal();
    this.onCoinCollideWall = new Phaser.Signal();
    game.physics.startSystem(Phaser.Physics.ARCADE);
};

/**
 * Collision player with zombie
 * Arguments : PlayerSprite player, ZombieSprite zombie
 */
Rezurection.CollisionDetector.prototype.playerZombieCollisionHandler = function (player, zombie) {
    this.onPlayerCollideZombie.dispatch(player, zombie);
};

/**
 * Collision bullet with zombie
  * Arguments : BulletSprite bullet, ZombieSprite zombie
 */
Rezurection.CollisionDetector.prototype.bulletZombieCollisionHandler = function (bullet, zombie) {
    this.onBulletCollideZombie.dispatch(bullet, zombie);
};

/**
 * Collision bullet with wall
  * Arguments : BulletSprite bullet, WallSprite wall
 */
Rezurection.CollisionDetector.prototype.bulletWallCollisionHandler = function (bullet, wall) {
    this.onBulletCollideWall.dispatch(bullet, wall);
};

/**
 * Collision player with coin
  * Arguments : PlayerSprite player, CoinSprite coin
 */
Rezurection.CollisionDetector.prototype.playerCoinCollisionHandler = function (player, coin) {
    this.onPlayerOverlapCoin.dispatch(player, coin);
}; 

/**
 * Collision player with bomb
  * Arguments : PlayerSprite player, BombSprite bomb
 */
Rezurection.CollisionDetector.prototype.playerBombCollisionHandler = function (player, bomb) {
    this.onPlayerOverlapBomb.dispatch(player, bomb);
};

/**
 * Collision player with door
 * Arguments : PlayerSprite player, DoorSprite
 */
Rezurection.CollisionDetector.prototype.playerDoorCollisionHandler = function (player, door) {
    this.onPlayerOverlapDoor.dispatch(player, door);
};

/**
 * Method to check collision
 */
Rezurection.CollisionDetector.prototype.check = function () {
    this.game.physics.arcade.overlap(this.objects.getPlayers(), this.objects.getCoins(), this.playerCoinCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.objects.getPlayers(), this.objects.getBombs(), this.playerBombCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.objects.getBullets(), this.objects.getZombies(), this.bulletZombieCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.objects.getBullets(), this.objects.getWalls(), this.bulletWallCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.objects.getPlayers(), this.objects.getDoors(), this.playerDoorCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.objects.getPlayers(), this.objects.getZombies());
    this.game.physics.arcade.collide(this.objects.getPlayers(), this.objects.getWalls());
    this.game.physics.arcade.collide(this.objects.getZombies(), this.objects.getWalls());
};