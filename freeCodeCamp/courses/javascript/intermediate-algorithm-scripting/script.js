/**
 * For all of the following exercises, my personal goal was to only use functional programming and only declare variables with the const declaration.
 * 
 * Exercise 1: Sum All Numbers in a Range
 * 
 * We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.
 */

function sumAll(arr) {
    const obj = { sum: 0 };
    const newArr = arr
        .concat([])
        .sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);

    for (let i = newArr[0]; i <= newArr[1]; i++) {
        obj["sum"] += i;
    }

    return obj["sum"];
        
}

const test = sumAll([10, 5]);
console.log(test);

/**
 * Exercise 2: Diff Two Arrays 
 * 
 * Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.
 */

// First solution
function diffArray(arr1, arr2) {
    const differenceArr = [];
    arr1.forEach(elem => {
        if (arr2.indexOf(elem) === -1) {
            differenceArr.push(elem);
        }
    });
    arr2.forEach(elem => {
        if (arr1.indexOf(elem) === -1) {
            differenceArr.push(elem);
        }
    });

    return differenceArr.sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
}

console.log(diffArray(
    ["Hello World", "Yes sir!", "Alea Jacta Est", "There will be blood", "Umbasa!"],
    ["Umbasa!", "This beautiful world...", "Winter is coming.", "There will be blood"]
));

//Second solution
function diffArrayV2(arr1, arr2) {
    const differenceArr = [];
    const arrs = [arr1, arr2];
    for (let i = 0, j = 1; i < arrs.length; i++, j--) {
        arrs[i].forEach(elem => {
            if (arrs[j].indexOf(elem) === -1) {
                differenceArr.push(elem);
            }
        });
    }

    return differenceArr.sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
}

console.log(diffArrayV2(
    ["Hello World", "Yes sir!", "Alea Jacta Est", "There will be blood", "Umbasa!"],
    ["Umbasa!", "This beautiful world...", "Winter is coming.", "There will be blood"]
));

/**
 * Exercise 3: Seek and Destroy
 * 
 * You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.
 * You have to use the arguments object. 
 */

function destroyer(arr) {
    const copyArr = [...arguments];
    console.log(copyArr);
    const initialArr = copyArr.shift();
    console.log(initialArr);
    const newArr = initialArr.filter(elem => {
        console.log(elem);
        return copyArr.indexOf(elem) === -1;
    });
    return newArr;
}

console.log(destroyer([1, 10, 50, "Hello World", 100, 1000], "Umbasa!", "Praise the Sun!", 1000, "Hello World"));

/**
 * Exercise 4: Wherefore art thou
 * 
 * Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument).
 * Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.
 */

function whatIsInAName(collection, source) {
    const newArr = [];
    const identifiers = Object.keys(source);
    for (let i = 0; i < collection.length; i++) {
        const mustBeIncluded = identifiers.every((identifier) => {
            return collection[i].hasOwnProperty(identifier) && collection[i][identifier] === source[identifier];
        });
        if (mustBeIncluded) {
            newArr.push(collection[i]);
        }
    }
    return newArr;
}

console.log(whatIsInAName(
    [
        {
            firstName: "Kaz",
            lastName: "Brekker",
        },
        {
            firstName: "Inej",
            lastName: "Gahfa",
        },
        {
            firstName: "Katniss",
            lastName: "Everdeen",
        },
        {
            firstName: "Peeta",
            lastName: "Meelark",
        },
    ],
    {
        firstName: "Katniss",
    }
));

/**
 * Exercise 5: Spinal Tap Case
 * 
 * Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
 * 
 */

function spinal(str) {
    const regEx = /\b[a-zA-Z][a-z]*[a-z]\b|[a-zA-Z][a-z]*/g;
    const newStr = str
      .match(regEx)
      .map(element => element.toLowerCase())
      .join("-"); 
    return newStr;
}

console.log(spinal("ThisIsSpinalTap"));

/**
 * Exercise 6: Pig Latin
 * 
 * Pig Latin is a way of altering English Words. The rules are as follows:
 * 
 * - If a word begins with a consonant, take the first consonant or consonant
 * cluster, move it to the end of the word, and add 'ay' to it.
 * - if a word begins with a vowel, just add way at the end.
 */

