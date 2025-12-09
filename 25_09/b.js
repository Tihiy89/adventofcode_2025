import { input_a as input } from "./input.js";
console.time("part A");

const redPoints = input()
  .split("\n")
  .map((i) => i.split(",").map((i) => +i));

function calcS(a, b) {
  return (Math.abs(b[0] - a[0]) + 1) * (Math.abs(b[1] - a[1]) + 1);
}

function getDirection(a, b) {
  let _r = b[0] - a[0];
  let _c = b[1] - a[1];

  _r = _r != 0 ? _r / Math.abs(_r) : 0;
  _c = _c != 0 ? _c / Math.abs(_c) : 0;

  return [_r, _c];
}

function addMatrix(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function comparePoint(a, b) {
  return a[0] == b[0] && a[1] == b[1];
}

const redS = [];

let maxRow = 0,
  maxCol = 0;

// считаем площади
console.log("calc S");
for (let ii = 0; ii < redPoints.length; ii++) {
  for (let jj = ii + 1; jj < redPoints.length; jj++) {
    const s = calcS(redPoints[ii], redPoints[jj]);
    redS.push(["" + ii + "_" + jj, ii, jj, s]);
  }

  maxRow = Math.max(redPoints[ii][0], maxRow);
  maxCol = Math.max(redPoints[ii][1], maxCol);
}

redS.sort((a, b) => b[3] - a[3]);

const greenPoints = [];
const validPoints = [];
// рисуем зеленые грани
console.time("calc green edges");

// вертикальное направление
let dMvert;

for (let ii = 0; ii < redPoints.length; ii++) {
  const a = redPoints[ii];
  const b = redPoints[ii + 1] ?? redPoints[0];
  const dM = getDirection(a, b);
  dMvert = dM[0] != 0 ? dM[0] : dMvert;

  a[2] = dMvert;
  b[2] = dMvert;
  validPoints.push([...a, "red", ...dM, "v", dMvert]);
  let point = addMatrix(a, dM);
  while (!comparePoint(point, b)) {
    greenPoints.push(point);
    validPoints.push([...point, 0, "green", ...dM, "v", 0]);
    point = addMatrix(point, dM);
  }
}

function mergeRanges(ranges) {
  let ii = 0;
  const val_ranges = [];

  while (ii < ranges.length) {
    let l = ii,
      r = ii;

    // зеленый - левая граница, просто ищем правую ближайшую
    if (ranges[ii][8] == true && ranges[ii][9] == true) {
      ii++;

      while (
        // просто только елси правая граница зелёная
        !(ranges[ii][8] == true && ranges[ii][9] == true) &&
        // если правая граница красная точка (угол) нужно проверить что направление соответствует предыдущему
        !(
          ranges[ii][3] == "red" &&
          ranges[ii][8] == false &&
          ranges[ii][9] == true &&
          ranges[ii][7] == ranges[ii - 1][7]
        )
      ) {
        ii++;
      }
      r = ii;
      val_ranges.push([l, r]);
    }
    // сложный случай, тут в точке угол, и если направление в правой точке не соответствует левой - то диапазон заканчивается, иначе ищем дальше
    else if (ranges[ii][8] == true && ranges[ii][9] != true) {
      const v = ranges[ii][7];
      ii++;
      while (ranges[ii][9] != true) {
        ii++;
      }

      // навправление обратное левой границе, заканчиваем дапазон
      if (ranges[ii][7] != v) {
        r = ii;
        val_ranges.push([l, r]);
      }
      // просто ищем ближайшую правую границу
      else {
        ii++;
        while (ranges[ii][9] != true) {
          ii++;
        }
        r = ii;
        val_ranges.push([l, r]);
      }
    }

    ii++;
  }

  return val_ranges;
}

// формируем диапазон "неправильных точек"
function checkRanges(_inputRanges) {
  if (_inputRanges.length == 0) {
    return [];
  }

  //считаем границы
  let figurePoints = _inputRanges.map((i, ind) => {
    let l = false;
    if (
      _inputRanges[ind - 1] == undefined ||
      (_inputRanges[ind - 1] && _inputRanges[ind - 1][1] != i[1] - 1)
    ) {
      l = true;
    }
    let r = false;
    if (
      _inputRanges[ind + 1] == undefined ||
      (_inputRanges[ind + 1] && _inputRanges[ind + 1][1] != i[1] + 1)
    ) {
      r = true;
    }

    return [...i, l, r];
  });

  //нарезаем диапазоны
  const ranges = figurePoints.filter((i) => i[8] == true || i[9] == true);

  const val_ranges = mergeRanges(ranges);

  const vvv = val_ranges.map((p) => p.map((r) => ranges[r][1]));
  return vvv;
}

const val_ranges_figure = Array(maxRow + 1).fill([]);

function pointsInRange(l, r, ranges) {
  let valid = true;
  let ii = 0;

  if (l < ranges[0][0]) {
    return false;
  }

  if (r > ranges[ranges.length - 1][1]) {
    return false;
  }

  while (ii < ranges.length) {
    if (l < ranges[ii][0]) {
      return false;
    }
    if (l <= ranges[ii][1]) {
      l = ranges[ii][1] + 1;
    }

    if (l > r) {
      return true;
    }

    ii++;
  }

  return valid;
}

function checkRect(a, b) {
  const r_min = Math.min(a[0], b[0]);
  const r_max = Math.max(a[0], b[0]);
  const c_min = Math.min(a[1], b[1]);
  const c_max = Math.max(a[1], b[1]);

  let ccc = 0;

  for (let _r = r_min; _r <= r_max; _r++) {
    if (++ccc % 500 == 0) {
      console.log(`checkRect ${ccc}/${r_max - r_min}`);
    }

    if (val_ranges_figure[_r].length == 0) {
      const points = validPoints
        .filter((i) => i[0] == _r)
        .sort((b, a) => b[1] - a[1]);

      val_ranges_figure[_r] = checkRanges(points);
    }

    const vr = val_ranges_figure[_r];

    const v = pointsInRange(c_min, c_max, vr);

    if (!v) return false;
  }
  //
  return true;
}

let res = 0,
  i = 0;

while (res == 0) {
  console.log("checkRect", i);

  const valid = checkRect(redPoints[redS[i][1]], redPoints[redS[i][2]]);
  res = valid ? redS[i][3] : 0;
  i++;
}

console.log("A", res);
console.timeEnd("part A");
