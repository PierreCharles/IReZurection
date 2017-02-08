"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * A wall between two cells.
 * properties :
 * -> cell1 : the first cell of this wall.
 * -> cell2 : the second cell of this wall.
 */
Rezurection.MazeWall = function (cell1, cell2) {

    if (Rezurection.DEBUG) {
        if (cell1 == null || cell2 == null)
            throw new Error('MazeWall arguments cannot be null');
    }

    Object.defineProperty(this, 'cell1', { value: cell1, writable: false });
    Object.defineProperty(this, 'cell2', { value: cell2, writable: false });
};

/**
 * properties :
 * -> cell1 : the first cell of this wall.
 * -> cell2 : the second cell of this wall.
 */
Rezurection.MazeWall.prototype.isVertical = function () {
    return this.cell1.col < this.cell2.col;
}

Rezurection.MazeWall.prototype.isHorizontal = function () {
    return !this.isVertical;
}