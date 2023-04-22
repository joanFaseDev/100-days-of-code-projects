"use strict";

// 25 minutes converted into milliseconds
const POMODORO_TIME = 1500000;
const MILLISECOND = 1000;
const startBtn = document.querySelector('#start-btn');

startBtn.addEventListener('click', () => {    
    // Countdown's endtime is equal to the current time plus 25 minutes
    const currentTime = Date.parse(new Date);
    const endTime = currentTime + POMODORO_TIME;
    
    // Initialize the countdown (start at 25 minutes)
    let countdown = POMODORO_TIME;

    // Call updateCountdown once to compensate for the first delay
    countdown = updateCountdown(countdown, MILLISECOND);

    const idInterval = setInterval(() => {
        countdown = updateCountdown(countdown, MILLISECOND);

    }, 1000, countdown, MILLISECOND);
    
});


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