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

    for (let il = 2; il <= len; il++) {
      if (len % il == 0) {
        const parts = len / il;
        const groups = [];
        for (let ig = 0; ig < il; ig++) {
          groups.push(str_ind.substring(ig * parts, ig * parts + parts));
        }
        if (groups.length > 1) {
          const first = groups[0];
          if (groups.filter((item) => item != first).length == 0) {
            res.push(str_ind);
            res_sum += ind;

            il = len + 1;
          }
        }
      }
    }
  }
});

console.log("A", res_sum);
console.timeEnd("part A");
