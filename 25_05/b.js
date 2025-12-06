import { input_a as input_a } from "./input.js";
console.time("part B");

let [ranges, ingridients] = input_a()
  .split("\n\n")
  .map((i) => i.split("\n"));

ranges = ranges.map((i) => i.split("-").map((i) => +i));
ingridients = ingridients.map((i) => +i);

ranges.sort((b, a) => (b[0] != a[0] ? b[0] - a[0] : b[1] - a[1]));

let pos = 0;
const sumFresh = ranges.reduce((sum, r) => {
  const left = Math.max(r[0], pos);
  const right = r[1];

  const count_fresh = right >= left ? right - left + 1 : 0;

  if (right > pos) pos = right + 1;

  return (sum += count_fresh);
}, 0);

console.log("B", sumFresh);
console.timeEnd("part B");
