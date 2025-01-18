class Chicken2 extends MovableObject {
  height = 100;
  width = 100;
  x = 80;
  y = 320;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  isDead = false;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 1200 + Math.random() * 8000;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 1.0 + Math.random() * 0.3;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }

  enemiesDead() {
    this.isDead = true;
    this.speed = 0;
    this.loadImages(this.IMAGES_DEAD);
  }
}
