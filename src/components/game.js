import React, { Component } from "react";
import Cell from "./cell";
import Controls from "./controls";
// import "./Game.css";

class Game extends Component {
  state = {
    cells: [],
    isRunning: false,
    interval: 200,
    generation: 0,
  };

  cellSize = 20;
  width = 800;
  height = 600;

  rows = this.height / this.cellSize;
  cols = this.width / this.cellSize;

  board = this.makeGame();

  makeGame() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  stepThrough = () => {
    let newBoard = this.makeGame();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.countNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.setState({ generation: this.state.generation + 1 });
    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    this.timeoutHandler = window.setTimeout(() => {
      this.runGame();
    }, this.state.interval);
    this.stopGame();
  };

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / this.cellSize);
    const y = Math.floor(offsetY / this.cellSize);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
      console.log(this.board);
    }
    this.setState({ cells: this.makeCells() });
  };

  startGame = () => {
    this.setState({ isRunning: true });
    this.runGame();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runGame() {
    let newBoard = this.makeGame();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.countNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.setState({ generation: this.state.generation + 1 });
    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    this.timeoutHandler = window.setTimeout(() => {
      this.runGame();
    }, this.state.interval);
  }

  //   /**
  //    * Calculate the number of neighbors at point (x, y)
  //    * @param {Array} board
  //    * @param {int} x
  //    * @param {int} y
  //    */

  countNeighbors(board, x, y) {
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

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }

  increaseSpeed = (e) => {
    this.setState({ interval: this.state.interval - 40 });
  };

  decreaseSpeed = (e) => {
    this.setState({ interval: this.state.interval + 40 });
  };

  handleClearBoard = () => {
    this.board = this.makeGame();
    this.setState({ cells: this.makeCells(), generation: 0 });
  };

  handleRandomBoard = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = Math.random() >= 0.5;
      }
    }

    this.setState({
      cells: this.makeCells(),
      generation: 0,
    });
  };

  render() {
    const { cells, interval, isRunning, generation } = this.state;
    console.log(this.state.generation);

    return (
      <div>
        <Controls
          increaseSpeed={this.increaseSpeed}
          decreaseSpeed={this.decreaseSpeed}
          handleRandomBoard={this.handleRandomBoard}
          handleClearBoard={this.handleClearBoard}
          startGame={this.startGame}
          stopGame={this.stopGame}
          isRunning={isRunning}
          interval={interval}
          stepThrough={this.stepThrough}
        />
        <h2 className="generation">Generation {generation}</h2>
        {isRunning ? (
          <div
            className="board"
            style={{
              width: this.width,
              height: this.height,
              backgroundSize: `${this.cellSize}px ${this.cellSize}px`,
            }}
          >
            {cells.map((cell) => (
              <Cell
                x={cell.x}
                y={cell.y}
                key={`${cell.x},${cell.y}`}
                cellSize={this.cellSize}
              />
            ))}
          </div>
        ) : (
          <div
            className="board"
            style={{
              width: this.width,
              height: this.height,
              backgroundSize: `${this.cellSize}px ${this.cellSize}px`,
            }}
            onClick={this.handleClick}
            ref={(n) => {
              this.boardRef = n;
            }}
          >
            {cells.map((cell) => (
              <Cell
                x={cell.x}
                y={cell.y}
                key={`${cell.x},${cell.y}`}
                cellSize={this.cellSize}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Game;
