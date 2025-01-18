class EndBossBar extends DrawableObject {
  CHICKEN_HEALTH_IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

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
  updateHealthBar(endboss) {
    this.setPercentage(endboss.hp); // Aktualisiere die Gesundheitsanzeige basierend auf den Lebenspunkten des Endbosses
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.CHICKEN_HEALTH_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
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
