"use strict";

var Rezurection = Rezurection || {};

Rezurection.ZombieController = function (zombieSprite) {
    this.k = -1;

    zombieSprite.setController(this);
    this.case = Rezurection.Case.FromWorldPosition(zombieSprite.position);
    this.moved = new Phaser.Signal();

    this.moved.dispatch(null, this.case);
};

Rezurection.ZombieController.prototype.control = function (sprite) {
    if (sprite.health <= 0) {
        sprite.kill();
        this.moved.dispatch(this.case, null);
    }

    if (this.k != -1) {
        var nextPoint = {
            x: Phaser.Math.catmullRomInterpolation(this.path.x, this.k),
            y: Phaser.Math.catmullRomInterpolation(this.path.y, this.k)
        };

        sprite.body.velocity.x = (nextPoint.x - sprite.position.x) << 1;
        sprite.body.velocity.y = (nextPoint.y - sprite.position.y) << 1;

        this.k += this.step;

        if (this.k > 1) {
            this.k = -1;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
        }
    }

    var newCase = Rezurection.Case.FromWorldPosition(sprite.position);

    if (this.case.x != newCase.x || this.case.y != newCase.y) {
        this.moved.dispatch(this.case, newCase);
        this.case = newCase;
    }
};

Rezurection.ZombieController.prototype.followPath = function (path) {
    if (path == null) {
        this.k = -1;
        return;
    }

    this.k = -1;

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
    this.time = game.time.now;
};