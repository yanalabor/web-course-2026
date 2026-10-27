const GRID_SIZE = 20;

export class GameModel {
  constructor() {
    this.reset();
  }

  reset() {
    this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.score = 0;
    this.gameOver = false;
    this.spawnApple();
  }

  isSnakeCell(x, y) {
    return this.snake.some(s => s.x === x && s.y === y);
  }

  spawnApple() {
    const freeCells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!this.isSnakeCell(x, y)) {
          freeCells.push({ x, y });
        }
      }
    }
    if (freeCells.length === 0) {
      this.gameOver = true;
      return;
    }
    const randomIndex = Math.floor(Math.random() * freeCells.length);
    this.apple = freeCells[randomIndex];
  }

  setDirection(x, y) {
    if (x === -this.dir.x && y === -this.dir.y) return;
    this.nextDir = { x, y };
  }

  moveSnake() {
    if (this.gameOver) return;

    this.dir = this.nextDir;
    const head = { x: this.snake[0].x + this.dir.x, y: this.snake[0].y + this.dir.y };

    const hitWall = head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
    const hitSelf = this.isSnakeCell(head.x, head.y);

    if (hitWall || hitSelf) {
      this.gameOver = true;
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.apple.x && head.y === this.apple.y) {
      this.score++;
      this.spawnApple();
    } else {
      this.snake.pop();
    }
  }

  getState() {
    return { snake: this.snake, apple: this.apple, score: this.score, gameOver: this.gameOver, gridSize: GRID_SIZE };
  }
}
