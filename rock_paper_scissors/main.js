const ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors";

function getComputerChoice() {
    let possible_choices = [ROCK, PAPER, SCISSORS];
    return possible_choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice){
    if (playerChoice == computerChoice) {
        return 0; // It's a tie
    }
    if ((playerChoice == ROCK && computerChoice == SCISSORS) ||
        (playerChoice == SCISSORS && computerChoice == PAPER) ||
        (playerChoice == PAPER && computerChoice == ROCK)){
        return 1; // Player wins
    }
    return -1; // Computer wins
}

function getResult(playerScore, computerScore){
    if (playerScore > computerScore) {
        return "You win! Congratulations!";
    }
    return "Computer wins.";
}

function main(){
    let playerScore = 0;
    let computerScore = 0;
    let isGameOver = false;

    const optionsImages = document.querySelectorAll("#optionsContainer img");
    const roundResultDisplay = document.querySelector("#roundResult");
    const scoreDisplay = document.querySelector("#score");
    const gameResultDisplay = document.querySelector("#gameResult");
    const buttonNewGame = document.querySelector("#buttonNewGame");

    optionsImages.forEach(function (optionImage) {
        optionImage.addEventListener("click", function (event) {
            if (isGameOver){
                return;
            }
            let playerChoice = event.target.title;
            let computerChoice = getComputerChoice();

            switch (playRound(playerChoice, computerChoice)) {
                case 0:
                    roundResultDisplay.textContent = `It's a tie! You both chose ${playerChoice}.`;
                    break;
                case 1:
                    roundResultDisplay.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
                    playerScore++;
                    break;
                case -1:
                    roundResultDisplay.textContent = `You lose... ${computerChoice} beats ${playerChoice}.`;
                    computerScore++;
                    break;
            }
            scoreDisplay.textContent = `Score: [You] ${playerScore} - ${computerScore} [Computer]`;

            if (playerScore < 5 && computerScore < 5) {
                return;
            }
            isGameOver = true;
            gameResultDisplay.textContent = `Game over: ${getResult(playerScore, computerScore)}`;
        });
    });

    buttonNewGame.addEventListener("click", function () {
        playerScore = 0;
        computerScore = 0;
        isGameOver = false;
        roundResultDisplay.textContent = "";
        scoreDisplay.textContent = `Score: [You] ${playerScore} - ${computerScore} [Computer]`;
        gameResultDisplay.textContent = "";
    });
}

main();