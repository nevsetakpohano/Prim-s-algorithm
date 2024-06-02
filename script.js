class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addNode(node) {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, []);
    }
  }

  addEdge(node1, node2, weight) {
    this.adjList.get(node1).push({ node: node2, weight: weight });
    this.adjList.get(node2).push({ node: node1, weight: weight });
  }

  removeNode(node) {
    if (this.adjList.has(node)) {
      for (let [key, edges] of this.adjList) {
        this.adjList.set(
          key,
          edges.filter((edge) => edge.node !== node)
        );
      }
      this.adjList.delete(node);
    }
  }

  removeEdge(node1, node2) {
    if (this.adjList.has(node1) && this.adjList.has(node2)) {
      this.adjList.set(
        node1,
        this.adjList.get(node1).filter((edge) => edge.node !== node2)
      );
      this.adjList.set(
        node2,
        this.adjList.get(node2).filter((edge) => edge.node !== node1)
      );
    }
  }

  getNodes() {
    return Array.from(this.adjList.keys());
  }

  getEdges(node) {
    return this.adjList.get(node);
  }
}

const canvasNeNapr = document.getElementById("neNapr");
const canvasNapr = document.getElementById("napr");
const contextNeNapr = canvasNeNapr.getContext("2d");
const contextNapr = canvasNapr.getContext("2d");

const qntnNodes = 10;
const coef = 1.0 - 0 * 0.01 - 1 * 0.005 - 0.05;
const radius = 15;

const nodePositions = [
  { x: 120, y: 250 }, //1
  { x: 200, y: 150 }, //2
  { x: 300, y: 110 }, //3
  { x: 400, y: 150 }, //4
  { x: 480, y: 250 }, //5
  { x: 480, y: 350 }, //6
  { x: 400, y: 450 }, //7
  { x: 300, y: 490 }, //8
  { x: 200, y: 450 }, //9
  { x: 120, y: 350 }, //10
];

function generateAdjacencyMatrixSymmetrical() {
  const seed = 3301;
  let matrix = [];
  Math.seedrandom(seed);
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = Math.random() * 2 * coef;
      matrix[i][j] = matrix[i][j] < 1 ? 0 : 1;
    }
  }
  for (let i = 0; i < qntnNodes; i++) {
    for (let j = 0; j < qntnNodes; j++) {
      if (matrix[i][j] === 1 && matrix[i][j] !== matrix[j][i]) {
        matrix[j][i] = 1;
      }
    }
  }
  return matrix;
}

const matrixSymmetrical = generateAdjacencyMatrixSymmetrical();
console.log(matrixSymmetrical);

function generateB() {
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
      matrix[i][j] = D[i][j] != D[j][i] ? 1 : 0;
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

function drawAllNodes(context, colour, txtColour) {
  nodePositions.forEach((position, index) => {
    context.fillStyle = colour;
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.font = "14px Times New Roman";
    context.fillStyle = txtColour;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${index + 1}`, position.x, position.y);
  });
}

function drawNode(index, context, bgColour, txtColour) {
  context.fillStyle = bgColour;
  context.strokeStyle = "black";
  context.lineWidth = 2;

  context.beginPath();
  context.arc(
    nodePositions[index].x,
    nodePositions[index].y,
    radius,
    0,
    Math.PI * 2,
    true
  );
  context.fill();
  context.stroke();
  context.font = "14px Times New Roman";
  context.fillStyle = txtColour;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(
    `${index + 1}`,
    nodePositions[index].x,
    nodePositions[index].y
  );
}

function drawLineWeighted(fromNode, toNode, context, colour, lineWidth) {
  const startX = nodePositions[fromNode].x;
  const startY = nodePositions[fromNode].y;
  const endX = nodePositions[toNode].x;
  const endY = nodePositions[toNode].y;
  context.strokeStyle = colour;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.closePath();
  context.fillStyle = colour;
  context.font = "14px Times New Roman";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const weight = W[fromNode][toNode];
  const textX = (startX + endX) / 2;
  const textY = (startY + endY) / 2;
  context.fillText(`${weight}`, textX, textY);
}

function drawLine(fromNode, toNode, context, colour, lineWidth) {
  const startX = nodePositions[fromNode].x;
  const startY = nodePositions[fromNode].y;
  const endX = nodePositions[toNode].x;
  const endY = nodePositions[toNode].y;
  context.strokeStyle = colour;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.closePath();
}

function drawAllEdges(matrix, context) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > 0) {
        drawLineWeighted(i, j, context, "black", 2);
      }
    }
  }
}

drawAllEdges(W, contextNeNapr);
drawAllEdges(W, contextNapr);

drawAllNodes(contextNeNapr, "#DAB785", "black");
drawAllNodes(contextNapr, "#DAB785", "black");

const graph = new Graph();
nodePositions.forEach((_, index) => graph.addNode(index));
W = generateW(W);

for (let i = 0; i < qntnNodes; i++) {
  for (let j = i + 1; j < qntnNodes; j++) {
    if (W[i][j] > 0) {
      graph.addEdge(i, j, W[i][j]);
    }
  }
}

console.log(graph);

let steps = 0;
const minWeigh = new Array(qntnNodes).fill(Infinity);
const parent = new Array(qntnNodes).fill(null);
const visited = new Array(qntnNodes).fill(false);
minWeigh[0] = 0;
let totalWeigh = 0;
let mst = [];

function prim(graph, context) {
  let u = -1;
  for (let j = 0; j < qntnNodes; j++) {
    if (!visited[j] && (u === -1 || minWeigh[j] < minWeigh[u])) {
      u = j;
    }
  }
  visited[u] = true;
  drawNode(u, context, "rgba(154, 19, 19, 1)", "white");

  for (const { node: v, weight } of graph.getEdges(u)) {
    if (!visited[v] && weight < minWeigh[v]) {
      minWeigh[v] = weight;
      parent[v] = u;
    }
  }
  if (parent[u] != null) {
    drawLine(parent[u], u, context, "rgba(154, 19, 19, 1)", 4);
    mst.push([parent[u], u, minWeigh[u]]);
    totalWeigh += minWeigh[u];
  }
}

document.querySelector("button").addEventListener("click", () => {
  if (steps < qntnNodes) {
    prim(graph, contextNapr);
    steps++;
    console.log(steps + " step done");
  } else if (steps === qntnNodes) {
    steps++;
    drawAllNodes(contextNapr, "rgba(154, 19, 19, 1)", "white");
    console.log("prim's algorithm finished");
    console.log(mst);
    console.log("total weigh of a tree is " + totalWeigh);
  }
});
