
class DraggableClock extends Clock {

  constructor() {
    /** True while user is dragging one of the clock arms. @type {boolean} */
    this.dragging = false;
  }

  /**
   * Update method
   * @override
   */
  update() {
    // only update time when user is not dragging any of the clock arms
    if (!this.dragging)
      super.update();
  }

  mouseMove() {

  }

  mouseDown() {

  }

  mouseUp() {

  }

}
