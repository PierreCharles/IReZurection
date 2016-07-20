"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * A cell of a maze.
 * Properties :
 * -> path : the actual path of this cell.
 * -> row : the row of this cell.
 * -> col : the column of this cell.
 */
Rezurection.MazeCell = function (row, col) {
    if (Rezurection.DEBUG) {
        if ( row == null || col == null)
            throw new Error('MazeCell arguments cannot be null');
    }
    this.path = null;
    var p = new Rezurection.MazePath();
    p.addCell(this);

    Object.defineProperty(this, 'row', { value: row, writable: false });
    Object.defineProperty(this, 'col', { value: col, writable: false });
};
