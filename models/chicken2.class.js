class Chicken2 extends MovableObject {
  height = 80;
  width = 80;
  x = 80;
  y = 340;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  walking_sound = new Audio('audio/chicken2.MP3');
  screaming_sound = new Audio('audio/chicken.MP3');


  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 1200 + Math.random() * 5800;
    this.loadImages(this.IMAGES_WALKING);

    this.speed = 0.4 + Math.random() * 0.3;

    this.animate();
  }


  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);


    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);

    // setInterval(() => {
    //  this.walking_sound.play();
    // }, 4000);
    // setInterval(() => {
    //   this.screaming_sound.play();
    //  }, 8000);
   }
  }