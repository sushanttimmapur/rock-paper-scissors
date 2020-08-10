const MAX_SCORE = 5;

let playerScore = 0;
let computerScore = 0;

// Restart button
const restartButton = document.createElement('button');
restartButton.textContent = 'Play again!';
restartButton.addEventListener('click', (e) => {
    // Replace Restart button with the player option buttons
    playerOptionsDiv.removeChild(restartButton);
    buttons.forEach(b => playerOptionsDiv.appendChild(b));
    
    // restart values and update html
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    playerSelectionDiv.textContent = '';
    playerSelectionDiv.style.cssText = null;
    computerSelectionDiv.textContent = '';
    computerSelectionDiv.style.cssText = null;
    vsDiv.textContent = '';
    roundContentDiv.textContent = '';
});

let gameResult = document.createElement('p');
gameResult.style.cssText = 'font-weight: bold; font-size: 1.25rem';

let playerOptionsDiv = document.querySelector('#player-options');
let playerSelectionDiv = document.querySelector('#player>.selection');
let playerScoreSpan = document.querySelector('#player>.score>span');
let computerSelectionDiv = document.querySelector('#computer>.selection');
let computerScoreSpan = document.querySelector('#computer>.score>span');
let vsDiv = document.querySelector('.vs');

let roundContentDiv = document.querySelector('#round-content');

const buttons = document.querySelectorAll('#player-options>button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let computerSelection = computerPlay();
        let playerSelection = e.srcElement.textContent.toLowerCase();

        let roundResult = playRound(playerSelection, computerSelection);

        if (roundResult.includes("Win")) {
            ++playerScore;
        } else if (roundResult.includes("Lose")) {
            ++computerScore;
        }

        // update html
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
        playerSelectionDiv.textContent = playerSelection;
        playerSelectionDiv.style.cssText = `
            background: url(images/${playerSelection}-p.png) no-repeat center;
            background-size: contain;
        `;
        playerSelectionDiv.classList.add('selectionStyle');
        computerSelectionDiv.textContent = computerSelection;
        computerSelectionDiv.style.cssText = `
            background: url(images/${computerSelection}-c.png) no-repeat center;
            background-size: contain;
        `;
        computerSelectionDiv.classList.add('selectionStyle');
        vsDiv.textContent = 'vs';
        roundContentDiv.textContent = roundResult;

        if (playerScore >= MAX_SCORE || computerScore >= MAX_SCORE) {
            if (playerScore > computerScore) {
                gameResult.textContent = "Congratulations! You've won.";
            } else if (playerScore < computerScore) {
                gameResult.textContent = "Computer wins!";
            }
        
            roundContentDiv.appendChild(gameResult);

            // Replace player option buttons with Restart button
            buttons.forEach(button => playerOptionsDiv.removeChild(button));
            playerOptionsDiv.appendChild(restartButton);
        }
    });
});

function computerPlay() {
    const OPTIONS = ['rock', 'paper', 'scissors'];
    return OPTIONS[Math.floor(Math.random() * (3 - 0)) + 0];
}

function playRound(playerSelection, computerSelection) {

    let result = '';

    switch(playerSelection) {
        case 'rock': 
            if (computerSelection === 'rock') {
                result = 'Tie!';
            } else if (computerSelection === 'paper') {
                result = 'You Lose! Paper beats Rock.';
            } else {
                result = 'You Win! Rock beats Scissors.';
            }
            break;
        case 'paper': 
            if (computerSelection === 'rock') {
                result = 'You Win! Paper beats Rock.';
            } else if (computerSelection === 'paper') {
                result = 'Tie!';
            } else {
                result = 'You Lose! Scissors beats Paper.';
            }
            break;
        case 'scissors':
            if (computerSelection === 'rock') {
                result = 'You Lose! Rock beats Scissors.';
            } else if (computerSelection === 'paper') {
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
