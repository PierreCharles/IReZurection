var Rezurection = Rezurection || {};

Rezurection.SimpleBulletSprite = function (game, controller) {
    Rezurection.BulletSprite.call(this, game, 'bullet1', controller);

    this.addAnimation('explode', [1, 2, 3, 4, 5], 30, false);
    this.game = game;
};

Rezurection.SimpleBulletSprite.prototype = Object.create(Rezurection.BulletSprite.prototype);
Rezurection.SimpleBulletSprite.prototype.constructor = Rezurection.SimpleBulletSprite;

Rezurection.SimpleBulletSprite.prototype.explode = function () {
    this.body.velocity.setTo(0, 0);
    this.animations.play('explode', null, false, true);
    this.exploding = true;
};

Rezurection.SimpleBulletSprite.prototype.reset = function (x, y, vx, vy) {
    this.animations.stop();
    this.animations.frame = 0;

    this.rotation = this.game.math.angleBetweenPoints({ x: 0, y: 0 }, { x: vx, y: vy });
    this.body.setSize(10, 10, 10 * Math.cos(this.rotation), 10 * Math.sin(this.rotation));

    Phaser.Sprite.prototype.reset.call(this, x, y);

    this.body.velocity.x = vx;
    this.body.velocity.y = vy;

    this.exploding = false;
};