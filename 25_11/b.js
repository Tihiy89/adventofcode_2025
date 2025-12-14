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

function findPoinstByDest(name) {
  if (name == "srv") return ["srv"];
  const filtered = m.filter((i) => i[1].find((d) => d == name));
  return filtered;
}

let ways = [];

function findNextPointByDest(_p, way) {
  const double = way.split("_").find((i) => i == _p[0]);
  if (double) {
    console.log("double", way + "_" + _p[0]);
    return way + "_" + _p[0];
  }
  if (_p[0] === "svr") {
    ways.push(way + "_" + _p[0]);
    return way + "_" + _p[0];
  }

  console.log("findNextPointByDest", way + "_" + _p[0]);

  findPoinstByDest(_p[0])
    .filter((p) => p != undefined)
    .map((p) => findNextPointByDest(p, way + "_" + _p[0]));
}

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

const start = findPoinstByDest("out");
start.map((p) => findNextPointByDest(p, ""));

// const start = findPoint("svr");
// findNextPoint(start, "");

ways = ways
  .map((i) => i.split("_"))
  .filter((w) => w.find((i) => i == "fft") && w.find((i) => i == "dac"));

console.log("A", ways.length);
console.timeEnd("part A");
