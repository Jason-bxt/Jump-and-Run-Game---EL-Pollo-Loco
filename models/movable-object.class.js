class MovableObject extends DrawableObject {
  speed = 0.5;
  otherDirection = false;
  speedY = 20;
  acceleration = 3;
  hp = 100;
  lastHit = 0;
  ammo = 0;
  lastPick = 0;
  

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 32);
  }


  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }

  isDead() {
    return this.hp == 0;
  }

  hit() {
    if (this.hp > 0) {
      this.hp -= 1;
      
      this.lastHit = new Date().getTime();
    
    }

  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  pickUpBottle() {
    this.ammo += 10;
    if (this.ammo > 100) {
      this.ammo = 100;
      this.ammo += 0;
    }
    this.world.bottleBar.setPercentage(this.ammo);
  }

  pickUpCoin() {
    this.ammo += 4;
    if (this.ammo > 100) {
      this.ammo = 100;
    }
    this.world.bottleBar.setPercentage(this.ammo);
  }
  pickedUp() {
    let timepassed = new Date().getTime() - this.lastPick;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  moveRight() {
    this.x += this.speed;
    this.walking_sound.play();
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}