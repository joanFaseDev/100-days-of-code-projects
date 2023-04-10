const input = document.querySelector('#user-data');
const btnAdd = document.querySelector('#btn-add');
const btnGenerate = document.querySelector('#btn-generate');
const main = document.querySelector('#main-content');

btnAdd.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearWarningMessage();
    generateTask();
    clearField();
});

btnGenerate.addEventListener('click', (evt) => {
    const randomTask = getRandomTask();
    input.value = randomTask;
});

// Create all DOM elements necessary to render the new list entry on screen
function generateTask()
{
    const data = input.value;
    const isValid = checkUserInput(data);

    if (isValid) 
    {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const paragraph = document.createElement('p');
        const ctnBtns = document.createElement('div');
        const btnClear = document.createElement('button');
        const btnRemove = document.createElement('button');
        
        paragraph.textContent = data;

        li.addEventListener('dragend', (evt) => {
            evt.target.classList.remove('is-dragged');
        });

        li.classList.add('is-unchecked');
        ctnBtns.classList.add('ctn-btns');
        btnClear.setAttribute('type', 'button');
        btnClear.textContent = 'Clear';
        btnRemove.setAttribute('type', 'button');
        btnRemove.textContent = 'Delete';

        // Add / remove special style to completed tasks
        btnClear.addEventListener('click', (evt) => {
            if (btnClear.textContent === 'Clear')
            {
                paragraph.setAttribute('class', 'is-clear');
                btnClear.textContent = 'Unclear';
                li.classList.remove('is-unchecked');
                li.classList.add('is-checked-green');
            }
            else
            {
                paragraph.removeAttribute('class');
                btnClear.textContent = 'Clear';
                li.classList.remove('is-checked-green');
                li.classList.add('is-unchecked');
            }
        });
        
        // Remove the list item if its designated remove button is clicked
        btnRemove.addEventListener('click', (evt) => {
            li.remove();
            removeList();
        });
    
        let ul = checkList();
        if (!ul)
        {
            ul = document.createElement('ul');
            ul.setAttribute('id', 'tasks-list');
        }
    
        ctnBtns.append(btnClear);
        ctnBtns.append(btnRemove);
        div.append(paragraph);
        div.append(ctnBtns);
        li.append(div);
        ul.append(li);
        main.append(ul);
        console.dir(ul);
    }
}

// Clear the input field's content
function clearField()
{
    input.value = '';
}

// Remove the list if there's no more entries inside
function removeList()
{
    const ul = checkList();
    if (ul)
    {
        if (ul.children.length === 0)
        {
            ul.remove();
        }
    }
}

// Check if the task list has already been created
function checkList()
{
    const ul = document.getElementById('tasks-list');
    return ul;
}

// Check user's input validity
function checkUserInput(data)
{
    if (data.length <= 4)
    {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Valid entry should be AT LEAST 5 characters long.';
        paragraph.setAttribute('id', 'warning');
        main.append(paragraph);
        return false;
    }

    return true;
}

// Delete warning message if there's already one
function clearWarningMessage()
{
    const warning = document.getElementById('warning');
    if (warning)
    {
        warning.remove();
    }
}

// Return a random to-do task
function getRandomTask()
{
    const tasks = [
        'Play an instrument',
        'Write a short story',
        'Do a deep dive on a subject that interests you',
        'Fill out a crossword puzzle',
        'Watch a rom-com marathon',
        'Plan your next getaway',
        'Learn a how to do new hairstyle',
        'Try a coloring app',
        'Play Elden Ring. Defeat Malenia.',
        'Whip up a new recipe',
        'Indulge in a sundae bar',
        'Build a gingerbread house',
        'Write to a deployed soldier',
        'Put together a care package',
        'Work on your wish list',
        'Unplug your devices',
        'Paint your nails',
        'Take a bubble bath',
        'Walk down memory lane',
        'Give a pep talk',
        'Watch a movie outdoors'
    ];
    const randomIdx = getRandomInteger(0, tasks.length);
    return tasks[randomIdx];
}

// Return a random integer between min (inclusive) and max (exclusive)
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}