import { input_a_mini as input_a } from "./input.js";
console.time("part A");

const batteries = input_a().split("\n");

// размер желаемой выборки
const K = 2;

function findMaxVal(str) {
  const dic = {};
  const count_min = str.length - K;
  for (let i = 0; i < str.length; i++) {
    if (!dic[str[i]]) {
      dic[str[i]] = [];
    }
    dic[str[i]].push(i);
  }

  const ind_min_ordering = [];
  for (let key in dic) {
    ind_min_ordering.push(...dic[key]);
  }

  const ind_for_delete = ind_min_ordering.slice(0, count_min);
  const sum = +str
    .split("")
    .filter((i, ind) => ind_for_delete.findIndex((item) => item == ind) == -1)
    .join("");
  return sum;
}

const res = batteries.reduce((sum, b) => {
  const res = findMaxVal(b);
  console.log(b, res);
  return (sum += res);
}, 0);

console.log("A", res);
console.timeEnd("part A");
