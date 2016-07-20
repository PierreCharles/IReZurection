var Rezurection = Rezurection || {};

Rezurection.InputHandler = function (game, parent) {

    Phaser.Plugin.call(this, game, parent);

    this.sprite = null;

    this.hasPreRender = false;
    this.hasRender = false;
    this.hasPostRender = false;
    this.hasPreUpdate = true;
    this.hasPostUpdate = false;
    this.visible = false;

    this.onFire = new Phaser.Signal();

    Rezurection.InputHandler.velocityAlreadySetted = false;
};

Rezurection.InputHandler.prototype = Object.create(Phaser.Plugin.prototype);
Rezurection.InputHandler.prototype.constructor = Rezurection.InputHandler;

Rezurection.InputHandler.velocity = null;

Rezurection.InputHandler.prototype.setControl = function(control)
{
    this.control = control;
}

Rezurection.InputHandler.prototype.preUpdate = function () {

    Rezurection.InputHandler.velocityAlreadySetted = false;
};

Rezurection.InputHandler.prototype.setVelocity = function (velocity) {

    if (Rezurection.InputHandler.velocityAlreadySetted && velocity.x == 0 && velocity.y == 0)
        return;

    this.control.setVelocity(velocity);

    Rezurection.InputHandler.velocityAlreadySetted = true;
};

Rezurection.InputHandler.prototype.fire = function (direction) {
    this.control.fire(direction);
};