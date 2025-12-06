import { input_a as input_a } from "./input.js";
console.time("part A");

const [operation, ...numbers] = input_a()
  .split("\n")
  .map((i) => i.trim().replace(/ +/g, "|").split("|"))
  .reverse();

const res = numbers.reduce((res, item) => {
  item.map((i, ind) => {
    if (!res[ind]) res[ind] = i;
    else {
      res[ind] = eval(res[ind] + operation[ind] + i);
    }
  });
  return res;
}, Array(operation.length));

const sum = res.reduce((s, i) => {
  return (s += i);
}, 0);

console.log("A", sum);
console.timeEnd("part A");
