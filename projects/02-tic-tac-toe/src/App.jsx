import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import {
  saveGameToStorage,
  resetGameStorage,
} from "./logic/storage/localStorage.js";

function App() {
  // State hook to manage the game board with 'board' representing the current state
  // and 'setBoard' for updating it. The board is initially created with 9 empty squares (null).
  // We use the Array constructor to create an array with 9 elements.
  // The board state is initialized using the localStorage value if available,
  // otherwise, it is initialized with 9 empty squares (null).
  const [board, setBoard] = useState(() => {
    // Retrieve the board state from localStorage
    const boardFromStorage = window.localStorage.getItem("board");

    // Parse the stored JSON value or initialize with 9 empty squares if no value is found
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  // State hook to manage the current turn in the game.
  // 'turn' represents the current turn, initially set to 'X'.
  // 'setTurn' is the function to update the turn.
  // The turn state is initialized using the localStorage value if available,
  // otherwise, it is initialized with 'X' as the default value.
  const [turn, setTurn] = useState(() => {
    // Retrieve the turn state from localStorage
    const turnFromStorage = window.localStorage.getItem("turn");

    // Use the stored value or initialize with 'X' if no value is found
    return turnFromStorage ?? TURNS.X;
  });

  // Null means no winner, while false signifies a draw.
  const [winner, setWinner] = useState(null);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Reset the Storage
    resetGameStorage();
  };

  // Function to update the game board when a square is clicked.
  const updateBoard = (index) => {
    // *Check if the selected square is already occupied or if there is already a winner;
    // *if so, exit the function to prevent further moves.
    if (board[index] || winner) return;

    // !Create a copy of the current board to avoid mutating the state directly.
    const newBoard = [...board];

    // Update the clicked square on the new board with the current player's turn.
    newBoard[index] = turn;
    setBoard(newBoard);

    // Toggle the turn between 'X' and 'O' for the next move.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Save the current game state to localStorage.
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // Check for a winner on the updated board.
    const newWinner = checkWinnerFrom(newBoard);

    // If there is a winner, update the winner state.
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // If there is no winner but the game has ended (draw), set the winner state to false.
      setWinner(false); //draw
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      {/* Display squares for 'X' and 'O' player turns, highlighting the current turn. */}
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
