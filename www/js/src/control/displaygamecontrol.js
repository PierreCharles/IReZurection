"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
 * Constructor to DisplayGameControl -> Phaser.PlugIn
 * Arguments : a game and a parent
 */
Rezurection.DisplayGameControl = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);
}

Rezurection.DisplayGameControl.prototype = Object.create(Phaser.Plugin.prototype);
Rezurection.DisplayGameControl.prototype.constructor = Rezurection.DisplayGameControl;

/**
 * Method to create all weapon button
 * Arguments : a position and a reference image weapon
 * return a button
 */
Rezurection.DisplayGameControl.prototype.createButton = function (x, y, weapon) {
    var button = new Phaser.Button(this.game, x, y, weapon.image);
    button.onInputUp.add(this.weaponChoosed, this, 0, weapon);
    if (this.playerData.ownedWeapons.indexOf(weapon.name) == -1)
    {
        button.tint = 0X112233;
    }
    return button;
};


/**
 * Method to init this plugin
 * Arguments : a player data and a world
 */
Rezurection.DisplayGameControl.prototype.init = function (playerData, world) {

    if (Rezurection.DEBUG)
    {
        if (!(playerData instanceof Rezurection.PlayerData))
        {
            throw new Error("Argument playerData has to be an instance of Rezurection.PlayerData");
        }
    }

    console.log("width : "+this.game.width + " height : "+this.game.height);

    this.max = playerData.startLife;
    this.world = world;
    this.playerData = playerData;
    this.buttons = [];
    this.sprite = this.world.objects.getPlayers().getChildAt(0);
    this.oldHealth = this.sprite.health;

    if (Rezurection.SoundPlayer.getInstance(this.game).soundOn)
    {
        this.key = 'soundon';
    }
    else
    {
        this.key = 'soundoff';
    }

    this.lifeBar_width = 250;
    this.lifeBar_height = 15;
    this.margin_right = 60;
    this.margin_right_top = 70;
    this.textSize = 40;
    this.margin_left = 50;
    this.margin_left_top = 10;
    this.margin_button = 10;
    this.margin_left_button = 80;
    this.margin_top_button = 80;
    this.button_position = { x: this.game.width - this.margin_left_button, y: this.margin_top_button };
    this.button_size = { x: 60, y : 60};

    this.text = this.game.add.text(this.game.width / 2, this.game.height / 2, "", { font: "50px Arial", fill: "#FFFFFF", align: "center" });
    this.text.exists = false;
    this.text.anchor.set(0.5);
    this.game.stage.addChild(this.text);

    this.text.update = function() {
        this.alpha -= 0.02;
        if (this.alpha <= 0) {
            this.exists = false;
        }
    };
   
    for (var i = 0; i < Rezurection.Weapons.length; i++)
    {
        this.buttons.push(this.createButton(this.button_position.x, this.button_position.y + (this.button_size.y + this.margin_button) * i, Rezurection.Weapons[i]));
        this.game.stage.addChild(this.buttons[i]);
    }

    this.levelText = this.game.add.bitmapText(this.margin_left/2, this.margin_left_top, 'font', this.world.level.toString(), this.textSize);
    this.bitmapData = this.game.make.bitmapData(this.lifeBar_width, this.lifeBar_height);
    this.image = this.game.add.image(this.margin_left, this.lifeBar_height, this.bitmapData);
    this.score = this.game.add.bitmapText(this.margin_left/2, (this.margin_left_top*2)+this.levelText.height, 'font', this.playerData.wallet, this.textSize);

    this.sound = this.game.add.existing(new Phaser.Button(this.game, this.game.width - (this.margin_right + 50), this.margin_button, this.key, function () { this.soundChange(); }, this));
    this.pause = this.game.add.existing(new Phaser.Button(this.game, this.game.width - this.margin_right,this.margin_button, 'pause', function () { this.game.paused = true; }, this));

    this.valueChanged(this.max);

    [this.score,this.levelText,this.pause,this.image, this.sound].forEach(
        function (element) {
            this.game.stage.addChild(element);
        }, this);
    this.game.scale.onSizeChange.add(this.resize, this);
};

