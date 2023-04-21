const btnValidate = document.querySelector('#btn-validate');

btnValidate.addEventListener('click', countdownHandler);

function countdownHandler(event)
{
    event.preventDefault();
    const userCountdown = getUserCountdown();
    const mainContainer = clearMainContent();
    initialiazeCountdown(userCountdown, mainContainer);
}

// Return an object with countdown's time parsed in days, hours, minutes, seconds and milliseconds
function getRemainingTime(milliseconds)
{
    const seconds = getSecondsLeft(milliseconds);
    const minutes = getMinutesLeft(milliseconds);
    const hours = getHoursLeft(milliseconds);
    const days = getDaysLeft(milliseconds);

    // Can easily get any of these values by writing countdownHandler.property
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    };
}

// Get the user's date/time input
function getUserCountdown()
{
    const dateCountdown = document.querySelector('#end-date').value;
    const timeCountdown = document.querySelector('#end-time').value;
    const userCountdown = `${dateCountdown} ${timeCountdown}`;
    return userCountdown;
}

// Get the number of milliseconds between the current time and the end time (countdown 0)
function getMillisecondsCountdown(userCountdown)
{
    // Get the number of milliseconds between the current time and the end time (countdown 0)
    const milliSecondsLeft = Date.parse(userCountdown) - Date.parse(new Date()); 
    return milliSecondsLeft;
}

function getSecondsLeft(milliseconds)
{
    // Convert milliseconds in seconds (1 second === 1000 milliseconds)
    // Dividing by 60 gives us the minutes left and the remainder of the division gives us the seconds left
    return Math.floor(milliseconds / 1000 % 60);
}

function getMinutesLeft(milliseconds)
{
    // Convert milliseconds into hour, remain of the division represents the minutes left;
    return Math.floor(milliseconds / 1000 / 60 % 60);
}

function getHoursLeft(milliseconds)
{
    // Convert milliseconds into days, remainder of the division represents the hours left;
    return Math.floor(milliseconds / 1000 / 60 / 60 % 24);
}

function getDaysLeft(milliseconds)
{
    // Convert milliseconds into days
    return Math.floor(milliseconds / 1000 / 60 / 60 / 24);
}

// Create the countdown and update its time every second
function initialiazeCountdown(userCountdown, mainContainer)
{
    const fields = createCountdownFields(mainContainer);
    console.dir(fields);

    // Call updateCountdown one time before the loop to remove the first interval
    updateCountdown(userCountdown, fields, mainContainer);
    const intervalId = setInterval(() => {
        updateCountdown(userCountdown, fields, mainContainer, intervalId);
    }
    , 1000);

    
}

// Update the countdown time every second
function updateCountdown(userCountdown, fields, mainContainer, intervalId)
{
    const countdownMilliseconds = getMillisecondsCountdown(userCountdown);
    const timeLeft = getRemainingTime(countdownMilliseconds);

    // Prepend all values with 0 but only keep the last two digits.
    // That way, 0 only appears if the value is down to one digit (less than 10).
    fields.days.textContent = (`0${timeLeft.days}`).slice(-2);
    fields.hours.textContent = (`0${timeLeft.hours}`).slice(-2);
    fields.minutes.textContent = (`0${timeLeft.minutes}`).slice(-2);
    fields.seconds.textContent = (`0${timeLeft.seconds}`).slice(-2);

    // Once the countdown's timer reachs 0, interrupts the loop
    if (countdownMilliseconds <= 0)
    {
        console.log(intervalId);
        clearInterval(intervalId);
        clearMainContent();

        const p1 = document.createElement('p');
        p1.textContent = 'Countdown has reached 0!';
        
        const p2 = document.createElement('p');
        p2.textContent = 'Press the button below to start again.';

        const restartBtn = document.createElement('button');
        restartBtn.setAttribute('id', 'start-btn');
        restartBtn.textContent = 'Start a new countdown';

        restartBtn.addEventListener('click', (event) => {
            clearMainContent()
            initializeUserInputs(mainContainer);
        });
        mainContainer.append(p1, p2, restartBtn);
    }
}

