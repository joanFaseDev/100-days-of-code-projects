"use strict";

// 25 minutes converted into milliseconds
const POMODORO_TIME = 1500000;
// const POMODORO_TIME = 20000;

// 5 minutes converted into milliseconds
const SHORT_BREAK_TIME = 300000;
// const SHORT_BREAK_TIME = 5000;

// 15 minutes converted into milliseconds
const LONG_BREAK_TIME = 900000;
// const LONG_BREAK_TIME = 15000;

const MILLISECOND = 1000;

const body = document.querySelector('#body');
const countdownCtn = document.querySelector('#countdown-ctn');
const startBtn = document.querySelector('#start-btn');
const stateBtns = document.querySelectorAll('.state-btn');

const pomodoroRing = new Audio('./assets/pomodoro-ring.mp3');

// Initialize the countdown (start at 25 minutes)
// let countdown = POMODORO_TIME;
let countdown = 10000;

// Number of 25 minutes time period done by the user
let pomodoroCount = 3;

// Represents the user's current activity, work (POMODORO) or pause (BREAK)
let state = 'POMODORO';

let isPauseActive = true; 
let idIntervalGlobal = null;

initializePomodoroApp();

stateBtns.forEach((btn) => {
    btn.addEventListener(('click'), (event) => {

        resetBreakVisuals(body, countdownCtn, startBtn);
        resetStateVisuals(stateBtns);
        clearInterval(idIntervalGlobal);

        // Visually update various elements of the document to reflect the change of the application's state
        isPauseActive = false;
        updateStartButton(isPauseActive);

        // Apply the new style to the button being pressed
        event.target.classList.add('state-is-active');

        // Get the state button to adapt the function's behavior
        const stateData = event.target.dataset['state'];
        
        // Get the countdown timer corresponding to the actual state
        let stateCountdown = null;

        switch (stateData) {
            case 'pomodoro':
                stateCountdown = POMODORO_TIME;
                state = 'POMODORO';        
                break;
        
            case 'short-break':
                stateCountdown = SHORT_BREAK_TIME;
                state = 'BREAK';
                break;
            
            default:
                stateCountdown = LONG_BREAK_TIME;
                state = 'BREAK';
                break;
        }

        // Update the countdown on the webpage
        countdown = stateCountdown
        updateCountdown(countdown, MILLISECOND);

        // Remove all the styles relatives to break states (short or long)
        resetBreakVisuals(body, countdownCtn, startBtn);

        // Apply a new visual style but only if user is in a break state (short or long)
        if (stateData === 'short-break')
        {
            updateShortBreak(body, countdownCtn, startBtn);
        }

        if (stateData === 'long-break')
        {
            updateLongBreak(body, countdownCtn, startBtn);
        }

    });
});

