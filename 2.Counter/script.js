const body = document.querySelector('body');
const count = document.querySelector('#count');
const btns = document.querySelectorAll('button');

// Counter variable
let numb = 0;

// Get values associated to the CSS variables used for the body element
const primaryClr = getComputedStyle(body).getPropertyValue('--primary-color');
const secondaryClr = getComputedStyle(body).getPropertyValue('--secondary-color');

btns.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        const id = btn.id;
        (id === 'decrease') ? decrementNumber()
            : (id === 'increase') ? incrementNumber()
            : resetNumber()

        updateCount();
        updateColors();
    });
});

function resetNumber()
{
    numb = 0;
}

function incrementNumber()
{
    numb += 1;
}

function decrementNumber()
{
    numb -= 1;
}

function updateCount()
{
    count.textContent = numb;
}

// Switch the background color / color of the body element if the counter is positive or negative
function updateColors()
{
    if (numb < 0)
    {
        body.style.backgroundColor = secondaryClr;
        body.style.color = primaryClr;
    }
    else
    {
        body.style.backgroundColor = primaryClr;
        body.style.color = secondaryClr;   
    }
}