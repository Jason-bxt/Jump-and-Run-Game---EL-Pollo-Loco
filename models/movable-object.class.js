class MovableObject extends DrawableObject {
  speed = 0.5; 
  otherDirection = false; 
  speedY = 20; 
  acceleration = 3; 
  hp = 100; 
  lastHit = 0; 
  ammo = 0; 
  lastPick = 0; 

  /**
   * Applies gravity to the object, affecting its vertical position.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration; 
      }
    }, 1000 / 32);
  }

  /**
   * Checks if the object is above ground.
   * @returns {boolean} - True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true; 
    } else {
      return this.y < 200; 
    }
  }

  /**
   * Checks for a collision with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} - True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Checks for a collision with a coin.
   * @param {Object} coin - The coin object to check for collision.
   * @returns {boolean} - True if there is a collision with the coin, false otherwise.
   */
  isCollidingWithCoin(coin) {
    const offset = 20;
    return (
      this.x + this.width - offset > coin.x + offset &&
      this.x + offset < coin.x + coin.width - offset &&
      this.y + this.height - offset > coin.y + offset &&
      this.y + offset < coin.y + coin.height - offset
    );
  }

  /**
   * Checks for a collision with a bottle.
   * @param {Object} bottle - The bottle object to check for collision.
   * @returns {boolean} - True if there is a collision with the bottle, false otherwise.
   */
  isCollidingWithBottle(bottle) {
    const offset = 20;
    return (
      this.x + this.width - offset > bottle.x + offset &&
      this.x + offset < bottle.x + bottle.width - offset &&
      this.y + this.height - offset > bottle.y + offset &&
      this.y + offset < bottle.y + bottle.height - offset
    );
  }

  /**
   * Checks if the object is dead based on its health points.
   * @returns {boolean} - True if the object is dead, false otherwise.
   */
  isDead() {
    return this.hp == 0;
  }

  /**
   * Applies damage to the object, reducing its health points.
   */
  hit() {
    if (this.hp > 0) {
      this.hp -= 0.1;
      this.lastHit = new Date().getTime(); 
    }
  }

  bossHit() {
    if (this.hp > 0) {
      this.hp -= 0.5; 
      this.lastHit = new Date().getTime();
    }
  }
  /**
   * Checks if the object is currently hurt based on the last hit time.
   * @returns {boolean} - True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000; 
    return timepassed < 0.5; 
  }

  /**
   * Increases the object's ammo when picking up a bottle.
   */
  pickUpBottle() {
    this.ammo += 10; 
    if (this.ammo > 100) {
      this.ammo = 100; 
    }
    this.world.bottleBar.setPercentage(this.ammo); 
  }

  /**
   * Increases the object's ammo when picking up a coin.
   */
  pickUpCoin() {
    this.ammo += 4; 
    if (this.ammo > 100) {
      this.ammo = 100; 
    }
    this.world.bottleBar.setPercentage(this.ammo);
  }

  /**
   * Checks if the object has recently picked up an item.
   * @returns {boolean} - True if the object picked up an item recently, false otherwise.
   */
  pickedUp() {
    let timepassed = new Date().getTime() - this.lastPick; 
    timepassed = timepassed / 1000; 
    return timepassed < 0.5; 
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed; 
    this.walking_sound.play(); 
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30; 
  }

  /**
   * Plays the animation for the object based on the provided images.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; 
    let path = images[i];
    this.img = this.imageCache[path]; 
    this.currentImage++; 
  }
}