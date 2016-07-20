"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor of PlayerData : informations about player
* Arguments : name, startLife
 * properties :
 * -> wallet : the player score coin
 * -> life : the life player
*/
Rezurection.PlayerData = function (name, startLife) {

    if (Rezurection.DEBUG) {
        if (name == null || startLife == null) throw new Error('PlayerData arguments cannot be null');
        if (startLife <= 0) throw new Error('Start life cannot be negative');
    }

    this.name = name;
    this.startLife = startLife;
    this.ownedWeapons = ['gun'];
    this.currentWeapon = 'gun';
    this.killedZombies = 0;
    this.wallet = 0;
};

Rezurection.PlayerData.prototype.addWallet = function (value) {
    if (Rezurection.DEBUG) {
        if (value < 0) throw new Error('Value cannot be negative');
    }
    this.wallet += value;
};

Rezurection.PlayerData.prototype.subWallet = function (value) {
    if (Rezurection.DEBUG) {
        if (value < 0) throw new Error('Value cannot be negative');
        if (this.wallet-value < 0) throw new Error('Cannot subdvide value to wallet');
    }
    this.wallet -= value;
};

Rezurection.PlayerData.prototype.addKilledZombies = function (value) {
    if (Rezurection.DEBUG) {
        if (value<0) throw new Error('Value cannot be negative');
    }
    this.killedZombies += value;
};