import { input_a as input_a } from "./input.js";
console.time("part B");

const maps = input_a()
  .split("\n")
  .map((i) => i.split(""));

const LenRows = maps.length;
const LenCols = maps[0].length;

const cellForCheck = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const cellRecheck = [];

function checkCell(row, col) {
  const count_box = cellForCheck.reduce((sum, i) => {
    const val = (maps[row + i[0]] ?? [])[col + i[1]] ?? ".";
    return (sum += val == "@" ? 1 : 0);
  }, 0);
  if (count_box < 4) {
    cellRecheck.push(
      ...cellForCheck
        .map((i) =>
          (maps[row + i[0]] ?? [])[col + i[1]] ?? "." == "@"
            ? [row + i[0], col + i[1]]
            : undefined
        )
        .filter((i) => i != undefined)
    );
    maps[row][col] = ".";
  }
  return count_box < 4 ? true : false;
}

let colPaper = 0;

for (let row = 0; row < LenRows; row++) {
  for (let col = 0; col < LenCols; col++) {
    if (maps[row][col] == "@") {
      colPaper += checkCell(row, col) ? 1 : 0;
    }
  }
}

while (cellRecheck.length > 0) {
  const [row, col] = cellRecheck.pop();
  if (maps[row][col] == "@") {
    colPaper += checkCell(row, col) ? 1 : 0;
  }
}

console.log("B", colPaper);
console.timeEnd("part B");
