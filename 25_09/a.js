import { input_a as input } from "./input.js";
console.time("part A");

const redPoints = input()
  .split("\n")
  .map((i) => i.split(","));

function calcS(a, b) {
  return (Math.abs(b[0] - a[0]) + 1) * (Math.abs(b[1] - a[1]) + 1);
}

const redS = [];

// считаем площади
for (let ii = 0; ii < redPoints.length; ii++) {
  for (let jj = ii + 1; jj < redPoints.length; jj++) {
    const s = calcS(redPoints[ii], redPoints[jj]);
    redS.push(["" + ii + "_" + jj, ii, jj, s]);
  }
}

redS.sort((a, b) => b[3] - a[3]);

console.log("A", redS[0][3]);
console.timeEnd("part A");
