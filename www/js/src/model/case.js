"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to Case
 * Argumetns : x and y : position to case
 */
Rezurection.Case = function (x, y) {
    if (Rezurection.DEBUG) {
        if (!(typeof x == "number" && typeof y == "number"))
            throw new TypeError("Arguments x and y has to be numbers");
    }

    this.x = x;
    this.y = y;
};

Rezurection.Case.CASE_SIZE = 64;
Rezurection.Case.CELL_SIZE = 5;

/**
 * Method to get a world position case
 * return a position in the world
 */
Rezurection.Case.prototype.toWorldPosition = function () {
    return new Phaser.Point(
        this.x * Rezurection.Case.CASE_SIZE + Rezurection.Case.CASE_SIZE / 2,
        this.y * Rezurection.Case.CASE_SIZE + Rezurection.Case.CASE_SIZE / 2
    );
};

/**
 * Method to get a position in maze
 * Argumetns : return new Phaser.Point
 */
Rezurection.Case.prototype.toMazePosition = function () {
    return new Phaser.Point(
        Math.floor((this.x - 1) / Rezurection.Case.CELL_SIZE),
        Math.floor((this.y - 1) / Rezurection.Case.CELL_SIZE)
    );
};

/**
 * method to get case from world positions
 * Arguments : point
 * return : new Case
 */
Rezurection.Case.FromWorldPosition = function (point) {
    if (Rezurection.DEBUG) {
        if (!(point instanceof Phaser.Point))
            throw new TypeError("Argument point has to be an instance of Phaser.Point");
    }
    return new Rezurection.Case(Math.floor(point.x / Rezurection.Case.CASE_SIZE), Math.floor(point.y / Rezurection.Case.CASE_SIZE));
};