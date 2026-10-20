import { GRID_SIZE, CELL_SIZE } from "./config.js";

export function createView() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreText = document.getElementById("score");
    const gameOverBox = document.getElementById("gameOver");
    const finalScore = document.getElementById("finalScore");
    const restartBtn = document.getElementById("restartBtn");

    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    function drawField() {
        ctx.fillStyle = "#f0f8ff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#dbe9f6";
        for (let i = 1; i < GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(canvas.width, i * CELL_SIZE);
            ctx.stroke();
        }
    }

    function drawApple(apple) {
        if (!apple) {
            return;
        }
        ctx.fillStyle = "#e63946";
        ctx.beginPath();
        ctx.arc(
            apple.x * CELL_SIZE + CELL_SIZE / 2,
            apple.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    function drawSnake(snake) {
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "#1d6b3a" : "#2a9d4f";
            ctx.fillRect(
                snake[i].x * CELL_SIZE + 1,
                snake[i].y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );
        }
    }

    function render(state) {
        drawField();
        drawApple(state.apple);
        drawSnake(state.snake);

        scoreText.textContent = "Счёт: " + state.score;
        finalScore.textContent = "Ваш счёт: " + state.score;
        gameOverBox.hidden = !state.gameOver;
    }

    function bindKeys(handler) {
        document.addEventListener("keydown", function (event) {
            if (event.key.indexOf("Arrow") === 0) {
                event.preventDefault();
                handler(event.key);
            }
        });
    }

    function bindRestart(handler) {
        restartBtn.addEventListener("click", handler);
    }

    return {
        render: render,
        bindKeys: bindKeys,
        bindRestart: bindRestart
    };
}
