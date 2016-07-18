var Rezurection = Rezurection || {};

Rezurection.StageManager = function (stage) {

    if (Rezurection.DEBUG) {
        if (!(stage instanceof Phaser.Stage))
            throw new TypeError("Argument stage has to be an instance of Phaser.Stage.");
    }

    this.stage = stage;
    this.rightAligned = [];
    this.bottomAligned = [];
    this.horizontalyCentered = [];
    this.all = [];

    this.stage.game.scale.onSizeChange.add(this.resize, this);
}

Rezurection.StageManager.prototype.alignRight = function (element) {
    element.object.position.x = this.stage.width - (element.object.width + element.right);
};

Rezurection.StageManager.prototype.alignBottom = function (element) {
    element.object.position.y = this.stage.height - (element.object.height + element.bottom);
};

Rezurection.StageManager.prototype.center = function (element) {
    element.right = this.stage.width / 2;
    this.alignRight(element);
};

Rezurection.StageManager.prototype.resize = function () {
    this.rightAligned.forEach(this.alignRight, this);
    this.bottomAligned.forEach(this.alignBottom, this);
    this.horizontalyCentered.forEach(this.center, this);
};

Rezurection.StageManager.prototype.addElement = function(element){
    if (element.horizontalyCentered && (element.right || element.left))
        throw new Error("An element cannot be horizontaly centered and be left or right aligned.");

    if (element.left && element.right)
        throw new Error("An element cannot be left and right aligned.");

    if (element.bottom && element.top)
        throw new Error("An element cannot be bottom and top aligned.");

    if (!element.object)
        throw new Error("An element must have an object property.");

    if (!(element.object instanceof PIXI.DisplayObject))
        throw new Error("object property of an object have to be an instance of PIXI.DisplayObject.");

    if (!element.right && !element.left && !element.top && !element.bottom)
        throw new Error("An element must have at least one of this property : right, left, top, bottom.");

    if (element.horizontalyCentered){
        this.horizontalyCentered.push(element);
        this.center(element);
        this.stage.addChild(element.object);
    }

    if (element.right) {
        if (typeof element.right != "number")
            throw new Error("Property right of an element has to be a number");

        this.rightAligned.push(element);
        this.alignRight(element);
    }

    if (element.bottom) {
        if (typeof element.bottom != "number")
            throw new Error("Property right of an element has to be a number");

        this.bottomAligned.push(element);
        this.alignBottom(element);
    }

    if (element.top) {
        if (typeof element.top != "number")
            throw new Error("Property right of an element has to be a number");

        element.object.position.y = element.top;
    }

    if (element.left) {
        if (typeof element.left != "number")
            throw new Error("Property right of an element has to be a number");

        element.object.position.x = element.left;
    }

    this.stage.addChild(element.object);
    this.all.push(element);
};

Rezurection.StageManager.prototype.destroy = function () {
    for (var i = 0; i < this.all.length; i++)
        this.stage.removeChild(this.all[i]);

    this.stage.game.scale.onSizeChange.remove(this.resize, this);
}

