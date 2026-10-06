var secretNumber = "";
var attempts = 0;
var guesses = [];
var gameOver = false;

var guessInput = document.getElementById("guessInput");
var checkBtn = document.getElementById("checkBtn");
var newGameBtn = document.getElementById("newGameBtn");
var messageDiv = document.getElementById("message");
var attemptsSpan = document.getElementById("attemptsCount");
var historyList = document.getElementById("historyList");

function generateSecretNumber() {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var result = "";

    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * digits.length);
        result = result + digits[randomIndex];
        digits.splice(randomIndex, 1);
    }

    return result;
}

function isValidInput(value) {
    if (value.length !== 4) {
        return false;
    }

    for (var i = 0; i < value.length; i++) {
        var char = value[i];
        if (char < "0" || char > "9") {
            return false;
        }
    }

    for (var i = 0; i < value.length; i++) {
        for (var j = 0; j < value.length; j++) {
            if (i !== j && value[i] === value[j]) {
                return false;
            }
        }
    }

    return true;
}

function countBullsAndCows(secret, guess) {
    var bulls = 0;
    var cows = 0;
    var digitStatus = [];

    for (var i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            bulls = bulls + 1;
            digitStatus.push("bull");
        } else if (secret.indexOf(guess[i]) !== -1) {
            cows = cows + 1;
            digitStatus.push("cow");
        } else {
            digitStatus.push("miss");
        }
    }

    return { bulls: bulls, cows: cows, digitStatus: digitStatus };
}

function renderHistory() {
    historyList.innerHTML = "";

    for (var i = 0; i < guesses.length; i++) {
        var item = guesses[i];
        var li = document.createElement("li");

        for (var j = 0; j < item.guess.length; j++) {
            var digitSpan = document.createElement("span");
            digitSpan.textContent = item.guess[j];
            digitSpan.className = "digit digit-" + item.digitStatus[j];
            li.appendChild(digitSpan);
        }

        var resultSpan = document.createElement("span");
        resultSpan.className = "result-text";
        resultSpan.textContent = item.bulls + " быков, " + item.cows + " коров";
        li.appendChild(resultSpan);

        historyList.appendChild(li);
    }
}

function clearMessage() {
    messageDiv.textContent = "";
    messageDiv.className = "";
}

function startNewGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    guesses = [];
    gameOver = false;

    attemptsSpan.textContent = attempts;
    clearMessage();
    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;

    renderHistory();

    console.log("Загаданное число (для проверки): " + secretNumber);
}

guessInput.addEventListener("input", function () {
    clearMessage();
});

checkBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    var guess = guessInput.value;

    if (!isValidInput(guess)) {
        messageDiv.textContent = "Введи ровно 4 разные цифры!";
        messageDiv.className = "error";
        return;
    }

    attempts = attempts + 1;
    attemptsSpan.textContent = attempts;

    var result = countBullsAndCows(secretNumber, guess);

    guesses.push({
        guess: guess,
        bulls: result.bulls,
        cows: result.cows,
        digitStatus: result.digitStatus
    });

    renderHistory();
    clearMessage();

    if (result.bulls === 4) {
        messageDiv.textContent = "Победа! Угадано за " + attempts + " попыток";
        messageDiv.className = "win";
        gameOver = true;
        guessInput.disabled = true;
        checkBtn.disabled = true;
    }

    guessInput.value = "";
});

newGameBtn.addEventListener("click", function () {
    startNewGame();
});

startNewGame();
