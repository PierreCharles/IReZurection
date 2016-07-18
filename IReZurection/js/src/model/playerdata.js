var Rezurection = Rezurection || {};

Rezurection.PlayerData = function (name, life) {
    this.name = name;
    this.life = life;
    this.weapons = ['gun'];
    this.KilledZombies = 0;
    var wallet = 0;

    Object.defineProperty(this, 'score', {
        get: function () { return wallet; },
        set: function (value) { wallet += value; console.log(wallet);}
    });

};