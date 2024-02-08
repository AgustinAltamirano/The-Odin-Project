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
    if (playerScore == computerScore) {
        return "It's a tie!";
    }
    if (playerScore > computerScore) {
        return "You win! Congratulations!";
    }
    return "Computer wins.";
}

function playGame(){
    let playerScore = 0,
        computerScore = 0;
    console.log("Let's play!")
    
    for(let i = 0; i < 5; i++){
        let playerChoice = prompt(`Choose ${ROCK}, ${PAPER} or ${SCISSORS}: `).toLowerCase();
        let computerChoice = getComputerChoice();
        
        switch (playRound(playerChoice, computerChoice)) {
            case 0:
                console.log(`It's a tie! You both chose ${playerChoice}.`);
                break;
            case 1:
                console.log(`You win! ${playerChoice} beats ${computerChoice}.`);
                playerScore++;
                break;
            case -1:
                console.log(`You lose... ${computerChoice} beats ${playerChoice}.`);
                computerScore++;
                break;
        }
        console.log(`Game score: [You] ${playerScore} - ${computerScore} [Computer].`);
    }

    console.log(`Game over. ${getResult(playerScore, computerScore)}`);
    return;
}