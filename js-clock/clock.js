
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
   * @returns {number} the milliseconds of this.time.
   */
  getMilliseconds() {
    return this.time.getMilliseconds();
  }

  /**
   * @returns {number} the seconds of this.time with milliseconds as a fraction.
   */
  getSeconds() {
    return this.time.getSeconds() + this.getMilliseconds() / 1000;
  }

  /**
   * @returns {number} the minutes of this.time with seconds and milliseconds as a fraction.
   */
  getMinutes() {
    return this.time.getMinutes() + this.getSeconds() / 60;
  }

  /**
   * @returns {number} the hours of this.time with minutes, seconds and milliseconds as a fraction.
   */
  getHours() {
    return this.time.getHours() + this.getMinutes() / 60;
  }

  /**
   * @returns {{
   *    x1: number;
   *    y1: number;
   *    x2: number;
   *    y2: number;
   * }} A line representing the second hand.
   */
  getSecondHandPath() {
    const radians = 2 * Math.PI * this.getSeconds() / 60;
    const x2 = this.x + Math.sin(radians) * this.radius * 0.8;
    const y2 = this.y + Math.cos(radians) * -this.radius * 0.8;
    return { x1: this.x, y1: this.y, x2, y2 };
  }

  /**
   * @returns {{
   *    x1: number;
   *    y1: number;
   *    x2: number;
   *    y2: number;
   * }} A line representing the minute hand.
   */
  getMinuteHandPath() {
    const radians = 2 * Math.PI * this.getMinutes() / 60;
    const x2 = this.x + Math.sin(radians) * this.radius * 0.8;
    const y2 = this.y + Math.cos(radians) * -this.radius * 0.8;
    return { x1: this.x, y1: this.y, x2, y2 };
  }

  /**
   * @returns {{
   *    x1: number;
   *    y1: number;
   *    x2: number;
   *    y2: number;
   * }} A line representing the hour hand.
   */
  getHourHandPath() {
    const radians = 2 * Math.PI * this.getHours() / 12;
    const x2 = this.x + Math.sin(radians) * this.radius * 0.5;
    const y2 = this.y + Math.cos(radians) * -this.radius * 0.5;
    return { x1: this.x, y1: this.y, x2, y2 };
  }

  /**
   * Update method
   * @param {number} deltaTime delta time between last update and now in milliseconds.
   */
  update(deltaTime) {
    this.time = new Date(this.time.getTime() + deltaTime);
  }

  /**
   * Renders the clock on a canvas
   * @param {CanvasRenderingContext2D} ctx canvas 2d rendering context
   */
  render(ctx) {
    // constants
    const HOURS = 12;

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

    for (let i = 1; i <= HOURS; i++) {
      const radians = 2 * Math.PI / HOURS * i;
      const x = this.x + Math.sin(radians) * this.radius * 0.75;
      const y = this.y + Math.cos(radians) * -this.radius * 0.75;
      ctx.fillText(`${i}`, x, y);
    }

    // render the lines on the clock.
    ctx.strokeStyle = this.textColor;
    ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.1;

    const d = 5;
    const count = HOURS * d;
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

    /**
     * @param {{
     *    x1: number;
     *    y1: number;
     *    x2: number;
     *    y2: number;
     * }} line
     */
    const drawLine = line => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.closePath();
      ctx.stroke();
    };

    // render second hand.
    ctx.strokeStyle = this.armColors[0];
    ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.3;
    drawLine(this.getSecondHandPath());

    // render minute hand.
    ctx.strokeStyle = this.armColors[1];
    ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.5;
    drawLine(this.getMinuteHandPath());

    // render hour hand.
    ctx.strokeStyle = this.armColors[2];
    ctx.lineWidth = this.radius * (1 - this.bodySize) * 0.6;
    drawLine(this.getHourHandPath());

    // render circle in the middle of the clock.
    ctx.fillStyle = this.textColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.02, 0, 2 * Math.PI);
    ctx.fill();
  }

}
