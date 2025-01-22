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

  /**
   * Creates an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
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
      this.character.walking_sound,
      this.character.jump_sound,
    ]);

    this.backgroundMusic.volume = 0.008;
    this.coinSound.volume = 0.01;
    this.damage.volume = 0.04;
    this.screaming_sound.volume = 0.1;
    this.character.walking_sound.volume = 0.05;
    this.character.jump_sound.volume = 0.05;
  }

  /**
   * Sets up the world and initializes the character's world reference.
   */
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

  /**
   * Draws the game elements on the canvas based on the current game state.
   */
  draw() {
    if (this.gameState === "start") {
      // Here you can draw the start screen if needed
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

  /**
   * Starts the game by setting up the start button and its event listener.
   */
  startGame() {
    const button = document.getElementById("start-button");
    const startImg = document.querySelector(".start-img");

    button.addEventListener("click", () => {
        this.handleStartButtonClick(startImg, button);
    });
}

handleStartButtonClick(startImg, button) {
    const computedStyle = window.getComputedStyle(startImg);
    if (computedStyle.display === "block") {
        this.startGameSession(button, startImg);
    } else {
        console.warn("Image not loaded yet. Please wait.");
    }
}

startGameSession(button, startImg) {
    this.gameState = "playing";
    this.isGameRunning = true;
    initLevel();
    this.level = level1;
    this.run();
    this.draw();
    this.hideStartElements(button, startImg);
    this.enableKeyboard(); // Enable keyboard input
}

hideStartElements(button, startImg) {
    button.style.display = "none";
    startImg.style.display = "none";
}

  /**
   * Restarts the game by resetting character and level states.
   */

  restartGame() {
    const restartButton = document.getElementById("restart-button");
    const gameOverImg = document.getElementById("game-over");
    const gameVictoryImg = document.getElementById("game-victory");

    restartButton.addEventListener("click", () => {
        this.resetGameState();
        this.resetCharacter();
        this.resetEnemies();
        this.resetBosses();
        this.enableKeyboard();
        this.run();
        this.draw();
        this.hideRestartUI(restartButton, gameOverImg, gameVictoryImg);
    });
}

resetGameState() {
    this.gameState = "playing";
    this.isGameRunning = true;
}

resetCharacter() {
    this.character.hp = 100;
    this.character.x = 80; 
    this.character.y = 220; 
    this.statusBar.setPercentage(this.character.hp);
    this.character.ammo = 0;
    this.bottleBar.setPercentage(this.character.ammo);
    this.coinBar.setPercentage(0);
    initLevel();
    this.level = level1;
}

resetEnemies() {
    this.level.enemies.forEach(enemy => {
        enemy.isDead = false; 
        enemy.x = Math.random() * 12000 + 3200; 
    });
}

resetBosses() {
    this.level.endboss.forEach(boss => {
        boss.isDead = false; 
        boss.hp = 100; 
        boss.x = 719 * 12; 
        this.endBossBar.setPercentage((boss.hp / 100) * 100);
    });
}

hideRestartUI(restartButton, gameOverImg, gameVictoryImg) {
    restartButton.style.display = "none";
    gameOverImg.style.display = "none";
    gameVictoryImg.style.display = "none";
}

  /**
   * Checks if the game has finished based on character and boss states.
   */
  finishedGame() {
    if (this.endBossBar.percentage <= 0) {
        this.handleVictory();
    } else if (this.statusBar.percentage <= 0) {
        this.handleGameOver();
    }
}

handleVictory() {
    keyboard.disable();
    this.stopEnemyAnimations();
    this.showVictoryScreen();
}

handleGameOver() {
    keyboard.disable();
    this.stopEnemyAnimations();
    this.showGameOverScreen();
}

stopEnemyAnimations() {
    this.level.enemies.forEach(enemy => enemy.stopAllAnimations());
}

showVictoryScreen() {
    const gameVictoryImg = document.getElementById("game-victory");
    const restartButton = document.getElementById("restart-button");
    gameVictoryImg.style.display = "flex";
    restartButton.style.display = "flex";
}

showGameOverScreen() {
    const gameOverImg = document.getElementById("game-over");
    const restartButton = document.getElementById("restart-button");
    gameOverImg.style.display = "flex";
    restartButton.style.display = "flex";
}

  /**
   * Enables keyboard input for the game.
   */
  enableKeyboard() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Disables keyboard input for the game.
   */
  disableKeyboard() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Runs the game loop, checking for collisions and game state.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBottleCollisions();
      this.checkCoinCollisions();
      this.checkChickenCollisions();
      this.checkThrowObject();
      this.checkBottleHitsEnemy();
      this.checkBossCollisions();
      this.finishedGame();
    }, 1);
  }

  /**
   * Checks for collisions with regular enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        this.checkEnemyCollision(enemy);
    });

    this.level.endboss.forEach((boss) => {
        this.checkBossCollision(boss);
    });
}

checkEnemyCollision(enemy) {
    if (this.character.isColliding(enemy) && !enemy.isDead) {
        this.finishedGame();
        this.handleCharacterEnemyCollision(enemy);
    }
}

handleCharacterEnemyCollision(enemy) {
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y;

    if (characterBottom >= enemyTop && this.character.isOnGround) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.hp);
        this.finishedGame();
        this.damage.play();
    }
}

checkBossCollision(boss) {
    if (this.character.isColliding(boss) && !boss.isDead) {
        this.character.bossHit();
        this.statusBar.setPercentage(this.character.hp);
        this.finishedGame();
        this.damage.play();
        boss.startAttackAnimation();
    }
}

  /**
   * Checks for collisions with chickens.
   */
  checkChickenCollisions() {
    this.level.enemies.forEach((chicken) => {
      if (this.character.isColliding(chicken) && !chicken.isDead) {
        this.handleCollision(chicken);
      }
    });
  }

  /**
   * Checks for collisions between throwable objects and the Endboss.
   */
  checkBossCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.endboss.forEach((boss) => {
        if (bottle.isColliding(boss)) {
          boss.takeDamage(20); 
          this.endBossBar.updateHealthBar(boss); 
          this.screaming_sound.play();
          this.throwableObjects.splice(bottleIndex, 1); 
          this.finishedGame(); 
        }
      });
    });
  }

  /**
   * Checks for collisions with bottles.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isCollidingWithBottle(bottle)) {
        this.character.pickUpBottle();
        this.bottleBar.setPercentage(this.character.ammo);
        this.level.bottles.splice(index, 1); 
      }
    });
  }

  /**
   * Checks if throwable objects hit enemies.
   */
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

  /**
   * Checks for collisions with coins.
   */
  checkCoinCollisions() {
    this.level.coines.forEach((coin, index) => {
      if (this.character.isCollidingWithCoin(coin)) {
        this.character.pickUpCoin();
        this.coinBar.setPercentage(this.character.ammo);
        this.level.coines.splice(index, 1); // Remove the collected coin
        this.coinSound.play();
      }
    });
  }

  /**
   * Handles collision logic with chickens.
   * @param {Chicken} chicken - The chicken object involved in the collision.
   */
  handleCollision(chicken) {
    const characterBottom = this.character.y + this.character.height;
    const chickenTop = chicken.y;

    if (characterBottom < chickenTop + chicken.height / 2) {
      chicken.enemiesDead(); // Mark chicken as dead
      this.screaming_sound.play();
    } else {
      this.character.hit(); // Apply damage to character
      this.statusBar.setPercentage(this.character.hp);
      this.damage.play();
    }
  }

  /**
   * Checks if the character can throw a bottle based on ammo and cooldown.
   * @param {number} currentTime - The current timestamp.
   * @returns {boolean} - True if the character can throw, false otherwise.
   */
  canThrow(currentTime) {
    return (
      this.character.ammo >= 10 &&
      currentTime - this.lastThrowTime > this.throwCooldown
    );
  }

  /**
   * Checks for throwing actions based on keyboard input.
   */
  checkThrowObject() {
    const currentTime = Date.now();

    if (this.keyboard.SPACE && this.canThrow(currentTime)) {
      this.throwBottle();
    }
  }

  /**
   * Throws a bottle and updates the character's ammo.
   */
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 50
    );
    this.throwableObjects.push(bottle);
    this.character.ammo -= 10; // Decrease ammo
    this.bottleBar.setPercentage(this.character.ammo);
    this.lastThrowTime = Date.now(); // Update last throw time
  }

  /**
   * Adds multiple objects to the map for rendering.
   * @param {Array} objects - The array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map for rendering.
   * @param {Object} mo - The object to add to the map.
   */
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

  /**
   * Flips the image of an object for rendering.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
}