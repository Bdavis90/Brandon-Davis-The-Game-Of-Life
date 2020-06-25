import React from "react";
import Game from "./components/game";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h2 className="title">Conway's Game of Life</h2>
      <Game />
    </div>
  );
}

export default App;
