var Rezurection = Rezurection || {};

Rezurection.Gun = function (game, bullets) {
    Rezurection.BulletWeapon.call(this, bullets, 2);
};

Rezurection.Gun.prototype = Object.create(Rezurection.BulletWeapon.prototype);
Rezurection.Gun.prototype.constructor = Rezurection.Gun;