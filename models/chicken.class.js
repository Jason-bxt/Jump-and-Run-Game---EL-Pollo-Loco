class Chicken extends MovableObject {
  height = 60; 
  width = 60; 
  x = 80; 
  y = 355; 

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ]; 

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"]; 
  
  isDead = false; 

  movementInterval; 
  animationInterval; 

  /**
   * Creates an instance of the Chicken class.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"); 
    this.loadImages(this.IMAGES_WALKING); 
    this.speed = 3.5 + Math.random() * 0.4; 
    this.x = 3200 + Math.random() * 12000; 

    this.animate(); 
  }

  /**
   * Stops all ongoing animations for the chicken.
   */
  stopAllAnimations() {
    clearInterval(this.movementInterval); 
    clearInterval(this.animationInterval); 
  }

  /**
   * Initiates the movement and animation cycles for the chicken.
   */
  animate() {
    this.movementInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft(); 
      }
    }, 1000 / 60); 

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING); 
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100); 
  }

  /**
   * Marks the chicken as dead and stops its movement.
   */
  enemiesDead() {
    this.isDead = true; 
    this.speed = 0; 
    this.loadImages(this.IMAGES_DEAD); 
    // this.walking_sound.pause(); 
  }
}
