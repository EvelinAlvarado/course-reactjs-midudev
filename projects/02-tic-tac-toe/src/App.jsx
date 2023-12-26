import { useState } from "react";
import "./App.css";

// Constant 'TURNS' represents player turns: 'X' maps to 'x', and 'O' maps to 'o'.
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // null=no winner
    return null;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  // Check if the game has ended by examining whether every square on the board is filled.
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
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
    const newWinner = checkWinner(newBoard);
    // If there is a winner, update the winner state.
    if (newWinner) {
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

      {/* 
        Render the winner section only if there is a winner or a draw.
        The expression `{winner !== null && ...}` checks if 'winner' is not null, 
        and if true, it renders the content inside the parentheses.
      */}
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Draw" : "Winner:"}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Start again!</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
