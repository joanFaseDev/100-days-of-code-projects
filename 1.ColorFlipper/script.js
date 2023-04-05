import { CSS_COLOR_NAMES } from "./css-colors.js";

const clickBtn = document.querySelector('#click');
const colorSystemBtn = document.querySelector('#hex-color');
const body = document.querySelector('body');
const span = document.querySelector('span');
const btns = document.querySelectorAll('button');

let colorSystem = 'named color';

initBackgroundColor();

clickBtn.addEventListener('click', (evt) => {
    const randomColor = pickRandomColor(colorSystem);
    changeFontColor(randomColor);
    body.style.backgroundColor = randomColor;
    span.innerText = randomColor;
});

// Switch the actual color system (named or hex) and its button's label. Update the background's color value. 
colorSystemBtn.addEventListener('click', (evt) => {
    let actualColor = span.innerText;
    switch (colorSystem) {
        case 'named color':
            span.innerText = CSS_COLOR_NAMES[actualColor];
            colorSystem = 'hexadecimal color';
            colorSystemBtn.textContent = 'Named Color';
            break;
    
        default:
            span.innerText = Object.keys(CSS_COLOR_NAMES).find((key) => CSS_COLOR_NAMES[key] === actualColor);
            colorSystem = 'named color';
            colorSystemBtn.textContent = 'Hexadecimal Color';
            break;
    }
});

// Depending of the color system selected, randomly pick a color from an array of named colors or hexadecimal colors
function pickRandomColor(colorSystem)
{
    const colorsName = (colorSystem === 'named color') ? Object.keys(CSS_COLOR_NAMES) : Object.values(CSS_COLOR_NAMES);
    const indexMin = 0;
    const indexMax = colorsName.length;
    const randomIndex = getRandomInt(indexMin, indexMax);
    return colorsName[randomIndex];
}

// Get a random integer between a minimum (inclusive) and maximum (exclusive) value
function getRandomInt(minValue, maxValue)
{
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min) + min);
}

// Choose a random background color every time the document is loaded
function initBackgroundColor()
{
    const randomColor = pickRandomColor(colorSystem);
    changeFontColor(randomColor);
    body.style.backgroundColor = randomColor;
    span.innerText = randomColor;
}

// Adapt the font color (black or white) to the overall intensity of the background color
function changeFontColor(color)
{
    const hexColor = (colorSystem === 'hexadecimal color') ? color : CSS_COLOR_NAMES[color];
    // Convert hexadecimal value into rgb ones by parsing them in base 16
    const hexRed = hexColor.slice(1, 3);
    const hexGreen = hexColor.slice(3, 5);
    const hexBlue = hexColor.slice(5);

    const red = parseInt(hexRed, 16);
    const green = parseInt(hexGreen, 16);
    const blue = parseInt(hexBlue, 16);

    // Convert rgb values into grayscale ones then compute a weighted average of the red, green and blue values to get the overall intensity
    const overallIntensity = Math.round(red * 0.299 + green * 0.587 + blue * 0.114);

    body.style.color = (overallIntensity > 186) ? 'black' : 'white';
    btns.forEach((btn) => {
        btn.style.backgroundColor = body.style.color;
        btn.style.color = (btn.style.backgroundColor === 'black') ? 'white' : 'black';
    });
}