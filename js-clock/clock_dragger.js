
class DraggableClock extends Clock {

  /**
   * Constructor.
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super();
    /** The canvas object. @type {HTMLCanvasElement} */
    this.canvas = canvas;
    /** 
     * True while user is dragging one of the clock arms. 
     * - not dragging = 0
     * - dragging second hand = 1
     * - dragging minute hand = 2
     * - dragging hour hand = 3
     * @type {number} 
     */
    this.dragging = 0;

    /** x position of the mouse @type {number} */
    this.mouseX = 0;
    /** y position of the mouse @type {number} */
    this.mouseY = 0;
  }

  /**
   * Update method
   * @param {number} deltaTime delta time between last update and now in milliseconds.
   * @override
   */
  update(deltaTime) {
    // only update time when user is not dragging any of the clock arms
    if (!this.dragging) {
      super.update(deltaTime);

      // update cursor style
      const onHands = [
        this.isPointOnSecondHand(this.mouseX, this.mouseY),
        this.isPointOnMinuteHand(this.mouseX, this.mouseY),
        this.isPointOnHourHand(this.mouseX, this.mouseY)
      ];
      this.canvas.style.cursor = onHands.some(e => e) ? 'grab' : 'auto';
    } else {
      this.canvas.style.cursor = 'grabbing';
    }
  }

  /**
   * Returns true if distance between a point and a arm is smaller than the width of the arm.
   * @param {number} x point x
   * @param {number} y point y
   * @param {{
   *    x1: number;
   *    y1: number;
   *    x2: number;
   *    y2: number;
   * }} line clock arm path
   * @param {number} width clock arm width
   * @returns {boolean}
   */
  isPointOnHand(x, y, line, width) {
    const { x1, y1, x2, y2 } = line;

    // return false if (x, y) is out of the arm's bounding box
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    if (x < minX || x > maxX || y < minY || y > maxY)
      return false;

    // find the slope and y-intercept of the arm
    const m = (y2 - y1) / (x2 - x1); // the slope formula
    const b = y1 - m * x1; // using one of the points and the slope to get y-intercept

    // find the slope and y-intercept of the line perpendicular to the arm
    const m2 = -1 / m; // the slope of a perpendicular line (negative inverse)
    const b2 = y - m2 * x; // y-intercept of the perpendicular line

    // find intersection point of the two lines
    const ix = (b2 - b) / (m - m2);
    const iy = m * ix + b;

    // compare distance from (x, y) to the intersection point (ix, iy) with arm width
    const distanceSquare = Math.pow(ix - x, 2) + Math.pow(iy - y, 2);
    const armWidthSquare = Math.pow(this.radius * (1 - this.bodySize) * width, 2);
    return distanceSquare < armWidthSquare;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean} True if provided point is on the second hand.
   */
  isPointOnSecondHand(x, y) {
    return this.isPointOnHand(x, y, this.getSecondHandPath(), this.armWidths[0]);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean} True if provided point is on the minute hand.
   */
  isPointOnMinuteHand(x, y) {
    return this.isPointOnHand(x, y, this.getMinuteHandPath(), this.armWidths[1]);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean} True if provided point is on the hour hand.
   */
  isPointOnHourHand(x, y) {
    return this.isPointOnHand(x, y, this.getHourHandPath(), this.armWidths[2]);
  }

  /**
   * handle mouse move
   * @param {number} x
   * @param {number} y
   */
  mouseMove(x, y) {
    // update time according to mouse movement when dragging
    if (this.dragging) {
      const radians = Math.atan2(this.x - x, y - this.y);
      const armRadians = [
        () => this.getSecondHandRadians(),
        () => this.getMinuteHandRadians(),
        () => this.getHourHandRadians(),
      ][this.dragging - 1]();

      // find difference between two distance
      const d = (radians + Math.PI) - armRadians;
      if (d !== 0) {
        const sign = d / Math.abs(d);
        const phi = Math.abs(d) % (2 * Math.PI);
        const flip = phi > Math.PI;
        const distance = flip ? (2 * Math.PI) - phi : phi;

        const factor = [60 * 1000, 60 * 60 * 1000, 60 * 60 * 12 * 1000][this.dragging - 1];
        const diffTime = distance * factor / (2 * Math.PI);

        // add time difference to this.time
        this.time = new Date(this.time.getTime() + diffTime * sign * (flip ? -1 : 1));
      }
    }

    this.mouseX = x;
    this.mouseY = y;
  }

  /**
   * handle mouse down
   */
  mouseDown() {
    if (this.isPointOnSecondHand(this.mouseX, this.mouseY))
      this.dragging = 1;
    else if (this.isPointOnMinuteHand(this.mouseX, this.mouseY))
      this.dragging = 2;
    else if (this.isPointOnHourHand(this.mouseX, this.mouseY))
      this.dragging = 3;
    else
      this.dragging = 0;
  }

  /**
   * handle mouse up
   */
  mouseUp() {
    this.dragging = false;
  }

}
