window.onload = function () {
  // Definitions
  var canvas = document.getElementById('sprite-lab-canvas');
  var context = canvas.getContext('2d');

  var background = new Image();
  background.src = 'back.png';
  background.onload = function () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  };

  let hero = new Image();
  hero.src = 'sprite.png';
  hero.onload = function () {
    context.drawImage(hero, 0, 0, 256, 256, 100, 280, 100, 100);
  };

  window.requestAnimationFrame(animationLoop);

  let heroX = 0;

  const heroCellWidth = 256;
  const heroCellHeight = 256;
  let currentFrame = 0;

  let animateTimeStart = new Date();

  let moveX = 0;

  function animationLoop() {
    let animateTimeNow = new Date();
    if (animateTimeNow - animateTimeStart >= 100) {
      animateTimeStart = animateTimeNow;

      // Clear
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      currentFrame++;
      currentFrame %= 6;
      moveX += 10;
      if (moveX >= canvas.width) moveX = -1 * heroCellWidth;

      // Draw
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.drawImage(
        hero,
        heroCellWidth * currentFrame,
        0,
        heroCellWidth,
        heroCellHeight,
        100 + moveX,
        280,
        100,
        100
      );
    }

    // Animate
    window.requestAnimationFrame(animationLoop);
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
