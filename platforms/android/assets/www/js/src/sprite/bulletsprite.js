"use strict";

/**
 * Namespace Rezurection
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

var Rezurection = Rezurection || {};

/**
* Constructor to BulletSprite -> GenereicSprite
* Arguments : game, skinKey and a controller
*/
Rezurection.BulletSprite = function (game, skinKey, controller) {

    if (Rezurection.DEBUG) {
        if (game==null || skinKey==null)
            throw new TypeError("Argument cannot be null.");
    }

    Rezurection.GenericSprite.call(this, game, true, new Rezurection.Case(-10, -10), skinKey, controller);

    this.exploding = false;
};

Rezurection.BulletSprite.prototype = Object.create(Rezurection.GenericSprite.prototype);
Rezurection.BulletSprite.prototype.constructor = Rezurection.BulletSprite;
