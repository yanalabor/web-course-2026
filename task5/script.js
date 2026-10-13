(function () {
    "use strict";

    const state = {
        sequence: [],
        playerStep: 0,
        level: 0,
        isShowingSequence: false,

        reset() {
            this.sequence = [];
            this.level = 0;
            this.playerStep = 0;
            this.isShowingSequence = false;
        },

        incrementLevel() {
            this.level++;
            this.playerStep = 0;
        },

        addRandomStep() {
            const randomIndex = Math.floor(Math.random() * 4);
            this.sequence.push(randomIndex);
        }
    };

    const ui = {
        pads: [
            document.getElementById("pad0"),
            document.getElementById("pad1"),
            document.getElementById("pad2"),
            document.getElementById("pad3")
        ],
        startBtn: document.getElementById("startBtn"),
        levelText: document.getElementById("levelText"),
        messageDiv: document.getElementById("message"),

        updateLevel(level) {
            this.levelText.textContent = `Уровень: ${level}`;
        },

        clearMessage() {
            this.messageDiv.textContent = "";
        },

        showGameOver(level) {
            this.messageDiv.textContent = `Вы дошли до уровня ${level}`;
            this.startBtn.disabled = false;
        },

        setStartButtonDisabled(disabled) {
            this.startBtn.disabled = disabled;
        },

        lightPad(index) {
            const pad = this.pads[index];
            if (!pad) return;
            
            pad.classList.add("active");
            setTimeout(() => {
                pad.classList.remove("active");
            }, 400);
        }
    };

    const controller = {
        startGame() {
            ui.setStartButtonDisabled(true);
            state.reset();
            ui.clearMessage();
            this.nextRound();
        },

        nextRound() {
            state.incrementLevel();
            ui.updateLevel(state.level);
            state.addRandomStep();
            this.showSequence();
        },

        showSequence() {
            state.isShowingSequence = true;
            ui.clearMessage();

            let i = 0;
            const showNextStep = () => {
                if (i < state.sequence.length) {
                    ui.lightPad(state.sequence[i]);
                    i++;
                    setTimeout(showNextStep, 700);
                } else {
                    state.isShowingSequence = false;
                }
            };

            setTimeout(showNextStep, 700);
        },

        handlePadClick(index) {
            if (state.isShowingSequence) return;

            ui.lightPad(index);

            if (index === state.sequence[state.playerStep]) {
                state.playerStep++;

                if (state.playerStep === state.sequence.length) {
                    setTimeout(() => this.nextRound(), 700);
                }
            } else {
                this.endGame();
            }
        },

        endGame() {
            state.isShowingSequence = false;
            ui.showGameOver(state.level);
        },

        init() {
            // Вешаем обработчики событий
            ui.pads.forEach((pad) => {
                pad.addEventListener("click", () => {
                    const index = Number(pad.dataset.index);
                    this.handlePadClick(index);
                });
            });

            ui.startBtn.addEventListener("click", () => {
                this.startGame();
            });
        }
    };
    controller.init();
})();
