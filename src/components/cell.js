import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="cell"
        style={{
          left: `${this.props.cellSize * this.props.x + 1}px`,
          top: `${this.props.cellSize * this.props.y + 1}px`,
          width: `${this.props.cellSize - 1}px`,
          height: `${this.props.cellSize - 1}px`,
        }}
      />
    );
  }
}
export default Cell;
