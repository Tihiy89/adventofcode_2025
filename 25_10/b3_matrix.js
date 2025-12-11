import { input_a_mini as input } from './input.js';
console.time('part A');

const matrix = input()
  .split('\n')
  .map((i) => {
    const t = i.split(' ');

    const j = parseJoltage(t[t.length - 1]);
    let buttons = t.slice(1, t.length - 1);
    buttons = buttons.map((b) => parseBbuttons(b, j.length));

    buttons.push(j);
    const bn = [];
    for (let i = 0; i < buttons.length; i++) {
      for (let j = 0; j < buttons[i].length; j++) {
        bn[j] = bn[j] ?? [];
        bn[j][i] = buttons[i][j];
      }
    }
    return [bn, j];
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

  return res;
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

function normalizeRow(_m, _row, _col) {
  const del = _m[_row][_col];

  if (del == 0 || del == 1) {
    return;
  }
  for (let i = 0; i < _m[_row].length; i++) {
    _m[_row][i] = _m[_row][i] / del;
  }
}

function sumRow(_m, _r_dest, _r_src, _k) {
  for (let i = 0; i < _m[_r_dest].length; i++) {
    _m[_r_dest][i] += _k * _m[_r_src][i];
  }
}

function swapRow(_m, r1, r2) {
  [_m[r1], _m[r2]] = [_m[r2], _m[r1]];
}

const steps = matrix.map((matrix, ind) => {
  let [m, validJ] = matrix;

  for (let _c = 0; _c < m[0].length - 1; _c++) {
    let _r = 0;
    for (_r = _c; _r < m.length; _r++) {
      if (m[_r][_c] != 0) {
        break;
      }
    }
    if (_c != _r) {
      swapRow(m, _c, _r);
    }
    normalizeRow(m, _c, _c);
    for (let _r = 0; _r < m.length; _r++) {
      if (_r == _c) {
        continue;
      }
      sumRow(m, _r, _c, -m[_r][_c]);
    }

    //
  }

  return 0;
});

const b = steps.reduce((_s, i) => _s + i, 0);

console.log('A', b);
console.timeEnd('part A');
