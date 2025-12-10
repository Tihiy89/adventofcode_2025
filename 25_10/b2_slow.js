import { input_a_mini as input } from './input.js';
console.time('part A');

const matrix = input()
  .split('\n')
  .map((i) => {
    const t = i.split(' ');

    const j = parseJoltage(t[t.length - 1]);
    let buttons = t.slice(1, t.length - 1);
    buttons = buttons.map((b) => parseBbuttons(b, j.length));

    return [buttons, j];
  });

function parseJoltage(s) {
  return s
    .replace(/[\{\}]/g, '')
    .split(',')
    .map((i) => +i);
}

function parseBbuttons(b, _size) {
  const arr = Array(_size).fill(0);
  const ind = b.replace(/[\(\)]/g, '').split(',');
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

  return res.join('_');
}

function calcButtonMax(buttons, valid) {
  const max_i = buttons.map((button) => {
    let stop = false;
    let i = 0;
    while (!stop) {
      i++;
      button.map((el, elInd) => {
        if (el * i > valid[elInd]) {
          stop = true;
        }
      });
    }
    return i;
  });

  return max_i;
}
const steps = matrix.map((matrix, ind) => {
  let [buttons, validJ] = matrix;
  const button_max = calcButtonMax(buttons, validJ);

  const validJ_s = validJ.join('_');

  const count = button_max.reduce((_c, i) => _c * i, 1);
  const valid_calc = [];

  for (let i = 0; i < count; i++) {
    if (i % 100000 == 0) console.log(ind, ` calc ${i}/${count}`);
    let ti = i;

    const v = button_max.reduce((_v, bm, ind) => {
      const _t = ti % bm;
      ti = (ti - _t) / bm;
      _v.push(_t);

      return _v;
    }, []);

    const comb = v;
    const res = calcJoltage(buttons, comb, validJ);
    if (res == validJ_s) {
      valid_calc.push(comb);
    }
  }

  const s = valid_calc
    .map((variant) => variant.reduce((sum, el) => sum + el, 0))
    .sort((b, a) => b - a);

  return s[0];
});

const b = steps.reduce((_s, i) => _s + i, 0);

console.log('A', b);
console.timeEnd('part A');
