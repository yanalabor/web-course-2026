import { GameModel } from "./model.js";
import { GameView } from "./view.js";

const INTERVAL = 150;
export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.lastTime = 0;
    this.frameId = null;

    this.view.bindKeyPress(this.handleKey.bind(this));
    this.view.bindRestart(this.start.bind(this));
  }

  start() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.model.reset();
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  handleKey(key) {
    const keysMap = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0]
    };
    const [x, y] = keysMap[key];
    this.model.setDirection(x, y);
  }

  loop(currentTime) {
    const state = this.model.getState();

    if (state.gameOver) {
      this.view.render(state);
      this.frameId = null;
      return;
    }

    this.frameId = requestAnimationFrame(this.loop.bind(this));

    if (currentTime - this.lastTime < INTERVAL) return;
    this.lastTime = currentTime - ((currentTime - this.lastTime) % INTERVAL);

    this.model.moveSnake();
    this.view.render(this.model.getState());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const model = new GameModel();
  const view = new GameView();
  const controller = new GameController(model, view);
  controller.start();
});
