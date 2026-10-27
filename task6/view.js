const CELL_SIZE = 20; // Каждая клетка по 20px

export class GameView {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.scoreEl = document.getElementById("score");
        this.overEl = document.getElementById("gameOver");
        this.finalScoreEl = document.getElementById("finalScore");
        this.restartBtn = document.getElementById("restartBtn");
    }

    render(state) {
        this.canvas.width = state.gridSize * CELL_SIZE;
        this.canvas.height = state.gridSize * CELL_SIZE;

        this.ctx.fillStyle = "#f0f8ff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#e63946";
        this.ctx.fillRect(state.apple.x * CELL_SIZE + 2, state.apple.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);

        this.ctx.fillStyle = "#2a9d4f";
        state.snake.forEach(s => {
            this.ctx.fillRect(s.x * CELL_SIZE + 1, s.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        });

        this.scoreEl.textContent = "Счёт: " + state.score;

        if (state.gameOver) {
            this.finalScoreEl.textContent = "Ваш счёт: " + state.score;
            this.overEl.removeAttribute("hidden");
        } else {
            this.overEl.setAttribute("hidden", "true");
        }
    }

    bindKeyPress(handler) {
        window.addEventListener("keydown", e => {
            const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
            if (keys.includes(e.key)) {
                e.preventDefault();
                handler(e.key);
            }
        });
    }

    bindRestart(handler) {
        this.restartBtn.addEventListener("click", handler);
    }
}
