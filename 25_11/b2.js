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

// function findPoinstByDest(name) {
//   if (name == "srv") return ["srv"];
//   const filtered = m.filter((i) => i[1].find((d) => d == name));
//   return filtered;
// }

// function findNextPointByDest(_p, way) {
//   const double = way.split("_").find((i) => i == _p[0]);
//   if (double) {
//     console.log("double", way + "_" + _p[0]);
//     return way + "_" + _p[0];
//   }
//   if (_p[0] === "svr") {
//     ways.push(way + "_" + _p[0]);
//     return way + "_" + _p[0];
//   }

//   console.log("findNextPointByDest", way + "_" + _p[0]);

//   findPoinstByDest(_p[0])
//     .filter((p) => p != undefined)
//     .map((p) => findNextPointByDest(p, way + "_" + _p[0]));
// }

const dic = [];

let find = 0,
  find_in_cache = 0;

function findNextPoint(_p) {
  if (_p[0] === "out") {
    return _p[0];
  }

  find++;
  if (find == 569) debugger;
  const res_d = dic.find((i) => i[0] == _p[0]);
  if (res_d) {
    find_in_cache++;
    return res_d[1];
  }

  // if (find % 100 == 0)
  {
    console.log(`find ${find} in cache ${find_in_cache}`);
  }

  const nextI = _p[1];
  const ppp = nextI
    .map((i) => findPoint(i))
    .filter((p) => p != undefined)
    .map((p) => {
      const n = findNextPoint(p);
      return n;
    });

  const list = ppp
    .reduce((res, i) => {
      if (typeof i == "string") {
        res.push(i);
      } else {
        res.push(...i);
      }

      return res;
    }, [])
    .map((i) => _p[0] + "_" + i);

  dic.push([_p[0], list]);

  return list;
}

// const start = findPoinstByDest("out");
// start.map((p) => findNextPointByDest(p, ""));

const start = findPoint("svr");
let ways = findNextPoint(start, "");

ways = ways
  .map((i) => i.split("_"))
  .filter((w) => w.find((i) => i == "fft") && w.find((i) => i == "dac"));

console.log("A", ways.length);
console.timeEnd("part A");
