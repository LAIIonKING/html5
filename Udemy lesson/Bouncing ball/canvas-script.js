window.onload = function () {
  // Definitions
  var canvas = document.getElementById('bouncing-ball-canvas');
  var context = canvas.getContext('2d');

  var ballX = 400;
  var ballY = 300;
  var ballRadius = 30;
  var ballColor = 'orange';
  var changeX = 4;
  var changeY = 4;

  window.requestAnimationFrame(animationLoop);

  function animationLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    ballX += changeX;
    ballY += changeY;

    drawBall(ballX, ballY, ballRadius, ballColor);

    if (ballY + ballRadius > canvas.height) changeY *= -1;
    else if (ballX + ballRadius > canvas.width) changeX *= -1;
    else if (ballY - ballRadius < 0) changeY *= -1;
    else if (ballX - ballRadius < 0) changeX *= -1;

    window.requestAnimationFrame(animationLoop);
  }

  function drawBall(x, y, radius, color) {
    var radian = Math.PI / 180;

    context.beginPath();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 360 * radian, false);
    context.stroke();
    context.fill();
  }

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
};
