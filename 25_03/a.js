import { input_a as input_a } from "./input.js";
console.time("part A");

const batteries = input_a().split("\n");

function findMaxVal(str) {
  let i_max1 = -1,
    i_max2 = -1;
  for (let i = 0; i < str.length - 1; i++) {
    if (+str[i] > +(str[i_max1] ?? -1)) {
      i_max1 = i;
    }
  }

  for (let i = i_max1 + 1; i < str.length; i++) {
    if (+str[i] > +(str[i_max2] ?? -1)) {
      i_max2 = i;
    }
  }

  return +(str[i_max1] + str[i_max2]);
}

const res = batteries.reduce((sum, b) => {
  return (sum += findMaxVal(b));
}, 0);

console.log("A", res);
console.timeEnd("part A");
