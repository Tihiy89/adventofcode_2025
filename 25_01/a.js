import { input_a as input_a } from "./input.js";
console.time("part A");

let pos = 50;
let code = "";
let zero_sum = 0;

const arr = input_a().split("\n");
arr.map((i) => {
  let mul = i[0] === "L" ? -1 : 1;
  let step = parseInt(i.substr(1));

  pos += mul * step;
  if (pos < 0) {
    pos += 100;
  }

  code += "" + pos;
  pos = pos % 100;
  if (pos === 0) {
    zero_sum++;
  }
});
//

console.log("A", zero_sum);
console.timeEnd("part A");
