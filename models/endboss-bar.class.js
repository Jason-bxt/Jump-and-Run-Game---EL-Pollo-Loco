class EndBossBar extends DrawableObject {
  /**
   * Array of health images representing different health percentages for the end boss.
   * @type {string[]}
   */
  CHICKEN_HEALTH_IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Creates an instance of the EndBossBar class.
   */
  constructor() {
    super();
    this.percentage = 100; 
    this.loadImages(this.CHICKEN_HEALTH_IMAGES); 
    this.setPercentage(this.percentage); 
    this.x = 440; 
    this.y = 0; 
    this.height = 72; 
    this.width = 260; 
  }

  /**
   * Updates the health bar based on the end boss's current health.
   * @param {Endboss} endboss - The end boss object whose health is to be displayed.
   */
  updateHealthBar(endboss) {
    this.setPercentage(endboss.hp); 
  }

  /**
   * Sets the health percentage and updates the displayed image.
   * @param {number} percentage - The health percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.CHICKEN_HEALTH_IMAGES[this.resolveImageIndex()]; 
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