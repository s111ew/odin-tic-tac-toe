function addStartEvent() {
    function renderTiles() {const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add("become-visible");
            }, index * 150);
        });}

        function handleClick() {
            actionContainer.removeEventListener("click", handleClick);
            actionContainer.classList.remove("start-button");
            renderTiles();
            playGame();
        }
 
        const actionContainer = document.querySelector(".action-container");     
        actionContainer.addEventListener("click", handleClick)
    };

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
                ]
                marker.resetMarker();
                playerTurn();
                renderBoard();
            },
            getBoard: function() {
                return board;
            },
            setTile: function(index, marker) {
                board[index] = marker;
            },
            stopClicks: function() {
                board.forEach((cell, index) => {
                    if (cell === null) {
                        board[index] = " ";
                    }
                });
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
    
        // Check for a win
        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return ['win', [a, b, c]];
            }
        }
    
        // Check for a draw
        if (board.every(element => Boolean(element))) {
            return ['draw', []];
        }
    
        // Game is still ongoing
        return [false, []];
    }

    function renderBoard() {
        const tileTexts = document.querySelectorAll(".tile>span");

        tileTexts.forEach((tileText, index) => {
            tileText.textContent = gameBoard.getBoard()[index];
        });
    }

    function playerTurn() {
        if (marker.getMarker() === 'X') {
            playerOScore.classList.remove("active-turn");
            playerXScore.classList.add("active-turn");
            actionText.textContent = `Player 1's Turn`;
        } else {
            playerXScore.classList.remove("active-turn");
            playerOScore.classList.add("active-turn");
            actionText.textContent = `Player 2's Turn`;
        }
    }

    function updateScores() {
        if (marker.getMarker() === 'X') {
            playerX.incrementScore();
        } else {
            playerO.incrementScore();
        }
        playerXScore.textContent = playerX.getScore();
        playerOScore.textContent = playerO.getScore();
    }

    function highlightWinningTiles(winningTiles) {
        winningTiles.forEach(index => {
            const tile = document.querySelector(`.tile:nth-child(${index + 1})`);
            tile.classList.add("highlight");
        });
    }

    function resetHighlighting() {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile => {
            tile.classList.remove("highlight");
        });
    }

    function addTileEventListeners() {
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile, index) => {
            tile.addEventListener("click", () => {
                if (!gameBoard.getBoard()[index]) {
                    gameBoard.setTile(index, marker.getMarker());
                    renderBoard();
                    const [winDetected, winningTiles] = checkWin(gameBoard.getBoard());
                    if (winDetected === 'win') {
                        gameBoard.stopClicks();
                        console.log(gameBoard.getBoard())
                        highlightWinningTiles(winningTiles);
                        updateScores();
                        if (marker.getMarker() === 'X') {
                            actionText.textContent = 'Player 1 Wins!'
                        } else {
                            actionText.textContent = 'Player 2 Wins!'
                        }
                        setTimeout(() => {
                            gameBoard.resetBoard();
                            resetHighlighting();
                        }, 1500);
                    } else if (winDetected === 'draw') {
                        actionText.textContent = `It's a Draw!`;
                        setTimeout(() => {
                            gameBoard.resetBoard();
                            resetHighlighting();
                        }, 1500);
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

    const actionText = document.querySelector(".action-container>span");

    addTileEventListeners();
    playerTurn(); // Initialize the first turn
}

window.onload = addStartEvent;