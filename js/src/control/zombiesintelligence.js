var Rezurection = Rezurection || {};

Rezurection.ZombiesIntelligence = function (world, refreshDelay) {

    if (Rezurection.DEBUG) {
        if (!(world instanceof Rezurection.World))
            throw new TypeError("Argument world has to be an instance of Rezurection.World");

        if (typeof refreshDelay != "number")
            throw new TypeError("Argument refreshDelay has to ba a number.");
    }

    this.zombies = world.objects.getZombies();
    this.players = world.objects.getPlayers();
    this.pathFinder = new Rezurection.PathFinder(world.maze);

    this.world = world;

    this.zombieIndex = 0;
    this.lastTime = game.time.time;
    this.refreshDelay = refreshDelay;
};

Rezurection.ZombiesIntelligence.prototype.shortestPath = function (zombie) {
    var result = null,
        currentPath,
        resultLength = Number.MAX_SAFE_INTEGER;

    var from = zombie.controller.case;

    for (var i = 0; i < this.players.total; i++) {
        var to = Rezurection.Case.FromWorldPosition(this.players.getAt(i).position);

        currentPath = this.pathFinder.getPath(from.x, from.y, to.x, to.y);

        if (currentPath.length < resultLength) {
            result = currentPath;
            resultLength = result.length;
        }
    }

    return result;
};

Rezurection.ZombiesIntelligence.prototype.update = function () {

    var currentTime = game.time.time;

    if (currentTime - this.lastTime > this.refreshDelay) {
        this.lastTime = currentTime;

        var zombie = this.zombies.getAt(this.zombieIndex);

        if (this.zombies.countLiving() > 0)
            while (!zombie.alive)
                zombie = this.zombies.getAt(++this.zombieIndex % this.zombies.length);

        var path = this.shortestPath(zombie);

        if (path.length < 15)
            zombie.controller.followPath(path);

        this.zombieIndex = (this.zombieIndex + 1) % this.zombies.length;
    }
};

Rezurection.ZombiesIntelligence.prototype.zombieMoved = function (oldCase, newCase) {
    if (oldCase != null)
        this.pathFinder.setCaseFree(oldCase);
    if (newCase != null)
        this.pathFinder.setCaseOccuped(newCase);
};

