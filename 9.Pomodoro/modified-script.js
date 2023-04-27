"use strict";

const body = document.querySelector('body');
const countdownCtn = document.querySelector('#countdown-ctn');
const countdownBtns = document.querySelectorAll('.state-btn');
const startBtn = document.querySelector('#start-btn');
const pomodoroUser = document.querySelector('#pomodoro-number');

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

// Number of 'pomodoro' (1 pomodoro = 25 minutes of work) the user earned
let pomodoroCount = 0;

const MILLISECOND = 1000;

// 25 minutes converted into milliseconds
// const POMODORO_TIME = 1500000;
const POMODORO_TIME = 15000;

// 5 minutes converted into milliseconds
// const SHORT_BREAK_TIME = 300000;
const SHORT_BREAK_TIME = 5000;

// 15 minutes converted into milliseconds
// const LONG_BREAK_TIME = 900000;
const LONG_BREAK_TIME = 10000;

const config = {
    'pomodoro': {
        countdown: POMODORO_TIME,
        message: 'Time to work!',
        startButton: {
            state: 'pause',
            textContent: 'START'
            
        }
    },
    'short-break': {
        countdown: SHORT_BREAK_TIME,
        message: 'Time for a short break!',
        startButton: {
            state: 'pause',
            textContent: 'START'
        }
    },
    'long-break': {
        countdown: LONG_BREAK_TIME,
        message: 'Time for a long break!',
        startButton: {
            state: 'pause',
            textContent: 'START'
        }
    }
};

updateMode('pomodoro');

countdownBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const currentMode = event.target.dataset['state'];
        mode = currentMode;
        updateMode(mode);
    });
});

startBtn.addEventListener('click', (event) => {

    // If the application WAS in pause BEFORE pressing the button
    if (checkPause())
    {
        // Call the functions once, out of setInterval loop, to make up for the first delay
        updateCountdown(countdown, minutes, seconds);
        countdown = passTime(countdown, MILLISECOND);
    
        const id = setInterval(() => {
            // Countdown is updated visually then decreased then updated and so forth and so on
            updateCountdown(countdown, minutes, seconds);
            countdown = passTime(countdown, MILLISECOND);
    
            // Prevent the countdown to keep decreasing when a change of mode is required
            checkUserClick(id);

            // Check if countdown is over and if it is, handle the mode update
            checkCountdown(id);
        }, MILLISECOND);
    
        idInterval = updateIdInterval(id);
        togglePause();
    }
    // If the application WAS NOT in pause BEFORE pressing the button
    else
    {
        clearInterval(idInterval);
        console.log('this is coming from the else block!');
        togglePause();
    }



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
    startBtn.dataset['state'] = config[mode].startButton.state;
    startBtn.textContent = config[mode].startButton.textContent;
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

// If user requier a change of mode, the interval is automatically cleared
function checkUserClick(id)
{
    countdownBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            idInterval = updateIdInterval(id);
            clearInterval(id);
        });
    });
}

// Check if the application is in pause or not
function checkPause()
{
    const state = startBtn.dataset['state'];
    return state === 'pause';
}

// Switch the application in pause/start mode depending of what is current mode is
function togglePause()
{
    startBtn.textContent = (startBtn.dataset['state'] === 'pause') ? 'PAUSE' : 'START';
    startBtn.dataset['state'] = (startBtn.dataset['state'] === 'pause') ? 'start' : 'pause';
}

// Increment the user's pomodoro by 1;
function incrementPomodoro()
{
    pomodoroCount = pomodoroCount + 1;
    pomodoroUser.textContent = `#${pomodoroCount}`;
    return pomodoroCount;
}

// Check if the countdown is over and, if it is, handle the mode's update 
function checkCountdown(id)
{
    if (countdown < 0)
    {
        const currentMode = mode
        if (currentMode === 'pomodoro')
        {
            if ((incrementPomodoro()) % 4)
            {
                mode = 'short-break';
            }
            else
            {
                mode = 'long-break';
            }
        }
        else
        {
            mode = "pomodoro";
        }
        console.log(`${currentMode} into ${mode}`);
        idInterval = updateIdInterval(id);
        clearInterval(idInterval);
        updateMode(mode);
    }
    
}