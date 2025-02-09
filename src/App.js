// This line imports useState from the react package.
import { useState } from "react";

// This line creates a functional component named Square that takes two props: value and onSquareClick.
function Square({ value, onSquareClick }) {
  // This line returns a button element with the value prop as its text content and an onClick event handler that calls the onSquareClick prop.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//  This line creates a functional component named Board that takes three props: xIsNext, squares, and onPlay.
function Board({ xIsNext, squares, onPlay }) {
  // This line creates a function named handleClick that takes an index as an argument.
  function handleClick(i) {
    // This line checks if the calculateWinner function returns a value or if the square at the index is not null.
    if (calculateWinner(squares) || squares[i]) {
      // This line returns early if the conditions are met.
      return;
    }

    // This line creates a copy of the squares array.
    const nextSquares = squares.slice();

    // This line sets the value of the square at the index based on the xIsNext prop.
    if (xIsNext) {
      // This line sets the value of the square at the index to "X" if xIsNext is true.
      nextSquares[i] = "X";

      // This line sets the value of the square at the index to "O" if xIsNext is false.
    } else {
      nextSquares[i] = "O";
    }

    // This line calls the onPlay prop with the nextSquares array as an argument.
    onPlay(nextSquares);
  }

  // This line creates a variable named winner that stores the result of the calculateWinner function with the squares prop as an argument.
  const winner = calculateWinner(squares);

  // This line creates a variable named status that displays the winner if there is one, or the next player if there is no winner.
  let status;

  // This line checks if there is a winner and sets the status variable accordingly.
  if (winner) {
    // This line sets the status variable to "Winner: " followed by the winner value.
    status = "Winner: " + winner;

    // This line sets the status variable to "Next player: " followed by "X" or "O" based on the xIsNext prop.
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // This line returns the game board with the status and squares displayed.
  return (
    <>
      {/* This line creates a div element with the class name "status" and displays the status variable. */}
      <div className="status">{status}</div>

      {/* This line creates a div element with the class name "board-row"  */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// This line creates a functional component named Game.
export default function Game() {
  // This line creates a state variable named history using the useState hook with an initial value of an array containing an array of 9 null values.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // This line creates a state variable named currentMove using the useState hook with an initial value of 0.
  const [currentMove, setCurrentMove] = useState(0);

  // This line creates a variable named xIsNext that determines if the next player is "X" based on the currentMove.
  const xIsNext = currentMove % 2 === 0;

  // This line creates a variable named currentSquares that stores the squares array at the currentMove index.
  const currentSquares = history[currentMove];

  // This line creates a function named handlePlay that takes nextSquares as an argument.
  function handlePlay(nextSquares) {
    // This line creates a copy of the history array up to the currentMove index and adds the nextSquares array to it.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // This line updates the history state variable with the nextHistory array.
    setHistory(nextHistory);

    // This line increments the currentMove state variable by 1.
    setCurrentMove(nextHistory.length - 1);
  }

  // This line creates a function named jumpTo that takes nextMove as an argument.
  function jumpTo(nextMove) {
    // This line updates the currentMove state variable with the nextMove value.
    setCurrentMove(nextMove);
  }

  // This line creates a variable named winner that stores the result of the calculateWinner function with the currentSquares as an argument.
  const moves = history.map((squares, move) => {
    // This line createes a let variable named description that stores the description of the move.
    let description;

    // This line checks if the move is greater than 0 and sets the description accordingly.
    if (move > 0) {
      // This line sets the description variable to "Go to move #" followed by the move number.
      description = "Go to move #" + move;

      // This line sets the description variable to "Go to game start" if the move is 0.
    } else {
      description = "Go to game start";
    }

    // This line returns a list item element with a button that displays the description and calls the jumpTo function with the move as an argument.
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // This line returns the game component with the board and moves displayed.
  return (
    <div className="game">
      {/* This line creates a div element with the class name "game-board" and displays the Board component with the xIsNext and currentSquares props. */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      {/* This line creates a div element with the class name "game-info" and displays an ordered list of moves. */}
      <div className="game-info">
        {/* This line creates an ordered list element with the moves variable as its content. */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// This line creates a function named calculateWinner that takes a squares array as an argument.
function calculateWinner(squares) {
  // This line creates an array named lines that stores the winning combinations of squares.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // This line iterates over the lines array and checks if the squares at the specified indexes are equal.
  for (let i = 0; i < lines.length; i++) {
    // This line creates variables a, b, and c that store the indexes of the current line.
    const [a, b, c] = lines[i];

    // This line checks if the squares at indexes a, b, and c are equal and not null.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // This line returns the value of the winning square.
      return squares[a];
    }
  }

  // This line returns null if there is no winner.
  return null;
}