/**
 * Method to choose a weapon in the list
 * Arguments : a button selected, a pointer, unused and weapon
 */
Rezurection.DisplayGameControl.prototype.weaponChoosed = function (button, pointer, unused, weapon) {

    if (this.playerData.ownedWeapons.indexOf(weapon.name) == -1) {
        if (this.playerData.wallet >= weapon.price) {
            this.playerData.subWallet(weapon.price);
            this.playerData.ownedWeapons.push(weapon.name);
            this.playerData.currentWeapon = weapon.name;
            this.displayMessage(weapon.name);
            button.tint = 0xFFFFFF;
        }
        else {
            this.displayMessage(weapon.name+" : "+weapon.price+" coins");
        }
    }
    else if (this.playerData.ownedWeapons.indexOf(weapon.name) != -1){
        this.playerData.currentWeapon = weapon.name;
        this.displayMessage(weapon.name);
    }

};

/**
 * Method to rezise and repositionning display
 */
Rezurection.DisplayGameControl.prototype.resize = function () {

    this.text.position = {
        x:this.game.width/2,
        y: this.game.height/2
    };
    this.image.position = {
        x: this.margin_left + this.levelText.width,
        y: this.lifeBar_height
    };
    this.pause.position = {
        x: this.game.width - this.margin_right,
        y: this.margin_button
    };
    this.sound.position = {
        x: this.game.width - (this.margin_right + 50),
        y: this.margin_button
    };

    for (var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].position.setTo(this.game.width - this.margin_left_button, this.margin_top_button + (this.button_size.y + this.margin_button) * i);
    }
};

/**
 * Method to change life value bar
 * Arguments : a life
 */
Rezurection.DisplayGameControl.prototype.valueChanged = function (life) {
    this.bitmapData.clear();
    this.bitmapData.rect(
        0, 0,
        life / this.max * this.lifeBar_width,
        this.lifeBar_height,
        Phaser.Color.getWebRGB(Phaser.Color.interpolateColor(
               0xFF0000, 0x00FF00, 100, Math.floor(life / this.max * 100))));
    this.bitmapData.dirty = true;
};

/**
 * Method to update display plugin
 */
Rezurection.DisplayGameControl.prototype.update = function () {
    if (this.sprite.health != this.oldHealth)
    {
        this.oldHealth = this.sprite.health;
        this.valueChanged(this.sprite.health);
    }
    this.levelText.updateText();
    this.score.setText(this.playerData.wallet);
};


/**
 * Method to destroy graphics elements
 */
Rezurection.DisplayGameControl.prototype.destroy = function () {
    for (var i = 0; i < this.buttons.length; i++)
    {
        this.game.stage.removeChild(this.buttons[i]);
        this.buttons[i].destroy();
    }
    [this.image, this.score, this.levelText, this.text, this.sound, this.pause].forEach(
        function (element) {
            this.game.stage.removeChild(element);
            element.destroy();
        }, this);
    this.game.scale.onSizeChange.remove(this.resize, this);
};

/**
 * Method to display a message
 * Argument : a message to display
 */
Rezurection.DisplayGameControl.prototype.displayMessage = function (message) {
    this.text.exists = true;
    this.text.setText(message);
    this.text.alpha = 1;
};

/**
 * Method to change de sound state
 */
Rezurection.DisplayGameControl.prototype.soundChange = function () {
    Rezurection.SoundPlayer.getInstance(this.game).soundOn = !Rezurection.SoundPlayer.getInstance(this.game).soundOn;
    if (Rezurection.SoundPlayer.getInstance(this.game).soundOn)
    {
        this.sound.loadTexture('soundon');
        this.displayMessage("Sound on");
    }
    else
    {
        this.sound.loadTexture('soundoff');
        this.displayMessage("Sound off");
    }
};