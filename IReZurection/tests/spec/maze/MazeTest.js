describe("Maze Generator Test :", function () {
    var mazeDefinition, maze, cell, wall, path;

    beforeEach(function () {
        try{maze = new Rezurection.MazeCreator().create(5,10);}
        catch (ex) {console.log(ex);  }
        try{mazeDefinition = new Rezurection.MazeDefinition(10, 10, new Array());}
        catch (ex) { console.log(ex); }
        try{cell = new Rezurection.MazeCell(1, 1);}
        catch (ex) { console.log(ex); }
        try{ wall = new Rezurection.MazeWall(cell, new Rezurection.MazeCell(2, 2)); }
        catch (ex) { console.log(ex); }
        try{path = new Rezurection.MazePath(); }
        catch (ex) { console.log(ex); }
    });

    it("Instanciate MazeDefinition with null arguments", function () {
        expect(function () {
                new Rezurection.MazeDefinition(null);
        }).toThrowError("MazeDefinition arguments cannot be null");
    });

    it("Test MazeDefinition return MazeCreator properties height", function () {
        expect(maze.height).toEqual(5);
    });

    it("Test MazeDefinition return MazeCreator properties height", function () {
        expect(maze.width).toEqual(10);
    });

    it("Test MazeDefinition return MazeCreator properties closedWalls", function () {
        expect(maze.closedWalls instanceof Array).toBeTruthy;
        expect(maze.closedWalls.length).toEqual((maze.height - 1) * (maze.width - 1));
    });

    it("Test creat MazeCreator.create() return an instance of MazeDefinition", function () {
        expect(maze instanceof Rezurection.MazeDefinition).toBeTruthy;
    });

    it("Test creat new MazeCreator return an instance of MazeCreator", function () {
        expect(new Rezurection.MazeCreator instanceof Rezurection.MazeCreator).toBeTruthy;
    });

    it("Instanciate a MazeCell with null arguments", function () {
        try {
            expect(function () {
                new Rezurection.MazeCell(null);
            }).toThrowError("MazeCell arguments cannot be null");
        }
        catch (ex) {
            console.log(ex);
        }
    });

    it("Test MazeCell properties row", function () {
        expect(cell.row).toEqual(1);
    });

    it("Test MazeCell properties col", function () {
        expect(cell.col).toEqual(1);
    });

    it("Instanciate MazeWall with null arguments", function () {
        expect(function () {
            new Rezurection.MazeWall(null);
        }).toThrowError("MazeWall arguments cannot be null");
    });

    it("Test MazeWall properties cell1", function () {
        expect(wall.cell1 instanceof Rezurection.MazeCell).toBeTruthy;
    });

    it("Test MazeWall properties cell2", function () {
        expect(wall.cell2 instanceof Rezurection.MazeCell).toBeTruthy;
    });

    it("Test MazePath addCell methode", function () {
        expect(function () {
            path.addCell(null);
        }).toThrowError("Argument hase to be an instance of MazeCell");
    });

    it("Test MazePath getCell methode", function () {
        expect(function () {
            path.getCell(null);
        }).toThrowError("Index out of range.");
    });

    it("Test MazePath lenght methode", function () {
        expect(path.length()).toEqual(0);
    });
    
    it("Test MazePath lenght methode", function () {
        expect(path.length()).toEqual(0);
    });

});
