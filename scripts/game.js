// Constants for the gbame
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const snakeLength = 5;

// Create the initial snake
var snake = [];
for (let i = snakeLength - 1; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}

// Set the initial direction for the snake
var direction = "right";

// Set the initial position for the food
var food = {
  x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
  y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
};

// Function to draw the snake and the food on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "blue" : "purple";
    ctx.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Function to move the snake
function move() {
  // Get the current position of the snake's head
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Update the position of the snake's head based on the direction
  if (direction === "right") headX++;
  else if (direction === "left") headX--;
  else if (direction === "up") headY--;
  else if (direction === "down") headY++;

  // Check if the snake has collided with the wall or itself
  if (headX < 0 || headY < 0 || headX >= canvas.width / gridSize || headY >= canvas.height / gridSize || checkCollision(headX, headY, snake)) {
    // Game over
    window.location.href = '../html/gameover.html'
    return;
  }

  // Check if the snake has eaten the food
  if (headX * gridSize === food.x && headY * gridSize === food.y) {
    // Generate a new piece of food
    food = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
    };
  } else {
    // Remove the tail of the snake
    snake.pop();
  }

  // Add a new head to the snake
  snake.unshift({ x: headX, y: headY });
}

// Function to check if the snake has collided with itself or the wall
function checkCollision(x, y, array) {
  for (let i = 0; i < array.length; i++)
if (array[i].x === x && array[i].y === y) return true;
  return false;
}

// Function to control the snake's movement
function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "right") direction = "left";
  else if (event.keyCode === 38 && direction !== "down") direction = "up";
  else if (event.keyCode === 39 && direction !== "left") direction = "right";
  else if (event.keyCode === 40 && direction !== "up") direction = "down";
}

// Event listener to listen for key presses
document.addEventListener("keydown", changeDirection);

// Set the game loop to run every 150 milliseconds
setInterval(function () {
  draw();
  move();
}, 150);