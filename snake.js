var SIZE = {
   WIDTH: 20,
   HEIGHT: 20,
};

var SNAKE_SPEED = 300;

var $gameField;
var $gameTable
var snakeCoordX;
var snakeCoordY;
var interval;
var direction = 'top';
var snake = [];
var score = 0;

function prepareGameField() {
   $gameTable = document.createElement('table');
   $gameTable.classList.add('game-table');

   for (var i = 0; i < SIZE.HEIGHT; i++) {
      var $row = document.createElement('tr');

      for (var j = 0; j < SIZE.WIDTH; j++) {
         var $cell = document.createElement('td');
         $cell.classList.add('game-table-cell');

         $row.appendChild($cell);
      }

      $gameTable.appendChild($row);
   }

   $gameField.appendChild($gameTable);
}

function respawn() {
   snakeCoordX = Math.floor(SIZE.WIDTH / 2);
   snakeCoordY = Math.floor(SIZE.HEIGHT / 2);

   var $snakeHead = $gameTable.children[snakeCoordY].children[snakeCoordX];
   $snakeHead.classList.add('snake-unit');

   var $snakeTail = $gameTable.children[snakeCoordY + 1].children[snakeCoordX];
   $snakeTail.classList.add('snake-unit');

   snake.push($snakeTail);
   snake.push($snakeHead);
}

function inBounds() {
   return snakeCoordX >= 0 && snakeCoordX < SIZE.WIDTH && snakeCoordY >= 0 && snakeCoordY < SIZE.HEIGHT;
}

function gameOver() {
   alert('You loose');
   clearInterval(interval);
}

function isSnakeUnit(unit) {
   return snake.includes(unit);
}
// добавил изменения 68, 71, 75, 79 стр.
function move() {
   switch (direction) {
      case 'top':
         snakeCoordY--;
         if (snakeCoordY == -1) snakeCoordY += 20;         break;
      case 'bottom':
         snakeCoordY++;
         snakeCoordY = snakeCoordY % 20;
         break;
      case 'left':
         snakeCoordX--;
         if (snakeCoordX == -1) snakeCoordX += 20;
         break;
      case 'right':
         snakeCoordX++;
         snakeCoordX = snakeCoordX % 20;
         break;
   }

   if (!inBounds()) {
      gameOver();
      return;
   }

   var $newUnit = $gameTable.children[snakeCoordY].children[snakeCoordX];
   if (!isSnakeUnit($newUnit)) {
      $newUnit.classList.add('snake-unit');
      snake.push($newUnit);

      if (!isFood($newUnit)) {
         var $snakeRemoved = snake.shift();
         $snakeRemoved.classList.remove('snake-unit');
      }
   } else {
      gameOver();
   }
}

function isFood(unit) {
   if (unit.classList.contains('food-unit')) {
      unit.classList.remove('food-unit');
      score++;
      document.querySelector('#score').textContent = score;
      SNAKE_SPEED = 300 - score * 5;
      clearInterval(interval);
      interval = setInterval(move, SNAKE_SPEED);
      createFood();
      return true;
   } else {
      return false;
   }
}

function createFood() {
   while (true) {
      var foodX = Math.floor(Math.random() * SIZE.WIDTH);
      var foodY = Math.floor(Math.random() * SIZE.HEIGHT);

      var $foodCell = $gameTable.children[foodY].children[foodX];

      if (!snake.includes($foodCell)) {
         $foodCell.classList.add('food-unit');

         break;
      }
   }
}

function handleStartClick(event) {
   respawn();

   interval = setInterval(move, SNAKE_SPEED);
   createFood();
}

function handleRenewClick(event) {
   window.location.reload();
}

function handleDirectionChange(event) {
   switch (event.code) {
      case 'ArrowLeft':
         if (direction !== 'right') direction = 'left';
         break;
      case 'ArrowUp':
         if (direction !== 'bottom') direction = 'top';
         break;
      case 'ArrowRight':
         if (direction !== 'left') direction = 'right';
         break;
      case 'ArrowDown':
         if (direction !== 'top') direction = 'bottom';
         break;
   }
}

function init() {
   $gameField = document.querySelector('#snake-field');

   prepareGameField();

   document.querySelector('#snake-start').addEventListener('click', handleStartClick);
   document.querySelector('#snake-renew').addEventListener('click', handleRenewClick);

   window.addEventListener('keydown', handleDirectionChange);
}

window.addEventListener('load', init);
