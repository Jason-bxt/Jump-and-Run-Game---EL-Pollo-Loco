let canvas; 
let world; 
let keyboard = new Keyboard(); 
let mobileUp = document.getElementById('mobile-up'); 
let mobileLeft = document.getElementById('mobile-left'); 
let mobileRight = document.getElementById('mobile-right'); 
let mobileBottle = document.getElementById('mobile-bottle'); 

/**
 * Initializes the canvas and the world.
 * @function
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Event listener for keydown events.
 * Updates the keyboard state based on the pressed key.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;   
    }
});

/**
 * Event listener for keyup events.
 * Updates the keyboard state based on the released key.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false; 
    }
});



/**
 * Event listener for touchstart on the mobile up button.
 * Sets the keyboard.UP state to true.
 */
mobileUp.addEventListener('touchstart', () => {
    keyboard.UP = true;
});

/**
 * Event listener for touchend on the mobile up button.
 * Sets the keyboard.UP state to false.
 */
mobileUp.addEventListener('touchend', () => {
    keyboard.UP = false;
});

/**
 * Event listener for touchstart on the mobile left button.
 * Sets the keyboard.LEFT state to true.
 */
mobileLeft.addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});

/**
 * Event listener for touchend on the mobile left button.
 * Sets the keyboard.LEFT state to false.
 */
mobileLeft.addEventListener('touchend', () => {
    keyboard.LEFT = false;
});

/**
 * Event listener for touchstart on the mobile right button.
 * Sets the keyboard.RIGHT state to true.
 */
mobileRight.addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
});

/**
 * Event listener for touchend on the mobile right button.
 * Sets the keyboard.RIGHT state to false.
 */
mobileRight.addEventListener('touchend', () => {
    keyboard.RIGHT = false;
});

/**
 * Event listener for touchstart on the mobile bottle button.
 * Sets the keyboard.SPACE state to true.
 */
mobileBottle.addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});

/**
 * Event listener for touchend on the mobile bottle button.
 * Sets the keyboard.SPACE state to false.
 */
mobileBottle.addEventListener('touchend', () => {
    keyboard.SPACE = false;
});