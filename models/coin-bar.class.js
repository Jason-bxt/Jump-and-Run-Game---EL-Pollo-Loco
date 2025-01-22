class CoinBar extends DrawableObject {
  /**
   * Array of coin images representing different coin percentages.
   * @type {string[]}
   */
  COIN_IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 100; 

  /**
   * Creates an instance of the CoinBar class.
   */
  constructor() {
    super(); 
    this.loadImages(this.COIN_IMAGES); 
    this.setPercentage(0); 
    this.x = 40; 
    this.y = 35; 
    this.height = 56; 
    this.width = 220; 
  }

  /**
   * Sets the coin percentage and updates the displayed image.
   * @param {number} percentage - The coin percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.COIN_IMAGES[this.resolveImageIndex()]; 
    this.img = this.imageCache[path]; 
  }

  /**
   * Resolves the index of the coin image based on the current percentage.
   * @returns {number} - The index of the coin image.
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
