var pads = [
    document.getElementById("pad0"),
    document.getElementById("pad1"),
    document.getElementById("pad2"),
    document.getElementById("pad3")
];

var startBtn = document.getElementById("startBtn");
var levelText = document.getElementById("levelText");
var messageDiv = document.getElementById("message");

var sequence = [];
var playerStep = 0;
var level = 0;
var isShowingSequence = false;

function addRandomStep() {
    var randomIndex = Math.floor(Math.random() * 4);
    sequence.push(randomIndex);
}

function lightPad(index) {
    pads[index].classList.add("active");
    setTimeout(function () {
        pads[index].classList.remove("active");
    }, 400);
}

function showSequence() {
    isShowingSequence = true;
    playerStep = 0;
    messageDiv.textContent = "";

    var i = 0;

    function showNextStep() {
        if (i < sequence.length) {
            lightPad(sequence[i]);
            i = i + 1;
            setTimeout(showNextStep, 700);
        } else {
            isShowingSequence = false;
        }
    }

    setTimeout(showNextStep, 700);
}

function startGame() {
    sequence = [];
    level = 0;
    levelText.textContent = "Уровень: " + level;
    messageDiv.textContent = "";
    nextRound();
}

function nextRound() {
    level = level + 1;
    levelText.textContent = "Уровень: " + level;
    addRandomStep();
    showSequence();
}

function endGame() {
    messageDiv.textContent = "Вы дошли до уровня " + level;
    startBtn.disabled = false;
    isShowingSequence = false;
}

function handlePadClick(index) {
    if (isShowingSequence) {
        return;
    }

    lightPad(index);

    if (index === sequence[playerStep]) {
        playerStep = playerStep + 1;

        if (playerStep === sequence.length) {
            setTimeout(nextRound, 700);
        }
    } else {
        endGame();
    }
}

pads.forEach(function (pad) {
    pad.addEventListener("click", function () {
        var index = Number(pad.dataset.index);
        handlePadClick(index);
    });
});

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    startGame();
});
