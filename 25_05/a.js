import { input_a as input_a } from "./input.js";
console.time("part A");

let [ranges, ingridients] = input_a()
  .split("\n\n")
  .map((i) => i.split("\n"));

ranges = ranges.map((i) => i.split("-").map((i) => +i));
ingridients = ingridients.map((i) => +i);

const sumFresh = ingridients.reduce((sum, item) => {
  sum += ranges.filter((r) => item >= r[0] && item <= r[1]).length > 0 ? 1 : 0;
  return sum;
}, 0);

console.log("A", sumFresh);
console.timeEnd("part A");
