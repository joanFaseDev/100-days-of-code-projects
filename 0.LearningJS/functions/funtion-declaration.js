/**
 * Functions are useful to prevent code duplication. No matter how many times the function is called,
 * its code will always be in one place which makes it very easy to modify.
 * 
 * Function Declaration
 */

function showMessage(message)
{
    alert(message);
}

/**
 * Local Variable
 * 
 * A variable declared inside a function is only visible inside that function.
 */
function showMyName()
{
    let myName = 'Jordan';
    alert(`My name is ${myName}`);
}

// An error will occurs, myName is only defined inside the showMyName function.
try
{
    alert(myName);
}
catch(error)
{
    console.log(error);
}

/**
 * Outer Variable
 * 
 * Functions can access and modify outer variables
 */

let myAge = 37;

function showMyAge()
{
    alert(`My age is ${myAge}.`);
}

showMyAge(); // 'My age is 37.'

myAge = ++myAge;

showMyAge(); // 'My age is 38.'

/**
 * Outer variables are only used if no local variable with the same name exists.
 * If a local and outer variable share the same name, the local one will 'shadows' the outer one.
 * That means the outer one will be ignored in favor of the local one.
 */

// Variable declared outside of any function are called 'global'
let book = 'Six of Crows';

function showBook()
{
    let book = 'The knife of never letting go';
    alert(book);
}

showBook(); // 'The knife of never letting go'
console.log(window.hasOwnProperty('book'));

/**
 * Parameters & Arguments
 * 
 * Parameters are the local variables listed inside the parentheses in the function's declaration.
 * Arguments are the values passed to the function when it is called.
 * Parameters are then initialized to the values of the arguments supplied. 
 */

function showQuote(quote, author)
{
    quote = `"${quote}"`;
    alert(`${quote} -> ${author}`);
}

showQuote('Time and tide wait for no man.', 'Saint Mahrer');

/**
 * When an outer value is passed to a function, the function always get a copy of the value.
 */

let exclamation = 'banzai';

function yell(word)
{
    word = `${word.toUpperCase()}!!`;
    alert(word);
}

yell(exclamation); // BANZAI!!
alert(exclamation) // banzai      The outer variable's value is unchanged.

/**
 * Default value & alternative default value
 * 
 * If a function is called but an argument is not provided then its value is undefined.
 * Such behavior is not an error.
 * Using the assignment operator, one can set a default value for a parameter.
 * A default value is used if the associated argument is omitted.
 */

showMessage() // undefined

function showGame(game = 'No game was provided.')
{
    alert(game);
}

// Default values are only evaluated if its respective parameter isn't passed.

showGame('Illusion of Time'); // Illusion of Time
showGame(); // No game was provided

// More complex expressions can also be used as default parameters

function returnSong()
{
    return 'Numb';
}

function showSong(song = returnSong())
{
    alert(`Title song: ${song}`);
}

showSong('Breaking the Habit'); // Title song: Breaking the Habit
showSong(); // Title song: Numb

/**
 * It's also possible to set default value at a later stage after the function declaration
 * Modern JavaScript's nullish coalescing operator (??) can be used in such situation.
 */

function showSize(size)
{
    // ...
    alert(size ?? 'No size was provided.'); // Second operand is only returned if the first is equal to null or undefined 
}

showSize(191); // 191
showSize(); // No size was provided.

/**
 * Returning a value
 * 
 * A function can return a value in the calling code (where the function was initially called) as a result.
 * The directive 'return' can be anywhere in the function's body.
 * When the execution reaches it, the function is stopped and the value returned.
 */

function showEvenNumbers(arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
{
    const evenArr = [];
    for (let i = 0; i < arr.length; i++)
    {
        if (i % 2 === 0)
        {
            evenArr.push(i);
        }
    }

    return evenArr;
}

console.log(showEvenNumbers()); // [0, 2, 4, 6, 8, 10];x

/**
 * There can be many occurences of 'return' in a single function.
 * Using return without suffixing a value will still exits the function.
 * A function without a return or a function returning nothing will still return 'undefined' 
 */ 

let race = 'Terran';

function quoteProtoss(race)
{
    if (race !== 'Protoss')
    {
        return;
    }
    else
    {
        return 'My life fof Azur!';
    }
}

let quote = quoteProtoss(race);

console.log(quoteProtoss(quote)); // undefined;

function doNothing()
{

}

alert(doNothing()); // undefined


