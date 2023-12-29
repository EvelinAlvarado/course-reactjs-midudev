import { WINNER_COMBOS } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
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

// Check if the game has ended by examining whether every square on the board is filled.
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
