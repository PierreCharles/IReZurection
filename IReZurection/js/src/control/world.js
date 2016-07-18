var Rezurection = Rezurection || {};

Rezurection.World = function(game, level, playerData){
    
    var mazeSize = 5 + Math.floor(level / 5);

    this.level = level;
    this.playerData = playerData;

    this.game = game;
    this.maze = Rezurection.Maze.create(5, mazeSize);
    this.objects = new Rezurection.ObjectContainer(this.game);
    this.collisions = new Rezurection.CollisionController(new Rezurection.CollisionDetector(this.game, this.objects), game, this);
    this.zombieIntelligence = new Rezurection.ZombiesIntelligence(this, 10);

    game.world.setBounds(
        0, 0,
        (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE,
        (this.maze.height * this.CELL_SIZE + 2) * this.CASE_SIZE
    );
    
    this.putFloor();
    this.putWalls();
    this.putCoins(100);
    this.putZombies(50);
    this.setExitDoor();

    //Test
    this.putBomb();
};

Rezurection.World.prototype.CASE_SIZE = 64;
Rezurection.World.prototype.CELL_SIZE = 5;

Rezurection.World.prototype.update = function () {
    this.collisions.check();
    this.zombieIntelligence.update();
    this.floor.position.x = this.game.camera.position.x - this.game.camera.width / 2;
    this.floor.position.y = this.game.camera.position.y - this.game.camera.height / 2;
    this.floor.tilePosition.x = -this.game.camera.x;
    this.floor.tilePosition.y = -this.game.camera.y;
};

/**
* Function to get an acceptable random case in the map
* return position (x, y)
*/
Rezurection.World.prototype.getAcceptableCase = function () {
    return new Rezurection.Case(
        Math.floor(Math.random() * this.maze.width) * this.CELL_SIZE + (Math.floor(Math.random() * (this.CELL_SIZE - 1)) + 1),
        Math.floor(Math.random() * this.maze.height) * this.CELL_SIZE + (Math.floor(Math.random() * (this.CELL_SIZE - 1)) + 1)
    );
}

Rezurection.World.prototype.putWalls = function () {

    this.maze.closedWalls.forEach(function (wall) {

        this.objects.add(
            wall.isVertical() ?
                new Rezurection.WallSprite(this.game, (wall.cell1.col * this.CELL_SIZE + this.CELL_SIZE) * this.CASE_SIZE, (wall.cell1.row * this.CELL_SIZE + 1) * this.CASE_SIZE, this.CASE_SIZE, this.CELL_SIZE * this.CASE_SIZE)
	    	:
	            new Rezurection.WallSprite(this.game, wall.cell1.col * this.CELL_SIZE * this.CASE_SIZE, (wall.cell1.row * this.CELL_SIZE + this.CELL_SIZE) * this.CASE_SIZE, (this.CELL_SIZE + 1) * this.CASE_SIZE, this.CASE_SIZE)
	        );
    }, this);

    this.objects.add(new Rezurection.WallSprite(this.game, 0, 0, (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE, this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, 0, (this.maze.height * this.CELL_SIZE + 1) * this.CASE_SIZE, (this.maze.width * this.CELL_SIZE + 2) * this.CASE_SIZE, this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, 0, this.CASE_SIZE, this.CASE_SIZE, this.maze.height * this.CELL_SIZE * this.CASE_SIZE));
    this.objects.add(new Rezurection.WallSprite(this.game, (this.maze.width * this.CELL_SIZE + 1) * this.CASE_SIZE, this.CASE_SIZE, this.CASE_SIZE, this.maze.height * this.CELL_SIZE * this.CASE_SIZE));
};

Rezurection.World.prototype.putFloor = function () {

    this.floor = new Phaser.TileSprite(
            this.game,
            0,
            0,
            this.game.camera.width,
            this.game.camera.height,
            'floor'
    );

    this.objects.add(this.floor);
};

Rezurection.World.prototype.putCoins = function (nbCoins) {
    for (var i = 0; i < nbCoins; i++)
        this.objects.add(new Rezurection.CoinSprite(this.game, this.getAcceptableCase()));
};

Rezurection.World.prototype.putZombies = function (nbZombies) {
    for (var i = 0; i < nbZombies; i++) {
        var zSprite = new Rezurection.ZombieSprite(this.game, this.getAcceptableCase(), 'zombie')
        this.objects.add(zSprite);
        new Rezurection.ZombieController(zSprite).moved.add(this.zombieIntelligence.zombieMoved, this.zombieIntelligence);
    }
};


Rezurection.World.prototype.putBomb = function () {
    this.objects.add(new Rezurection.BombSprite(this.game, new Rezurection.Case(2,1)));
};

Rezurection.World.prototype.setExitDoor = function () {
    this.objects.add(new Rezurection.DoorSprite(this.game, new Rezurection.Case(this.maze.width * this.CELL_SIZE, this.maze.height * this.CELL_SIZE)));
};