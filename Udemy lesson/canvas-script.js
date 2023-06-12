let min = 1;
let max = 200;

let data = [
  { label: 'Jan', value: getRamdomInt(min, max) },
  { label: 'Fab', value: getRamdomInt(min, max) },
  { label: 'Mar', value: getRamdomInt(min, max) },
  { label: 'Apr', value: getRamdomInt(min, max) },
  { label: 'May', value: getRamdomInt(min, max) },
];

let targetId = 'chart';
let canvasWidth = 600;
let canvasHeight = 450;

window.onload = function () {
  const chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
};

function getRamdomInt() {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
