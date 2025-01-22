class Coin extends DrawableObject {
  height = 100; 
  width = 100; 
  x = 80; 
  y = 20; 

  IMAGES_COIN = ["img/8_coin/coin_1.png"]; 

  /**
   * Creates an instance of the Coin class.
   */
  constructor() {
    super(); 
    this.loadImages(this.IMAGES_COIN); 
    this.x = 600 + Math.random() * 8000; 
    this.y = 0 + Math.random() * 160; 
    this.img = this.imageCache[this.IMAGES_COIN[0]]; 
  }
}