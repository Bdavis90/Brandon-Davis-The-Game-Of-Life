import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef("canvas");
  useEffect(() => {
    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
    const ctx = canvasRef.current.getContext("2d");

    console.log(canvasRef);
    setupGrid();
    drawGrid(ctx);
    console.log(grid);
  }, []);

  const makeGrid = (cols, rows) => {
    return new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  };

  let grid;
  let cols = 20;
  let rows = 20;
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

  const nextGen = () => {
    const nextGen = grid.map((arr) => [...arr]);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {}
    }
  };

  const drawGrid = (ctx) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          ctx.beginPath();
          ctx.rect(x, y, resolution, resolution);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.stroke();
        }
      }
    }
  };

  return (
    <>
      <canvas ref={canvasRef} width="" heigth="" />
    </>
  );
};

export default Canvas;
