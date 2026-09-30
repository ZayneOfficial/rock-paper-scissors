const choices = ["rock", "paper", "scissors"];
const scoreState = {
  player: 0,
  cpu: 0,
  ties: 0,
};

const playerScoreEl = document.getElementById("player-score");
const cpuScoreEl = document.getElementById("cpu-score");
const tieScoreEl = document.getElementById("tie-score");
const resultTextEl = document.getElementById("result-text");
const playerPickEl = document.getElementById("player-pick");
const cpuPickEl = document.getElementById("cpu-pick");
const choiceButtons = document.querySelectorAll(".choice-btn");
const resetButton = document.getElementById("reset-score");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function updateScores() {
  playerScoreEl.textContent = String(scoreState.player);
  cpuScoreEl.textContent = String(scoreState.cpu);
  tieScoreEl.textContent = String(scoreState.ties);
}

function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function determineWinner(playerChoice, cpuChoice) {
  if (playerChoice === cpuChoice) {
    return "tie";
  }

  const wins = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return wins[playerChoice] === cpuChoice ? "player" : "cpu";
}

function playRound(playerChoice) {
  const cpuChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, cpuChoice);

  playerPickEl.textContent = formatChoice(playerChoice);
  cpuPickEl.textContent = formatChoice(cpuChoice);

  if (winner === "player") {
    scoreState.player += 1;
    resultTextEl.textContent = "You win this round!";
  } else if (winner === "cpu") {
    scoreState.cpu += 1;
    resultTextEl.textContent = "CPU wins this round!";
  } else {
    scoreState.ties += 1;
    resultTextEl.textContent = "It's a tie!";
  }

  updateScores();
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playRound(playerChoice);
  });
});

resetButton.addEventListener("click", () => {
  scoreState.player = 0;
  scoreState.cpu = 0;
  scoreState.ties = 0;
  playerPickEl.textContent = "—";
  cpuPickEl.textContent = "—";
  resultTextEl.textContent = "Score reset. Make a move to begin!";
  updateScores();
});

updateScores();
