var Rezurection = Rezurection || {};

Rezurection.BulletSprite = function (game, skinKey, controller) {
    Rezurection.GenericSprite.call(this, game, true, new Rezurection.Case(-10, -10), skinKey, controller);

    this.exploding = false;
};

Rezurection.BulletSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.BulletSprite.prototype.constructor = Rezurection.BulletSprite;
