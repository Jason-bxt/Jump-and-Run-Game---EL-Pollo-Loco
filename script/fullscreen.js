let elem = document.getElementById("canvas");

/**
 * Activates fullscreen mode for the canvas element.
 * @function
 */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Deactivates fullscreen mode.
 * @function
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Toggles the icons for fullscreen mode based on the current status.
 * @function
 */
function toggleFullscreenIcons() {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
  const openIcon = document.getElementById("open-fullscreen");
  const closeIcon = document.getElementById("close-fullscreen");

  if (isFullscreen) {
    openIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    openIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
}

/**
 * Checks the screen orientation and shows or hides mobile control elements.
 * @function
 */
function checkOrientation() {
  const overlay = document.getElementById("orientationOverlay");
  let mobileUp = document.getElementById("mobile-up");
  let mobileLeft = document.getElementById("mobile-left");
  let mobileRight = document.getElementById("mobile-right");
  let mobileBottle = document.getElementById("mobile-bottle");
  let mobileBtn = document.getElementById("bottle-btn");

  if (window.innerWidth < window.innerHeight) {
    overlay.style.display = "flex";
    mobileUp.style.display = "flex";
    mobileLeft.style.display = "flex";
    mobileRight.style.display = "flex";
    mobileBottle.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}


checkOrientation();


window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);


document.addEventListener("fullscreenchange", toggleFullscreenIcons);
document.addEventListener("webkitfullscreenchange", toggleFullscreenIcons);
document.addEventListener("mozfullscreenchange", toggleFullscreenIcons);
document.addEventListener("MSFullscreenChange", toggleFullscreenIcons);