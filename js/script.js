const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((_, i) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", makeMove);
        board.appendChild(cell);
    });
}

function makeMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || checkWinner()) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        return;
    }
    if (!gameBoard.includes(null)) {
        status.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard.fill(null);
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    createBoard();
}

createBoard();