'use strict';

function BarChart(targetId, width, height, data) {
  const chart = this;

  chart.configureChart(targetId, width, height, data);

  chart.performPreOperations();

  chart.drawChart();
  console.log(chart);
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
  const chart = this;

  //Global Canvas Specifications
  chart.setCanvasParameters(targetId, width, height, data);

  chart.setChartParameters(targetId, width, height, data);
};

BarChart.prototype.setCanvasParameters = function (
  targetId,
  width,
  height,
  data
) {
  const chart = this;

  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function (
  targetId,
  width,
  height,
  data
) {
  const chart = this;

  //Axe
  chart.axisRatio = 10;
  chart.verticalMargin = (chart.width * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.height * chart.axisRatio) / 100;
  chart.axisColor = '#b1b1b1';
  chart.axisWidth = 0.75;

  //Label
  chart.fontRatio = 3;
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = '300';
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  //GuideLine
  chart.guideLineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performPreOperations = function () {
  const chart = this;

  chart.createCanvas();

  chart.handleData();

  chart.prepareData();
};

BarChart.prototype.createCanvas = function () {
  const chart = this;

  const canvas = document.createElement('canvas');
  canvas.id = chart.id + '-' + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  document.getElementById(chart.id).innderHTML = '';
  document.getElementById(chart.id).appendChild(canvas);

  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');
};

BarChart.prototype.handleData = function () {
  const chart = this;

  chart.labels = [];
  chart.values = [];

  chart.data.forEach((item) => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function () {
  const chart = this;

  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin;
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin;

  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function () {
  const chart = this;

  chart.drawAxis();

  chart.drawVerticalLabels();

  chart.drawHorizontalLabels();

  chart.drawHorizontalGuidelines();

  chart.drawVerticalGuidelines();

  chart.drawBars();
};

BarChart.prototype.drawAxis = function () {
  const chart = this;

  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabels = function () {
  const chart = this;

  const labelFont =
    chart.fontStyle +
    ' ' +
    chart.fontWeight +
    ' ' +
    chart.verticalFontSize +
    'px ' +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = 'right';
  chart.context.fillStyle = chart.fontColor;

  // Scale Values
  const scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  //Draw labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    const labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
    const verticalLabelX =
      chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalLabels = function () {
  const chart = this;

  const labelFont =
    chart.fontStyle +
    ' ' +
    chart.fontWeight +
    ' ' +
    chart.verticalFontSize +
    'px ' +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = 'center';
  chart.context.textBaseline = 'top';
  chart.context.fillStyle = chart.fontColor;

  // Draw Labels
  for (let i = 0; i < chart.itemsNum; i++) {
    const horizontalLabelX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / 2;
    const horizontalLabelY =
      chart.height -
      chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio;
    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuidelines = function () {
  const chart = this;

  chart.context.strokeStyle = chart.guideLineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Scale Values
  const scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  //Draw lines
  for (let i = 0; i <= chart.itemsNum; i++) {
    const horizontalGuidelineStartX = chart.horizontalMargin;
    const horizontalGuidelineStartY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;

    const horizontalGuideLineEndX =
      chart.horizontalMargin + chart.horizontalAxisWidth;
    const horizontalGuideLineEndY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuideLineEndX, horizontalGuideLineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawVerticalGuidelines = function () {
  const chart = this;

  chart.context.strokeStyle = chart.guideLineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  for (let i = 0; i <= chart.itemsNum; i++) {
    const verticalGuidelineStartX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq;
    const verticalGuidelineStartY = chart.height - chart.verticalMargin;

    const verticalGuidelineEndX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq;
    const verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawBars = function () {
  const chart = this;

  for (let i = 0; i < chart.itemsNum; i++) {
    const color = chart.createRandomRGBColor();
    const fillOpacity = 0.3;
    const fillColor = `rgba(${color.r},${color.g},${color.b},${fillOpacity})`;
    const borderColor = `rgba(${color.r},${color.g},${color.b})`;

    chart.context.beginPath();

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;
    const barX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / 4;
    const barY = chart.height - chart.verticalMargin;
    const barWidth = chart.horizontalLabelFreq / 2;
    const barHeight =
      (-1 * chart.verticalAxisWidth * chart.values[i]) / chart.maxValue;

    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.createRandomRGBColor = function () {
  const red = getRamdomInt(0, 257);
  const green = getRamdomInt(0, 257);
  const blue = getRamdomInt(0, 257);
  return { r: red, g: green, b: blue };
};
function getRamdomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
