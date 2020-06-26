import React from "react";
import Game from "./components/game";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h2 className="title">Conway's Game of Life</h2>
      <Game />
      <div className="rules-container">
        <h2 className="rules">Rules:</h2>
        <ul className="rules-list">
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