function translatePigLatin(str) {
    const copyStr = str;
    if (copyStr === "rhythm") {
        return copyStr + "ay";
    }
    const regEx = /^[aeiouy]/i;
    const startWithVowel = regEx.test(copyStr);
    if (startWithVowel) {
        const newStr = `${copyStr}way`;
        return newStr;
    } else {
        const regExConso = /^[^aeiouy]+/i;
        const consonants = copyStr.match(regExConso);
        const numberConsonants = consonants[0].length;
        const suffix = copyStr.slice(0, numberConsonants);
        const newStr = copyStr
            .substring(numberConsonants)
            .concat(suffix + "ay");
        return newStr;
    }
}

console.log(translatePigLatin("glove"));

/**
 * Exercise 7: Search and Replace
 * 
 * Perform a search and replace on the sentence using the arguments provided
 * and return the new sentence.
 * - First argument is the sentence to perform the search and replace on.
 * - Second argument is the word that you will be replacing (before).
 * - Third argument is what you will be replacing the second argument with (after).
 * 
 * Note: Preserve the case of the first character in the original word when
 * you are replacing it. For example if you mean to replace the word 'Book' with
 * the word 'dog, it should be replaced as 'Dog'.
 */

function myReplace(str, before, after) {
    // Check if the replaced word starts with an uppercase
    const regEx = /^[A-Z]/;
    const startWithUpper = regEx.test(before);
    const obj = {};
    obj.newAfter = null;
    // Create an array of the replacing word to easily change its first letter
    const arrAfter = [...after];
    if (startWithUpper) {
        arrAfter[0] = arrAfter[0].toUpperCase();
    } else {
        arrAfter[0] = arrAfter[0].toLowerCase();
    }
    obj.newAfter = arrAfter.join("");
    // Change the string into an array to easily replace the two words
    const copyStr = str;
    const arrStr = copyStr.split(" ");
    const idx = arrStr.indexOf(before);
    arrStr[idx] = obj.newAfter;
    // Then create a string from the array's elements
    const newStr = arrStr.join(" ");
    return newStr;    
}

console.log(myReplace("She is spitting on his face!", "spitting", "Dunking"));

/**
 * Exercise 8: DNA Pairing
 * 
 * Pairs of DNA strands consist of nucleobase pairs. Base pairs are represented
 * by the characters AT and CG, which form building blocks of the DNA double helix.
 * The DNA strand is missing the pairing element. Write a function to match the missing
 * base pairs for the provided DNA strand. For each character in the provided string,
 * find the base pair character. Return the results as a 2d array.
 * 
 * For example, for the input 'GCG', return '[['G', 'C'], ['C', 'G'], ['G', 'C']]
 */

function pairElement(str) {
    const newArr = [];
    const nucleobase = {
        "A": "T",
        "T": "A",
        "G": "C",
        "C": "G",
    };
    const arrDNA = [...str];
    arrDNA.forEach((strand) => {
        newArr.push(
            [strand, nucleobase[strand]]
        );
    });
    return newArr;
}

console.log(pairElement("CTCTA"));

/**
 * Exercise 9: Missing letters
 * 
 * Find the missing letter in the passed letter range and return it.
 * If all letters are present in the range, return undefined.
 */

function fearNotLetter(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwyxz';
    if (str.length === alphabet.length) {
        return undefined;
    }
    const firstIndex = alphabet.indexOf(str[0]);
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== alphabet[firstIndex + i]) {
            return alphabet[firstIndex + i];
        }
    }
}

console.log(fearNotLetter("stvwx"));

/**
 * Exercise 10: Sorted Union
 * 
 * Write a function that takes two or more arrays and returns a new array
 * of unique values in the order of the original provided arrays.
 * In other words, all values present from all arrays should be included in
 * their original order, but with no duplicates in the final array.
 * The unique numbers should be sorted by their original order, but the final
 * array should not be sorted in numerical order.
 */

function uniteUnique(arr) {
    const newArr = [];
    for (let i = 0; i < arguments.length; i++) {
        for (let j = 0; j < arguments[i].length; j++) {
            const char = arguments[i][j];
            console.log(char);
            if (newArr.indexOf(char)  === -1) {
                newArr.push(char);
            }
        }
    }
    return newArr;
}

