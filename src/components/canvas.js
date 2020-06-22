import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const [active, setActive] = useState(false);
  const canvasRef = useRef("canvas");

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

  // const nextGen = (grid) => {
  //   const nextGen = grid.map((arr) => [...arr]);
  //   console.log(nextGen, "current gen");
  //   for (let i = 0; i < cols; i++) {
  //     for (let j = 0; j < rows; j++) {
  //       const cell = grid[i][j];
  //       let numNeighbors = 0;
  //       for (let col = -1; col < 2; col++) {
  //         for (let row = -1; row < 2; row++) {
  //           if (col === 0 && j === 0) {
  //             continue;
  //           }
  //           const xCell = col + i;
  //           const yCell = row + j;
  //           if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
  //             const currentNeighbor = grid[i + col][j + row];
  //             numNeighbors += currentNeighbor;
  //           }
  //         }
  //       }
  //       if (cell === 1 && numNeighbors < 2) {
  //         nextGen[i][j] = 0;
  //       } else if (cell === 1 && numNeighbors > 3) {
  //         nextGen[i][j] = 0;
  //       } else if (cell === 0 && numNeighbors === 3) {
  //         nextGen[i][j] = 1;
  //       }
  //     }
  //   }
  //   console.log(nextGen, "nextgen");
  //   return nextGen;
  // };

  // const updateGen = () => {
  //   grid = nextGen(grid);
  //   requestAnimationFrame(updateGen);
  //   drawGrid(grid);
  //   console.log(grid);
  // };

  // const handleClick = (e) => {
  //   for (let i = 0; i < cols; i++) {
  //     for (let j = 0; j < rows; j++) {
  //       let x = i * resolution;
  //       let y = j * resolution;
  //       if (grid[i][j] == 1) {
  //         setActive(!active);
  //         ctx.beginPath();
  //         ctx.rect(x, y, resolution, resolution);
  //         ctx.fillStyle = "white";
  //         ctx.fill();
  //         ctx.stroke();
  //       }
  //     }
  //   }
  //   console.log(e.target);
  // };

  const countNeighbors = (grid, x, y) => {
    let numNeighbors = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        numNeighbors += grid[x + i][y + j];
      }
    }
    numNeighbors -= grid[x][y];
    return numNeighbors;
  };

  const drawGrid = (ctx) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          setActive(!active);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.stroke();
          ctx.rect(x, y, resolution, resolution);
        }
      }
    }
    let nextGen = makeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        if (i == 0 || i == cols - 1 || j == 0 || rows == rows - 1) {
          nextGen[i][j] = state;
        } else {
          let neighbors = countNeighbors(grid, i, j);
          if (state == 0 && neighbors === 3) {
            nextGen[i][j] = 1;
          } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            nextGen[i][j] = 0;
          } else {
            nextGen[i][j] = state;
          }
        }
      }
    }

    grid = nextGen;
    console.log(grid, "nextgen");
  };

  useEffect(() => {
    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
    const ctx = canvasRef.current.getContext("2d");
    setupGrid();
    drawGrid(ctx);
    // nextGen(grid);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width="" heigth="" />
    </>
  );
};

export default Canvas;
