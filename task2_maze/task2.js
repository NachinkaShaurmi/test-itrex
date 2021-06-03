const myMaze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const startSearch = (arr, startSymbol) => {
  let start;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(startSymbol) !== -1) {
      start = [arr[i].indexOf(startSymbol), i];
      break;
    }
  }
  return start;
};

const aroundArea = (maze, point, freeWaySymbol) => {
  const [x, y] = point;
  return {
    left: maze[y][x - 1] === freeWaySymbol ? [x - 1, y] : false,
    right: maze[y][x + 1] === freeWaySymbol ? [x + 1, y] : false,
    top: maze[y - 1][x] === freeWaySymbol ? [x, y - 1] : false,
    bottom: maze[y + 1][x] === freeWaySymbol ? [x, y + 1] : false,
  };
};

const exitCondition = (maze, point) =>
  point[0] === 0 ||
  point[1] === 0 ||
  point[0] === maze.length ||
  point[1] === maze.length;


const wayOut = (maze, startSymbol = "0", freeWaySymbol = "+") => {
  const start = startSearch(maze, startSymbol);
  let res = [];

  const validValue = (point, maze, way = []) => {
    if (res.length !== 0) return;
    let newMaze = [...maze];
    // block start point
    newMaze[point[1]][point[0]] = "#";
    const around = aroundArea(newMaze, point, freeWaySymbol);

    for (let key in around) {
      if (res.length !== 0) return;
      const val = around[key];
      if (exitCondition(newMaze, val)) {
        if (res.length === 0) res = [...way, key];
      } else if (val) {
        validValue(val, newMaze, [...way, key]);
      }
    }
  };

  validValue(start, maze);

  return res.length === 0 ? "no exit" : res;
}

console.log(wayOut(myMaze));

// node task2