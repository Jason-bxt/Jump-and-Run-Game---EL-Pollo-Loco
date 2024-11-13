class Cloud extends MovableObject {

  x = 0;
  y = 20;
  height = 280;
  width = 600;
  speed = 0.15;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.animate();
  }

    animate() {
    this.moveLeft();
    }

    moveLeft(){
      setInterval(() => {
        this.x -= this.speed;
      }, 1000/60);
    }
     }
