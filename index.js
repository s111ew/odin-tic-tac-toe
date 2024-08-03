function addStartEvent() {
    const startButton = document.querySelector(".start-button");
    const tiles = document.querySelectorAll(".tile");
    startButton.addEventListener("click", () => {
        startButton.classList.remove("start-button");
        
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add("become-visible");
            }, index * 100);
        });

        playGame();
    });
}

function playGame() {
    const tiles = document.querySelectorAll(".tile");
    const tileTexts = document.querySelectorAll(".tile>span");
    

    function createPlayer() {
        let score = 0;

        return {
            getScore: function() {
                return score;
            },
            increaseScore: function() {
                score++;
            },
            resetScore: function() {
                score = 0;
            }
        }
    }

    function createEmptyBoard() {
        return [
            null, null, null,
            null, null, null,
            null, null, null
        ]
    }

    function renderBoard() {
        const newBoard = createEmptyBoard();
        tileTexts.forEach((tileText, index) => {
            tileText.textContent = newBoard[index]
        })
    }

    function createTurnCounter() {
        let turn = 1;

        return {
            getTurn: function() {
                return turn;
            },
            increaseTurn: function() {
                turn++;
            },
            resetTurn: function() {
                turn = 0;
            }
        }
    }

    function checkWin(gameBoard) {
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
            if ((gameBoard[a] === 'X' && gameBoard[b] === 'X' && gameBoard[c] === 'X') || (gameBoard[a] === 'O' && gameBoard[b] === 'O' && gameBoard[c] === 'O') ) {
                return true;
            }
        }
    
        return false;
    }

    function playRound() {
        let playerOne = createPlayer();
        let playerTwo = createPlayer();
        let gameBoard = createEmptyBoard();
        let turnCounter = createTurnCounter();
        let currentMarker;

        while (playerOne.getScore() < 3 && playerTwo.getScore() < 3) {
            if (turnCounter.getTurn() %2 !== 0) {
                currentMarker = 'X';
            } else {
                currentMarker = 'O';
            }
            tiles.forEach(tile => {
                tile.addEventListener("click", (index) => {
                    gameBoard[index] = currentMarker;
                    renderBoard();
                    checkWin(gameBoard);
                    turnCounter.increaseTurn();
                })
            })
        }

    }
    playRound();
}

addStartEvent();