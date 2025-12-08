import { input_a as input_a } from "./input.js";
console.time("part A");

const steps = 1000;
const group_calc = 3;

const map = input_a()
  .split("\n")
  .map((i) => i.split(","));

function calcDistance(a, b) {
  const d = Math.sqrt(
    Math.pow(b[0] - a[0], 2) +
      Math.pow(b[1] - a[1], 2) +
      Math.pow(b[2] - a[2], 2)
  );
  return d;
}

const distance = [];

// считаем расстояния
for (let ii = 0; ii < map.length; ii++) {
  for (let jj = ii + 1; jj < map.length; jj++) {
    const d = calcDistance(map[ii], map[jj]);
    distance.push(["" + ii + "_" + jj, ii, jj, d]);
  }
}

distance.sort((b, a) => b[3] - a[3]);

let groups = [];

for (let step = 0; step < steps; step++) {
  const [, a, b] = distance[step];

  const gs = groups.filter(
    (group) => group.find((item) => item == a || item == b) != undefined
  );

  if (gs.length == 0) {
    groups.push([a, b]);
  } else if (gs.length == 1) {
    const g = gs[0];
    g.push(...[a, b].filter((i) => g.find((gi) => gi == i) == undefined));
  } else if (gs.length == 2) {
    let g1 = gs[0];
    let g2 = gs[1];

    groups = groups.filter(
      (group) => group.find((item) => item == a || item == b) == undefined
    );
    groups.push([...g1, ...g2]);
  }
}

groups.sort((a, b) => b.length - a.length);

let res = 1;
for (let ii = 0; ii < group_calc; ii++) {
  res *= groups[ii].length;
}

console.log("A", res);
console.timeEnd("part A");
