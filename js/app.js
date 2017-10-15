//Constants
var constants = {
  PLAYER_X_START: 200,
  PLAYER_Y_START: 380,
  OBJECT_WIDTH: 50, //Enemy & player widths
  OBJECT_HEIGHT: 50, //Enemy & player heights
  VERTICAL_MOVEMENT: 83, //Player vertical movement
  HORIZONTAL_MOVEMENT: 101, //Player horizontal movement
  RIGHT_LIMIT: 400,
  BOTTOM_LIMIT: 380,
  FONT_COLOR: '#fff',
  FONT: '20px serif',
  OVERLAY: 'rgba(0,0,0,0.5)'
};

// Enemy class
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = constants.OBJECT_WIDTH;
    this.height = constants.OBJECT_HEIGHT;
};

// Parameter: dt, a time delta between ticks
// Multiplying any movement by the dt parameter
  // ensures the game runs at the same speed for
  // all computers.
Enemy.prototype.update = function(dt) {

    //Update Enemy location
    this.x += this.speed * dt;

    //Send Enemy back to the start when it reaches the edge of the canvas
    if(this.x > 500) {
      this.x = getRandomInt(-150, -100);
      this.speed = getRandomInt(50, 300);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class

var Player = function(x, y) {
  Enemy.apply(this, arguments);
  this.sprite = 'images/char-horn-girl.png';
};

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  //When the player goes beyond the left edge
  if(this.x < 0) {
    this.x = 0;
  }

  //When the player goes beyond the right edge
  if(this.x > constants.RIGHT_LIMIT) {
    this.x = constants.RIGHT_LIMIT;
  }

  //When the player goes beyond the bottom edge
  if(this.y > constants.BOTTOM_LIMIT) {
    this.y = constants.BOTTOM_LIMIT;
  }

  //Reset player's position when they reach the top
  if(this.y < 0) {
    this.reset();
    score.incrementScore();
  }
};

Player.prototype.reset = function() {
    this.x = constants.PLAYER_X_START;
    this.y = constants.PLAYER_Y_START;
};

Player.prototype.handleInput = function(allowedKeys) {
  switch(allowedKeys) {
    case 'left':
      this.x -= constants.HORIZONTAL_MOVEMENT;
      break;
    case 'up':
      this.y -= constants.VERTICAL_MOVEMENT;
      break;
    case 'right':
      this.x += constants.HORIZONTAL_MOVEMENT;
      break;
    case 'down':
      this.y += constants.VERTICAL_MOVEMENT;
      break;
  }
};

//Score class

var Score = function() {
  this.score = 0;
};

Score.prototype.render = function() {
  ctx.fillStyle = constants.OVERLAY;
  ctx.fillRect(0,540,505,45);
  ctx.fillStyle = constants.FONT_COLOR;
  ctx.font = constants.FONT;
  ctx.fillText('Score: ' + this.score, 400, 570)
};

Score.prototype.incrementScore = function() {
  this.score++;
};

Score.prototype.decrementScore = function() {
  this.score--;
};

//Instantiate objects
var allEnemies = [];
var enemy;
var enemyRow = [60, 143, 226]; //The y position for the rows of stones

enemyRow.forEach(function(y) {
  enemy = new Enemy(getRandomInt(-150, -1), y, getRandomInt(25, 300));
  allEnemies.push(enemy);
});

var player = new Player(constants.PLAYER_X_START, constants.PLAYER_Y_START);
var score = new Score();

//Helper functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
