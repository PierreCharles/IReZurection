"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Redefinition of astar.Graph to add some custom functionnalities.
 */
Rezurection.Graph = function (width, height, options) {

    if (Rezurection.DEBUG) {
        if (width == null || height == null || options == null)
            throw new Error('Graph arguments cannot be null');
    }

    var matrix = new Array(width);
    
    for (var x = 0; x < width; x++) {
        matrix[x] = new Array(height);
        for (var y = 0, col = matrix[x]; y < height; y++)
            col[y] = 1;
    }

    Graph.call(this, matrix, options);

    this.cornerCutting = !(!!options.cornerCutting);

    Object.defineProperty(this, 'width', { value: width, writable: false });
    Object.defineProperty(this, 'height', { value: height, writable: false });
};

Rezurection.Graph.prototype = Object.create(Graph.prototype);
Rezurection.Graph.prototype.constructor = Rezurection.Graph;

/**
 * Redefine the neighbors function to avoid corner cutting.
 */
Rezurection.Graph.prototype.neighbors = function (node) {
    var ret = [],
        x = node.x,
        y = node.y,
        grid = this.grid;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
        ret.push(grid[x - 1][y]);
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
        ret.push(grid[x + 1][y]);
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
        ret.push(grid[x][y - 1]);
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
        ret.push(grid[x][y + 1]);
    }

    if (this.diagonal) {

        if (this.cornerCutting) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1] && grid[x - 1][y].weight && grid[x][y - 1].weight) {
                ret.push(grid[x - 1][y - 1]);
            }

            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1] && grid[x + 1][y].weight && grid[x][y - 1].weight) {
                ret.push(grid[x + 1][y - 1]);
            }

            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1] && grid[x - 1][y].weight && grid[x][y + 1].weight) {
                ret.push(grid[x - 1][y + 1]);
            }

            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1] && grid[x + 1][y].weight && grid[x][y + 1].weight) {
                ret.push(grid[x + 1][y + 1]);
            }
        }
        else {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1]);
            }

            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1]);
            }

            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1]);
            }

            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1]);
            }
        }
    }

    return ret;
};

/**
 * Fill a rectangle in the graph with the given value.
 */
Rezurection.Graph.prototype.fill = function (x, y, width, height, weight) {

    width = x + width;
    height = y + height;

    for (var j = x; j < width; j++)
        for (var i = y; i < height; i++)
            this.grid[j][i].weight = weight;
};