const prompt = require('prompt-sync')();

function createPlayer() {
    let score = 0;

    return {
        getScore: function() {
            return score;
        },
        increaseScore: function() {
            score++;
        },
        getInput: function() {
           return prompt("Choose a square 0-8"); 
        }
    }
}

function createBoard() {
    let defaultBoard = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    return defaultBoard;
}

function turnCount() {
    let currentTurn = 1;

    return {
        getTurn: function() {
            return currentTurn;
        },
        increaseTurn: function() {
            turn++;
        }
    }
}

function checkWin(gameBoard, player) {
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            return true;
        }
    }

    return false;
}

function startGame() {
    let gameBoard = createBoard();
    let playerOne = createPlayer();
    let playerTwo = createPlayer();
    let turn = turnCount();
    let currentMarker = '';

    if (turn % 2 !== 0) {
        currentMarker = 'X'
    } else {
        currentMarker = 'O'
    }
    
    while ((playerOne.getScore < 4) && (playerTwo.getScore < 4)) {

    }

}
