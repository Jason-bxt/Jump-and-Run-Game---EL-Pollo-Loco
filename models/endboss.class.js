class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];


  isVisible = true;
  isDead = false;
  deathAnimationPlaying = false;
  attackAnimationPlaying = false;
  height = 440;
  width = 220;
  y = 0;
  currentImageIndex = 0;
  hurtAnimationInterval = null;
  deathAnimationInterval = null;
  alertAnimationInterval = null;
  attackAnimationInterval = null;
  movementInterval = null;
  percentage = 100;


  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 719 * 12;
    this.animate();
    this.hp = 100;
    this.animationSpeed = 400; 
    this.hurtAnimationPlaying = false;
    this.alertAnimationPlaying = false;
    this.attackAnimationPlaying = false;
    this.deathAnimationPlaying = false; 
  }

  setAnimationSpeed(speed) {
    this.animationSpeed = speed; 
}


takeDamage(amount) {
  this.hp -= amount;
  if (this.hp <= 0) {
      this.hp = 0; 
      this.enemiesDead(); 
  } else {
      this.playHurtAnimation(); 
  }
}

playHurtAnimation() {
  this.playAnimation(this.IMAGES_HURT);
  if (this.currentImageIndex >= this.IMAGES_HURT.length - 1) {
    this.hurtAnimationPlaying = false; 
    clearInterval(this.hurtAnimationInterval);
  }
}


enemiesDead() {
  if (!this.isDead && !this.deathAnimationPlaying) {
    this.isDead = true;
    this.deathAnimationPlaying = true;
    this.loadImages(this.IMAGES_DEAD);
    this.playDeathAnimation(); // Sofortige Animation starten
  }
} 

playAlertAnimation() {
  if (!this.alertAnimationPlaying) {
      this.alertAnimationPlaying = true; // Verhindert mehrfaches Auslösen
      this.currentImageIndex = 0; // Setze den Index zurück

      this.alertAnimationInterval = setInterval(() => {
          this.currentImageIndex++; // Gehe zum nächsten Bild
          if (this.currentImageIndex >= this.IMAGES_ALERT.length) {
              this.currentImageIndex = 0; // Setze den Index zurück, wenn das Ende erreicht ist
              this.alertAnimationPlaying = false; // Setze den Flag zurück
              clearInterval(this.alertAnimationInterval);
              
              // Starte die Geh-Animation nach der Alarmanimation
              this.playAnimation(this.IMAGES_WALKING);
          } else {
              this.playAnimation(this.IMAGES_ALERT); // Spiele das aktuelle Bild ab
          }
      }, this.animationSpeed); // Verwende die animationSpeed für die Dauer zwischen den Bildern
  }
}

startAttackAnimation(){
  this.playAttackAnimation();
}
playAttackAnimation() {
  this.playAnimation(this.IMAGES_ATTACK);

 
      // Setze ein Intervall, um die Animation zu überwachen
    
          if (this.currentImageIndex >= this.IMAGES_ATTACK.length - 1) {
              this.attackAnimationPlaying = false; // Reset the flag
              clearInterval(this.attackAnimationInterval);

        
          }
      }


playDeathAnimation() {
  this.playAnimation(this.IMAGES_DEAD);
  if (this.currentImageIndex >= this.IMAGES_DEAD.length - 1) {
    this.isDead = true;
    this.deathAnimationPlaying = false; 
    this.isVisible = false; // Sichtbarkeit auf false setzen
    this.stopAllAnimations(); // Alle Animationen stoppen
  }
}

render(ctx) {
  if (this.isVisible) {
    super.render(ctx); // Call the parent render method if visible
  }
}

stopAllAnimations() {
  clearInterval(this.hurtAnimationInterval);
  clearInterval(this.deathAnimationInterval);
  clearInterval(this.alertAnimationInterval);
  clearInterval(this.attackAnimationInterval);
  clearInterval(this.movementInterval);
}

animate() {
  this.movementInterval = setInterval(() => {
      if (!this.isDead) {
          this.moveLeft();
      } else {
          clearInterval(this.movementInterval); 
      }
  }, 1000 / 60);
  
  setInterval(() => {
      if (!this.isDead && !this.attackAnimationPlaying && !this.alertAnimationPlaying) { // Überprüfe, ob keine andere Animation abgespielt wird
          this.playAnimation(this.IMAGES_WALKING);
      } 
  }, 100); 

  setInterval(() => {
      if (!this.isDead && !this.attackAnimationPlaying) { // Überprüfe, ob die Angriffsanimation nicht abgespielt wird
          this.playAlertAnimation(); 
      }
  }, 4000); // Alle 4 Sekunden
}
}