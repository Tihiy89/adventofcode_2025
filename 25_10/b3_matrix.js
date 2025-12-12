import { input_a_mini as input } from "./input.js";
console.time("part A");

const matrix = input()
  .split("\n")
  .map((i) => {
    const t = i.split(" ");

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

function matrixRotate(_m) {
  const res = [];
  for (let _r = 0; _r < _m.length; _r++) {
    for (let _c = 0; _c < _m[_r].length; _c++) {
      res[_c] = res[_c] ?? [];
      res[_c][_r] = _m[_r][_c];
    }
  }
  return res;
}

function getMatrixForCalc(_m) {
  const _mr = matrixRotate(_m);

  const N = _m[0].length;
  for (let i = 0; i < 2 ** N; i++) {
    const mask = i.toString(2).split("");
    if (mask.filter((item) => +item == 1).length !== N) {
      continue;
    }

    continue;
  }
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

  const m_arr = getMatrixForCalc(m);

  for (let _c = 0; _c < m.length; _c++) {
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

console.log("A", b);
console.timeEnd("part A");
