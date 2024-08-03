function addStartEvent() {
    const startButton = document.querySelector(".start-button");
    const tiles = document.querySelectorAll(".tile");
    startButton.addEventListener("click", () => {
        startButton.classList.remove("start-button");
        
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add("become-visible");
            }, index * 150);
        });
    });
}

function playGame() {

    function makePlayer() {
        let score = 0;

        return {
            getScore: function() {
                return score;
            },
            incrementScore: function() {
                score++;
            },
            resetScore: function() {
                score = 0;
            }
        }
    }

    function makeRoundCounter() {
        let round = 1;

        return {
            getRound: function() {
                return round;
            },
            incrementRound: function() {
                round++;
            }
        }
    }

    function checkWin(board) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function addTileEventListeners() {
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile, index) => {
            tile.addEventListener("click", () => {
                if (!gameBoard[index]) {
                    gameBoard[index] = marker;
                }
                if (checkWin(gameBoard)) {
                    checkWinner();
                    return;
                }
                turn.incrementRound();
                renderBoard();
            });
        });
    }

    function renderBoard() {
        const tileTexts = document.querySelectorAll(".tile>span");

        tileTexts.forEach((tileText, index) => {
            tileText.textContent = gameBoard[index];
        })
    }

    function checkWinner() {
        if (marker = 'X') {
            playerX.incrementScore();
        } else if (marker = 'O') {
            playerO.incrementScore();
        }
    }

    addTileEventListeners();

    let gameBoard = Array(9).fill(null);

    let playerX = makePlayer();
    let playerO = makePlayer();

    let turn = makeRoundCounter();

    let marker;

    if (turn.getRound % 2 !== 0) {
        marker = 'X'
    } else {
        marker = 'O'
    }
}

window.onload = addStartEvent();