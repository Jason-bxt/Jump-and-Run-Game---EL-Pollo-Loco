class Cloud extends MovableObject {
  x = 0; 
  y = 20; 
  height = 280; 
  width = 600; 
  speed = 0.25; 

  /**
   * Creates an instance of the Cloud class.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png"); 
    this.x = 200 + Math.random() * 10000; 
    this.animate(); 
  }

  /**
   * Initiates the animation for the cloud.
   */
  animate() {
    this.moveLeft(); 
  }

  /**
   * Moves the cloud to the left at a set interval.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; 
    }, 1000 / 60); 
  }
}