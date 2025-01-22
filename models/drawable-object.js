class DrawableObject {
  img; 
  imageCache = {}; 
  currentImage = 0; 

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image(); 
    this.img.src = path; 
  }

  /**
   * Draws the image on the specified canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
  }

  /**
   * Draws a frame around the object for debugging purposes.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  drawFrame(ctx) {
    // if (this instanceof Character || this instanceof Chicken || this instanceof Chicken2 || this instanceof Coin || this instanceof Bottle) {
    //   ctx.beginPath(); 
    //   ctx.lineWidth = "5"; 
    //   ctx.strokestyle = "blue"; 
    //   ctx.rect(this.x, this.y, this.width, this.height); 
    //   ctx.stroke(); 
    // }
  }

  /**
   * Loads multiple images from an array of paths and caches them.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); 
      img.src = path; 
      this.imageCache[path] = img; 
    });
  }
}