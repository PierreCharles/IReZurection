"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};
/**
 * Constructor to world
 * Arguments : a game, current level, playerData, inputHandlers
 */
Rezurection.World = function (game, level, playerData, inputHandlers) {

    if (Rezurection.DEBUG) {
        if (!(game instanceof Phaser.Game))
            throw new TypeError("Argument game has to be an instance of Phaser.Game.");
        if (typeof level != "number")
            throw new TypeError("Argument level has to be a number");
        if (!Array.isArray(inputHandlers))
            throw new TypeError("Argument \"controllers\" has to be an array.");
        if (!(playerData instanceof Rezurection.PlayerData))
            throw new TypeError("Argument playerData has to be an instance of Rezurection.PlayerData.");
        inputHandlers.forEach(function (inputHandler) {
            if (!(inputHandler instanceof Rezurection.InputHandler))
                throw new TypeError("All object in \"controllers\" argument have to be instances of Rezurection.InputHandler");
        });
    }

    var mazeSize = 5 + Math.floor(level / 5);
    this.game = game;
    this.level = level;
    this.playerData = playerData;
    this.inputHandlers = inputHandlers;
    this.maze = Rezurection.Maze.create(5, mazeSize);
    this.objects = new Rezurection.ObjectContainer(this.game);
    this.objectManager = new Rezurection.ObjectManager(this);
    this.collisions = new Rezurection.CollisionController(new Rezurection.CollisionDetector(this.game, this.objects), game, this);
    this.zombieIntelligence = new Rezurection.ZombiesIntelligence(this, 10);

    game.world.setBounds(
        0, 0,
        (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE,
        (this.maze.height * this.CELL_SIZE + 2) * this.CASE_SIZE
    );

    this.putFloor();
    this.putWalls();
    //this.putBomb();
    this.putZombies(this.level);
    this.setExitDoor();
    this.createPlayer();

    game.camera.setSize(game.width, game.height);

};

Rezurection.World.prototype.CASE_SIZE = 64;
Rezurection.World.prototype.CELL_SIZE = 5;

/**
* Method to update world
*/
Rezurection.World.prototype.update = function () {
    this.objectManager.update();
    this.collisions.check();
    this.zombieIntelligence.update();
    this.floor.position.x = this.game.camera.position.x - this.game.camera.width / 2;
    this.floor.position.y = this.game.camera.position.y - this.game.camera.height / 2;
    this.floor.tilePosition.x = -this.game.camera.x;
    this.floor.tilePosition.y = -this.game.camera.y;
    this.game.scale.onSizeChange.add(this.resize, this);
};

/**
* Method to resize world
*/
Rezurection.World.prototype.resize = function () {
    this.floor.width = this.game.width;
    this.floor.height = this.game.height;
};

/**
* Method to killde zombies on the map
* Arguments : zombie sprite and the dead zombie sprite
*/
Rezurection.World.prototype.zombieDied = function (zombieSprite, killerSprite) {
    this.objects.moveToBottom(zombieSprite);
    zombieSprite.exists = false;
    zombieSprite.visible = true;

    if (Math.random() < 0.004) {
        this.objects.add(new Rezurection.BombSprite(this.game, Rezurection.Case.FromWorldPosition(zombieSprite.position)));
    } else {
        var nbCoins = Math.floor(1 + Math.random() * 2);
        for (var i = 0; i < nbCoins; i++)
            this.objects.add(new Rezurection.CoinSprite(this.game, Rezurection.Case.FromWorldPosition(zombieSprite.position), null, killerSprite));
    }
}

/**
* Method to playerDied
* Argument : zombie sprite
*/
Rezurection.World.prototype.playerDied = function (zombieSprite) {
    this.game.state.start('game_over_screen', true, false, this.level, this.playerData);
}

/**
* Method to get an acceptable random case in the map
* return position (x, y)
*/
Rezurection.World.prototype.getAcceptableCase = function () {
    var x = Math.floor(Math.random() * this.maze.width) * this.CELL_SIZE + (Math.floor(Math.random() * (this.CELL_SIZE - 1)) + 1),
        y;

    if (x < 6)
        y = Math.floor(Math.random() * (this.maze.height - 1) + 1) * this.CELL_SIZE + (Math.floor(Math.random() * (this.CELL_SIZE - 1)) + 1);
    else
        y = Math.floor(Math.random() * this.maze.height) * this.CELL_SIZE + (Math.floor(Math.random() * (this.CELL_SIZE - 1)) + 1);

    return new Rezurection.Case(x, y);
}

/**
* Method to put walls in the map
*/
Rezurection.World.prototype.putWalls = function () {

    this.maze.closedWalls.forEach(function (wall) {
            wall.isVertical() ?
                this.objectManager.addWall((wall.cell1.col * this.CELL_SIZE + this.CELL_SIZE) * this.CASE_SIZE, (wall.cell1.row * this.CELL_SIZE + 1) * this.CASE_SIZE, this.CASE_SIZE, this.CELL_SIZE * this.CASE_SIZE)
	    	:
	            this.objectManager.addWall((wall.cell1.col * this.CELL_SIZE + (wall.cell1.col > 0 ? 0 : 1)) * this.CASE_SIZE, (wall.cell1.row * this.CELL_SIZE + this.CELL_SIZE) * this.CASE_SIZE, (this.CELL_SIZE + (wall.cell1.col == 0 ? 0 : 1)) * this.CASE_SIZE, this.CASE_SIZE)
    }, this);

    this.objects.add(new Rezurection.WallSprite(this.game, 0, 0, (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE, this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, 0, (this.maze.height * this.CELL_SIZE + 1) * this.CASE_SIZE, (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE, this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, 0, this.CASE_SIZE, this.CASE_SIZE, this.maze.height * this.CELL_SIZE * this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, (this.maze.width * this.CELL_SIZE + 1) * this.CASE_SIZE, this.CASE_SIZE, this.CASE_SIZE, this.maze.height * this.CELL_SIZE * this.CASE_SIZE));
};

/**
* Method to put floor in the map
*/
Rezurection.World.prototype.putFloor = function () {
    this.floor = new Phaser.TileSprite(
            this.game,
            0, 0,
            this.game.width,
            this.game.height,
            'floor'
    );
    this.objects.add(this.floor);
};

/**
* Method to put zombies in the map
* Arguement : number of zombies to put in the map
*/
Rezurection.World.prototype.putZombies = function (level) {
    var nbZombies = 10 + level * 10;
    for (var i = 0; i < nbZombies; i++) {
        var zController = new Rezurection.ZombieController(Math.floor(Math.random() * level / 3), Math.floor(Math.random() * level / 3), this);
        zController.moved.add(this.zombieIntelligence.zombieMoved, this.zombieIntelligence);
        this.objectManager.addZombie(this.getAcceptableCase(), zController);
    }
};

/**
* Method to set an exit door in the map
*/
Rezurection.World.prototype.setExitDoor = function () {
    this.objects.add(new Rezurection.DoorSprite(this.game, new Rezurection.Case(this.maze.width * this.CELL_SIZE, this.maze.height * this.CELL_SIZE)));
};

/**
* Method to create a player in the map
*/
Rezurection.World.prototype.createPlayer = function () {
    var player = new Rezurection.PlayerSprite(this.game, new Rezurection.Case(1, 1), new Rezurection.PlayerController(this, this.createWeapons()));
    this.objects.add(player);
    player.onDied.add(this.playerDied, this)
    this.game.camera.follow(player);
}

/**
* Method to change tint floor in the world
*/
Rezurection.World.prototype.changeFloorTint = function () {
    this.i = 0;
    this.floor.tint = 0xFF2222;
    this.floor.update = function () {
        if(this.tint!=0xFFFFFF) this.tint += 0x001111;
    }
};

/**
* Method to creat weapons
* Return weapons
*/
Rezurection.World.prototype.createWeapons = function () {
    var weapons = [];
    for (var i = 0; i < Rezurection.Weapons.length; i++)
        weapons[Rezurection.Weapons[i].name] = new Rezurection.Weapons[i].controller(this);
    return weapons;
};