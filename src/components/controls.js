import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      decreaseSpeed,
      increaseSpeed,
      stopGame,
      startGame,
      handleRandomBoard,
      handleClearBoard,
      isRunning,
      interval,
    } = this.props;
    return (
      <div className="controls">
        <button onClick={increaseSpeed}>Speed Up</button>
        <button onClick={decreaseSpeed}>Slow Down</button>
        {isRunning ? (
          <button className="button" onClick={stopGame}>
            Stop
          </button>
        ) : (
          <button className="button" onClick={startGame}>
            Start
          </button>
        )}
        <button className="button" onClick={handleRandomBoard}>
          Random
        </button>
        <button className="button" onClick={handleClearBoard}>
          Clear
        </button>
      </div>
    );
  }
}
export default Controls;
