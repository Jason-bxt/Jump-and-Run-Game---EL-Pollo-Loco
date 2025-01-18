let canvas;
let world;
let keyboard = new Keyboard();
let mobileUp = document.getElementById('mobile-up')
let mobileLeft = document.getElementById('mobile-left')
let mobileRight = document.getElementById('mobile-right')
let mobileBottle = document.getElementById('mobile-bottle')

function init(){
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard);
}

// Keyboard Event Listener
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

// Mobile Button Event Listeners
mobileUp.addEventListener('touchstart', () => {
    keyboard.UP = true;
});
mobileUp.addEventListener('touchend', () => {
    keyboard.UP = false;
});

mobileLeft.addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
mobileLeft.addEventListener('touchend', () => {
    keyboard.LEFT = false;
});

mobileRight.addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
});
mobileRight.addEventListener('touchend', () => {
    keyboard.RIGHT = false;
});

mobileBottle.addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
mobileBottle.addEventListener('touchend', () => {
    keyboard.SPACE = false;
});

