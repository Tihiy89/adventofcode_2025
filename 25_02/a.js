import { input_a as input_a } from "./input.js";
console.time("part A");

const range = input_a()
  .split(",")
  .map((i) => i.split("-"));

const res = [];
let res_sum = 0;

range.map((i) => {
  const s = parseInt(i[0]);
  const e = parseInt(i[1]);
  for (let ind = s; ind <= e; ind++) {
    const str_ind = "" + ind;
    const len = str_ind.length;
    const s1 = str_ind.substring(0, len / 2);
    const s2 = str_ind.substring(len / 2);
    if (len % 2 == 0 && s1 == s2) {
      res.push(str_ind);
      res_sum += ind;
    }
  }
});

console.log("A", res_sum);
console.timeEnd("part A");
