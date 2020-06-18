import React, { Component, useRef, useEffect } from "react";

class Grid extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;
  }

  makeGrid(cols, rows) {
    return new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  }

  grid;
  cols;
  rows;
  resolution = 40;

  setupGrid() {
    // this.cols = this.canvas.width / this.resolution;
    // this.rows = this.canvas.height / this.resolution;
    this.grid = this.makeGrid(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = Math.round(Math.random(2));
      }
    }
  }

  drawGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let x = i * this.resolution;
        let y = j * this.resolution;
      }
    }
  }

  render() {
    console.log();
    return (
      <div className="grid">
        {this.setupGrid()}
        <div className="canvas">
          <canvas ref={this.canvasRef} width={0} height={0} />
          <Canvas />
        </div>
      </div>
    );
  }
}
export default Grid;

export const Canvas = () => {
  const canvasRef = useRef("canvas");

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    setupGrid();
    console.log(grid);
  }, []);

  const makeGrid = (cols, rows) => {
    return new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  };

  let grid;
  let cols = 10;
  let rows = 10;
  let resolution = 40;
  // console.log(ctx, "ctx");

  const setupGrid = () => {
    grid = makeGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = Math.round(Math.random(2));
      }
    }
  };

  const drawGrid = () => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
      }
    }
  };

  return (
    <>
      <canvas ref={canvasRef} width="400" heigth="400" />
    </>
  );
};
