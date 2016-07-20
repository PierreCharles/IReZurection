"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to ZombieIntelligence
 * Arguments : a world and a refreshDelay
 */
Rezurection.ZombiesIntelligence = function (world, refreshDelay) {

    if (Rezurection.DEBUG) {
        if (!(world instanceof Rezurection.World))
            throw new TypeError("Argument world has to be an instance of Rezurection.World");

        if (typeof refreshDelay != "number")
            throw new TypeError("Argument refreshDelay has to ba a number.");
    }

    this.zombiesGroup = world.objects.getZombies();
    this.nearZombies = null;
    this.farZombies = null;

    this.player;
    this.playerCell = null;
    this.playerCase = null;

    this.pathFinder = new Rezurection.PathFinder(world.maze);

    this.mazeResolver = new Rezurection.MazeResolver(world.maze);
    this.mazeResolver.forbideCell(0, 0);

    this.world = world;
    this.zombieIndex = -1;
    this.lastTime = this.world.game.time.time;
    this.refreshDelay = refreshDelay;
};

/**
 * Method to sort zombies
 * Arguments : a zombie
 */
Rezurection.ZombiesIntelligence.prototype.sortZombie = function (zombie) {
    var zombieCell = zombie.controller.case.toMazePosition();
    if (zombieCell.x == this.playerCell.x && zombieCell.y == this.playerCell.y)
        this.nearZombies.push(zombie);
    else if (this.world.game.math.distanceSq(zombieCell.x, zombieCell.y, this.playerCell.x, this.playerCell.y) < 16)
        this.farZombies.push({ zombie: zombie, cell: zombieCell });
};

/**
 * Method to update zombies far
 */
Rezurection.ZombiesIntelligence.prototype.updateFarZombies = function () {
    var currentTime = this.world.game.time.time;

    if (currentTime - this.lastTime > this.refreshDelay) {
        this.lastTime = currentTime;

        if (this.farZombies.length > 0) {
            this.zombieIndex = (this.zombieIndex + 1) % this.farZombies.length;

            var zombieInfos = this.farZombies[this.zombieIndex];

            zombieInfos.zombie.controller.followPath(null);

            var mazePath = this.mazeResolver.getPath(zombieInfos.cell.x, zombieInfos.cell.y, this.playerCell.x, this.playerCell.y, 4);

            if (mazePath != null) {
                var zombieCase = zombieInfos.zombie.controller.case;
                zombieInfos.zombie.controller.followPath(
                    this.pathFinder.getPath(
                        zombieCase.x, zombieCase.y,
                        this.playerCase.x, this.playerCase.y)
                    );
            }
        }
    }
};

/**
 * Method to update near zombies
 */
Rezurection.ZombiesIntelligence.prototype.updateNearZombies = function () {
    for (var i = 0; i < this.nearZombies.length; i++)
        this.nearZombies[i].controller.attack(this.player);
};

/**
 * Method update to zombie
 */
Rezurection.ZombiesIntelligence.prototype.update = function () {

    this.farZombies = [];
    this.nearZombies = [];

    this.player = this.world.objects.getPlayers().getAt(0);
    this.playerCase = new Rezurection.Case.FromWorldPosition(this.player.position);
    this.playerCell = this.playerCase.toMazePosition();

    this.zombiesGroup.forEachAlive(this.sortZombie, this);

    this.updateFarZombies();
    this.updateNearZombies();
};

/**
 * Method zombieMoved
 * Arguments : an oldCase and a newCase to move
 */
Rezurection.ZombiesIntelligence.prototype.zombieMoved = function (oldCase, newCase) {
    if (oldCase != null)
        this.pathFinder.setCaseFree(oldCase);
    if (newCase != null)
        this.pathFinder.setCaseOccuped(newCase);
};

