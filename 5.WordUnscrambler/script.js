const btnGenerate = document.querySelector('#btn-generate');
const mainContent = document.querySelector('#main-content');

// Reference to the dragged element, need to have global scope to use in both drag/drop functions
let dragElem = null;

// Reference to the word the user need to scramble, need to have globa scope to use in callback and drop functions
let scrambledWord = null;

btnGenerate.addEventListener('click', (evt) => {
    resetWords();
    if (document.querySelector('.ctn-drag'))
    {
        document.querySelector('.ctn-drag').remove();
    }
    const word = getRandomWord();
    scrambledWord = word;
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
    return words[randomIdx].toLowerCase();
}

// Use the Fisher-Yates algorithm to shuffle the letters order of a given word and then return it 
function shuffleWord(word)
{
    const arrLetters = Array.from(word);
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
    for (let i = 0; i < scrambledWord.length; i++)
    {
        const divDrop = document.createElement('div');
        divDrop.classList.add('div-drop');
        pDrop.append(divDrop);

        // Drop Behavior
        divDrop.addEventListener('dragover', (event) => {
            // Prevent default to allow the div to receive drop event
            event.preventDefault();
        });

        // Is fired when the dragged element (span) enters a valid drop target
        divDrop.addEventListener('dragenter', (event) => {
            if (event.target.classList.contains('div-drop'))
            {
                event.target.classList.add('is-dropzone');
            }
        });

        // Is fired when the dragged element (span) leaves a valid drop target
        divDrop.addEventListener('dragleave', (event) => {
            if (event.target.classList.contains('div-drop'))
            {
                event.target.classList.remove('is-dropzone');
            }
        });
        
        divDrop.addEventListener('drop', (event) => {
            // Prevent default action 
            event.preventDefault()
            // Remove the element from the 'drag' paragraph and put it into the targeted 'drop' div 
            if (event.target.classList.contains('div-drop')) {
                dragElem.parentNode.removeChild(dragElem);
                event.target.appendChild(dragElem);
            }

            // Each time a letter is drop, check all letters currently in the 'drop' paragraph.
            // Join them as a string and check if it match the scramble word.
            const letters = [];
            Array.from(pDrop.children, (div) => {
                if (div.children.length !== 0)
                {
                    letters.push(div.firstChild.textContent);
                }
            });

            userWord = letters.join('');
            console.log(userWord, scrambledWord);
            if (userWord === scrambledWord)
            {
                const spans = document.querySelectorAll('.letter');
                spans.forEach((span) => span.classList.add('is-correct'));
                document.querySelector('.ctn-drag').textContent = 'Congratulation!\n You guess it right!';
                document.querySelector('.ctn-drag').classList.add('congratulation');
            }

        });
    }
    pDrop.classList.add('ctn-drop');
    mainContent.append(pDrop);
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