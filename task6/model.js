import { GRID_SIZE } from "./config.js";

export function createModel() {
  let snake = [];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let apple = null;
  let score = 0;
  let gameOver = false;

  function isSnakeCell(x, y) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        return true;
      }
    }
    return false;
  }

  function spawnApple() {
    const freeCells = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!isSnakeCell(x, y)) {
          freeCells.push({ x: x, y: y });
        }
      }
    }

    if (freeCells.length === 0) {
      apple = null;
      gameOver = true;
      return;
    }

    const randomIndex = Math.floor(Math.random() * freeCells.length);
    apple = freeCells[randomIndex];
  }

  function checkCollision(head) {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return isSnakeCell(head.x, head.y);
  }

  function setDirection(x, y) {
    if (x === -direction.x && y === -direction.y) {
      return;
    }
    nextDirection = { x: x, y: y };
  }

  function moveSnake() {
    direction = nextDirection;

    const head = snake[0];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };

    if (checkCollision(newHead)) {
      gameOver = true;
      return;
    }

    snake.unshift(newHead);

    if (apple && newHead.x === apple.x && newHead.y === apple.y) {
      score = score + 1;
      spawnApple();
    } else {
      snake.pop();
    }
  }

  function reset() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    spawnApple();
  }

  function getState() {
    return { snake: snake, apple: apple, score: score, gameOver: gameOver };
  }

  reset();

  return {
    reset: reset,
    setDirection: setDirection,
    moveSnake: moveSnake,
    getState: getState
  };
}
