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

        setTimeout(() => {
            playGame();
        }, 1800);
    });
}

function playGame() {
    function makeBoard() {
        let board = [
            null, null, null,
            null, null, null,
            null, null, null
        ];

        return {
            resetBoard: function() {
                board = [
                    null, null, null,
                    null, null, null,
                    null, null, null
                ];
            },
            getBoard: function() {
                return board;
            },
            setTile: function(index, marker) {
                board[index] = marker;
            }
        };
    }

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
        };
    }

    function makeMarker() {
        let marker = 'X';

        return {
            getMarker: function() {
                return marker;
            },
            changeMarker: function() {
                marker = (marker === 'X') ? 'O' : 'X';
            },
            resetMarker: function() {
                marker = 'X';
            }
        };
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

    function renderBoard() {
        const tileTexts = document.querySelectorAll(".tile>span");

        tileTexts.forEach((tileText, index) => {
            tileText.textContent = gameBoard.getBoard()[index];
        });
    }

    function playerTurn() {
        if (marker.getMarker() === 'X') {
            if (playerOScore.classList.contains("active-turn")) {
                playerOScore.classList.remove("active-turn");
            }
            if (!playerXScore.classList.contains("active-turn")) {
                playerXScore.classList.add("active-turn");
            }
        } else if (marker.getMarker() === 'O') {
            if (playerXScore.classList.contains("active-turn")) {
                playerXScore.classList.remove("active-turn");
            }
            if (!playerOScore.classList.contains("active-turn")) {
                playerOScore.classList.add("active-turn");
            }
        }
    }

    function updateScores() {
        if (marker.getMarker() === 'X') {
            playerX.incrementScore();
        } else if (marker.getMarker() === 'O') {
            playerO.incrementScore();
        }
        playerXScore.textContent = playerX.getScore();
        playerOScore.textContent = playerO.getScore();
    }

    function addTileEventListeners() {
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile, index) => {
            tile.addEventListener("click", () => {
                if (!gameBoard.getBoard()[index]) {
                    gameBoard.setTile(index, marker.getMarker());
                    renderBoard();
                    if (checkWin(gameBoard.getBoard())) {
                        setTimeout(() => {updateScores();
                                          gameBoard.resetBoard();
                                          marker.resetMarker();
                                          renderBoard();
                                          }, 1000);
                    } else {
                        marker.changeMarker();
                        playerTurn();
                    }
                }
            });
        });
    }

    let gameBoard = makeBoard();
    let playerX = makePlayer();
    let playerO = makePlayer();
    let marker = makeMarker();

    const playerXScore = document.querySelector(".score-1");
    const playerOScore = document.querySelector(".score-2");

    addTileEventListeners();
    playerTurn();  // Initialize the first turn
}

window.onload = addStartEvent;