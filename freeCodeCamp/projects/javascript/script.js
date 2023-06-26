/**
 * Project 1: Palindrome Checker
 * 
 * Return 'true' if the given string is a palindrome. Otherwise, return false.
 * A palindrome is a word sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
 * 
 * Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces, and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.
 */

function palindrome(str) {
    // Create a copy of the string and put all its elements into an array.
    const copyStr = str;
    const arr = [...copyStr];
    const alphanumericArr = removeSpecialChars(arr);    
    const forwardArr = updateToLowerCase(alphanumericArr);
    const backwardArr = createBackwardArray(forwardArr);
    return forwardArr.join("") === backwardArr.join("");
}

// Remove special characters & underscore from the array.
function removeSpecialChars(arr) {
    const specialCharRegEx = /\w/i;
    const underscoreRegEx = /[^_]/i; 
    return arr.filter(elem => specialCharRegEx.test(elem) && underscoreRegEx.test(elem));
}

// Return a new array with all elements into lower case.
function updateToLowerCase(arr) {
    return arr.map(elem => elem.toLowerCase());
}

// Take an array and create a new one with all content backward.
function createBackwardArray(arr) {
    const newArr = [];
    arr.forEach(char => newArr.unshift(char));
    return newArr;
}

console.log(palindrome("fIve|\_/|fOur"));
console.log(palindrome("My age is 0, 0 si ega ym."));
console.log(palindrome("0_0 (: /-\ :) 0-0"));


/**
 * Project 2: Roman Numeral Converter
 * 
 * Convert the given number into a roman numeral.
 * 
 * Roman numerals     Arabic numerals
 *      M                   1000
 *      CM                  900
 *      D                   500
 *      CD                  400
 *      C                   100
 *      XC                  90
 *      L                   50
 *      XL                  40  
 *      X                   10  
 *      IX                  9
 *      V                   5
 *      IV                  4
 *      I                   1
 * 
 * All roman numerals answers should be provided in upper-case.
 * The highest value tested is 3999.   
 */

function convertToRoman(num) {
    const arabicToRoman = {
        3000: 'MMM',
        2000: 'MM',
        1000: 'M',
        900: 'CM',
        800: 'DCCC',
        700: 'DCC',
        600: 'DC',
        500: 'D',
        400: 'CD',
        300: 'CCC',
        200: 'CC',
        100: 'C',
        90: 'XC',
        80: 'LXXX',
        70: 'LXX',
        60: 'LX',
        50: 'L',
        40: 'XL',
        30: 'XXX',
        20: 'XX',
        10: 'X',
        9: 'IX',
        8: 'VIII',
        7: 'VII',
        6: 'VI',
        5: 'V',
        4: 'IV',
        3: 'III',
        2: 'II',
        1: 'I'
    };
    
    const converter = {
        arabicNum: "",
        idx: 0,
    }

    // Create an array with each digit of the number
    const arrNum = [...String(num)].map(str => Number(str));
    switch (arrNum.length) {
        case 4:
            const charThousand = arrNum.shift();
            const numThousand = `${String(charThousand)}000`;
            converter.arabicNum += arabicToRoman[numThousand];
        case 3:
            const charHundred = arrNum.shift();
            if (charHundred !== 0) {
                const numHundred = `${String(charHundred)}00`;
                converter.arabicNum += arabicToRoman[numHundred];  
            }
        case 2:
            const charTen = arrNum.shift();
            if (charTen !== 0) {
                const numTen = `${String(charTen)}0`;
                converter.arabicNum += arabicToRoman[numTen];
            }
        default:
            const charNum = arrNum.shift();
            if (charNum !== 0) {
                const num =  `${String(charNum)}`;
                converter.arabicNum += arabicToRoman[num];
            }
            break;
    }

    return converter.arabicNum;
}

console.log(convertToRoman(2014));
console.log(convertToRoman(3999));
console.log(convertToRoman(891));


/**
 * Project 3: Caesars Cipher
 * 
 * One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
 * In a shift cipher the meanings of the letters are shifted by some set amount.
 * A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 * Thus A <-- --> N, B <-- --> O and so on.
 * Write a function which takes a ROT13 encoded string as input and returns a decode string.
 * All letters will be uppercase. Do not transform any non-alphabetic character (i.e spaces, punctuation),
 * but do pass them on.
 */

function rot13(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const CIPHER = 13;
    const arr = [...str];
    const alphaRegEx = /[a-zA-Z]/;
    const newArr = arr.map((char, index, arr) => {
        if (alphaRegEx.test(char)) {
            const alphabetIdx = alphabet.indexOf(char);
            const codedLetter = alphabet[alphabetIdx + CIPHER];
            console.log(alphabetIdx, codedLetter);
            return codedLetter;
        }
        return char;        
    });
    return newArr.join("");
}

console.log(rot13("SERR PBQR PNZC"));