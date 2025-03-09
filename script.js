let timer = 0;
let interval;
let hintsAvailable = 3;

// Puzzle images
const puzzleImages = ["piece1.png", "piece2.png", "piece3.png", "piece4.png"];
const correctPositions = [
    { x: 50, y: 50 },
    { x: 200, y: 50 },
    { x: 50, y: 200 },
    { x: 200, y: 200 }
];

// Start Game
function startGame() {
    document.getElementById('background-music').play();
    interval = setInterval(updateTimer, 1000);
    loadPuzzlePieces();
}

// Update Timer
function updateTimer() {
    timer++;
    document.getElementById('timer').innerText = `Time: ${timer}`;
}

// Load Puzzle Pieces
function loadPuzzlePieces() {
    const puzzleArea = document.getElementById("puzzle-area");

    puzzleImages.forEach((src, index) => {
        const piece = document.createElement("img");
        piece.src = src;
        piece.classList.add("puzzle-piece");
        piece.setAttribute("draggable", true);
        piece.style.left = Math.random() * 250 + "px";
        piece.style.top = Math.random() * 250 + "px";
        piece.dataset.index = index;

        piece.addEventListener("dragstart", onDragStart);
        piece.addEventListener("dragend", onDragEnd);
        puzzleArea.appendChild(piece);
    });

    puzzleArea.addEventListener("dragover", onDragOver);
    puzzleArea.addEventListener("drop", onDrop);
}

// Drag & Drop Functions
let draggedPiece = null;

function onDragStart(event) {
    draggedPiece = event.target;
}

function onDragEnd() {
    draggedPiece = null;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    if (draggedPiece) {
        draggedPiece.style.left = event.offsetX + "px";
        draggedPiece.style.top = event.offsetY + "px";
        checkWinCondition();
    }
}

// Provide Hint
document.getElementById('hint-button').addEventListener('click', function() {
    if (hintsAvailable > 0) {
        alert("Try placing the pieces near their original position!");
        hintsAvailable--;
    }
});

// Check Win Condition
function checkWinCondition() {
    let correctCount = 0;
    const pieces = document.querySelectorAll(".puzzle-piece");

    pieces.forEach((piece, index) => {
        const rect = piece.getBoundingClientRect();
        const correct = correctPositions[index];

        if (Math.abs(rect.left - correct.x) < 20 && Math.abs(rect.top - correct.y) < 20) {
            correctCount++;
        }
    });

    if (correctCount === puzzleImages.length) {
        alert("Congratulations! You solved the puzzle!");
        clearInterval(interval);
    }
}

window.onload = startGame;
