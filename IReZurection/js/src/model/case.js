var Rezurection = Rezurection || {};

Rezurection.Case = function (x, y) {
    if (Rezurection.DEBUG) {
        if (!(typeof x == "number" && typeof y == "number"))
            throw new TypeError("Arguments x and y has to be numbers");
    }

    this.x = x;
    this.y = y;
};

Rezurection.Case.CASE_SIZE = 64;

Rezurection.Case.prototype.toWorldPosition = function () {
    return new Phaser.Point(
        this.x * Rezurection.Case.CASE_SIZE + Rezurection.Case.CASE_SIZE / 2,
        this.y * Rezurection.Case.CASE_SIZE + Rezurection.Case.CASE_SIZE / 2
    );
};

Rezurection.Case.FromWorldPosition = function (point) {
    if (Rezurection.DEBUG) {
        if (!(point instanceof Phaser.Point))
            throw new TypeError("Argument point has to be an instance of Phaser.Point");
    }

    return new Rezurection.Case(Math.floor(point.x / this.CASE_SIZE), Math.floor(point.y / this.CASE_SIZE));
}