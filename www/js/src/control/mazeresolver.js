"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor of MazeResolver
 * Arguments : a maze
 */
Rezurection.MazeResolver = function (maze) {
    if (Rezurection.DEBUG) {
        if (!(maze instanceof Rezurection.MazeDefinition))
            throw new Error("Argument maze has to be an instance of Rezurection.MazeDefinition.");
    }

    this.height = maze.height;
    this.width = maze.width;

    this.cells = new Array(this.height);
    this.unforbidenCells = new Array(this.height);

    for (var i = 0; i < this.height; i++) {
        this.cells[i] = new Array(this.width);
        this.unforbidenCells[i] = new Array(this.width);
        for (var j = 0; j < this.width; j++) {
            this.cells[i][j] = {
                noRigthWall: true,
                noLeftWall: true,
                noBottomWall: true,
                noTopWall: true
            };
            this.unforbidenCells[i][j] = true;
        }
    }
    
    maze.closedWalls.forEach(function (wall) {
        if (wall.isVertical()) {
            this.cells[wall.cell1.row][wall.cell1.col].noRigthWall = false;
            this.cells[wall.cell2.row][wall.cell2.col].noLeftWall = false;
        } else {
            this.cells[wall.cell1.row][wall.cell1.col].noBottomWall = false;
            this.cells[wall.cell2.row][wall.cell2.col].noTopWall = false;
        }
    }, this);
}

/**
 * Allow to forbide a cell in the maze.
 * Arguments :  x the column of the cell.
                y the row of the cell.
 */
Rezurection.MazeResolver.prototype.forbideCell = function (x, y) {
    if (Rezurection.DEBUG) {
        if (typeof x != "number" || typeof y != "number")
            throw new Error("Arguments x and y have to be numbers.");

        if (x < 0 || x >= this.width)
            throw new Error("Argument x haver to be in interval [0," + this.width + "[ but is equal to " + x + ".");

        if (y < 0 || y >= this.height)
            throw new Error("Argument x haver to be in interval [0," + this.height + "[ but is equal to " + y + ".");
    }

    this.unforbidenCells[y][x] = false;
};

/*
 * Find a path from a cell to an other.
 */
Rezurection.MazeResolver.prototype.getPath = function (fromX, fromY, toX, toY, maxLength) {
    if (Rezurection.DEBUG) {
        if (typeof fromX != "number" || typeof fromY != "number" || typeof toX != "number" || typeof toY != "number")
            throw new Error("Arguments fromX, fromY, toX, toY have to be numbers.");
        if (maxLength)
            if (typeof maxLength != "number")
                throw new Error("Argument maxLength has to be a number.");
    }
    var max = maxLength || -1;
    var unVisited = new Array(this.height);
    for (var i = 0; i < this.height; i++) {
        unVisited[i] = new Array(this.width);
        for (var j = 0; j < this.width; j++)
            unVisited[i][j] = this.unforbidenCells[i][j];
    }
    return this.browse(fromX, fromY, toX, toY, max, unVisited);
};

/*
 * Methode to Browse a path
 * Arguments : a  x, y from position, a x y destination position and maxlength and univisted
 */
Rezurection.MazeResolver.prototype.browse = function (fromX, fromY, toX, toY, maxLength, unVisited) {
    if (fromX == toX && fromY == toY) 
        return [{ x: toX, y: toY }];
    var result;
    var newMaxLength = maxLength - 1;
    if (maxLength == 0)
        return null;
    unVisited[fromY][fromX] = false;

    var fromX_1 = fromX - 1;

    if (fromX > 0 && this.cells[fromY][fromX].noLeftWall && unVisited[fromY][fromX_1]) {
        result = this.browse(fromX_1, fromY, toX, toY, newMaxLength, unVisited);

        if (result != null) {
            result.splice(0, 0, { x: fromX, y: fromY });
            return result;
        }
    }

    var fromY_1 = fromY - 1;

    if (fromY > 0 && this.cells[fromY][fromX].noTopWall && unVisited[fromY_1][fromX]) {
        result = this.browse(fromX, fromY_1, toX, toY, newMaxLength, unVisited);

        if (result != null) {
            result.splice(0, 0, { x: fromX, y: fromY });
            return result;
        }
    }

    fromX_1 = fromX + 1;

    if (fromX_1 < this.width && this.cells[fromY][fromX].noRigthWall && unVisited[fromY][fromX_1]) {
        result = this.browse(fromX_1, fromY, toX, toY, newMaxLength, unVisited);

        if (result != null) {
            result.splice(0, 0, { x: fromX, y: fromY });
            return result;
        }
    }

    fromY_1 = fromY + 1;

    if (fromY_1 < this.height && this.cells[fromY][fromX].noBottomWall && unVisited[fromY_1][fromX]) {
        result = this.browse(fromX, fromY_1, toX, toY, newMaxLength, unVisited);

        if (result != null) {
            result.splice(0, 0, { x: fromX, y: fromY });
            return result;
        }
    }

    return null;
};