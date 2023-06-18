/**
 * Exercice 1: convert celsius to fahrenheit
 * Celsius to Fahrenheit is c * 9/5 + 32
 */

function convertCtoF(celsius) {
    let fahrenheit = celsius * 9/5 + 32;
    
    return fahrenheit;
}

console.log(`28 degrees celsius is equal to ${convertCtoF(28)} degrees fahrenheit.`);


/**
 * Exercice 2: reverse the provided string and return the reverse string.
 */

function reverseString(str) {
    let arr = [...str];
    let reverseString = "";
    for (let i = arr.length - 1; i >= 0; i--) {
        reverseString += arr[i];
    }
    return reverseString;
}

console.log(reverseString("hello"));


/**
 * Exercice 3: factorialize a number
 */

// Solution 1
function factorialize(num) {
    let product = 1;
    for (let i = product; i <= num; i++) {
        product *= i;
    }
    return product;
}

console.log(`The factorial of 5 is ${factorialize(5)}.`);

// Solution 2
function facto(num) {
    if (num === 0) {
        return 1;
    }

    return num * facto(num - 1);
}

console.log(`The factorial of 5 is ${facto(5)}.`);

/**
 * Exercice 4: return the length of the longest word in the provided sentence.
 */

function findLongestWordLength(str) {
    let arr = [];
    let word = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") {
            word += str[i];
        } else {
            arr.push(word);
            word = "";
        }

        if (i === str.length - 1) {
            arr.push(word);
        }
    }

    console.log(arr);
    let longestWord = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > longestWord) {
            longestWord = arr[i].length;
        }
    }

    return longestWord;
}

let test = "Find the longest word in that sentence";
console.log(findLongestWordLength(test));


// Exercice 5: return largest numbers in Arrays

test = [
    [1000, 200, 50, 4032],
    [5, 2, 23, 4, 6],
    [87, 34, 23, 101, 30, 99],
    [84, 2323, 20, 12]
];

function largestOfFour(arr) {
    let largestNumbersArray = [];
    let largestNumber = 0;
    for (let i = 0; i < arr.length; i++) {
        largestNumber = arr[i][0]
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] > largestNumber) {
                largestNumber = arr[i][j];
            }
        }
        largestNumbersArray.push(largestNumber);
    }
    return largestNumbersArray;
}

console.log(largestOfFour(test));


// Exercice 6: check if a string ends with the given target string

test = "Superman is a superhero";

function confirmEnding(str, target) {
    let searchIndex = 0;
    let targetIndex = 0;
    while(str.indexOf(target, searchIndex) !== -1) {
        targetIndex = str.indexOf(target, searchIndex);
        searchIndex = targetIndex + target.length;
    }
    return targetIndex === str.length - target.length;
}

console.log(confirmEnding(test, "hero"));


// Exercice 7: repeat a given string (first argument) for num times (second argument)

function repeatStringNumTimes(str, num) {
    if (num <= 0) {
        return "";
    } else {
        let repeatString = "";
        for (let i = 0; i < num; i++) {
            repeatString += str;
        }
        return repeatString;
    }
}

test = "London Bridge...";
console.log(repeatStringNumTimes(test, 5));
console.log(repeatStringNumTimes(test, -5));


// Exercice 8: truncate a string if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    }
    return str;
}

test = "I am going to do a Unity tutorial today.";
console.log(truncateString(test, 10));


// Exercice 9: create a function that looks through an array arr and returns the first element in it that passes a 'truth test'. This means that given an element x, the 'truth test' is passed if func(x) is true. If no element passes the test, return undefined.

function findElement(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return arr[i];
        }
    }
    return undefined;
}

console.log(findElement([22, 25, 8, 2, 200], (x) => x % 2 !== 0));


// Exercice 10: check if a value is classified as a boolean primitive. Return true or false.

function booWho(bool) {
    return typeof bool === "boolean";
}

