"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to ObjectManager
 * Argument : a current world
 */
Rezurection.ObjectManager = function (world) {
    if (Rezurection.DEBUG){
        if (! (world instanceof Rezurection.World))
            throw new Error("Arguments mazeDefinition has to be an instance of Rezurection.World.");
    }
    this.game = world.game;
    this.width = world.maze.width;
    this.height = world.maze.height;
    this.objectContainer = world.objects;
    this.world = world;
    this.onScreenCellsRect = new Phaser.Rectangle(-100, -100, 1, 1);
    this.cells = new Array(this.height);
    for (var i = 0; i < this.height; i++) {
        this.cells[i] = new Array(this.width);
        for (var j = 0; j < this.width; j++)
            this.cells[i][j] = { walls: [], zombies: [], wasOnScreen: false, onScreen: false };
    }
};

/**
 * Method to getCell
 * Arguments: x and y
 * Return new Rezurection Case FromWorldPosition
 */
Rezurection.ObjectManager.prototype.getCell = function (x, y) {
    return new Rezurection.Case.FromWorldPosition(new Phaser.Point(x, y)).toMazePosition();
}

/**
 * Method to add Wall
 * Arguments: x and y, width and height
 */
Rezurection.ObjectManager.prototype.addWall = function (x, y, width, height) {
    var cell = this.getCell(x, y);
    this.cells[cell.y][cell.x].walls.push({ x: x, y: y, width: width,  height: height, sprite: null });
}

/**
 * Method to add zombies
 * Arguments: coordinate and a controller
 */
Rezurection.ObjectManager.prototype.addZombie = function (caseCoord, controller) {
    var cell = caseCoord.toMazePosition();
    this.cells[cell.y][cell.x].zombies.push({ caseCoord: caseCoord, controller: controller });
}

/**
 * Method to get on screen cells rect
 * return new Phaser rectangle
 */
Rezurection.ObjectManager.prototype.getOnScreenCellsRect = function () {
    var cameraW_2 = Math.ceil(this.game.camera.width * 0.5);
    var cameraH_2 = Math.ceil(this.game.camera.height * 0.5)
    var startCell = this.getCell(this.game.camera.position.x - cameraW_2, this.game.camera.position.y - cameraH_2);
    var endCell = this.getCell(this.game.camera.position.x + cameraW_2, this.game.camera.position.y + cameraH_2);
    startCell.x--;
    startCell.y--;
    endCell.x++;
    endCell.y++;
    startCell.x = startCell.x > -1 ? startCell.x : 0;
    startCell.y = startCell.y > -1 ? startCell.y : 0;
    endCell.x = endCell.x < this.width ? endCell.x : this.width - 1;
    endCell.y = endCell.y < this.height ? endCell.y : this.height - 1;
    return new Phaser.Rectangle(startCell.x, startCell.y, endCell.x - startCell.x, endCell.y - startCell.y);
}

/**
 * Method to get cells changes
 * Return { apearedCells, disapearedCells } 
 */
Rezurection.ObjectManager.prototype.getCellsChanges = function () {
    var apearedCells = [];
    var disapearedCells = [];
    var newOnScreenCellsRect = this.getOnScreenCellsRect();
    var intersection = this.onScreenCellsRect.intersection(newOnScreenCellsRect);

    for (var x = this.onScreenCellsRect.x; x <= this.onScreenCellsRect.right && x >= 0; x++)
        for (var y = this.onScreenCellsRect.y; y <= this.onScreenCellsRect.bottom; y++)
            if (intersection.x > x || intersection.y > y || intersection.right < x || intersection.bottom < y)
                disapearedCells.push(this.cells[y][x]);

    for (var x = newOnScreenCellsRect.x; x <= newOnScreenCellsRect.right; x++)
        for (var y = newOnScreenCellsRect.y; y <= newOnScreenCellsRect.bottom; y++)
            if (intersection.x > x || intersection.y > y || intersection.right < x || intersection.bottom < y || intersection.height * intersection.width == 0)
                apearedCells.push(this.cells[y][x]);

    this.onScreenCellsRect = newOnScreenCellsRect;

    return { apearedCells: apearedCells, disapearedCells: disapearedCells };
};


/**
 * Method to add walls sprites
 * Arguments: wall
 */
Rezurection.ObjectManager.prototype.addWallSprite = function (wall) {
    var wallSprite = new Rezurection.WallSprite(this.game, wall.x, wall.y, wall.width, wall.height);
    wall.sprite = wallSprite;
    this.objectContainer.add(wallSprite);
};

/**
 * Method to add zombies sprite
 * Arguments: zombies
 */
Rezurection.ObjectManager.prototype.addZombieSprite = function (zombie) {
    var zombieSprite = new Rezurection.ZombieSprite(this.game, zombie.caseCoord, 'zombie', zombie.controller);
    zombieSprite.onDied.add(this.world.zombieDied, this.world);
    this.objectContainer.add(zombieSprite);
};

/**
 * Method to remove wall sprite
 * Arguments: wall
 */
Rezurection.ObjectManager.prototype.removeWallSprite = function (wall) {
        this.objectContainer.remove(wall.sprite, true);
        wall.sprite = null;
};

/**
 * Method cellApeared
 * Arguments: cell
 */
Rezurection.ObjectManager.prototype.cellApeared = function (cell) {
    cell.walls.forEach(this.addWallSprite, this);
    cell.zombies.forEach(this.addZombieSprite, this);
    cell.zombies = [];
};

/**
 * Method to cellDisapeared
 * Arguments: cell
 */
Rezurection.ObjectManager.prototype.cellDisapeared = function (cell) {
    cell.walls.forEach(this.removeWallSprite, this);
}

/**
 * Method to update
 */
Rezurection.ObjectManager.prototype.update = function () {
    var changes = this.getCellsChanges();
    changes.apearedCells.forEach(this.cellApeared, this);
    changes.disapearedCells.forEach(this.cellDisapeared, this);
}