import { input_a as input_a } from './input.js';
console.time('part A');

const map = input_a()
  .split('\n')
  .map((i) => i.split(''));

function findStart(_m) {
  let i = 0;
  while (i < _m[0].length) {
    if (_m[0][i] == 'S') {
      return [0, i];
    }
    i++;
  }
}

const startPoint = findStart(map);
const dic = [];

function calcFromPoint(_p, _prev) {
  let [row, col] = _p;

  const trace = `${row}:${col}_${_prev ?? ''}`;
  console.log(`calcFromPoint ${trace}`);

  while (row < map.length) {
    const val = map[row][col];

    if (dic[row] && dic[row][col]) {
      console.log(`dic ${row}:${col}`);
      return dic[row][col];
    }

    if (val == '^') {
      let cost = 0;
      if (col - 1 >= 0) {
        cost += calcFromPoint([row + 1, col - 1]);
      }
      if (col + 1 < map[row].length) {
        cost += calcFromPoint([row + 1, col + 1]);
      }
      dic[row] = dic[row] ?? [];
      dic[row][col] = cost;
      return cost;
    } else {
      if (row + 1 >= map.length) {
        return 1;
      }
      row++;
    }
  }
}

const count = calcFromPoint(startPoint);

console.log('A', count);
console.timeEnd('part A');
