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

