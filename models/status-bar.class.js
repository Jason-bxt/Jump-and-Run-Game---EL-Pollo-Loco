class StatusBar extends DrawableObject {
  /**
   * Array of health images representing different health percentages.
   * @type {string[]}
   */
  HEALTH_IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percentage = 100; 

  /**
   * Creates an instance of StatusBar.
   */
  constructor() {
    super();
    this.loadImages(this.HEALTH_IMAGES); 
    this.setPercentage(100); 
    this.x = 40; 
    this.y = -10; 
    this.height = 60; 
    this.width = 240; 
  }

  /**
   * Sets the health percentage and updates the displayed image.
   * @param {number} percentage - The health percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.HEALTH_IMAGES[this.resolveImageIndex()]; 
    this.img = this.imageCache[path]; 
  }

  /**
   * Resolves the index of the health image based on the current percentage.
   * @returns {number} - The index of the health image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
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
