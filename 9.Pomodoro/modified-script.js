"use strict";

const body = document.querySelector('body');
const countdownCtn = document.querySelector('#countdown-ctn');
const countdownBtns = document.querySelectorAll('.state-btn');
const startBtn = document.querySelector('#start-btn');

// Get the spans elements which display minutes and seconds
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

let message = document.querySelector('#message');

// Mode the application is currently in
let mode = 'pomodoro';

// Initialize the application's current countdown
let countdown;

// Actual id of the setInterval method
let idInterval;

const MILLISECOND = 1000;

// 25 minutes converted into milliseconds
const POMODORO_TIME = 1500000;

// 5 minutes converted into milliseconds
const SHORT_BREAK_TIME = 300000;

// 15 minutes converted into milliseconds
const LONG_BREAK_TIME = 900000;

const config = {
    'pomodoro': {
        countdown: POMODORO_TIME,
        message: 'Time to work!'
    },
    'short-break': {
        countdown: SHORT_BREAK_TIME,
        message: 'Time for a short break!'
    },
    'long-break': {
        countdown: LONG_BREAK_TIME,
        message: 'Time for a long break!'
    }
};

updateMode('pomodoro');

countdownBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const mode = event.target.dataset['state'];
        updateMode(mode);
    });
});

startBtn.addEventListener('click', (event) => {
    // Call the functions once, out of setInterval loop, to make up for the first delay
    updateCountdown(countdown, minutes, seconds);
    countdown = passTime(countdown, MILLISECOND);

    const id = setInterval(() => {
        updateCountdown(countdown, minutes, seconds);
        countdown = passTime(countdown, MILLISECOND);
        checkUserClick(id);
    }, MILLISECOND);

    idInterval = updateIdInterval(id);
});

// Update the behavior and style of the application
function updateMode(mode)
{
    removeTheme();
    updateConfig(mode);
    updateTheme(mode)
    updateCountdown(countdown, minutes, seconds);
}

// Remove all styles dynamically added by the application
function removeTheme()
{
    const modes = Object.keys(config);
    modes.forEach((mode) => {
        body.classList.remove(mode);
        countdownCtn.classList.remove(mode);
        countdownBtns.forEach((btn) => {
            btn.classList.remove(mode);
        });
        startBtn.classList.remove(mode);
    });
}

// Update the current configuration of the application based on the actual mode
function updateConfig(mode)
{
    countdown = config[mode].countdown;
    message.textContent = config[mode].message;
}

// Update the current theme of the application based on the actual mode
function updateTheme(mode)
{
    body.classList.add(mode);
    countdownCtn.classList.add(mode);

    // Get the button attached to the actual mode and update its style
    const btn = document.querySelector(`.state-btn[data-state=${mode}]`);
    btn.classList.add(mode);
    startBtn.classList.add(mode);
}

function updateCountdown(countdown, minutes, seconds)
{
    // Convert the minutes and seconds left on countdown
    const secondsLeft = Math.floor(countdown / 1000 % 60);
    const minutesLeft = Math.floor(countdown / 1000 / 60);

    /**
     * Update the minutes and seconds on screen
     * Prepend a 0 character to minutes/seconds left if its value is less than a two digits number (value <= 9)
     */ 
    minutes.textContent = (`0${minutesLeft}`).slice(-2);
    seconds.textContent = (`0${secondsLeft}`).slice(-2);
}

function passTime(countdown, milliseconds)
{
    // Update the time left on countdown
    countdown = countdown - milliseconds;
    return countdown;
}

function updateIdInterval(id)
{
    return id;
}

function checkUserClick(id)
{
    countdownBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            idInterval = updateIdInterval(id);
            clearInterval(id);
        });
    });
}
