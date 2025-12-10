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

const steps = schms.map((m, ind) => {
  const [lamps, buttons] = m;
  console.log(ind, lamps);
  let countPress = 0,
    finish = false;

  let variants = [];

  while (!finish) {
    let var_di = [];
    const variants_i = [];
    for (let ii = 0; ii < buttons.length; ii++) {
      let s = "000000000000000" + 10 ** ii + "";
      s = s.substring(s.length - buttons.length);
      variants_i.push(s.split("").map((i) => +i));
    }
    if (variants.length == 0) {
      var_di.push(...variants_i);
    } else {
      variants_i.map((vi) => {
        const vvv = variants.map((v) => {
          const v2 = v.map((item, ind) => item + vi[ind]);
          return v2;
        });
        var_di.push(...vvv);
      });
    }

    const resCheck = var_di.map((v) => checkButton(buttons, v, lamps));
    const res = resCheck.find((i) => i[0] == lamps[2]);
    if (res) {
      finish = true;
      countPress = res[1];
      return countPress;
    }

    variants = [...var_di];
  }

  return 0;
});

const sum = steps.reduce((s, i) => s + i, 0);

console.log("A", sum);
console.timeEnd("part A");
