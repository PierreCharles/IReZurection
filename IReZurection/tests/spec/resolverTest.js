describe("Resolver", function () {
    var player;
    var maze;

    beforeEach(function () {
        maze = new Maze.Creator().create(10, 10);
        resolver = new Resolver(maze);
    });

    it("ResolverTest : resolver instanciate with null argument", function () {
        expect(function () {
            new Resolver(null);
        }).toThrowError("Resolver need to maze for instanciate object");
    });

    it("ResolverTest : resolver instanciate without argument", function () {
        expect(function () {
            new Resolver();
        }).toThrowError("Resolver need to maze for instanciate object");
    });

    it("ResolverTest : instanciate property test Resolver", function () {
        expect(resolver.height).toEqual(maze.height);
        expect(resolver.width).toEqual(maze.width);
        resolver.generate(new Position(0,0), new Position(9,9));
    });

    it("ResolverTest : findPath test arguments have been called with generate method", function () {
        spyOn(resolver, 'findPath');
        resolver.generate(new Position(0, 0), new Position(9, 9));
        expect(resolver.findPath).toHaveBeenCalledWith(new Position(0,0), new Position(9,9));
    });

    it("ResolverTest : findPath test arguments have been called", function () {
        spyOn(resolver, 'findPath');
        resolver.findPath(new Position(0, 0), new Position(9, 9));
        expect(resolver.findPath).toHaveBeenCalledWith(new Position(0, 0), new Position(9, 9));
    });

    it("ResolverTest : findPath test one null arguments", function () {
        expect(resolver.findPath(null)).toEqual(false);
    });

    it("ResolverTest : findPath test two null arguments", function () {
        expect(resolver.findPath(null, null)).toEqual(false);
    });

    it("ResolverTest : findPath test empty arguments", function () {
        expect(resolver.findPath()).toEqual(false);
    });

    it("ResolverTest : findPath test Position and null argument", function () {
        expect(resolver.findPath(new Position(0, 0), null)).toEqual(false);
    });

    it("ResolverTest : findPath test null and Position argument", function () {
        expect(resolver.findPath(null, new Position(0, 0))).toEqual(false);
    });

    //it("ResolverTest : findPath test null and Position argument", function () {
    //    var tmp = resolver.generate();
    //    expect(tmp instanceof Array).toEqual(true);
    //});


});