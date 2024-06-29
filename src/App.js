import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null)

  // function handleClick() {
  //   setValue('X');
  // }

  return (
    <>
      <button className='square' onClick={onSquareClick}>{value}</button>
    </>
  )
}



function App() {
  // default set move is X.
  const [xIsNext, setXisNext] = useState(true);
  const [square, setSquare] = useState(Array(9).fill(null))

  function handleClick(i) {
    // earlier existing if already clicked in square or they are winner 
    if (square[i] || calculateWinner(square)) {
      return;
    }

    // immutability concept, where creating copies of array values.
    const nextSquares = square.slice();

    //switching between X and O.
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = "O"
    }
    setSquare(nextSquares);
    setXisNext(!xIsNext);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "Next Player " + (xIsNext ? "X" : "O");
  }
  return (
    <div className="App">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={square[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={square[2]} onSquareClick={() => { handleClick(2) }} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={square[4]} onSquareClick={() => { handleClick(4) }} />
        <Square value={square[5]} onSquareClick={() => { handleClick(5) }} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={square[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={square[8]} onSquareClick={() => { handleClick(8) }} />
      </div>
    </div>
  );
}

function calculateWinner(square) {

  //creating every square index to check whether the same or cross line has matched
  // Define all possible winning lines in tic-tac-toe
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6] // diagonal from top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    //assigning one step forward square value i.e. destructing the square line values.
    const [a, b, c] = lines[i]; //// Destructure the current line
    //checking whether first index value match with other same line values
    // Check if the squares at positions a, b, and c are all the same and not null/undefined
    if (square[a] && square[a] === square[b] && square[a] === square[c] && square[c]) {
      return square[a]; // Return the symbol (either 'X' or 'O') that won
    }
  }
  return null;
}

export default App;
