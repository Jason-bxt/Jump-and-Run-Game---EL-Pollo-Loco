class Bottle extends DrawableObject {
  height = 80; 
  width = 80; 
  x = 80; 
  y = 340; 

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"]; 

  /**
   * Creates an instance of the Bottle class.
   */
  constructor() {
    super(); 
    this.loadImages(this.IMAGES_BOTTLE); 
    this.x = 500 + Math.random() * 9000; 
    this.img = this.imageCache[this.IMAGES_BOTTLE[0]]; 
  }
}
