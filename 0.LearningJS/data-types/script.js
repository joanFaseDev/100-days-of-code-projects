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
