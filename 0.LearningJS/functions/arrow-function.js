/**
 * Arrow function
 * 
 * Arrow function is a shorter version of a function expression.
 * It can take arguments.
 * Arrow function evaluate its expression (code to the right of the arrow) then return the result.
 */

let showMyFavoriteMovies = ([...movies]) => console.log(...movies);

showMyFavoriteMovies(['The untouchables', 'LA Confidential', 'Predator']); // The untouchables LA Confidential Predator

// If there's only one argument then the parentheses can be omitted.
let greet = name => console.log(`Hey ${name}!`);

greet('Nathan'); // Hey Nathan!

// If there's zero or more than one argument then the parentheses are mandatory.
let refuse = () => console.log('I will not!');

refuse(); // I will not!

// Arrow functions, like function expressions, are mainly used when a function need to be created dynamically.
let handleSituation;
let isDangerous = confirm('Is the situation dangerous?');

handleSituation = (isDangerous) ? () => console.log('There\'s trouble. Let\'s call for backup!')
    : () => console.log('Easy Peasy! I can handle that alone.');

handleSituation(); // true -> There's trouble. Let's call for backup! false -> Easy Peasy! I can handle that alone.

/**
 * Arrow functions are perfect for one line action but they can also be used for more complex functions.
 * If the expression can't fit in one line then curly braces are mandatory.
 * If there are curly braces then the return directive is also mandatory.
 */

let sortEvenNumber = (arr) => {
    let evenNumbers = arr.filter((elem) => elem % 2 === 0);
    let numbersSorted = evenNumbers.sort((a, b) => a - b);
    return numbersSorted;
};

console.log(sortEvenNumber([101, 55, 52, 200, 4, 34, 26, 18, 2])) // [2, 4, 18, 26, 34, 52, 200]
