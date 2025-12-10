import { input_a_mini as input } from "./input.js";
console.time("part A");

const matrix = input()
  .split("\n")
  .map((i) => {
    const t = i.split(" ");

    const j = parseJoltage(t[t.length - 1]);
    let buttons = t.slice(1, t.length - 1);
    buttons = buttons.map((b) => parseBbuttons(b, j.length));

    return [buttons, j];
  });

function parseJoltage(s) {
  return s
    .replace(/[\{\}]/g, "")
    .split(",")
    .map((i) => +i);
}

function parseBbuttons(b, _size) {
  const arr = Array(_size).fill(0);
  const ind = b.replace(/[\(\)]/g, "").split(",");
  ind.map((i) => {
    arr[i] = 1;
  });

  return arr;
}

function calcJoltage(buttons, comb, value) {
  const res = Array(value.length).fill(0);
  for (let iv = 0; iv < value.length; iv++) {
    comb.map((item, ind) => {
      res[iv] += buttons[ind][iv] * item;
    });
  }

  const valid = value.find((val, ind) => val != res[ind]) == undefined;

  return valid;
}

matrix.map((matrix, ind) => {
  let [buttons, validJ] = matrix;

  let iteration = 1;

  let finish = false;

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
      const res = calcJoltage(buttons, comb, validJ);
      if (res) {
        finish = true;
        return iteration;
      }

      // console.log(comb);
    }
    // console.log(lamps, "iteration", iteration + 1);
    iteration++;
  }

  return 0;
});

console.log("A");
console.timeEnd("part A");
