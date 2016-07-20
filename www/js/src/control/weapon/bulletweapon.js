var Rezurection = Rezurection || {};

Rezurection.BulletWeapon = function (bullets, fireRate, bulletsLifespan, bulletsPerShot) {
    
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].setController(this);
    }

    this.bullets = bullets;
    this.timeBetweenShots = Math.floor(1000 / fireRate) || 1;
    this.bulletsLifespan = bulletsLifespan || 500;
    this.bulletsPerShot = bulletsPerShot || 1;
    this.lastShotTime = 0;
}

Rezurection.BulletWeapon.prototype.control = function (bullet) {
    
};

Rezurection.BulletWeapon.prototype.bulletIsDead = function (bullet) {
    return !bullet.alive;
};

Rezurection.BulletWeapon.prototype.getFirstDeadBullet = function () {
    return this.bullets.find(this.bulletIsDead);
}

Rezurection.BulletWeapon.prototype.countDeadBullets = function () {
    return this.bullets.filter(this.bulletIsDead).length;
};

Rezurection.BulletWeapon.prototype.bulletVelocity = function(direction){
    return { x: direction.x * 1000, y: direction.y * 1000 };
};

Rezurection.BulletWeapon.prototype.fire = function (position, direction) {
    
    var currentTime = Date.now();

    if (currentTime - this.lastShotTime < this.timeBetweenShots || this.countDeadBullets() < this.bulletsPerShot)
        return;

    this.lastShotTime = currentTime;

    for (var i = 0; i < this.bulletsPerShot; i++) {
        var bullet = this.getFirstDeadBullet();
        var velocity = this.bulletVelocity(direction);
        bullet.lifespan = this.bulletsLifespan;
        bullet.reset(position.x + direction.x * 20, position.y + direction.y * 20, velocity.x, velocity.y);
    }
}