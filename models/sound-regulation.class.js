class VolumeController {
  /**
   * Creates an instance of VolumeController.
   * @param {HTMLAudioElement[]} audioElements - An array of audio elements to control the volume for.
   */
  constructor(audioElements) {
    this.audioElements = audioElements; 
    this.init(); 
  }

  /**
   * Initializes the volume controller by setting up the event listener for the volume slider.
   */
  init() {
    const slider = document.querySelector(".level"); 
    slider.addEventListener("input", (event) => {
      this.setVolume(event.target.value);
    });
  }

  /**
   * Sets the volume for all audio elements.
   * @param {string} value - The volume level as a string (0 to 1).
   */
  setVolume(value) {
    const volume = parseFloat(value); 
    this.audioElements.forEach((audio) => {
      audio.volume = volume; 
    });
  }
}