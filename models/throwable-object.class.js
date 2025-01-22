class ThrowableObject extends MovableObject {
  /**
   * Creates an instance of ThrowableObject.
   * @param {number} x - The x-coordinate of the throwable object.
   * @param {number} y - The y-coordinate of the throwable object.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = x; 
    this.y = y; 
    this.height = 60; 
    this.width = 50; 
    this.throw(); 
  }

  /**
   * Throws the object by applying speed and gravity.
   */
  throw() {
    this.speedY = 10; 
    this.applyGravity();
    setInterval(() => {
      this.x += 30;
    }, 30); 
  }
}
