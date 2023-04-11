const btnGenerate = document.querySelector('#btn-generate');
const mainContent = document.querySelector('#main-content');

// Reference to the dragged element, need to have global scope to use in both drag/drop methods
let dragElem = null;

btnGenerate.addEventListener('click', (evt) => {
    resetWords();
    const word = getRandomWord();
    const shuffledWord = shuffleWord(word);
    renderDragElements(shuffledWord);
    renderDropElement();
});

// Return a random integer between min(inclusive) and max(exclusive)
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

// Return a random element from a predefined array of programming related words
function getRandomWord()
{
    const words = [
        'Inheritance',
        'Polymorphism',
        'Abstraction',
        'Encapsulation',
        'Variable',
        'Sequence',
        'Iteration',
        'Operators',
        'Function',
        'Pseudocode',
        'Loop',
        'Type',
        'String',
        'Array',
        'Number',
    ];

    const randomIdx = getRandomInteger(0, words.length);
    return words[randomIdx];
}

// Use the Fisher-Yates algorithm to shuffle the letters order of a given word and then return it 
function shuffleWord(word)
{
    const arrLetters = Array.from(word, (letter) => letter.toLowerCase());
    for (let i = arrLetters.length; i > 0; i--)
    {
        let randomIdx = Math.floor(Math.random() * (i + 1));
        // Using destructuring assignment, one can easily swap two values:
        // Here: arrLetters[i] = arrLetters[randomIdx] and arrLetters[randomIdx] = arrLetters[i]
        [arrLetters[i], arrLetters[randomIdx]] = [arrLetters[randomIdx], arrLetters[i]];
    }

    return arrLetters.join('');
}

// Display one random word on screen, each letter being draggable entity
function renderDragElements(word)
{
    const pDrag = document.createElement('p');
    pDrag.classList.add('ctn-drag');
    
    for (let i = 0; i < word.length; i++)
    {
        const span = document.createElement('span')
        span.textContent = word[i];
        span.classList.add('letter');
        span.setAttribute('draggable', true);
        pDrag.append(span);

        // Drag Behavior
        // When dragging begins
        span.addEventListener('dragstart', (event) => {
            const dragSpan = event.target;
            dragSpan.classList.add('is-dragged');
            // Reference to the dragged element, will need it in for drop events
            dragElem = event.target;
            console.dir(dragElem);
        });

        // When dragging ends
        span.addEventListener('dragend', (event) => {
            const dragSpan = event.target;
            dragSpan.classList.remove('is-dragged');
        });
    }

    mainContent.append(pDrag);
}

// Display one 'dropzone' on screen to drop into the draggable entities
function renderDropElement()
{
    const pDrop = document.createElement('p');
    pDrop.classList.add('ctn-drop');
    mainContent.append(pDrop);

    // Drop Behavior
    pDrop.addEventListener('dragover', (event) => {
        // Prevent default to allow the paragraph to receive drop event
        event.preventDefault();
    });

    pDrop.addEventListener('drop', (event) => {
        // Prevent default action 
        event.preventDefault()
        const dropCtn = event.target;
        // Remove the element from the 'drag' paragraph and put it into the 'drop' one
        if (dropCtn.className === 'ctn-drop') {
            dragElem.parentNode.removeChild(dragElem);
            dropCtn.appendChild(dragElem);
        }
    });
}

// Reinitialize the document's main part before rendering any new word
function resetWords()
{
    const childrens = Array.from(mainContent.children);
    childrens.forEach((elem) => {
        if (elem.className === 'ctn-drag' || elem.className === 'ctn-drop')
        {
            elem.remove();
        }
    });
}