// Create the HTML elements needed to display the countdown
function createCountdownFields(parentElement)
{
    const container = document.createElement('div');
    container.setAttribute('id', 'countdown-ctn');

    const days = document.createElement('span');
    days.setAttribute('class', 'field');
    const hours = document.createElement('span');
    hours.setAttribute('class', 'field');
    const minutes = document.createElement('span');
    minutes.setAttribute('class', 'field');
    const seconds = document.createElement('span');
    seconds.setAttribute('class', 'field');

    const fieldTitlesContainer = document.createElement('div');
    fieldTitlesContainer.setAttribute('id', 'field-title-ctn');

    const daysTitle = document.createElement('span');
    daysTitle.setAttribute('class', 'field-titles');
    const hoursTitle = document.createElement('span');
    hoursTitle.setAttribute('class', 'field-titles');
    const minutesTitle = document.createElement('span');
    minutesTitle.setAttribute('class', 'field-titles');
    const secondsTitle = document.createElement('span');
    secondsTitle.setAttribute('class', 'field-titles');

    daysTitle.textContent = 'DAYS';
    hoursTitle.textContent = 'HOURS';
    minutesTitle.textContent = 'MINUTES';
    secondsTitle.textContent = 'SECONDS';

    const clearBtn = document.createElement('button');
    clearBtn.setAttribute('id', 'clear-btn');
    clearBtn.textContent = 'Clear Countdown';
    clearBtn.addEventListener('click', (event) => {
        clearMainContent();
        initializeUserInputs(parentElement);
    });

    container.append(days, hours, minutes, seconds);
    fieldTitlesContainer.append(daysTitle, hoursTitle, minutesTitle, secondsTitle);
    parentElement.append(container, fieldTitlesContainer, clearBtn);

    return {
        container,
        days,
        hours,
        minutes,
        seconds
    };
}

// Clear the main container before initializing the coundtown's layout
function clearMainContent()
{
    const mainCtn = document.getElementById('main-ctn');
    if (mainCtn.children)
    {
        const mainChildrens = Array.from(mainCtn.children);
        mainChildrens.forEach((children) => children.remove());
    }

    return mainCtn;
}

// Recreate the layout and content displayed when loading the page
function initializeUserInputs(parentElement)
{
    const dateContainer = document.createElement('div');
    dateContainer.setAttribute('id', 'date-ctn');

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Enter a date';
    dateLabel.setAttribute('for', 'end-date');

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'end-date');
    dateInput.setAttribute('value', '2023-04-22');
    dateInput.setAttribute('name', 'end-date');

    const timeContainer = document.createElement('div');
    timeContainer.setAttribute('id', 'time-ctn');

    const timeLabel = document.createElement('label');
    timeLabel.textContent = 'Enter a time';
    timeLabel.setAttribute('for', 'end-time');

    const timeInput = document.createElement('input');
    timeInput.setAttribute('type', 'time');
    timeInput.setAttribute('id', 'end-time');
    timeInput.setAttribute('value', '18:00:00');
    timeInput.setAttribute('name', 'end-time');

    const validateBtn = document.createElement('button');
    validateBtn.textContent = 'Validate'
    validateBtn.setAttribute('id', 'btn-validate');
    validateBtn.addEventListener('click', countdownHandler);

    dateContainer.append(dateLabel, dateInput);
    timeContainer.append(timeLabel, timeInput);

    parentElement.append(dateContainer, timeContainer, validateBtn);
}

// const todayGMT = '19 Apr 2023 06:00:00 GMT';
// const todayUTC = '19 Apr 2023 06:00:00 UTC';

// const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
// const max_date_possible = '13 Sep 275760 00:00:00';

// // Same result
// console.log(Date.parse(todayGMT), Date.parse(todayUTC));
// console.log(`JavaScript's maximum safe integer is bigger than the maximum number seconds which can be calculated by a Date object: ${MAX_SAFE_INTEGER > Date.parse(max_date_possible)}`);

// // If no parameters is provided, Date() represents the current date/time (time of instantiation)
// const now = new Date();
// console.log(`Date: ${now}\nDate(milliseconds): ${Date.parse(now)}`);

// Set a end date for our countdown
// const endDateString = '21 Apr 2023 06:00:00 GMT';
// const endDateMilli = Date.parse(endDateString);

// const currentTimeMilli = Date.parse(new Date());

// // Get the number of milliseconds between current time and end date
// const timeLeftMilli = endDateMilli - currentTimeMilli;
// console.log(timeLeftMilli);

// // Get the number of seconds, minutes, hours and days between current time and end date 
// const timeLeftSeconds = timeLeftMilli / 1000; 
// const timeLeftMinutes = timeLeftSeconds / 60;
// const timeLeftHours = timeLeftMinutes / 60;
// const timeLeftDays = timeLeftHours / 24;

// // Get the remaining seconds after converting in minutes
// const secondsLeft = Math.floor(timeLeftSeconds % 60);

// // Get the remaining minutes after converting in hours
// const minutesLeft = Math.floor(timeLeftMinutes % 60);

// // Get the remaining hours after converting in days
// const hoursLeft = Math.floor(timeLeftHours % 24);
// const daysLeft = Math.floor(timeLeftDays);

// console.log(`
//     Seconds: ${secondsLeft}s\nMinutes: ${minutesLeft}\nHours: ${hoursLeft}\nDays: ${daysLeft}
// `);