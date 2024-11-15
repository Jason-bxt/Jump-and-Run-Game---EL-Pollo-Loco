class Chicken extends MovableObject {
  height = 80;
  width = 80;
  x = 80;
  y = 340;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  walking_sound = new Audio('audio/chicken2.MP3');
  screaming_sound = new Audio('audio/chicken.MP3');


  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = 400 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);

    this.speed = 0.2 + Math.random() * 0.25;

    this.animate();
  }


  animate() {
    this.moveLeft();

    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);

    // setInterval(() => {
    //  this.walking_sound.play();
    // }, 4000);
    // setInterval(() => {
    //   this.screaming_sound.play();
    //  }, 8000);
   }
  }

