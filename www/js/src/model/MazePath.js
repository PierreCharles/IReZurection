"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * A path in the maze.
 * Properties :
 * -> addCell(cell: MazeCell) : add a cell in this path and change its property path.
 * -> getCell(index: number) : get a cell at a specific index.
 * -> length() : get the number of cells in this path.
 */
Rezurection.MazePath = function () {

    var cells = new Array();

    this.addCell = function (cell)
    {
        if (!(cell instanceof Rezurection.MazeCell))
            throw new Error('Argument hase to be an instance of MazeCell');

        cell.path = this;
        cells.push(cell);
    };

    this.getCell = function (index)
    {
        if (index < 0 || index >= this.length() || index == null)
            throw new Error("Index out of range.");

        return cells[index];
    };

    this.length = function ()
    {
        return cells.length;
    };
};