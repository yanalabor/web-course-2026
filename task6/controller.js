import { MOVE_INTERVAL } from "./config.js";

export function createController(model, view) {
  let lastMoveTime = 0;
  let frameId = null;

  function update(currentTime) {
    if (model.getState().gameOver) {
      return;
    }

    const passed = currentTime - lastMoveTime;

    if (passed >= MOVE_INTERVAL) {
      model.moveSnake();
      lastMoveTime = currentTime - (passed % MOVE_INTERVAL);
    }
  }

  function draw() {
    view.render(model.getState());
  }

  function loop(currentTime) {
    update(currentTime);
    draw();

    if (model.getState().gameOver) {
      frameId = null;
    } else {
      frameId = requestAnimationFrame(loop);
    }
  }

  function handleKey(key) {
    if (key === "ArrowUp") {
      model.setDirection(0, -1);
    } else if (key === "ArrowDown") {
      model.setDirection(0, 1);
    } else if (key === "ArrowLeft") {
      model.setDirection(-1, 0);
    } else if (key === "ArrowRight") {
      model.setDirection(1, 0);
    }
  }

  function start() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }
    model.reset();
    lastMoveTime = performance.now();
    frameId = requestAnimationFrame(loop);
  }

  view.bindKeys(handleKey);
  view.bindRestart(start);

  return {
    start: start
  };
}
