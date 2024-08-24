// initialise variables
let playerText = document.getElementById('player');
let restartButton = document.getElementById('reset');
const boxes = document.querySelectorAll('.box');
let spaces = Array(9).fill(null);
const X_TEXT = 'X';
const O_TEXT = 'O';
let currentPlayer = X_TEXT;
let gameWon = false;

// start game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

// box clicked function
function boxClicked(e){
    let id = e.target.id;
    // check if space is empty and game is not won
    if (!spaces[id] && !gameWon){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        // check if game is won
        if (checkWinner()){
            playerText.innerText = "Player " + currentPlayer + " has won!";
            boxes.forEach(box => box.classList.add('no-hover'));
            return;
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        playerText.innerText = "Player " + currentPlayer + "'s turn";
    }
    
    // check if game is a draw
    if (checkDraw()){
        playerText.innerText = "It's a draw!";
        boxes.forEach(box => box.classList.add('no-hover'));
    }
};

// game is won function
function checkWinner(){
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    // check if any of the winning combinations are met
    winningCombinations.forEach(winningCombo => {
        const [a, b, c] = winningCombo;
        if ((spaces[a] != null) && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])){
            gameWon = true;
            document.getElementById(a).classList.add('strike-through');
            document.getElementById(b).classList.add('strike-through');
            document.getElementById(c).classList.add('strike-through');
        }
    })
    return gameWon;
}

// check if game is a draw
function checkDraw(){
    return spaces.every(space => space != null);
}

// reset button
restartButton.addEventListener('click', restartGame);

// restart game function
function restartGame(){
    spaces = Array(9).fill(null); 
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('strike-through');
        box.classList.remove('no-hover');
    });
    currentPlayer = X_TEXT;
    playerText.innerText = "Player " + currentPlayer + "'s turn";
    gameWon = false;
}

// start game
startGame();
