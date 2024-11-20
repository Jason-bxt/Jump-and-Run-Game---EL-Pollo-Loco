class ThrowableObject extends MovableObject {
  
  constructor(y, x){
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.weight = 50;
    this.throw();
  }


  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval (() => {
      this.x += 10;
    }, 25)
  }
}