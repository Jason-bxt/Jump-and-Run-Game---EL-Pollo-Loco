class Level {
  endboss; 
  enemies; 
  clouds; 
  backgroundObjects; 
  bottles; 
  coines; 

  /**
   * Creates an instance of the Level class.
   * @param {Object} endboss - The end boss object for the level.
   * @param {Object[]} enemies - The array of enemy objects in the level.
   * @param {Object[]} clouds - The array of cloud objects in the level.
   * @param {Object[]} backgroundObjects - The array of background objects in the level.
   * @param {Object[]} bottles - The array of bottle objects in the level.
   * @param {Object[]} coines - The array of coin objects in the level.
   */
  constructor(endboss, enemies, clouds, backgroundObjects, bottles, coines) {
    this.endboss = endboss; 
    this.enemies = enemies; 
    this.clouds = clouds; 
    this.backgroundObjects = backgroundObjects; 
    this.bottles = bottles; 
    this.coines = coines; 
  }
}