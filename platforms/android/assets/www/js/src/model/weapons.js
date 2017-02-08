"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

Rezurection.Weapons = [];

Rezurection.Weapons.push({
    name: 'gun',
    image: 'gun',
    controller: Rezurection.Gun,
    price: 0
});

Rezurection.Weapons.push({
    name: 'lazergun',
    image: 'lazergun',
    controller: Rezurection.LazerGun,
    price: 2000
});

Rezurection.Weapons.push({
    name: 'shotgun',
    image: 'shotgun',
    controller: Rezurection.ShotGun,
    price: 4000
});