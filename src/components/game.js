import React, { useState, useRef, useEffect } from "react";
import Cell from "./cell";

const Game = () => {
  const [cells, setCells] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(100);

  const cellSize = 30;
  const width = 800;
  const height = 600;
  const cols = width / cellSize;
  const rows = height / cellSize;
  let boardRef = useRef("div");

  const emptyBoard = () => {
    let board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  };
  let board = emptyBoard();

  const getElementOffset = () => {
    const rect = boardRef.current.getBoundingClientRect();
    console.log(rect);
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  const makeCells = () => {
    let cell = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board[y][x]) {
          cell.push(...cells, { x, y });
        }
      }
    }
    console.log(cell);
    return cell;
  };

  const handleClick = (e) => {
    const elemOffset = getElementOffset();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;
    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);

    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      board[y][x] = !board[y][x];
    }

    console.log(cells);
    setCells(makeCells());
  };

  const runGame = () => {
    let newBoard = emptyBoard();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = countNeighbors(board, x, y);
        if (board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else if (!board[y][x] && neighbors === 3) {
          newBoard[y][x] = true;
        }
      }
    }
    board = newBoard;
    setCells(makeCells());
    const time = window.setTimeout(() => {
      runGame();
    }, time);
  };

  const countNeighbors = (board, x, y) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  };
  console.log(cells);
  return (
    <div>
      <div
        className="board"
        style={{
          width: width,
          height: height,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
        onClick={handleClick}
        ref={(n) => {
          boardRef.current = n;
        }}
      >
        {cells.map((cell) => {
          return (
            <Cell
              x={cell.x}
              y={cell.y}
              key={`${cell.x}, ${cell.y}`}
              cellSize={cellSize}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
