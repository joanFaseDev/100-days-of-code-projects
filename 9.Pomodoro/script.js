"use strict";

// 25 minutes converted into milliseconds
const POMODORO_TIME = 1500000;

// 5 minutes converted into milliseconds
const SHORT_BREAK_TIME = 300000;
const MILLISECOND = 1000;
const startBtn = document.querySelector('#start-btn');

// Initialize the countdown (start at 25 minutes)
// let countdown = POMODORO_TIME;
let countdown = 10000;

let isPauseActive = true; 
let idIntervalGlobal = null;

startBtn.addEventListener('click', () => {    
    console.log(isPauseActive);
    // Countdown's endtime is equal to the current time plus 25 minutes
    const currentTime = Date.parse(new Date);
    const endTime = currentTime + POMODORO_TIME;

    if (isPauseActive)
    {
        updateStartButton(isPauseActive);

        // Call updateCountdown once to compensate for the first delay
        countdown = updateCountdown(countdown, MILLISECOND);
    
        const idInterval = setInterval(() => {
            countdown = updateCountdown(countdown, MILLISECOND);
            
            if (countdown < 0)
            {
                // Change the countdown value to 5 minutes (short break)
                countdown = SHORT_BREAK_TIME;

                // Stop the countdown
                clearInterval(idInterval);
                
                // Visually update various elements of the document to reflect the change of the application's state
                updateStartButton(isPauseActive);
                updateShortBreak(); 

                // Visually update the countdown
                updateCountdown(countdown);

                // Update the pause state so the countdown instantly begins next time the button is pressed
                isPauseActive = true;
            }

        }, 1000, countdown, MILLISECOND);

        // Pass the idInterval value in global scope so the else block can actually use it and stop the setInterval() function
        idIntervalGlobal = idInterval;
        isPauseActive = false;
    }
    else 
    {
        updateStartButton(isPauseActive);

        // Stop the countdown
        clearInterval(idIntervalGlobal);
        isPauseActive = true;
    }
});

// Update the style and text of the start button depending of the countdown being in pause or not
function updateStartButton(isPauseActive)
{
    if (isPauseActive)
    {
        startBtn.textContent = 'PAUSE';
        startBtn.classList.add('is-pressed');
    }
    else {
        startBtn.textContent = 'START';
        startBtn.classList.remove('is-pressed');
    }
}

function updateShortBreak()
{
    document.querySelector('#body').classList.add('short-break');
    document.querySelector('#countdown-ctn').classList.add('short-break');
    document.querySelector('#start-btn').classList.add('short-break');
}

function updateCountdown(countdown, MILLISECOND)
{
    // Convert the minutes and seconds left on countdown
    const secondsLeft = Math.floor(countdown / 1000 % 60);
    const minutesLeft = Math.floor(countdown / 1000 / 60);

    // Get the spans elements which display minutes and seconds
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');

    /**
     * Update the minutes and seconds on screen
     * Prepend a 0 character to minutes/seconds left if its value is less than a two digits number (value <= 9)
     */ 
    minutes.textContent = (`0${minutesLeft}`).slice(-2);
    seconds.textContent = (`0${secondsLeft}`).slice(-2);

    // Update the time left on countdown
    countdown = countdown - MILLISECOND;

    // Return the local countdown value to update the original countdown variable
    return countdown;
}