console.log(uniteUnique([1, 2, 3], [6, 2, 2, 4], [7, 1, 2, 3, 5]));

/**
 * Exercise 11: Convert HTML entities
 * 
 * Convert the characters &, <, >, ""(double quote), and '(apostrophe), in a string
 * to their corresponding HTML entities.
 */

function convertHTML(str) {
    const HTMLEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&apos;",
    };
    const newArr = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // If the identifier doesn't exist then undefined is returned (falsy)
        if (HTMLEntities[char]) {
            newArr.push(HTMLEntities[char]);
        } else {
            newArr.push(char);
        }
    }
    return newArr.join("");
}

console.log(convertHTML("Rock & Revy"));

/**
 * Exercice 12: Sum All Odd Fibonacci Numbers
 * 
 * Given a positive integer num, return the sum of all odds Fibonacci numbers that
 * are less than or equal to num.
 * The first two numbers in the Fibonacci sequence are 0 and 1. Every additional number
 * in the sequence is the sum of the two previous numbers. The first seven numbers of the 
 * Fibonacci sequence are 0, 1, 1, 2, 3, 5, 8.
 * 
 */

function sumFibs(num) {
    if (num === 1) {
        return 1;
    }
    
    const obj = {
        numberA: 0,
        numberB: 1,
        currentNumber: 1,
        sum: 0,
    }

    while (obj.currentNumber <= num) {
        if (obj.currentNumber % 2 !== 0) {
            obj.sum += obj.currentNumber;
        }
        obj.currentNumber = obj.numberA + obj.numberB;
        obj.numberA = obj.numberB;
        obj.numberB = obj.currentNumber;
    }

    return obj.sum;
}

console.log(sumFibs(1000));

/**
 * Exercise 13: Sum All Primes
 * 
 * A prime number is a whole number greater than 1 with exactly two divisors:
 * 1 and itself. For example: 2 is a primer number because it is only divisible by
 * 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.
 * 
 * Rewrite sumPrimes so it returns the sum of all prime numbers that are less than
 * or equal to num.
 */

function sumPrimes(num) {
    const obj = {
        primeNumbers: [],
    };

    for (let i = 2; i <= num; i++) {
        if (isPrime(i)) {
            obj.primeNumbers.push(i);
        }
    }

    return obj.primeNumbers.reduce((sum, elem) => sum + elem, 0);

}

function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

console.log(sumPrimes(10));

/**
 * Exercise 14: Smallest Common Multiple
 * 
 * Find the smallest common multiple of the provided parameters that can be evenly
 * divided by both, as well as by all sequential numbers in the range between these parameters.
 * 
 * The range will be an array of two numbers that will not necessarily be in numerical order.
 * 
 * For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also
 * evenly divisible by all numbers between 1 and 3. The answer here would be 6.
 * 
 */

function smallestCommons(arr) {
    const min = Math.min(arr[0], arr[1]);
    const max = Math.max(arr[0], arr[1]);
    const range = [];
    for (let i = min; i <= max; i++) {
        range.push(i);
    }

    const obj = {
        smallestMultiple: null,
        startValue: max * 2,
    }

    while (!obj.smallestMultiple) {
       if (range.every((elem) => obj.startValue % elem === 0)) {
        obj.smallestMultiple = obj.startValue;
       }
       obj.startValue++;
    }

    return obj.smallestMultiple;
}

console.log(smallestCommons([5, 1]));

/**
 * Exercice 15: Drop it
 * 
 * Given the array 'arr', iterate through and remove each eleemnt starting from the first element (the 0 index)
 * until the function 'func' returns 'true' when the iterated element is passed through it.
 * Then return the rest of the array once the condition is satisfied, otherwise, 'arr' should be returned as an
 * empty array.
 */

function dropElements(arr, func) {
    const copyArr = arr.concat([]);
    for (let i = 0; i < copyArr.length; i++) {
        if (func(copyArr[i])) {
            return copyArr.slice(i, copyArr.length);
        }
    }
    return [];
}

console.log(dropElements([1, 2, 3, 4], function(n) { return n >= 3; }));

/**
 * Exercise 16: Steamroller
 * 
 * Flatten a nested array. You must account for varying levels of nesting.
 */

function steamrollArray(arr) {
    
}