class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  background_music = new Audio("audio/background-music.mp3");
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  throwableObjects = [new ThrowableObject()];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.background_music.loop = true;
    // this.background_music.play();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBootleCollisions();
      this.checkCoinCollisions();
      this.checkChickenCollisions();
      this.checkThrowObject();
    }, 200);
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.hp);
        }
      });
    }, 1000);
  }

  checkBootleCollisions() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.character.pickUpBottle();
          this.bottleBar.setPercentage(this.character.ammo);
          this.level.bottles.splice(index, 1);
        }
      });
    }, 100);
  }

  checkCoinCollisions() {
    setInterval(() => {
      this.level.coines.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.character.pickUpCoin();
          this.coinBar.setPercentage(this.character.ammo);

          this.level.coines.splice(index, 1);
        }
      });
    }, 100);
  }

  checkThrowObject() {
    if (this.keyboard.SPACE) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
    }
  }

  checkChickenCollisions() {
    this.level.enemies.forEach((chicken) => {
      const characterBottom = this.character.y + this.character.height;
      const chickenTop = chicken.y + chicken.width;

      if (this.character.isColliding(chicken) && characterBottom >= chickenTop ){ 
        //  loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
         chicken.enemiesDead();
         console.log("Character jumped on chicken");
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coines);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
}
