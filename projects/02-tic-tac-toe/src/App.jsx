import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  // State hook to manage the game board with 'board' representing the current state and 'setBoard' for updating it. The board is initially created with 9 empty squares (null).
  // We use the Array constructor to create an array with 9 elements.
  const [board, setBoard] = useState(Array(9).fill(null));

  // State hook to manage the current turn in the game.
  // 'turn' represents the current turn, initially set to 'X'.
  // 'setTurn' is the function to update the turn.
  const [turn, setTurn] = useState(TURNS.X);

  // Null means no winner, while false signifies a draw.
  const [winner, setWinner] = useState(null);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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
