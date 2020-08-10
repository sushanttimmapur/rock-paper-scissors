function computerPlay() {
    const OPTIONS = ['rock', 'paper', 'scissors'];
    return OPTIONS[Math.floor(Math.random() * (3 - 0)) + 0];
}

function playRound(playerSelection, computerSelection) {

    let result = '';

    switch(playerSelection) {
        case 'rock': 
            if(computerSelection === 'rock') {
                result = 'Tie!';
            } else if(computerSelection === 'paper') {
                result = 'You Lose! Paper beats Rock.';
            } else {
                result = 'You Win! Rock beats Scissors.';
            }
            break;
        case 'paper': 
            if(computerSelection === 'rock') {
                result = 'You Win! Paper beats Rock.';
            } else if(computerSelection === 'paper') {
                result = 'Tie!';
            } else {
                result = 'You Lose! Scissors beats Paper.';
            }
            break;
        case 'scissors':
            if(computerSelection === 'rock') {
                result = 'You Lose! Rock beats Scissors.';
            } else if(computerSelection === 'paper') {
                result = 'You Win! Scissors beats Paper.';
            } else {
                result = 'Tie!';
            }
            break;
        default:
            result = 'Something went wrong! Make sure you have written a valid option.';
    }
    return result;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for(let i = 1; i <= 5; i++) {
        const playerSelection = prompt("Write your selection (rock, paper, scissors):")?.toLowerCase();
        const computerSelection = computerPlay();

        let roundResult = playRound(playerSelection, computerSelection);

        console.log("Round " + i + ":");
        console.log(`Your selection: ${playerSelection} | Computer selection: ${computerSelection}`);
        console.log(roundResult);

        if(roundResult.includes("Win")) {
            ++playerScore;
        } else if(roundResult.includes("Lose")) {
            ++computerScore;
        }

        console.log(`Your score: ${playerScore} | Computer score: ${computerScore}`);
    }
    
    if(playerScore > computerScore) {
        console.log("Congratulations! You've won.");
    } else if(playerScore < computerScore) {
        console.log("Computer wins!");
    } else {
        console.log("Tie! Nobody wins.");
    }
}