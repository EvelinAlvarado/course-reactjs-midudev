export const saveGameToStorage = ({ board, turn }) => {
  // Save the current game state to localStorage.
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  // Reset the Storage
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
