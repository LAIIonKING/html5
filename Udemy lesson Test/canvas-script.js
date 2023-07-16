window.onload = function () {
  var canvas = document.getElementById('images-canvas');
  var context = canvas.getContext('2d');

  drawRandomColorRectangle(230, 107, 400, 250);

  function drawRandomColorRectangle(x, y, w, h) {
    const color = createRandomRGBColor();
    const fillOpacity = Math.random();
    const fillColor = `rgba(${color.r}, ${color.g},${color.b},${fillOpacity})`;
    const borderColor = `rgba(${color.r}, ${color.g},${color.b})`;

    x = getRamdomInt(0, canvas.width);
    y = getRamdomInt(0, canvas.height);
    w = getRamdomInt(0, canvas.width - x);
    h = getRamdomInt(0, canvas.height - y);

    context.beginPath();
    context.fillStyle = fillColor;
    context.strokeStyle = borderColor;
    context.rect(x, y, w, h);
    context.stroke();
    context.fill();
  }

  function createRandomRGBColor() {
    const red = getRamdomInt(0, 257);
    const green = getRamdomInt(0, 257);
    const blue = getRamdomInt(0, 257);
    return { r: red, g: green, b: blue };
  }

  function getRamdomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
