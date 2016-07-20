"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * The definition of a maze.
 * Properties :
 * -> height : the number of rows in this maze.
 * -> width : the number of columns in this maze.
 * -> closedWalls : the list of the closedWalls in this maze.
 */
Rezurection.MazeDefinition = function (height, width, closedWalls)
{
    if (Rezurection.DEBUG) {
        if (height == null || width == null || closedWalls == null)
            throw new Error('MazeDefinition arguments cannot be null');
    }

    Object.defineProperty(this, 'height', { value: height, writable: false });
    Object.defineProperty(this, 'width', { value: width, writable: false });
    Object.defineProperty(this, 'closedWalls', { value: closedWalls, writable: false });
}