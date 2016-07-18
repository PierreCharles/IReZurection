var Rezurection = Rezurection || {};

Rezurection.TouchScreenHandler = function (game, parent) {
    Rezurection.InputHandler.call(this, game, parent);

    this.stick1 = game.plugins.add(
        Phaser.Plugin.VirtualJoystick,
        0,
        0,
        this.BASE_SIZE,
        this.STICK_SIZE,
        this.LIMIT,
        this.BASE_COLOR,
        this.STICK_COLOR
     );

    this.invertStick = false;

    game.scale.onSizeChange.add(this.resize, this);
};

Rezurection.TouchScreenHandler.prototype = Object.create(Rezurection.InputHandler.prototype);
Rezurection.TouchScreenHandler.prototype.constructor = Rezurection.TouchScreenHandler;

Rezurection.TouchScreenHandler.prototype.BASE_SIZE = 80;
Rezurection.TouchScreenHandler.prototype.STICK_SIZE = 70;
Rezurection.TouchScreenHandler.prototype.LIMIT = 50;
Rezurection.TouchScreenHandler.prototype.BASE_COLOR = 'rgba(128,128,128,0.5)';
Rezurection.TouchScreenHandler.prototype.STICK_COLOR = 'rgba(255,255,255,0.5)';
Rezurection.TouchScreenHandler.prototype.OFFSET = 150;
Rezurection.TouchScreenHandler.prototype.MIN_SPEED = 100;
Rezurection.TouchScreenHandler.prototype.MAX_SPEED = 300;

Rezurection.TouchScreenHandler.prototype.init = function (control, invertStick) {
    this.setControl(control);
    this.invertStick = !!invertStick;
    this.resize();

    this.stick1.start();
};

Rezurection.TouchScreenHandler.prototype.getStickRightX = function () {
    return game.scale.width - this.OFFSET;
};

Rezurection.TouchScreenHandler.prototype.getStickLeftX = function () {
    return this.OFFSET;
};

Rezurection.TouchScreenHandler.prototype.getSticksY = function () {
    return game.scale.height - this.OFFSET;
};

Rezurection.TouchScreenHandler.prototype.update = function () {
    
    var force = this.stick1.getForce();

    var fireDirection;

    if (force == 0) {
        this.setVelocity({ x: 0, y: 0 });
        fireDirection = this.getFireDirection(game.input.pointer1);
    }  else {
        var orientation = this.stick1.getOrientation();
        var speed = (this.MAX_SPEED - this.MIN_SPEED) * force + this.MIN_SPEED;
        this.setVelocity({ x: orientation.x * speed, y: orientation.y * speed });
        fireDirection = this.getFireDirection(game.input.pointer2);
    };

    if (fireDirection != null)
        this.fire(fireDirection);
}

Rezurection.TouchScreenHandler.prototype.getFireDirection = function (pointer) {
    if (!pointer.isDown)
        return null;

    var fireOrigin = this.control.getFireOrigin();

    dx = pointer.worldX - fireOrigin.x;
    dy = pointer.worldY - fireOrigin.y;

    var norm = Math.sqrt(dx * dx + dy * dy);

    return { x: dx / norm, y: dy / norm };
};

Rezurection.TouchScreenHandler.prototype.resize = function () {
    if (this.invertStick) {
        this.stick1.setLocation(this.getStickRightX(), this.getSticksY());
    }
    else {
        this.stick1.setLocation(this.getStickLeftX(), this.getSticksY());
    }
};

Rezurection.TouchScreenHandler.prototype.destroy = function () {
    game.scale.onSizeChange.remove(this.resize, this);
    game.plugins.remove(this.stick1);
};

