function generateB() {
  const seed = 3301;
  let matrix = [];
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = Math.random() * 2;
    }
  }
  return matrix;
}

const B = generateB();

function generateC() {
  let matrix = [];
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = Math.ceil(B[i][j] * 100 * matrixSymmetrical[i][j]);
    }
  }
  return matrix;
}

const C = generateC();

function generateD() {
  let matrix = [];
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = C[i][j] === 0 ? 0 : 1;
    }
  }
  return matrix;
}

const D = generateD();

function generateH() {
  let matrix = [];
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = C[i][j] === 0 ? 0 : 1;
    }
  }
  return matrix;
}

const H = generateH();

function generateTr() {
  let matrix = [];
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = i < j ? 1 : 0;
    }
  }
  return matrix;
}

const Tr = generateTr();

let W = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
];

function generateW(matrix) {
  for (let i = 0; i < qntnNodes; i++) {
    for (let j = 0; j < qntnNodes; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = (D[i][j] + H[i][j] * Tr[i][j]) * C[i][j];
        matrix[j][i] = (D[i][j] + H[i][j] * Tr[i][j]) * C[i][j];
      }
    }
  }
  return matrix;
}

W = generateW(W);
console.log(W);
