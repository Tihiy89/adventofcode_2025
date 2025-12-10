import { input_a as input } from "./input.js";
console.time("part A");

const schms = input()
  .split("\n")
  .map((i) => {
    const t = i.split(" ");
    const l_bin = parseLamp(t[0]);
    const l_dec = bin2dec(l_bin);
    let buttons = t.slice(1, t.length - 1);
    buttons = buttons.map((b) => [b, ...parseBbuttons(b, l_bin.length)]);
    return [[t[0], l_bin, l_dec], buttons, t.slice(t.length - 1)];
  });

function dec2bin(i) {
  return i.toString(2);
}

function bin2dec(b) {
  return parseInt(b, 2);
}

function parseLamp(s) {
  return s
    .replace(/[\[\]]/g, "")
    .replace(/\./g, "0")
    .replace(/#/g, 1);
}

function parseBbuttons(b, _size) {
  const arr = Array(_size).fill(0);
  const ind = b.replace(/[\(\)]/g, "").split(",");
  ind.map((i) => {
    arr[i] = 1;
  });
  const b_bin = arr.join("");
  const b_dec = bin2dec(b_bin);
  return [b_bin, b_dec];
}

function checkButton(buttons, comb) {
  let step = 0;
  let res = comb.reduce((res, i, ind) => {
    step += i;
    const val = (i % 2) * buttons[ind][2];
    return res ^ val;
  }, 0);

  return [res, step];
}

const valid_comb = [];
const steps = schms.map((m, ind) => {
  const [lamps, buttons] = m;
  console.log(ind, lamps);
  const valid = [];

  for (let i = 0; i < 2 ** (buttons.length + 1); i++) {
    let v = "000000000000000" + dec2bin(i);
    v = v.substring(v.length - buttons.length);
    v = v.split("").map((i) => +i);

    const res = checkButton(buttons, v);
    if (res[0] == lamps[2]) {
      valid.push([res[1], v.join("")]);
    }

    // valid_comb.push(v);
    // return res[1];
  }

  valid.sort((b, a) => b[0] - a[0]);
  return valid[0][0];

  // }
});

const sum = steps.reduce((s, i) => s + i, 0);

console.log("A", sum);
console.timeEnd("part A");