console.log(booWho(true));
console.log(booWho("Hello World!"));
console.log(booWho(0));


// Exercice 11: return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

function titleCase(str) {
    // let regEx = /(?<=\s+|^)\S+(?=\s+|$)/gi;
    let regEx = /\b\S+\b/gi;
    let arr = str.match(regEx);
    let newStr = "";
    for (let i = 0; i < arr.length; i++) {
      let word = "";
      for (let j = 0; j < arr[i].length; j++) {
        if (j === 0) {
          word += arr[i][j].toUpperCase();
        } else {
          word += arr[i][j].toLowerCase();
        }
      }
        if (i === arr.length - 1) {
          newStr += word;
        } else {
          newStr += word + " ";
        }
      }
      return newStr;
  }
  
  console.log(titleCase("I'm a little tea pot"));

/**
 * Exercice 12: You are given two arrays and an index. Copy each element of the first array into the second array, in order.
 * Begin inserting elements at index n of the second array. Return the resulting array. The input arrays should remain the same after the function returns.
 */

function frankenSplice(arr1, arr2, n) {
    let contentFirstArray = [...arr1];
    let contentSecondArray = [...arr2];
    // Do not use undefined as value for the second argument here. It will be converted to 0.
    let removedContent = contentSecondArray.splice(n, Infinity, ...contentFirstArray);
    contentSecondArray.push(...removedContent);
    return contentSecondArray;
}

console.log(frankenSplice([1, 2, 3], [100, 200, 300], 1));
 

/**
 * Exercice 13: remove all falsy values from an array. Return a new array; do not mutate the original array.
 */

function bouncer(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

test = [
    false,
    true, 
    "Hello World", 
    0, 
    "0", 
    NaN, 
    42, 
    "",
    { firstName: "Jordan", lastName: "Falaise"},
    undefined,
    function(name) { console.log("Hey " + name + "!") },
    null
];

console.log(bouncer(test));


/**
 * Exercice 14: Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.
 */

function getIndexToIns(arr, num) {
    let sortedArr = [];
    let copyArr = [...arr];
    copyArr.push(num);

    while (copyArr.length > 0) {
        let max = Math.max(...copyArr);
        let maxIndex = copyArr.indexOf(max);
        sortedArr.unshift(...copyArr.splice(maxIndex, 1));
    }

    console.log(sortedArr);
    return sortedArr.indexOf(num);
}

test = [33234, 202, 34, 1, 400, 90];
console.log(getIndexToIns(test, 25));


// Exercice 15: return true if the string in the first element of the array contains all of the letters of the string in the second element of the array (ignoring case).

function mutate(arr) {
    let firstString = "";
    let secondString = "";
    for (let i = 0; i < arr[0].length; i++) {
        firstString += arr[0][i].toLowerCase();
    }
    for (let i = 0; i < arr[1].length; i++) {
        secondString += arr[1][i].toLowerCase();
    }

    let firstStringArr = [...firstString];
    for (let i = 0; i < secondString.length; i++) {
        let index = firstStringArr.indexOf(secondString[i]);
        if (index === -1) {
            return false;
        }
        // Uncomment if you want to count letters appearing more than once
        // firstStringArr.splice(index, 1);
    }

    return true;
}

test = ["Tomorrow", "moRRow"];
console.log(mutate(test));

test = ["hello", "hey"];
console.log(mutate(test));


// Exercice 16: write a function that splits an array(first argument) into groups the length of size (second argument) and returns them as two dimensional array.

function chunkArrayInGroups(arr, size) {
    let newArr = [];
    while (arr.length > 0) {
        newArr.push(arr.splice(0, size));
    }
    return newArr;
}

test = [
    "Secret of Mana",
    "Secret of Evermore",
    "Alundra",
    "Legend of Thor",
    "Zelda: A link to the past",
    "Grandia",
    "Jade Cocoon"
];

console.log(chunkArrayInGroups(test, 2));