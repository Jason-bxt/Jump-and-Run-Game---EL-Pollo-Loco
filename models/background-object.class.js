class BackgroundObject extends MovableObject {
  width = 720; 
  height = 480; 

  /**
   * Creates an instance of the BackgroundObject class.
   * @param {string} imagePath - The path to the image to be used for the background object.
   * @param {number} x - The initial x position of the background object.
   * @param {number} y - The initial y position of the background object.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath); 
    this.x = x; 
    this.y = 480 - this.height; 
  }
}