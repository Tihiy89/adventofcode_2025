import { input_a as input_a } from "./input.js";
console.time("part A");

let [operation, ...numbers] = input_a().split("\n").reverse();

operation = operation.trim().replace(/ +/g, "|").split("|");
numbers = numbers.map((i) => i.split("")).reverse();

let num90 = [];
for (let r = 0; r < numbers.length; r++) {
  for (let c = 0; c < numbers[r].length; c++) {
    num90[c] = num90[c] ?? [];
    num90[c][r] = numbers[r][c];
  }
}
// получаем чтото типа ['1|24|356', '369|248|8', '32|581|175', '623|431|4']
num90 = num90
  .map((i) => i.join(""))
  .join("|")
  .replace(/ */g, "")
  .split("||");

const res = num90.reduce((sum, item, ind) => {
  const res = eval(item.replace(/\|/g, operation[ind]));
  return (sum += res);
}, 0);

console.log("A", res);
console.timeEnd("part A");
