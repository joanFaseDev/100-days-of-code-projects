import { CSS_COLOR_NAMES } from "./css-colors.js";

const clickBtn = document.querySelector('#click');
const colorSystemBtn = document.querySelector('#hex-color');

const body = document.querySelector('body');
const span = document.querySelector('span');

clickBtn.addEventListener('click', (evt) => {
    const randomColor = pickRandomColorName();
    body.style.backgroundColor = randomColor;
    span.innerText = randomColor;
});

colorSystemBtn.addEventListener('click', (evt) => {
    const colorSystem = colorSystemBtn.textContent;
    const colorValue = span.innerText;

    switch (colorSystem) 
    {
        case 'Hexadecimal Color':
            const hexColor = CSS_COLOR_NAMES[colorValue];  
            span.innerText = hexColor;
            colorSystemBtn.textContent = 'Named Color';
            break;
    
        case 'Named Color':
            const namedColor = Object.keys(CSS_COLOR_NAMES).find((key) => CSS_COLOR_NAMES[key] === colorValue);
            span.innerText = namedColor;
            colorSystemBtn.textContent = 'Hexadecimal Color';
            break;
    }
});

function pickRandomColorName()
{
    const colorsName = Object.keys(CSS_COLOR_NAMES);
    const indexMin = 0;
    const indexMax = colorsName.length - 1;
    const randomIndex = getRandomInt(indexMin, indexMax);
    return colorsName[randomIndex];
}

function getRandomInt(minValue, maxValue)
{
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min) + min);
}