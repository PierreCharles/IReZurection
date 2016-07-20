"use strict";

var Rezurection = Rezurection || {};

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

Rezurection.CollisionController.prototype.playerOverlapedCoin = function (player, coin) {
    Rezurection.SoundPlayer.getInstance(this.game).play(coin);
    coin.kill();
    this.world.playerData.score = 10;
};

Rezurection.CollisionController.prototype.playerOverlapedBomb = function (player, bomb) {
    Rezurection.SoundPlayer.getInstance(this.game).play(bomb);
    bomb.kill();
    this.world.objects.getZombies().forEach(function (zombie) { zombie.kill(); }, this, true);
};

Rezurection.CollisionController.prototype.bulletCollidedZombie = function (bullet, zombie) {
    if (!bullet.exploding) {
        zombie.damage(10);
        bullet.explode();
    }
};

Rezurection.CollisionController.prototype.bulletCollidedWall = function (bullet, wall) {
    bullet.explode();
};

Rezurection.CollisionController.prototype.playerOverlapedDoor = function (player, door) {
    this.game.state.restart(true, false, this.world.level + 1, this.world.playerData);
};

Rezurection.CollisionController.prototype.check = function () {
    this.collisionDetector.check();
}