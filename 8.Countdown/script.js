const btnValidate = document.querySelector('#btn-validate');

btnValidate.addEventListener('click', countdownHandler);

function countdownHandler(event)
{
    const milliseconds = getMillisecondsCountdown(event);
    const seconds = getSecondsLeft(milliseconds);
    const minutes = getMinutesLeft(milliseconds);
    const hours = getHoursLeft(milliseconds);
    const days = getDaysLeft(milliseconds);

    console.log(`days:hours:minutes:seconds => ${days}:${hours}:${minutes}:${seconds}`);
}

// Get the number of milliseconds between the current time and the end time (countdown 0)
function getMillisecondsCountdown(event)
{
    event.preventDefault()
    const dateCountdown = document.querySelector('#end-date').value;
    const timeCountdown = document.querySelector('#end-time').value;
    const validDateFormat = `${dateCountdown} ${timeCountdown}`;

    // Get the number of milliseconds between the current time and the end time (countdown 0)
    const milliSecondsLeft = Date.parse(validDateFormat) - Date.parse(new Date()); 
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
    return Math.floor(milliseconds / 1000 / 60 / 60 / 24);
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
const endDateString = '21 Apr 2023 06:00:00 GMT';
const endDateMilli = Date.parse(endDateString);

const currentTimeMilli = Date.parse(new Date());

// Get the number of milliseconds between current time and end date
const timeLeftMilli = endDateMilli - currentTimeMilli;
console.log(timeLeftMilli);

// Get the number of seconds, minutes, hours and days between current time and end date 
const timeLeftSeconds = timeLeftMilli / 1000; 
const timeLeftMinutes = timeLeftSeconds / 60;
const timeLeftHours = timeLeftMinutes / 60;
const timeLeftDays = timeLeftHours / 24;

// Get the remaining seconds after converting in minutes
const secondsLeft = Math.floor(timeLeftSeconds % 60);

// Get the remaining minutes after converting in hours
const minutesLeft = Math.floor(timeLeftMinutes % 60);

// Get the remaining hours after converting in days
const hoursLeft = Math.floor(timeLeftHours % 24);
const daysLeft = Math.floor(timeLeftDays);

console.log(`
    Seconds: ${secondsLeft}s\nMinutes: ${minutesLeft}\nHours: ${hoursLeft}\nDays: ${daysLeft}
`);