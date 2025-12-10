import { input_a_mini as input } from "./input.js";
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

function checkButton(buttons, comb, lamps) {
  let step = 0;
  let res = comb.reduce((res, i, ind) => {
    step += i;
    const val = (i % 2) * buttons[ind][2];
    return res ^ val;
  }, 0);

  return [res, step];
}

let countPress = 0;

const valid_comb = [];
const steps = schms.map((m, ind) => {
  const [lamps, buttons] = m;
  console.log(ind, lamps);
  let countPress = 0,
    finish = false;

  let iteration = 1;

  while (!finish) {
    for (let i = 0; i < buttons.length ** iteration; i++) {
      if (i % 1000000 == 0)
        console.log(
          ind,
          `deep ${iteration} calc ${i}/${buttons.length ** iteration}`
        );
      let ti = i;
      let v = "";

      for (let ii = 0; ii < iteration; ii++) {
        const pos = (ti % buttons.length ** (ii + 1)) / buttons.length ** ii;
        ti -= ti % buttons.length ** (ii + 1);
        v = pos + v;
      }
      const comb = Array(buttons.length).fill(0);
      v.split("").map((i) => comb[i]++);

      const res = checkButton(buttons, comb, lamps);
      if (res[0] == lamps[2]) {
        finish = true;
        valid_comb.push(comb);
        return res[1];
      }
    }
    // console.log(lamps, "iteration", iteration + 1);
    iteration++;
  }
});

const sum = steps.reduce((s, i) => s + i, 0);

console.log("A", sum);
console.timeEnd("part A");
