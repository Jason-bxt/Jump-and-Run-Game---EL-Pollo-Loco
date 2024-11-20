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
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
  ];
  isDead = false;
  walking_sound = new Audio('audio/chicken2.MP3');
  screaming_sound = new Audio('audio/chicken.MP3');


  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = 600 + Math.random() * 5000;
    this.loadImages(this.IMAGES_WALKING);

    this.speed = 0.2 + Math.random() * 0.25;

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
    this.loadImages(this.IMAGES_DEAD);
  }
    // setInterval(() => {
    //  this.walking_sound.play();
    // }, 4000);
    // setInterval(() => {
    //   this.screaming_sound.play();
    //  }, 8000);
   }
  

