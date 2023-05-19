"use strict";

let idInterval = null;
let slider1Links = document.querySelectorAll('.slider-1-nav-link');
let slider1 = document.querySelector('#slider-1');

slider1Links.forEach((link) => {
    link.addEventListener('click', (event) => {
        slider1Links.forEach((link) => {
            link.firstElementChild.style.display = "none";
        });
        event.target.firstElementChild.style.display = "inline-block";
    });
});

/**
 * We want to know what image the slider is currently displaying.
 * To achieve that, we get the slider's width plus its actual scrolling position (from its origin (left side)). Dividing the position by the width and rounding the result to its nearest integer gives the index of the image currently displayed.
 */

slider1.addEventListener('scroll', (event) => {
    // clearInterval does nothing if the parameter can't identify a previous action.
    clearInterval(idInterval);

        idInterval = setInterval(() => {
        let sliderWidth = event.target.offsetWidth;
        let scrollPosition = event.target.scrollLeft;
        let idxImgDisplayed = Math.round(scrollPosition / sliderWidth).toString();
        console.log(idxImgDisplayed);

        resetBtnStyle(slider1Links);
        document.querySelector(`a[data-index="${idxImgDisplayed}"]`).firstElementChild.style.display = 'inline-block';
    }, 100);
});

function resetBtnStyle(parents) {
    parents.forEach((parent) => {
        parent.firstElementChild.style.display = "none";
    });
}

