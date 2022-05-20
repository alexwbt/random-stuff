
class Clock {

  constructor() {

    /** The time of the clock. @type {Date} */
    this.time = new Date();

    /* measurements */

    /** The x position of the clock on the canvas. @type {number} */
    this.x = 0;
    /** The y position of the clock on the canvas. @type {number} */
    this.y = 0;
    /** The radius of the clock. @type {number} */
    this.radius = 100;

    /** The ratio of the clock body to clock frame in fraction. @type {number} */
    this.bodySize = 0.95;

    /* colors */

    /** The color of the clock frame. @type {string} */
    this.frameColor = 'black';
    /** The color of the clock body. @type {string} */
    this.bodyColor = 'white';
    /** The color of the numbers and lines on the clock. @type {string} */
    this.textColor = 'black';
    /** The colors of the clock arms. @type {string[]}  */
    this.armColors = ['red', 'black', 'black'];
  }

  /**
   * Renders the clock on a canvas
   * @param {CanvasRenderingContext2D} ctx canvas 2d rendering context
   */
  render(ctx) {
    // constants
    const N = 12;
    const D = 60;

    // render the frame of the clock.
    ctx.fillStyle = this.frameColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    // render the body of the clock.
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.bodySize, 0, 2 * Math.PI);
    ctx.fill();

    // render the numbers on the clock.
    ctx.fillStyle = this.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${this.radius * 0.2}px Arial`;

    for (let i = 1; i <= N; i++) {
      const radians = 2 * Math.PI / N * i;
      const x = this.x + Math.sin(radians) * this.radius * 0.75;
      const y = this.y + Math.cos(radians) * -this.radius * 0.75;
      ctx.fillText(`${i}`, x, y);
    }

    // render the lines on the clock.
    ctx.strokeStyle = this.textColor;
    ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.1;

    const d = 5;
    const count = N * d;
    for (let i = 1; i <= count; i++) {
      ctx.lineWidth = this.radius * (1 - this.bodySize) * (i % d === 0 ? 0.2 : 0.1);
      const r = i % d === 0 ? 0.88 : 0.9;

      const radians = 2 * Math.PI / count * i;
      const x1 = this.x + Math.sin(radians) * this.radius * r;
      const y1 = this.y + Math.cos(radians) * this.radius * r;
      const x2 = this.x + Math.sin(radians) * this.radius * this.bodySize;
      const y2 = this.y + Math.cos(radians) * this.radius * this.bodySize;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
    }

    // render second hand.
    const milliseconds = this.time.getMilliseconds();
    const seconds = this.time.getSeconds() + milliseconds / 1000;
    (() => {
      ctx.strokeStyle = this.armColors[0];
      ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.3;

      const radians = 2 * Math.PI * seconds / D;
      const x = this.x + Math.sin(radians) * this.radius * 0.8;
      const y = this.y + Math.cos(radians) * -this.radius * 0.8;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    })();

    // render minute hand.
    const minutes = this.time.getMinutes() + seconds / D;
    (() => {
      ctx.strokeStyle = this.armColors[1];
      ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.5;

      const radians = 2 * Math.PI * minutes / D;
      const x = this.x + Math.sin(radians) * this.radius * 0.8;
      const y = this.y + Math.cos(radians) * -this.radius * 0.8;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    })();

    // render hour hand.
    const hours = this.time.getHours() + minutes / D;
    (() => {
      ctx.strokeStyle = this.armColors[2];
      ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.6;

      const radians = 2 * Math.PI * hours / N;
      const x = this.x + Math.sin(radians) * this.radius * 0.5;
      const y = this.y + Math.cos(radians) * -this.radius * 0.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    })();

    // render circle in the middle of the clock.
    ctx.fillStyle = this.textColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.02, 0, 2 * Math.PI);
    ctx.fill();
  }

}
