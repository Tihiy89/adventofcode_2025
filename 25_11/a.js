import { input_a as input } from "./input.js";
console.time("part A");

const m = input()
  .split("\n")
  .map((i) => {
    const ii = i.split(":");
    return [ii[0], ii[1].trim().split(" ")];
  });

function findPoint(name) {
  if (name == "out") return ["out"];
  return m.find((i) => i[0] == name);
}

const ways = [];

function findNextPoint(_p, way) {
  if (_p[0] === "out") {
    ways.push(way + "_" + _p[0]);
    return way + "_" + _p[0];
  }

  const nextI = _p[1];
  nextI
    .map((i) => findPoint(i))
    .filter((p) => p != undefined)
    .map((p) => findNextPoint(p, way + "_" + _p[0]));
}

const start = findPoint("you");
const way = findNextPoint(start, "");

console.log("A", ways.length);
console.timeEnd("part A");
