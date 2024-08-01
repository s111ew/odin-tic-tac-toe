function createBoard() {
    let board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    return {
        getBoard: function() {
            return board;
        }
    }
}

function createPlayer() {
    let score = 0;

    return {
        getScore: function() {
            return score;
        },
        increaseScore: function() {
            score++;
        },
    }
}

function startGame() {
    const tiles = document.querySelectorAll(".tile>span");
    let gameBoard = createBoard();
    let board = gameBoard.getBoard();

    tiles.forEach((tile, index) => {
        tile.textContent = board[index];
    })

    const playerOne = createPlayer();
    const playerTwo = createPlayer();

    playerOneGo();
}

function playerOneGo() {

}



startGame();



