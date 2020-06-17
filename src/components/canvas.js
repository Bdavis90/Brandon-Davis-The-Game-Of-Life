import React, { Component } from "react";

class Grid extends Component {
  makeGrid(cols, rows) {
    const columns = new Array(cols);
    for (let i = 0; i < columns.length; i++) {
      columns[i] = new Array(rows);
    }
    return columns;
  }

  grid;
  cols = 10;
  rows = 10;

  setupGrid() {
    this.grid = this.makeGrid(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = Math.round(Math.random(2));
      }
    }
    console.table(this.grid);
  }

  componentDidMount() {
    this.setupGrid();
  }

  draw() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {}
    }
  }

  render() {
    console.log(this.c);
    console.log(this.ctx);
    return (
      <div className="grid">
        {this.setupGrid()}
        <div className="canvas">
          <canvas ref="canvas" />
        </div>
      </div>
    );
  }
}

export default Grid;
