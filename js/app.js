
// Enemies our player must avoid
var Enemy = function(enemyPng,enemyPossibleY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xRange = [-150, 600];
    this.possibleY = enemyPossibleY;
    this.speedRange = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = enemyPng;
    this.reset();
}

Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.variableSpeed();

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    //var playerY = Player.yPostion();
    //console.log ("enemy", playerY);

    if (this.x > maxPos) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
}

Enemy.prototype.variableSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-boy.png';
    this.reset();
}

Player.prototype.update = function() {
    this.checkCollisions();
}


Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        // player is on water, remove an enemy and reset
        allEnemies.pop();
        this.reset();
    } else if (this.y >= 60 && this.y <= 300) {
        var playerSelf = this;
        // player is on road rows, check collisions
        // loop through each enemy - bugs and zombies
        allEnemies.forEach(function(enemy) {
            // is the bug on the same row as the player?
            if (enemy.y == playerSelf.y) {
                // is the bug on the player?
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    var enemyPossibleY = [60, 140];
                    var enemySpeedrange = [150, 500];
                    var bug7 = new Enemy('images/zombie-cat-girl.png', enemyPossibleY, enemySpeedrange);
                    enemySpeedrange = [50, 600];
                    enemyPossibleY = [60, 140, 220, 300];
                    var bug8 = new Enemy('images/zombie-char-horn-girl.png', enemyPossibleY, enemySpeedrange);
                    var enemies = allEnemies.push(bug7);
                    enemies = allEnemies.push(bug8);
                    playerSelf.reset();
                }
            }
        });
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug,
    enemies;
var allEnemies = [];
var enemyPossibleY = [60, 140 ,220, 300];
var enemySpeedrange = [150, 600];

for (i = 0; i < 6; i++) {
    bug = new Enemy('images/enemy-bug.png', enemyPossibleY, enemySpeedrange);
    enemies = allEnemies.push(bug);
}
//allEnemies = [bug];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


