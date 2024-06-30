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



function App({ xIsNext, square, onPlay }) {
  // default set move is X.
  // const [xIsNext, setXisNext] = useState(true);
  // const [square, setSquare] = useState(Array(9).fill(null))

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
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquare(nextSquares);
    // setXisNext(!xIsNext);
  }

  const winner = calculateWinner(square);
  let status;// to display winner or looser
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

function Game() {
  const [xIsNext, setXisNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]); // representing each array state i.e. nulls
  const currentSquares = history[history.length - 1];
  //to keep track of user step which is viewing
  const [currentMove, setCurrentMove] = useState(0);

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXisNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXisNext(nextMove % 2 === 0);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">

        <App xIsNext={xIsNext} square={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(square) {
  //creating every square index to check whether the same or cross line has matched
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

    const [a, b, c] = lines[i]; //// Destructure the current line

    // Check if the squares at positions a, b, and c are all the same and not null/undefined
    if (square[a] && square[a] === square[b] && square[a] === square[c] && square[c]) {
      return square[a]; // Return the symbol (either 'X' or 'O') that won
    }
  }
  return null;
}

export default Game;