startBtn.addEventListener('click', () => {    
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
                // Check if any state button have a style, it there is the style is removed
                resetStateVisuals(stateBtns);

                // Play a ring sound every time a countdown reach its end
                playPomodoroRing(pomodoroRing);
                
                // If user just worked
                if (state === 'POMODORO')
                {
                    pomodoroCount = updatePomodoroCount(pomodoroCount);
                    
                    // If the actual pomodoro count isn't divisible by 4 then next pause is short
                    if (pomodoroCount % 4)
                    {
                        // Change the countdown value to 5 minutes (short break)
                        countdown = SHORT_BREAK_TIME;
                        updateShortBreak(body, countdownCtn, startBtn);
                        updateStateButton('short-break'); 
                    }
                    // If the actual pomodoro count is divisible by 4 then next pause is long
                    else
                    {
                        // Change the countdown value to 15 minutes (long break)
                        countdown = LONG_BREAK_TIME;
                        updateLongBreak(body, countdownCtn, startBtn);
                        updateStateButton('long-break');
                    }

                    // Stop the countdown
                    clearInterval(idInterval);
                    
                    // Visually update various elements of the document to reflect the change of the application's state
                    updateStartButton(isPauseActive);
    
                    // Visually update the countdown
                    updateCountdown(countdown);
    
                    // Update the pause state so the countdown instantly begins next time the button is pressed
                    isPauseActive = true;

                    state = 'BREAK';
                }
                // If user just took a break
                else
                {
                    // Change the countdown value to 25 minutes (pomodoro)
                    countdown = POMODORO_TIME;

                    resetBreakVisuals(body, countdownCtn, startBtn);

                    // Stop the countdown
                    clearInterval(idInterval);

                    // Visually update various elements of the document to reflect the change of the application's state
                    updateStartButton(isPauseActive);
                    updateStateButton('pomodoro');

                    // Visually update the countdown
                    updateCountdown(countdown);

                    // Update the pause state so the countdown instantly begins next time the button is pressed
                    isPauseActive = true;

                    state = 'POMODORO';
                }


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

// Initialize the application's default values and styles
function initializePomodoroApp()
{
    updateStateButton('pomodoro');
    pomodoroCount = 0;
    countdown = POMODORO_TIME;
}

function playPomodoroRing(audioElement)
{
    // Play the sound but only if there's enough data to play it to the end without interruption
    if (audioElement.readyState === 4)
    {
        audioElement.play();
    }
}

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

// Update the state button corresponding to the application's current state
function updateStateButton(label)
{
    stateBtns.forEach((btn) => {
        if (btn.dataset['state'] === label)
        {
            btn.classList.add('state-is-active');
        }
    });
}

// Remove all break relative visuals to display the web page's default style
function resetBreakVisuals(body, countdownCtn, startBtn)
{
    if (body.classList.contains('long-break'))
    {
        body.classList.remove('long-break');
    }

    if (countdownCtn.classList.contains('long-break'))
    {
        countdownCtn.classList.remove('long-break');
    }

    if (startBtn.classList.contains('long-break'))
    {
        startBtn.classList.remove('long-break');
    }

    if (body.classList.contains('short-break'))
    {
        body.classList.remove('short-break');
    }

    if (countdownCtn.classList.contains('short-break'))
    {
        countdownCtn.classList.remove('short-break');
    }

    if (startBtn.classList.contains('short-break'))
    {
        startBtn.classList.remove('short-break');
    }
}

// Reset all state buttons style before applying a new one
function resetStateVisuals(stateBtns)
{
    stateBtns.forEach((button) => {
        if (button.classList.contains('state-is-active'))
        {
            button.classList.remove('state-is-active');
        }
    });
}

// Remove actual styles and display the web page's short break visual
function updateShortBreak(body, countdownCtn, startBtn)
{
    if (body.classList.contains('long-break'))
    {
        body.classList.remove('long-break');
    }

    if (countdownCtn.classList.contains('long-break'))
    {
        countdownCtn.classList.remove('long-break');
    }

    if (startBtn.classList.contains('long-break'))
    {
        startBtn.classList.remove('long-break');
    }

    body.classList.add('short-break');
    countdownCtn.classList.add('short-break');
    startBtn.classList.add('short-break');
}

// Remove actual styles and display the web page's long break visual
function updateLongBreak(body, countdownCtn, startBtn)
{
    if (body.classList.contains('short-break'))
    {
        body.classList.remove('short-break');
    }

    if (countdownCtn.classList.contains('short-break'))
    {
        countdownCtn.classList.remove('short-break');
    }

    if (startBtn.classList.contains('short-break'))
    {
        startBtn.classList.remove('short-break');
    }

    body.classList.add('long-break');
    countdownCtn.classList.add('long-break');
    startBtn.classList.add('long-break');
}

// Increment the pomodoro count and update the web page to reflect the change
function updatePomodoroCount(count)
{
    const pomodoroCount = document.querySelector('#pomodoro-number');
    count = count + 1;
    pomodoroCount.textContent = `#${count}`;
    return count;
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