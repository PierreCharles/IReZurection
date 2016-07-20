"use strict";

/**
 * Namespace
 */
var Rezurection = Rezurection || {};

/**
 * An object allowing to create a maze.
 * Properties :
 * -> create(height : number, width : number) : create a maze of size height x width and return its definition.
 */
Rezurection.MazeCreator = function () {
    
    var initCells = function(height, width)
    {
        var cells = new Array(height);

        for (var i=0; i<height; i++) {
            cells[i] = new Array(width);
            for (var j=0; j<width; j++)
                cells[i][j] = new Rezurection.MazeCell(i, j);
        }

        return cells;
    };

    var initWalls = function (height, width) {

        var walls = new Array();
        var cells = initCells(height, width);

        for (var i=0; i<cells.length-1; i++)
            for (var j=0; j < cells[0].length-1; j++) {
                walls.push(new Rezurection.MazeWall(cells[i][j], cells[i][j + 1]));
                walls.push(new Rezurection.MazeWall(cells[i][j], cells[i + 1][j]));
            }

        for (var i = 0; i < cells.length - 1; i++)
            walls.push(new Rezurection.MazeWall(cells[i][cells[0].length - 1], cells[i + 1][cells[0].length - 1]));

        for (var j = 0; j < cells[0].length - 1; j++)
            walls.push(new Rezurection.MazeWall(cells[cells.length - 1][j], cells[cells.length - 1][j + 1]));
        
        return walls;
    }

    this.create = function (height, width) {

        var closedWalls = initWalls(height, width);

        var mn_1 = height * width - 1;
        var maxClosedWalls = closedWalls.length;

        while (maxClosedWalls - closedWalls.length < mn_1) {

            var wallIndex = Math.floor(Math.random() * closedWalls.length);
            var wall = closedWalls[wallIndex];

            if (wall.cell1.path != wall.cell2.path) {

                var p = wall.cell2.path;

                for (var i = 0; i < p.length() ; i++)
                    wall.cell1.path.addCell(p.getCell(i));

                closedWalls.splice(wallIndex, 1);
            }
        }

        return new Rezurection.MazeDefinition(height, width, closedWalls);
    }
};

Rezurection.Maze = new Rezurection.MazeCreator();
