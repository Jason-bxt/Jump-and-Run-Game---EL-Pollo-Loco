class BottleBar extends DrawableObject {
  /**
   * Array of bottle images representing different bottle percentages.
   * @type {string[]}
   */
  BOTTLE_IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0; 

  /**
   * Creates an instance of the BottleBar class.
   */
  constructor() {
    super(); 
    this.loadImages(this.BOTTLE_IMAGES); 
    this.setPercentage(0); 
    this.x = 40; 
    this.y = 80; 
    this.height = 56; 
    this.width = 200; 
  }

  /**
   * Sets the bottle percentage and updates the displayed image.
   * @param {number} percentage - The bottle percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.BOTTLE_IMAGES[this.resolveImageIndex()]; 
    this.img = this.imageCache[path]; 
  }

  /**
   * Resolves the index of the bottle image based on the current percentage.
   * @returns {number} - The index of the bottle image.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5; 
    } else if (this.percentage >= 80) {
      return 4; 
    } else if (this.percentage >= 60) {
      return 3; 
    } else if (this.percentage >= 40) {
      return 2; 
    } else if (this.percentage >= 20) {
      return 1; 
    } else {
      return 0; 
    }
  }
}
