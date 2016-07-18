var Rezurection = Rezurection || {};

Rezurection.KeyboardMouseHandler = function (game, parent) {
    Rezurection.InputHandler.call(this, game, parent);

    this.keyset = null;
};

Rezurection.KeyboardMouseHandler.prototype = Object.create(Rezurection.InputHandler.prototype);
Rezurection.KeyboardMouseHandler.prototype.constructor = Rezurection.KeyboardMouseHandler;

Rezurection.KeyboardMouseHandler.prototype.VELOCITY = 300;
Rezurection.KeyboardMouseHandler.prototype.DEFAULT_KEYSET = {
    top:    Phaser.KeyCode.Z,
    down:   Phaser.KeyCode.S,
    left:       Phaser.KeyCode.Q,
    right:      Phaser.KeyCode.D
};

Rezurection.KeyboardMouseHandler.prototype.init = function (control, keyset) {
    this.setControl(control);

    this.keyset = keyset || this.DEFAULT_KEYSET;
};

Rezurection.KeyboardMouseHandler.prototype.update = function () {
    this.checkKeys();
    this.checkMouse();
}

Rezurection.KeyboardMouseHandler.prototype.checkKeys = function () {

    var vx = 0, vy = 0;

    vx += game.input.keyboard.isDown(this.keyset.right) ? this.VELOCITY : 0;
    vx -= game.input.keyboard.isDown(this.keyset.left) ? this.VELOCITY : 0;
    vy += game.input.keyboard.isDown(this.keyset.down) ? this.VELOCITY : 0;
    vy -= game.input.keyboard.isDown(this.keyset.top) ? this.VELOCITY : 0;

    this.setVelocity({ x: vx, y: vy });
}

Rezurection.KeyboardMouseHandler.prototype.checkMouse = function () {
    if (!game.input.mousePointer.isDown)
        return;

    var fireOrigin = this.control.getFireOrigin();

    dx = game.input.mousePointer.worldX - fireOrigin.x;
    dy = game.input.mousePointer.worldY - fireOrigin.y;

    var norm = Math.sqrt(dx * dx + dy * dy);

    this.fire({ x: dx / norm, y: dy / norm });
};

