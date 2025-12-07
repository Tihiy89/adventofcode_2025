import { input_a as input_a } from './input.js';
console.time('part A');

const map = input_a()
  .split('\n')
  .map((i) => i.split(''));

function findStart(_m) {
  let i = 0;
  while (i < _m[0].length) {
    if (_m[0][i] == 'S') {
      return i;
    }
    i++;
  }

  return i;
}

const iRay = [];
iRay[0] = [];
iRay[0][findStart(map)] = '|';

let bifurcation = 0;

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    iRay[row] = iRay[row] ?? [];
    iRay[row + 1] = iRay[row + 1] ?? [];
    const isRay = iRay[row][col] == '|' ? true : false;

    if (isRay) {
      if (map[row][col] == '^') {
        let bif = 0;
        if (col - 1 >= 0) {
          iRay[row + 1][col - 1] = '|';
          bif = 1;
        }
        if (col + 1 < map[row].length) {
          iRay[row + 1][col + 1] = '|';
          bif = 1;
        }
        bifurcation += bif ? 1 : 0;
      } else {
        iRay[row + 1][col] = '|';
      }
    }
  }
}

const count = iRay[iRay.length - 1].filter((i) => i == '|').length;
console.log('A', bifurcation);
console.timeEnd('part A');
