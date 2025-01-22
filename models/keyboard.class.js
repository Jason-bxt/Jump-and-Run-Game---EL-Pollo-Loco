class Keyboard {
  LEFT = false; 
  RIGHT = false; 
  UP = false; 
  DOWN = false; 
  SPACE = false; 

  /**
   * Disables all keyboard inputs by setting all keys to false.
   */
  disable() {
    this.LEFT = false; 
    this.RIGHT = false; 
    this.UP = false; 
    this.DOWN = false; 
    this.SPACE = false; 
  }
}