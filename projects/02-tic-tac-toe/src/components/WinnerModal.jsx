import { Square } from "./Square.jsx";

/* 
  Render the winner modal section only if there is a winner or a draw.
  The condition `{winner === null}` checks if there is no winner, and if true, 
  it returns null to avoid rendering the modal.

  Props:
  - winner: The winner of the game or `null` if there is no winner yet.
  - resetGame: Function to reset the game.
*/
export function WinnerModal({ winner, resetGame }) {
  // If there is no winner, return null to avoid rendering the modal.
  if (winner === null) return null;

  // Determine the text to display based on the winner status.
  const winnerText = winner === false ? "Draw" : "Winner:";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Start again!</button>
        </footer>
      </div>
    </section>
  );
}
