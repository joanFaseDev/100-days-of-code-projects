const btnCheck = document.querySelector('#btn-check');
const btnGenerate = document.querySelector('#btn-generate');
const label = document.querySelector('#label-input')
const input = document.querySelector('#user-input');
const mainCtn = document.querySelector('#main-container');

const palindromes = [
    'Abba',
    'Aibohphobia',
    'Bib',
    'Bob',
    'Civic',
    'Deified',
    'Detartrated',
    'Dewed',
    'Eve',
    'Hannah',
    'Kayak',
    'Level',
    'Madam',
    'Malayalam',
    'Minim',
    'Mom', 
    'Murdrum',
    'Noon',
    'Nun',
    'Otto',
    'Peep',
    'Pop',
    'Racecar',
    'Radar',
    'Redder',
    'Refer',
    'Repaper',
    'Rotator',
    'Rotavator',
    'Sagas',
    'Sis',
    'Solos',
    'Stats',
    'Tattarrattat',
    'Tenet', 
    'Wow',
    'Taco cat',
    'Never odd or even',
    'Madam, I’m Adam',
    'Mr. Owl ate my metal worm.',
    'Was it a car or a cat I saw?',
    'Murder for a jar of red rum.',
    'Go hang a salami, I’m a lasagna hog.',
    'Do geese see God?',
    'Evil olive',
    'Amore, Roma',
    'A man, a plan, a canal: Panama',
    'My gym',
    'No lemon, no melon',
    'Top spot',
    'Sit on a potato pan, Otis!',
    'Ah. Satan sees Natasha.',
    'Cigar? Toss it in a can. It is so tragic.',
    'Did Hannah See bees? Hannah did.',
    'Borrow, or rob?',
    'Eva, can I see bees in a cave?',
    'Poor Dan is in a droop.',
    'Oozy rat in a sanitary zoo.',
    'Step on no pets.',
    'Able was I ere I saw Elba.',
    'Sir, I demand, I am a maid named Iris.',
    'We panic in a pew.',
    'Won’t lovers revolt now?',
    'Don’t nod.'
];

// BUTTON CLEAR
btnCheck.addEventListener('click', (evt) => {
    // Prevent the form's data being submitted to the server
    evt.preventDefault();
    // Clear the DOM of the previous answer
    removeResult();
    removeLabelWarning();

    const str = input.value;
    if (checkValidInput(str))
    {
        label.textContent = 'Write something below';
        const isPalindrome = checkPalindrome(str);
        generateResult(str, isPalindrome);
        input.value = '';
    }
    else
    {
        // label.textContent = 'Write something below WITH AT LEAST ONE CHARACTER!';
        const span = document.createElement('span');
        span.textContent = ' WITH AT LEAST ONE CHARACTER!';
        span.setAttribute('class', 'label-warning');
        label.append(span);
    }
});

// BUTTON GENERATE
btnGenerate.addEventListener('click', (evt) => {
    generatePalindrome();
});

// Delete the result message from the DOM
function removeResult()
{
    const result = document.querySelector('.result');
    if (result) result.remove();
}

// Delete the warning message from the DOM
function removeLabelWarning()
{
    const warning = document.querySelector('.label-warning');
    if (warning) warning.remove();
}

// Display to the screen the result of user's input being a palindrome or not
function generateResult(inputTested, result)
{
    const paragraph = document.createElement('p');
    // Create a span to apply proper styling later but only to the user's input
    const span = document.createElement('span');
    span.textContent = `"${inputTested}"`;
    span.setAttribute('class', 'result-input');
    paragraph.setAttribute('class', 'result');
    paragraph.textContent = (result) ? ` is a valid palindrome.`
        : ` is not a palindrome.`;
    paragraph.insertBefore(span, paragraph.lastChild);
    mainCtn.append(paragraph);
}

// Generate a random palindrome and display it in the input field
function generatePalindrome()
{
    const max = palindromes.length;
    const randomIdx = randomInteger(0, max);
    const palindrome = palindromes[randomIdx];
    input.value = palindrome;
}

// Generate a random integer between min and max values
function randomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

// Check if input string is a palindrome or not
function checkPalindrome(input)
{
    // Regular expression matching any punctuation characters (litteral notation is used for better performances)
    const regEx = /[!"#$%&'’()*+,-./:;<=>?@[\]^_`{|}\s~]/g;
    const noPunctuation = input.replace(regEx, '');
    
    // Convert into an array and create a copy to use the reverse method then convert back into string
    const chars = Array.from(noPunctuation, (char) => char.toLowerCase()).join('');
    const reverseChars = Array.from(chars).reverse().join('');

    // If both array's contents match then the user's input is a palindrome
    return chars === reverseChars;
}

// Test checkPalindrome() logic on a small palindrome sample
function checkPalindromeFunction()
{
    return palindromes.filter((elem) => !checkPalindrome(elem));
}

// Check if th user's input is neither a null object nor it is an empty string
function checkValidInput(input)
{
    return typeof input !== null && input.trim().length !== 0
}