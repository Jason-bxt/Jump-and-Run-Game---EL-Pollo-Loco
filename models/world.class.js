class World {
  character = new Character();
  level = null;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endBossBar = new EndBossBar();
  throwableObjects = [new ThrowableObject()];

  backgroundMusic = new Audio("audio/backgroundMusic.MP3");
  coinSound = new Audio("audio/coin.MP3");
  damage = new Audio("audio/damage (2).MP3");
  screaming_sound = new Audio("audio/angry-chicken (2).MP3");

  gameState = "start";
  isGameRunning = false;
  lastThrowTime = 0;
  throwCooldown = 500;
  otherDirection = false;
  endBossBarVisible = false;


  GAME_OVER = ["img/9_intro_outro_screens/game_over/game over.png"];
  VICTORY = ["img/9_intro_outro_screens/win/won_2.png"];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGame();
    this.restartGame();


    this.volumeController = new VolumeController([
      this.backgroundMusic,
      this.coinSound,
      this.damage,
      this.screaming_sound,
    ]);

    this.backgroundMusic.volume = 0.008;
    this.coinSound.volume = 0.01;
    this.damage.volume = 0.04;
    this.screaming_sound.volume = 0.1;
  }

  setWorld() {
    this.character.world = this;

    document.addEventListener(
      "click",
      () => {
        this.backgroundMusic.play().catch((e) => {
          console.error("Error playing background music:", e);
        });
      },
      { once: true }
    );
  }

  draw() {
    if (this.gameState === "start") {
      // Hier kannst du den Startbildschirm zeichnen, falls nötig
    } else if (this.gameState === "playing") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.bottleBar);
      this.addToMap(this.endBossBar);
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.endboss);
    
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.coines);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);

      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  startGame() {
    const startImg = document.querySelector(".start-img");
    const button = document.getElementById("start-button");

    button.addEventListener("click", () => {
      const computedStyle = window.getComputedStyle(startImg);
      if (computedStyle.display === "block") {
        this.gameState = "playing";
        this.isGameRunning = true;
        initLevel();
        this.level = level1;
        this.run();
        this.draw();
        button.style.display = "none";
        startImg.style.display = "none";
      } else {
        console.warn("Image not loaded yet. Please wait.");
      }
    });
  }
  restartGame() {
    const restartButton = document.getElementById("restart-button");
    const gameOverImg = document.getElementById("game-over");
    const gameVictoryImg = document.getElementById("game-victory");
  
    restartButton.addEventListener("click", () => {
      this.gameState = "playing";
      this.isGameRunning = true;
  
      // Setze die Charakter- und Statuswerte zurück
      this.character.hp = 100;
      this.statusBar.setPercentage(this.character.hp);
  
      this.character.ammo = 0;
      this.bottleBar.setPercentage(this.character.ammo);
  
      this.coinBar.setPercentage(0);

      initLevel();
      this.level = level1;
  
      this.run();
      this.draw();
      restartButton.style.display = "none";
      gameOverImg.style.display = "none";
      gameVictoryImg.style.display = "none";
    });
  }
  finishedGame() {
    const gameOverImg = document.getElementById("game-over");
    const gameVictoryImg = document.getElementById("game-victory");
    const restartButton = document.getElementById("restart-button");

    if (this.endBossBar.percentage <= 0) {
      gameVictoryImg.style.display = "flex";
      restartButton.style.display = "flex";
      
    }else if (this.statusBar.percentage <= 0) {
      gameOverImg.style.display = "flex";
      restartButton.style.display = "flex";
  
    }
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBootleCollisions();
      this.checkCoinCollisions();
      this.checkChickenCollisions();
      this.checkThrowObject();
      this.checkBottleHitsEnemy();
      this.checkBossCollisions();
    }, 50);
  }

  
  checkCollisions() {
    // Check collision with regular enemies
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        const characterBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y;
        this.finishedGame();
  

        if (characterBottom < enemyTop) {
        } else if (this.character.isOnGround) { // Überprüfe, ob der Charakter auf dem Boden ist
          this.character.hit();
          this.statusBar.setPercentage(this.character.hp);
          this.finishedGame();
          this.damage.play();
        }
      }
    });

    // Check collision with the Endboss
    this.level.endboss.forEach((boss) => {
        if (this.character.isColliding(boss) && !boss.isDead) {
            this.character.hit(); // Schaden an Charakter anwenden
            this.statusBar.setPercentage(this.character.hp);
            this.finishedGame();
            this.damage.play();

            // Trigger the attack animation of the Endboss
            boss.startAttackAnimation(); // Stelle sicher, dass du die Methode auf dem richtigen Objekt aufrufst
        }
    });
}

  checkChickenCollisions() {
    this.level.enemies.forEach((chicken) => {
      if (this.character.isColliding(chicken) && !chicken.isDead) {
        this.handleCollision(chicken);
      }
    });
  }
  checkBossCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.endboss.forEach((boss) => {
        if (bottle.isColliding(boss)) {
          boss.takeDamage(20); // Beispiel: 20 Punkte Schaden
          this.endBossBar.updateHealthBar(boss);
          // Aktualisiere die Gesundheitsanzeige
          this.screaming_sound.play();
          this.throwableObjects.splice(bottleIndex, 1);
          this.finishedGame(); // Entferne die Flasche
      
        }
      });
    });
  }

  checkBootleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.pickUpBottle();
        this.bottleBar.setPercentage(this.character.ammo);
        this.level.bottles.splice(index, 1);
      }
    });
  }
  checkBottleHitsEnemy() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          enemy.enemiesDead();
          this.screaming_sound.play();
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  checkCoinCollisions() {
    this.level.coines.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.pickUpCoin();
        this.coinBar.setPercentage(this.character.ammo);
        this.level.coines.splice(index, 1);
        this.coinSound.play();
      }
    });
  }

  handleCollision(chicken) {
    const characterBottom = this.character.y + this.character.height;
    const chickenTop = chicken.y;

    if (characterBottom < chickenTop + chicken.height / 2) {
      chicken.enemiesDead();
      this.screaming_sound.play();
    } else {
      this.character.hit();
      this.statusBar.setPercentage(this.character.hp);
      this.damage.play();
    }
  }

  canThrow(currentTime) {
    return (
      this.character.ammo >= 10 &&
      currentTime - this.lastThrowTime > this.throwCooldown
    );
  }
  checkThrowObject() {
    const currentTime = Date.now();

    if (this.keyboard.SPACE && this.canThrow(currentTime)) {
      this.throwBottle();
    } else if (this.character.ammo < 10) {
    }
  }
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 50
    );
    this.throwableObjects.push(bottle);
    this.character.ammo -= 10;
    this.bottleBar.setPercentage(this.character.ammo);
    this.lastThrowTime = Date.now();
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