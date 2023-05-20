"use strict";

/**
 * Primitive = value of a primitive type (string, number, bigInt, boolean, symbol, null, undefined)
 * Object = can store multiple values as properties. Can be created through object litteral or constructor.
 * 
 * Objects take more ressources than primitives which have to stay at lightweight and fast as possible. So what
 * JavaScript actually do when a primitive want to have access to a property / method is create a 'wrapper object'.
 * This object make it possible for the primitive to perfom its action, once the action is done the wrapper object
 * is destroyed.
 * 
 * There's wrapper objects for string (String), number (Number), boolean (Boolean), bigInt(BigInt) and symbol (Symbol).
 * Each with its own set of properties / methods.
 * 
 * null and undefined are the only primitives without wrapper objects. Trying to access methods for any of these types will
 * trigger an error. 
 */

/**
 * Number (regular number, bigInt aren't focused here)
 * 
 * JavaScript ignores the '_' character between digit so it can be use freely as a separator.
 */

let withoutUnderscore = 1000000000;
let withUnderscore = 1_000_000_000;

console.log(withoutUnderscore === withUnderscore) // true

// In JavaScript, a number can be shorten by appending the letter 'e' to it and specifying the 0 count.

let billion = 1e9; // multiply by one and the given zero count -> 1 * 1 000 000 000 
let anotherBillion = 1_000_000_000;

console.log(anotherBillion === billion) // true

console.log(123e3, 123e6, 123e9);

// It also works in reverse.

let negative = 5e-2; // divide by one and the given zero count -> 5 / 100
console.log(negative === 0.05);

// Hexadecimal colors being widely used in JavaScript, there is a shortcut to write them.

let shortcutMaxHex = 0xff;
let maxHex = 255;

console.log(shortcutMaxHex === maxHex); // true

/**
 * toString(base) gives a string representation of a given number in the numerical system with the given base.
 * The second dot character tell JavaScript that the number is not decimal and a method is actually called. 
 */ 

console.log(255..toString(16)); // 255 in hexadecimal system gives ff
console.log(5..toString(2)); // 5 in binary system gives 101

/**
 * There're various ways to round a number in JavaScript.
 * 
 */

let notSoRoundNumber = 100.314;
console.log(Math.ceil(notSoRoundNumber)); // 101 Rounds up!
console.log(Math.floor(notSoRoundNumber)); // 100 Rounds down!
console.log(Math.round(notSoRoundNumber)); // 100 Rounds to the nearest integer!
console.log(Math.trunc(notSoRoundNumber)); // 100 Don't round anything and just cut the decimal part!

/**
 * Imprecise calculations
 * A number is stored in memory in its binary form (sequence of bits, 0 and 1)
 * The same way it's not possible to store the result of 1 / 3 as a decimal fraction, it's not possible to store exactly 0.1 or 0.2 using the binary system.
 * That issue is not specific to JavaScript. The same thing can be observed in PHP, Java, C, ... because they are based on the same numeric format.
 */

console.log(0.1 + 0.2 === 0.3); // false!
console.log(0.1 + 0.2 === 0.30000000000000004); // true!

// One simple way to solve the issue:

console.log(Number((0.1 + 0.2).toFixed(1))); // 0.3

/**
 * NaN (Not A Number) isn't equal to anything... including itself!
 * The best way to check for NaN is to use the dedicated method (isNaN).
 */

console.log(NaN === NaN); // false!
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false

/**
 * isFinite() method convert its argument into a number and check if it's a regular one or an 'irregular' one(NaN, Infinity, -Infinity)
 */

console.log(isFinite(100)); // true
console.log(isFinite(100.14)); // true
console.log(isFinite("100")); // true
console.log(100 + Infinity); // Infinity (same as false)
console.log(isFinite(NaN)); // false
console.log(isFinite('No!')); // false (can't be converted into number so return NaN)
console.log(true == Infinity);

// Number.isNaN() & Number.isFinite() are more strict as they do not convert their argument into number before checking.

console.log(Number.isNaN('Hello World!')); // false because it's a string and there's no conversion here.
console.log(isNaN('Hello World!')); // true because the string is converted into number which gives NaN as a result.

/**
 * Object.is(param1, param2) is a more efficient way to check for strict equality than the dedicated operator (===) because contrary to the latter Object.is() treats all NaN values as equal and make the difference between 0 and -0.
 */

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

/**
 * Contrary to the Number() method which is strict (meaning it will returns NaN if the argument can't be fully convert into a regular number), parseInt() and parseFloat() will convert as much as possible their argument (meaning it'll convert until it can't);
 */

let cssMeasure = '150px';
let dollarLast = '500$';
let dollarFirst = '$500';
console.log(Number.parseInt(cssMeasure)); // 150
console.log(Number.parseInt(dollarLast)); // 500
console.log(Number.parseInt(dollarFirst)); // NaN as the first character cannot be convert into number

let breadPrice = '0.82 euros';
let myHeight = '1.91m';
let hexColorBlack = '#000';
console.log(Number.parseFloat(breadPrice)); // 0.82
console.log(Number.parseFloat(myHeight)); // 1.91
console.log(Number.parseFloat(hexColorBlack)); // NaN as the character # cannot be converted into number

/**
 * The parseInt() function can also take a second argument corresponding to the base in mathematical numeral system (radix) which can be really useful for, let's say, convert a hexadecimal value into a rgb one!
 */

let sunsetOrange = {
    red: 'fb',
    green: '85',
    blue: '00',
};

console.log(
    parseInt(`${sunsetOrange.red}`, 16),
    parseInt(`${sunsetOrange.green}`, 16),
    parseInt(`${sunsetOrange.blue}`, 16)); // 251 133 0


// EXERCICES:

//1) Create a script that prompts the visitor to enter two numbers and then show their sum.

let a = parseInt(prompt('A?', ''));
let b = parseInt(prompt('B?', ''));

let result = (Object.is(a + b, NaN)) ? 'Error! You didn\'t enter regular numbers' :
    a + b;

alert(result);

//2) Round 6.35 the right way

console.log(Math.ceil(6.35 * 1e1) / 10); //6.4

/**
 * Prompts for a number until user enters a valid numeric value and returns it converted into number. Process can be stopped by entering  an empty * line or pressing 'CANCEL'. In that case, returns null. 
 * 
 */

// alert(promptNumber());

// function promptNumber() {
//     let answer = null;
//     label : do {
//         answer = prompt('Number?', '10');
//         if (answer === '' || answer === 'CANCEL') {
//             return null;
//         }

//         answer = Number(answer);
//         if (answer) {
//             return answer;
//         }

//     } while (!answer)
// }

//3) Generate a random floating point number from min(inclusive) to max(non inclusive)
function generateRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

console.log(generateRandomFloat(2, 3));

//4) Generate a random integer from min(inclusive) to max(inclusive)
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

console.log(generateRandomInteger(0, 5));