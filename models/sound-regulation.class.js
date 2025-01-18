class VolumeController {
  constructor(audioElements) {
    this.audioElements = audioElements;
    this.init();
  }

  init() {
    const slider = document.querySelector(".level");
    slider.addEventListener("input", (event) => {
      this.setVolume(event.target.value);
    });
  }

  setVolume(value) {
    const volume = parseFloat(value);
    this.audioElements.forEach((audio) => {
      audio.volume = volume;
    });
  }
}