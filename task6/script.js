(function () {
    const CELL = 20;
    const COUNT = 20;
    const INTERVAL = 150;

    const model = {
        snake: [],
        dir: { x: 1, y: 0 },
        nextDir: { x: 1, y: 0 },
        apple: null,
        score: 0,
        gameOver: false,

        reset: function () {
            model.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
            model.dir = { x: 1, y: 0 };
            model.nextDir = { x: 1, y: 0 };
            model.score = 0;
            model.gameOver = false;
            model.spawnApple();
        },

        isSnake: function (cell) {
            return model.snake.some(s => s.x === cell.x && s.y === cell.y);
        },

        spawnApple: function () {
            do {
                model.apple = {
                    x: Math.floor(Math.random() * COUNT),
                    y: Math.floor(Math.random() * COUNT)
                };
            } while (model.isSnake(model.apple));
        },

        checkCollision: function (head) {
            const outside = head.x < 0 || head.x >= COUNT || head.y < 0 || head.y >= COUNT;
            return outside || model.isSnake(head);
        },

        setDirection: function (x, y) {
            if (x === -model.dir.x && y === -model.dir.y) {
                return;
            }
            model.nextDir = { x: x, y: y };
        },

        moveSnake: function () {
            model.dir = model.nextDir;
            const head = {
                x: model.snake[0].x + model.dir.x,
                y: model.snake[0].y + model.dir.y
            };

            if (model.checkCollision(head)) {
                model.gameOver = true;
                return;
            }

            model.snake.unshift(head);

            if (head.x === model.apple.x && head.y === model.apple.y) {
                model.score++;
                model.spawnApple();
            } else {
                model.snake.pop();
            }
        }
    };

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const view = {
        draw: function () {
            ctx.fillStyle = "#f0f8ff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#e63946";
            ctx.fillRect(model.apple.x * CELL + 2, model.apple.y * CELL + 2, CELL - 4, CELL - 4);

            ctx.fillStyle = "#2a9d4f";
            model.snake.forEach(s => ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2));

            document.getElementById("score").textContent = "Счёт: " + model.score;
            document.getElementById("finalScore").textContent = "Ваш счёт: " + model.score;
            document.getElementById("gameOver").hidden = !model.gameOver;
        }
    };

    const controller = {
        lastMove: 0,
        frameId: null,

        update: function (time) {
            if (time - controller.lastMove >= INTERVAL) {
                model.moveSnake();
                controller.lastMove = time;
            }
        },

        loop: function (time) {
            controller.update(time);
            view.draw();

            if (!model.gameOver) {
                controller.frameId = requestAnimationFrame(controller.loop);
            }
        },

        start: function () {
            cancelAnimationFrame(controller.frameId);
            model.reset();
            controller.lastMove = performance.now();
            controller.frameId = requestAnimationFrame(controller.loop);
        }
    };

    const keys = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0]
    };

    document.addEventListener("keydown", function (event) {
        if (keys[event.key]) {
            event.preventDefault();
            model.setDirection(keys[event.key][0], keys[event.key][1]);
        }
    });

    document.getElementById("restartBtn").addEventListener("click", controller.start);

    controller.start();
})();
