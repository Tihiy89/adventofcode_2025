import { input_a_mini as input_a } from "./input.js";
console.time("part A");

const batteries = input_a().split("\n");

function findMaxVal(str) {
  const K = 2;
  let sum_str = "";
  let last_max = -1;

  for (let kk = 0; kk < K; kk++) {
    let local_max = str[last_max + 1];
    last_max = last_max + 1;
    for (let i = last_max + 1; i < str.length - K + kk + 1; i++) {
      if (+str[i] > +local_max) {
        local_max = str[i];
        last_max = i;
      }
    }
    sum_str += local_max;
  }

  return +sum_str;
}

const res = batteries.reduce((sum, b) => {
  return (sum += findMaxVal(b));
}, 0);

console.log("A", res);
console.timeEnd("part A");
