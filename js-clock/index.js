
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// clock
const clock = new DraggableClock(canvas);

canvas.addEventListener('mousemove', e => {
  clock.mouseMove(e.x, e.y);
});
canvas.addEventListener('mousedown', () => {
  clock.mouseDown();
});
canvas.addEventListener('mouseup', () => {
  clock.mouseUp();
});

let startTime = Date.now();
const loop = () => {

  /* update */

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  clock.x = canvas.width / 2;
  clock.y = canvas.height / 2;
  clock.radius = Math.min(canvas.width, canvas.height) * 0.4;

  clock.update(Date.now() - startTime);
  startTime = Date.now();

  /* render */

  ctx.fillStyle = '#EFEFEF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  clock.render(ctx);

  // loop
  window.requestAnimationFrame(loop);
};
loop();
